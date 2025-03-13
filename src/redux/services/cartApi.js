import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (item) => ({
        url: "/api/cart",
        method: "POST",
        body: item,
      }),      
    }),
    
  }),
});

export const { useAddToCartMutation } = cartApi;
