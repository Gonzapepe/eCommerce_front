import {
  FETCH_SUBCATEGORIES_SUCCESS,
  FETCH_SUBCATEGORIES_FAILURE,
  FETCH_SUBCATEGORIES_STARTED,
} from "./subcategory.types";

const initialState = {
  subcategories: [],
  isLoading: false,
  errors: [],
};

const subcategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBCATEGORIES_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        subcategories: action.payload,
        isLoading: false,
      };
    case FETCH_SUBCATEGORIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default subcategoriesReducer;
