import { combineReducers } from "redux";

import userSlice from "./user";
import { productsService } from "../../api/products/products";
import { subcategoriesService } from "../../api/subcategories/subcategory";
import productSlice from "./products";
const reducer = combineReducers({
  user: userSlice,
  product: productSlice,
  [productsService.reducerPath]: productsService.reducer,
  [subcategoriesService.reducerPath]: subcategoriesService.reducer,
});

export default reducer;
