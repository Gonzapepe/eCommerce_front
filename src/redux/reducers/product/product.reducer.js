import {
  FETCH_PRODUCT_STARTED,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from "./product.types";
let initialState = {
  product: {},
  isLoading: false,
  errors: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
      };
    case FETCH_PRODUCT_FAILURE:
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    case ADD_PRODUCT_SUCCESS:
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
      };
    case ADD_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
