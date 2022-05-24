import {
  FETCH_PRODUCTS_SUBCATEGORIES_SUCCESS,
  FETCH_PRODUCTS_SUBCATEGORIES_STARTED,
  FETCH_PRODUCTS_SUBCATEGORIES_FAILURE,
} from "./productSubcategories.types";

const initialState = {
  products: [],
  isLoading: false,
  errors: [],
};

const productSubcategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUBCATEGORIES_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PRODUCTS_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case FETCH_PRODUCTS_SUBCATEGORIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default productSubcategoriesReducer;
