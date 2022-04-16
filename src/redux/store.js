import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import reducer from "./reducers";
import { productsService } from "../api/products/products";
import { subcategoriesService } from "../api/subcategories/subcategory";

const store = configureStore({
  reducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      productsService.middleware,
      subcategoriesService.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
