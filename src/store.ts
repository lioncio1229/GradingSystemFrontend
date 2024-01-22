import { configureStore } from '@reduxjs/toolkit'
import { emptySplitApi } from "./services";
import globalReducer from './globalSlice';

export const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(emptySplitApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch