import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4003/' }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => 'books',
    }),
    getBookById: builder.query({
      query: (bookID) => `books/${bookID}`,
    }),
  }),
});

export const { useGetAllBooksQuery, useGetBookByIdQuery } = booksApi;
