import React, {useState, useEffect} from "react"
import Header from "../Header"
import { useAppDispatch, RootStateType, useAppSelector } from "../../redux/store";
import {updateCurrentAuthUser} from "../../redux/slices/entitySlice"
import { navigate } from "gatsby-link";
import {
  metaMask,
  useEagerConnect,
  getLibrary,
  useInactiveListener,
} from "../../web3-config";

interface LayoutProps {
  children: React.ReactNode
  authenticated: boolean
}


const Layout = ({ children, authenticated }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state: RootStateType) => state.entity.userData);
  const authState = useAppSelector((state: RootStateType) => state.entity.authState);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  useEagerConnect();
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener();
  /* Checking if the user is authenticated or not */

  useEffect(() => {
    (async () => {
      if (authState === null) {
        await dispatch(updateCurrentAuthUser())
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if ((authState !== null || authState !== "PENDING") && authState === "SIGNED_OUT" && authenticated) {
        navigate("/")
      }
    })();
  }, [authState]);

  return (
    <>
      <Header />
      {/* <div className="max-w-screen-3xl mx-auto md:px-4 px-2"> */}
      {
        authenticated && authState === "SIGNED_IN" && <main>{children}</main>
      }
      {
        !authenticated && <main> 
          {/* <MyDialog/>  */}
        {children}</main>
      }
      {/* </div> */}
    </>
  )
}


export default Layout
