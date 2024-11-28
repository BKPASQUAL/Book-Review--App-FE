import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4003/',

        prepareHeaders: (headers) => {
            const accessToken = localStorage.getItem('accessToken'); 
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`)
            }
            return headers;
        }
    }),
    endpoints: () => ({}),
});

export default api;
