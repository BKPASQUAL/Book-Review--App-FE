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
  }),
});

export const {
  useAddReviewMutation,
  useGetReviewByIdQuery,
  useEditReviewMutation,
} = bookReviewApi;
