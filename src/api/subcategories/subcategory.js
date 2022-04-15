// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:4000/v1/";

export const subcategoriesService = createApi({
  reducerPath: "subcategories",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getSubcategories: builder.query({
      query: () => `subcategory`,
    }),
    getSubcategoriesProducts: builder.query({
      query: (subcategories) => {
        if (subcategories !== []) {
          return {
            url: `subcategory?name=${subcategories}`,
          };
        }
      },
    }),
  }),
});

export const { useGetSubcategoriesQuery, useGetSubcategoriesProductsQuery } =
  subcategoriesService;
