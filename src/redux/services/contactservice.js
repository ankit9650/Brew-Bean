import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/v1` }),
  endpoints: (builder) => ({
    submitContact: builder.mutation({
      query: (body) => ({ url: "/contact", method: "POST", body }),
    }),
  }),
});

export const { useSubmitContactMutation } = contactApi;
