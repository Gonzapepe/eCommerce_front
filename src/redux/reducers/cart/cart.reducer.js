import {
  FETCH_CART_STARTED,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  TOGGLE_CART_HIDDEN,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
} from "./cart.types";

let initialState = {
  isLoading: false,
  hidden: true,
  cartItems: [],
  errors: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case FETCH_CART_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cartItems: action.payload.cartItems,
      };
    case FETCH_CART_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    case REMOVE_FROM_CART_SUCCESS:
      console.log("ACTION PAYLOAD: ", action.payload);
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    case REMOVE_FROM_CART_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
