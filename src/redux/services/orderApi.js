import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "./baseQueryWithReauth";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: createBaseQueryWithReauth(""),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({ url: "/orders", method: "POST", body }),
      invalidatesTags: ["Orders"],
    }),
    getOrders: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => `/orders?page=${page}&limit=${limit}`,
      providesTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery, useGetOrderByIdQuery } = orderApi;
