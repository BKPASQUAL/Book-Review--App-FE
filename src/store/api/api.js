import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4003/',
  }),
  endpoints: () => ({}), 
});

export default api;
