import { combineReducers } from "redux";

import registerSlice from "./register";
import loginSlice from "./login";
import { productsService } from "../../api/products/products";
import { subcategoriesService } from "../../api/subcategories/subcategory";
import productSlice from "./products";
// import userSlice from "./user";
import usersReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import productReducer from "./products/products.reducer";

const reducer = combineReducers({
  user: usersReducer,
  cart: cartReducer,
  product: productReducer,
  // cart: cartSlice,
  // register: registerSlice,
  // login: loginSlice,
  // product: productSlice,
  // // products: products
  // [productsService.reducerPath]: productsService.reducer,
  // // subcategories: subcategories
  // [subcategoriesService.reducerPath]: subcategoriesService.reducer,
});

export default reducer;
