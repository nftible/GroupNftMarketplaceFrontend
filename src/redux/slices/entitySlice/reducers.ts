import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserDataType } from './types';
// import { loginMetaMask, signUpMetaMask, findUserMetaMask, getAuthUser, filterMetaMaskUserAuthData } from "./services";
import { CurrentToken } from "../../../utils";
import { API, Auth } from "aws-amplify";
import { findUser , authUser} from "../../../graphql/queries";
import { signup, authenticate, refreshAccessToken } from "../../../graphql/mutations";

type signedInMetaMaskUser = {
    address: string;
    web3: any;
    callback?: (err?: any, res?: { userData: UserDataType }) => void
};


export const updateCurrentAuthUser = createAsyncThunk(
  "updateCurrentAuthUser/MetaMask",
  async (data: { authStatePending?: boolean } | undefined = { authStatePending: true }, thunkAPI) => {
    try {
      const { token } = new CurrentToken().get();
      if (!token) { throw "no auth token" }
      const authen: any = await API.graphql({
        query: refreshAccessToken,
        authMode: "AWS_LAMBDA",
        authToken: `Bearer ${token}`
      })
      new CurrentToken().remove();
      const user_auth: any = await API.graphql({
        query: authUser,
        authMode: "AWS_LAMBDA",
        authToken: `Bearer ${authen.data.refreshAccessToken}`
      })
      new CurrentToken().set({ token: authen.data.refreshAccessToken, expiry_date: user_auth.data.authUser.token_exp });
      return user_auth.data.authUser.userData;
    }
    catch (err) {
      new CurrentToken().remove();
      return thunkAPI.rejectWithValue(err);
    }
  }
)

export const signedInMetaMask = createAsyncThunk(
    "signIn/MetaMask",
    async ({ address, web3 }: signedInMetaMaskUser, thunkAPI) => {
      let nonce: string = "";
      try{
        try{
          const find: any = await API.graphql({
            query: findUser,
            variables: {address},
          }) 
  
          nonce = find?.data?.findUser?.nonce;
  
        }
        catch(err){
          const sign: any = await API.graphql({
            query: signup,
            variables: {address},
          })
  
          nonce = sign?.data.signup.nonce;
  
        }

        const signature = await web3.getSigner(address).signMessage(`My App Auth Service Signing nonce: ${nonce}`)

        const authen: any = await API.graphql({
          query: authenticate,
          variables: {address, signature},
        })
  
  
        const user_auth: any = await API.graphql({
          query: authUser,
          authMode: "AWS_LAMBDA",
          authToken: `Bearer ${authen.data.authenticate}`
        })
  
        new CurrentToken().set({ token: authen.data.authenticate, expiry_date: user_auth.data.authUser.userAuthData.tokenExpiryDate });
        return user_auth.data.authUser.userData;
      }
      catch(err){
        return thunkAPI.rejectWithValue(err);
      }
    }
);