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
      query: ({ bookId, userId }) => `ratings/${bookId}/${userId}`,
    }),
    editReview: builder.mutation({
      query: ({ bookId, userId, inputData }) => ({
        url: `ratings/${bookId}/${userId}`,
        method: "PUT",
        body: inputData,
      }),
    }),
    deleteReview: builder.mutation({
      query: ({ bookId, userId }) => ({
        url: `ratings/${bookId}/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetReviewByIdQuery,
  useEditReviewMutation,
  useDeleteReviewMutation, 
} = bookReviewApi;
