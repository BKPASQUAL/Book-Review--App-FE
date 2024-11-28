import api from "./api";

export const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "books",
    }),
    getBookById: builder.query({
      query: (bookID) => `books/${bookID}`,
    }),
  }),
});

export const { useGetAllBooksQuery, useGetBookByIdQuery } = booksApi;
