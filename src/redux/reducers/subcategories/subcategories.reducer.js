import {
  FETCH_SUBCATEGORIES_SUCCESS,
  FETCH_SUBCATEGORIES_FAILURE,
  FETCH_SUBCATEGORIES_STARTED,
  ADD_SUBCATEGORY_SUCCESS,
  ADD_SUBCATEGORY_FAILURE,
} from "./subcategories.types";

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

    case ADD_SUBCATEGORY_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default subcategoriesReducer;
