import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import { booksApi } from "./api/booksApi";
import {userApi } from "./api/userApi";
import { getReviewApi } from "./api/reviewApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [getReviewApi.reducerPath]: getReviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      booksApi.middleware,
      userApi.middleware,
      getReviewApi.middleware,
    ),
});
