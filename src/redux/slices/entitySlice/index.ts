import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { navigate } from "gatsby-link";
import { UserDataType } from './types';
import { CurrentToken } from "../../../utils";
import { signedInMetaMask, updateCurrentAuthUser } from './reducers';

export type AuthState = "SIGNED_IN" | "SIGNED_OUT" | "PENDING" | null;

type StateType = {
  authState: AuthState;
  userData: UserDataType | null;
  userAcc: string | null;
  loginIni: boolean;
};

const initialState: StateType = {
  authState: null,
  userData: null,
  userAcc: null,
  loginIni: false
};

const slice = createSlice({
  name: "entity",
  initialState,
  reducers: {

    clearAllState: (state) => {
      return initialState
    },

    setUserAcc: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        userAcc: action.payload
      }
    },

    setLoginIni: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loginIni: action.payload
      }
    },

    logOutUser: (state) => {
      new CurrentToken().remove();
      return {
        userData: null,
        authState: "SIGNED_OUT",
        userAcc: null,
        loginIni: false
      }
    }

  },
  extraReducers: (builder) => {

    builder.addCase(updateCurrentAuthUser.fulfilled, (state, action) => {
      state.authState = "SIGNED_IN";
      state.userData = action.payload;
      console.log("new token ", new CurrentToken().get().token)
    });

    builder.addCase(updateCurrentAuthUser.pending, (state, { meta: { arg } }) => {
        state.authState = "PENDING";
    });

    builder.addCase(updateCurrentAuthUser.rejected, (state) => {
      state.authState = "SIGNED_OUT";
      state.userData = null;
    });

    builder.addCase(signedInMetaMask.fulfilled, (state, { payload, meta }) => {
      state.authState = "SIGNED_IN";
      state.userData = payload;
      console.log("token ", new CurrentToken().get().token)
      meta.arg.callback && meta.arg.callback(null, payload)
    })

    builder.addCase(signedInMetaMask.rejected, (state, { error, meta }) => {
      state.authState = "SIGNED_OUT";
      state.userData = null;
      // state.signInError = error.message
      meta.arg.callback && meta.arg.callback(error)
    })

  },

});

export const { logOutUser, setUserAcc, setLoginIni } = slice.actions;
export { signedInMetaMask, updateCurrentAuthUser };

export default slice.reducer;