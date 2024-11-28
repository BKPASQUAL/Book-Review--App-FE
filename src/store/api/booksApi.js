import api from "./api"; 

export const booksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: () => "books",
        }),
    }),
});

export const { useGetAllBooksQuery } = booksApi;
