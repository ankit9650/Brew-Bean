import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Public storefront catalog — no auth required, safe to call while logged out.
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/v1/products` }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, featured, search, page = 1, limit = 100 } = {}) => {
        const params = new URLSearchParams({ page, limit });
        if (category) params.set("category", category);
        if (featured) params.set("featured", "true");
        if (search) params.set("search", search);
        return `?${params}`;
      },
      providesTags: ["Products"],
    }),
    getProductBySlug: builder.query({
      query: (slug) => `/${slug}`,
    }),
    getCategories: builder.query({
      query: () => "/categories",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useGetCategoriesQuery,
} = productApi;
