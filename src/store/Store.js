import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import { booksApi } from "./api/booksApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, booksApi.middleware),
});
