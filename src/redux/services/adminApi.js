import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["AdminOrders", "AdminProducts", "AdminContacts"],
  endpoints: (builder) => ({
    // ── Orders ──────────────────────────────────────────────
    getAllOrders: builder.query({
      query: ({ status, page = 1, limit = 20 } = {}) => {
        const p = new URLSearchParams({ page, limit });
        if (status) p.set("status", status);
        return `/orders/admin?${p}`;
      },
      providesTags: ["AdminOrders"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["AdminOrders"],
    }),

    // ── Products ─────────────────────────────────────────────
    getAdminProducts: builder.query({
      query: ({ page = 1, limit = 100 } = {}) =>
        `/products?all=true&page=${page}&limit=${limit}`,
      providesTags: ["AdminProducts"],
    }),
    getCategories: builder.query({
      query: () => "/products/categories",
    }),
    createProduct: builder.mutation({
      query: (body) => ({ url: "/products", method: "POST", body }),
      invalidatesTags: ["AdminProducts"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/products/${id}`, method: "PATCH", body }),
      invalidatesTags: ["AdminProducts"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: ["AdminProducts"],
    }),

    // ── Contacts / Messages ───────────────────────────────────
    getContacts: builder.query({
      query: ({ unread, page = 1, limit = 50 } = {}) => {
        const p = new URLSearchParams({ page, limit });
        if (unread) p.set("unread", "true");
        return `/contact?${p}`;
      },
      providesTags: ["AdminContacts"],
    }),
    markContactRead: builder.mutation({
      query: (id) => ({ url: `/contact/${id}/read`, method: "PATCH" }),
      invalidatesTags: ["AdminContacts"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetAdminProductsQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetContactsQuery,
  useMarkContactReadMutation,
} = adminApi;
