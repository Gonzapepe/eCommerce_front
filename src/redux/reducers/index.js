import { combineReducers } from "redux";

// import userSlice from "./user";
import usersReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import productReducer from "./product/product.reducer";
import subcategoriesReducer from "./subcategories/subcategories.reducer";
import productsReducer from "./products/products.reducer";
import productSubcategoriesReducer from "./productSubcategories/productSubcategories.reducer";
import imagesReducer from "./images/images.reducer";
import subcategoryReducer from "./subcategory/subcategory.reducer";

const reducer = combineReducers({
  user: usersReducer,
  cart: cartReducer,
  product: productReducer,
  products: productsReducer,
  subcategories: subcategoriesReducer,
  productSubcategories: productSubcategoriesReducer,
  images: imagesReducer,
  subcategory: subcategoryReducer,
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
