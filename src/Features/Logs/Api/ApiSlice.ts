import {apiSlice} from "../../Api/ApiSlice";
import Log from "../Interfaces/Log";

export const logApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getLogs: build.query({
      query: () => "/logs",
    }),
    putLog: build.mutation({
      query: (log: Log) => ({
        url: "/logs",
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        // Include the entire post object as the body of the request
        body: log,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {useGetLogsQuery, usePutLogMutation} = logApi;
