import {
  FETCH_USERS_STARTED,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./users.types";

let initialState = {
  users: [],
  isLoading: false,
  errors: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
