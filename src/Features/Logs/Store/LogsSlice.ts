import {createSlice, PayloadAction, nanoid, createAsyncThunk} from "@reduxjs/toolkit";

import Log from "../Interfaces/Log";
import type {RootState} from "../../../Store/Store";
import LogService from "../Services/LogService";

// Define a type for the slice state
interface LogsStateInterface {
  logs: Log[];
  // Multiple possible status enum values
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

// Define the initial state using that type
const initialState: LogsStateInterface = {
  logs: [
    {
      id: 0,
      idLog: "1657498884211",
      body: [
        {
          language: "text",
          childrens: [
            {
              type: "paragraph",
              language: "text",
              children: [{text: "uuuuuiiiooo u0980990i09i09i", bold: true}],
            },
            {type: "paragraph", language: "text", children: [{bold: true, text: ""}]},
            {
              type: "paragraph",
              language: "text",
              children: [
                {bold: true, text: "Conteindio 12346i{ñ8lp asdz k,kkiko99999999999999999n88889999"},
              ],
            },
            {
              type: "paragraph",
              language: "text",
              children: [{bold: true, text: "zavcx kk mmkkkkk kkkkkkkkkkkkkkkkkkkkjjjo"}],
            },
            {type: "paragraph", language: "text", children: [{text: ""}]},
            {type: "paragraph", language: "text", children: [{text: ""}]},
            {
              type: "paragraph",
              language: "text",
              children: [{text: "asd sadasdla kmdlkasmdklamskdc"}],
            },
            {type: "paragraph", language: "text", children: [{text: "dasda askdmlaks akdmlaksmd"}]},
            {type: "paragraph", language: "text", children: [{text: "sadlkasdlaslkd "}]},
          ],
          type: "paragraph",
        },
      ],
      date: "Sun Jul 10 2022",
      reactions: {
        reviewed: 0,
        works: 0,
        seen: 2,
      },
    },
  ],
  status: "idle",
  error: null,
};

export const fetchLogs = createAsyncThunk(
  "logs/fetchLogs",
  async (authData: {channelName: String; jwt: String; token: String}) => {
    const {channelName, jwt, token} = authData;

    const response = await LogService.getLogsChannel(channelName, jwt, token);

    return response;
  },
);

export const addNewLog = createAsyncThunk(
  "logs/addNewLog",
  // The payload creator receives the partial `{title, content, user}` object
  async (initialLog: {log: Log; jwt: String; token: String}) => {
    const {log, jwt, token} = initialLog;
    // We send the initial data to the fake API server
    const response = await LogService.push(log, jwt, token);

    // The response includes the complete post object, including unique ID
    return response;
  },
);

export const logsSlice = createSlice({
  name: "logs",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logAdded: {
      reducer(state, action: PayloadAction<Log>) {
        state.logs.unshift(action.payload);
      },
      prepare(body: Array<any>) {
        const date = new Date();
        const log = {
          id: nanoid(),
          idLog: String(date.valueOf()),
          body: body,
          date: date.toDateString(),
          reactions: {
            reviewed: 0,
            works: 0,
            seen: 0,
          },
        };

        return {payload: log};
      },
    },
    logUpdated(state, action) {
      const {id, idLog, body, date} = action.payload;
      const existingLog = state.logs.find((log) => log.id == id);

      if (existingLog) {
        existingLog.idLog = idLog;
        existingLog.body = body;
        existingLog.date = date;
      }
    },
    reactionAdded(state, action: PayloadAction<{idLog: any; reaction: string}>) {
      const {idLog, reaction} = action.payload;
      const existingLog = state.logs.find((log) => log.id == idLog);

      if (existingLog) {
        existingLog.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLogs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.logs = state.logs.concat(action.payload.logs);
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewLog.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.logs.unshift(action.payload);
      });
  },
});

export const {logAdded, logUpdated, reactionAdded} = logsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLogs = (state: RootState) => state.logs.logs;

export const selectLogById = (logId: Number) => (state: RootState) => {
  return state.logs.logs.find((log) => log.id == logId);
};

export const logsStatus = (state: RootState) => state.logs.status;
export const logsError = (state: RootState) => state.logs.error;

export default logsSlice.reducer;
