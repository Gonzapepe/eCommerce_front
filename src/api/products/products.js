// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:4000/v1/";

export const productsService = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (category) => `products?category=${category}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsService;
