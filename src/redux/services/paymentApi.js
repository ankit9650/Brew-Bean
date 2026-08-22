import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "./baseQueryWithReauth";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: createBaseQueryWithReauth("/payment"),
  endpoints: (builder) => ({
    createRazorpayOrder: builder.mutation({
      query: (body) => ({ url: "/create-order", method: "POST", body }),
    }),
    verifyPayment: builder.mutation({
      query: (body) => ({ url: "/verify", method: "POST", body }),
    }),
  }),
});

export const { useCreateRazorpayOrderMutation, useVerifyPaymentMutation } = paymentApi;
