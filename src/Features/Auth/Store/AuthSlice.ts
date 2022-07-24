import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import type {RootState} from "../../../Store/Store";

interface AuthStateInterface {
  user: Object | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  access_token: string | null;
  refreshToken: string | null;
}

const initialState: AuthStateInterface = {
  user: null,
  status: "idle",
  error: null,
  access_token: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthStateInterface>) => {
      const {user, status, error, access_token, refreshToken} = action.payload;

      state.user = user;
      state.status = status;
      state.error = error;
      state.access_token = access_token;
      state.refreshToken = refreshToken;
    },
  },
});

export const {setCredentials} = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const isLoggedUser = (state: RootState) => Boolean(state.auth.user);

export default authSlice.reducer;
