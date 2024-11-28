import api from "./api";

export const bookReviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (data) => ({
        url: "ratings",
        method: "POST",
        body: data,
      }),
    }),

    getReviewById: builder.query({
      query: (bookId, userId) => `ratings/${bookId}/${userId}`,
    }),
  }),
});

export const { useAddReviewMutation, useGetReviewByIdQuery } = bookReviewApi;
