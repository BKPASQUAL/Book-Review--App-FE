import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getReviewApi = createApi({
  reducerPath: 'getReviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4003/' }),
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (id) => `ratings/${id}`,
    }),
   
  }),
});

export const { useGetAllReviewsQuery } = getReviewApi;
