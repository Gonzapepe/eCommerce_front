import { combineReducers } from "redux";

import registerSlice from "./register";
import loginSlice from "./login";
import { productsService } from "../../api/products/products";
import { subcategoriesService } from "../../api/subcategories/subcategory";
import productSlice from "./products";
const reducer = combineReducers({
  register: registerSlice,
  login: loginSlice,
  product: productSlice,
  [productsService.reducerPath]: productsService.reducer,
  [subcategoriesService.reducerPath]: subcategoriesService.reducer,
});

export default reducer;
