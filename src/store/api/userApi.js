import api from "./api";

export const userApi = api.injectEndpoints({
  reducerPath: "userApi",
  endpoints: (builder) => ({
    getSignedUser: builder.query({
      query: () => "users/signedUser",
    }),
  }),
});

export const { useGetSignedUserQuery } = userApi;
