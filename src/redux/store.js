import { createStore, compose, applyMiddleware } from "redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { productsService } from "../api/products/products";
import { subcategoriesService } from "../api/subcategories/subcategory";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
