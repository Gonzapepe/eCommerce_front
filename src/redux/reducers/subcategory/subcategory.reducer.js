import {
  ADD_SUBCATEGORY_FAILURE,
  ADD_SUBCATEGORY_SUCCESS,
} from "./subcategory.types";

const initialState = {
  subcategory: {},
  isLoading: false,
  errors: [],
};

const subcategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subcategory: action.payload,
      };

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
