import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { emptySplitApi } from "./services";
import globalReducer from "./globalSlice";
import adminReducer from "pages/admin-portal/slice";
import { setErrorOpen } from "./globalSlice";

const errorMiddleware = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorMessage = action.payload?.data?.message ?? "Unauthorized action";
    const generalError = action.payload?.error;

    // 401 - Unauthorized
    if (action.payload.status === 401) {
      api.dispatch(setErrorOpen({ isOpen: true, description: errorMessage }));
    }

    // 403 - Forbidden
    if (action.payload.status === 403) {
      api.dispatch(setErrorOpen({ isOpen: true, description: errorMessage }));
    }

    // General Errors
    if (generalError != null) {
      api.dispatch(setErrorOpen({ isOpen: true, description: generalError }));
    }
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    global: globalReducer,
    adminPortal: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(emptySplitApi.middleware)
      .concat(errorMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
