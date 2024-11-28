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
  }),
});

export const { useAddReviewMutation } = bookReviewApi;
