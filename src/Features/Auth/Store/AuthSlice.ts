import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import type {RootState} from "../../../Store/Store";
import {apiSlice} from "../../Api/ApiSlice";

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
    setCredentials: (state, action) => {
      const {user, status, error, access_token, refreshToken} = action.payload;

      state.user = user;
      state.status = status;
      state.error = error;
      state.access_token = access_token;
      state.refreshToken = refreshToken;
    },
    logOut: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
      state.access_token = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiSlice.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<AuthStateInterface>) => {
          const {user, status, error, access_token, refreshToken} = action.payload;

          state.user = user;
          state.status = status;
          state.error = error;
          state.access_token = access_token;
          state.refreshToken = refreshToken;
        },
      )
      .addMatcher(apiSlice.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.error = null;
        state.access_token = null;
        state.refreshToken = null;
      });
  },
});

export const {setCredentials, logOut} = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const isLoggedUser = (state: RootState) =>
  state.auth.refreshToken && state.auth.access_token ? true : false;

export default authSlice.reducer;
