import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from "@web3-react/injected-connector";
import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import {
  useAppDispatch,
  useAppSelector,
} from "./redux/store";
import { setUserAcc, setLoginIni } from "./redux/slices/entitySlice"
import { CurrentToken } from "./utils";

declare global {
    interface Window {
        ethereum: any;
    }
}

//this will give instance of library we want ether.js or web3.js i prefer use ether.js
export const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export const metaMask = new InjectedConnector({
    supportedChainIds: [
       1, // Mainet 0x1	
       3 // Ropsten 0x3	
      //  4, // Rinkeby 0x4
       // 5, // Goerli
       //42, // Kovan
    ]
});

export function useEagerConnect() {
    const { activate, active } = useWeb3React();
    const [tried, setTried] = useState(false);
  
    useEffect(() => {
      metaMask.getChainId().then((chainID) => {
        if(chainID !== "0x3"){
          console.log(" Your app only supports ropsten network")
        }
      });
      metaMask.isAuthorized().then((isAuthorized) => {
        console.log("isAuthorized ", isAuthorized)
        if (isAuthorized) {
          activate(metaMask, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          new CurrentToken().remove();
          setTried(true);
        }
      });
    }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))
  
    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
      if (!tried && active) {
        setTried(true);
      }
    }, [tried, active]);
  
    return tried;
}
  
  //this hook will handle account and chain changes in wallet
export function useInactiveListener(suppress = false) {
    const { active, error, activate, chainId, deactivate, account } = useWeb3React();
    const dispatch = useAppDispatch();

    useEffect(() => {
      const { ethereum } = window;
      if (ethereum && ethereum.on && !active && !error && !suppress) {
        const handleChainChanged = (chainId: any) => {
          console.log("chainId ", chainId)
          if(chainId !== "0x3"){
            console.log(" Your app only supports ropsten network")
          }
          activate(metaMask);
        };
  
        const handleAccountsChanged = (accounts: any) => {
          console.log("account off ", accounts[0])
          dispatch(setUserAcc(accounts[0]))
          dispatch(setLoginIni(true));
          if (accounts.length > 0) {
            activate(metaMask)
          }
        }
  
        const handleNetworkChanged = (networkId: any) => {
          console.log('networkChanged', networkId);
          activate(metaMask);
        };
  
        ethereum.on('chainChanged', handleChainChanged);
        ethereum.on('accountsChanged', handleAccountsChanged);
        ethereum.on('networkChanged', handleNetworkChanged);
  
        return () => {
          if (ethereum.removeListener) {
            ethereum.removeListener('chainChanged', handleChainChanged);
            ethereum.removeListener('accountsChanged', handleAccountsChanged);
            ethereum.removeListener('networkChanged', handleNetworkChanged);
          }
        };
      }
  
      return () => {};
    }, [active, error, suppress, activate, chainId, account, deactivate]);
}