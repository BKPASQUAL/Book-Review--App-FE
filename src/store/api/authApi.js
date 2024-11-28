import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4003/" }),

  reducerPath: "authApi",
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data) => {
        return {
          url: "users/signIn",
          method: "POST",
          body: data,
        };
      },
    }),

    registerUser: build.mutation({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
