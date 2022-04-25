import { combineReducers } from "redux";

import registerSlice from "./register";
import loginSlice from "./login";
import { productsService } from "../../api/products/products";
import { subcategoriesService } from "../../api/subcategories/subcategory";
import productSlice from "./products";
import userSlice from "./user";
const reducer = combineReducers({
  user: userSlice,
  register: registerSlice,
  login: loginSlice,
  product: productSlice,
  [productsService.reducerPath]: productsService.reducer,
  [subcategoriesService.reducerPath]: subcategoriesService.reducer,
});

export default reducer;
