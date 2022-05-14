import { combineReducers } from "redux";

// import userSlice from "./user";
import usersReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import productReducer from "./product/product.reducer";
import subcategoriesReducer from "./subcategory/subcategory.reducer";
import productsReducer from "./products/products.reducer";

const reducer = combineReducers({
  user: usersReducer,
  cart: cartReducer,
  product: productReducer,
  products: productsReducer,
  subcategories: subcategoriesReducer,
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
