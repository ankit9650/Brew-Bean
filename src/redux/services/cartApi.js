import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "./baseQueryWithReauth";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: createBaseQueryWithReauth(""),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (item) => ({ url: "/cart", method: "POST", body: item }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation({
      query: ({ id, quantity }) => ({ url: `/cart/${id}`, method: "PATCH", body: { quantity } }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({ url: `/cart/${id}`, method: "DELETE" }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({ url: "/cart/clear", method: "DELETE" }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;
