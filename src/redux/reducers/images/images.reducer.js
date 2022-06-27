import {
  FETCH_IMAGES_STARTED,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
  IMAGES_DELETE_FAILURE,
  IMAGES_DELETE_SUCCESS,
} from "./images.types";

const initialState = {
  image: [],
  isLoading: false,
  errors: [],
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_IMAGES_SUCCESS:
      return {
        ...state,
        image: action.payload,
        isLoading: false,
      };
    case IMAGES_DELETE_FAILURE:
    case FETCH_IMAGES_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    case IMAGES_DELETE_SUCCESS: {
      return {
        ...state,
        images: state.images.filter((image) => image.id !== action.payload.id),
      };
    }
    default:
      return state;
  }
};

export default imageReducer;
