import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    endpoints: (builder) => ({
        addContactDetails: builder.mutation({
            query: (item) => ({
              url: "/api/contact",
              method: "POST",
              body: item,
            }),      
        }),
        getContactDetails: builder.query({
            query: (item) => ({
              url: "/api/contact/details",
              method: "POST",
              body: item,
            }),      
        }),
    })
})