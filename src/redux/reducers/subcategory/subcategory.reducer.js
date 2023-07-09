import {
  ADD_SUBCATEGORY_FAILURE,
  ADD_SUBCATEGORY_SUCCESS,
  FETCH_SUBCATEGORY_STARTED,
  FETCH_SUBCATEGORY_FAILURE,
  FETCH_SUBCATEGORY_SUCCESS,
  UPDATE_SUBCATEGORY_FAILURE,
  UPDATE_SUBCATEGORY_SUCCESS,
} from "./subcategory.types";

const initialState = {
  subcategory: {},
  isLoading: false,
  errors: [],
};

const subcategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBCATEGORY_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_SUBCATEGORY_SUCCESS:
    case FETCH_SUBCATEGORY_SUCCESS:
    case ADD_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subcategory: action.payload,
      };
    case UPDATE_SUBCATEGORY_FAILURE:
    case FETCH_SUBCATEGORY_FAILURE:
    case ADD_SUBCATEGORY_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default subcategoryReducer;
