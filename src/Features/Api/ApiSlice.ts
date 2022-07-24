// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {Mutex} from "async-mutex";

import {RootState} from "../../Store/Store";
import {logOut, setCredentials} from "../Auth/Store/AuthSlice";

const ENDPOINT = import.meta.env.VITE_ENDPOINT;
// create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `${ENDPOINT}`,
  prepareHeaders: (headers, {getState}) => {
    // By default, if we have a jwt in the store, let's use that for authenticated requests
    const jwt = (getState() as RootState).auth.access_token;
    const refresh = (getState() as RootState).auth.refreshToken;

    if (jwt && refresh) {
      headers.set("authorization", `Bearer ${jwt}`);
      headers.set("authorizationToken", `${refresh}`);
    }

    return headers;
  },
});

const BaseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  const refresh = (api.getState() as RootState).auth.refreshToken;

  if (result.error && result.error.status === 401 && refresh) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        // try to get a new token
        const refreshResult = await baseQuery("/refresh-tokens", api, extraOptions);

        if (refreshResult.data) {
          // store the new token
          api.dispatch(setCredentials(refreshResult.data));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with
  baseQuery: BaseQueryWithReauth,
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({email, password, name}: {email: String; password: String; name: String}) => ({
        url: "/register",
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        // Include the entire object as the body of the request
        body: {email, password, name},
      }),
    }),
    login: builder.mutation({
      query: ({email, password}: {email: String; password: String}) => ({
        url: "/auth/login",
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: {email, password},
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: {logout: "logout"},
      }),
    }),
  }),
});

// Export the auto-generated hook for the `register` query endpoint
export const {useRegisterMutation, useLoginMutation, useLogoutMutation} = apiSlice;
