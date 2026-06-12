import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/v1/auth`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({ url: "/register", method: "POST", body: credentials }),
    }),
    login: builder.mutation({
      query: (credentials) => ({ url: "/login", method: "POST", body: credentials }),
    }),
    refreshToken: builder.mutation({
      query: (body) => ({ url: "/refresh", method: "POST", body }),
    }),
    logout: builder.mutation({
      query: (body) => ({ url: "/logout", method: "POST", body }),
    }),
    getProfile: builder.query({
      query: () => "/me",
    }),
    updateProfile: builder.mutation({
      query: (body) => ({ url: "/me", method: "PATCH", body }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
