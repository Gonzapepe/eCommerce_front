import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
} from "./user.types";

let initialState = {
  token: localStorage.getItem("token"),
  data: null,
  isLoading: false,
  errors: [],
  userCreated: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case REGISTER_USER_FAILURE:
    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userCreated: true,
        errors: [],
      };

    case LOGIN_USER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };
    case LOGIN_USER_FAILURE:
    case LOGOUT_USER_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        data: null,
        isLoading: false,
        errors: [],
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        errors: [],
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
