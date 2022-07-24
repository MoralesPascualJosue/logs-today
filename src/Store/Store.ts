import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";

import {apiSlice} from "../Features/Api/ApiSlice";
import authReducer from "../Features/Auth/Store/AuthSlice";
import counterReducer from "../Features/Counter/Store/CounterSlice";
import logsReducer from "../Features/Logs/Store/LogsSlice";

export const store = configureStore({
  reducer: {
    // comments: commentsReducer,
    auth: authReducer,
    logs: logsReducer,
    counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
