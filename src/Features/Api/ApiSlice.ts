// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {RootState} from "../../Store/Store";
const ENDPOINT = import.meta.env.VITE_ENDPOINT;

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with
  baseQuery: fetchBaseQuery({
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
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({email, password}: {email: String; password: String}) => ({
        url: "/auth/login",
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        // Include the entire post object as the body of the request
        body: {email, password},
      }),
    }),
    // refresh: builder.query({
    //   query: () => "/refresh-tokens",
    // }),
  }),
});

// Export the auto-generated hook for the `login` query endpoint
export const {useLoginMutation} = apiSlice;
