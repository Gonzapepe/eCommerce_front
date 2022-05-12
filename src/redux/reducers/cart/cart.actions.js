import {
  FETCH_CART_STARTED,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  TOGGLE_CART_HIDDEN,
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
} from "./cart.types";
import axios from "axios";

// Change the state of the cart
export const toggleCartHidden = () => {
  return {
    type: TOGGLE_CART_HIDDEN,
  };
};

// Remove item from cart
export const removeFromCart = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(`http://localhost:4000/v1/cart/${id}`, {
      headers: { Authorization: token },
    });
    console.log("RESPUESTA DEL DELETE ITEM: ", response.data);
    dispatch(removeFromCartSuccess(response.data.data));
    return response.data;
  } catch (err) {
    console.log(err);
    dispatch(removeFromCartFailure(err));
  }
};

// Add product to Cart
export const addToCart = (id, quantity) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `http://localhost:4000/v1/products/${id}`,
      { quantity: Number(quantity) },
      { headers: { Authorization: token } }
    );
    console.log("RESPUESTA ADD TO CART: ", response.data.data);
    dispatch(addToCartSuccess(response.data));
    return response.data;
  } catch (err) {
    console.log(err);
    dispatch(addToCartFailure(err));
  }
};

// Fetch the products from the user's cart
export const fetchCartProducts = () => async (dispatch) => {
  dispatch(fetchCartStarted());
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:4000/v1/cart", {
      headers: { Authorization: token },
    });
    console.log("DATA QUE SE LE ENVIA AL PAYLOAD", response.data.data);
    dispatch(fetchCartSuccess(response.data.data));
    return response.data.data;
  } catch (err) {
    console.log("ERROR DE FETCHCARTPRODUCT: ", err);
    dispatch(fetchCartFailure(err));
  }
};

// Functions to see if the fetch cart is working properly
const fetchCartStarted = () => {
  return {
    type: FETCH_CART_STARTED,
  };
};

const fetchCartSuccess = (data) => {
  return {
    type: FETCH_CART_SUCCESS,
    payload: data,
  };
};

const fetchCartFailure = (error) => {
  return {
    type: FETCH_CART_FAILURE,
    payload: {
      error,
    },
  };
};

// Functions to dispatch the type of add to cart
const addToCartSuccess = (data) => {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload: data,
  };
};

const addToCartFailure = (error) => {
  return {
    type: ADD_TO_CART_FAILURE,
    payload: {
      error,
    },
  };
};

// Remove from cart types
const removeFromCartSuccess = (data) => {
  return {
    type: REMOVE_FROM_CART_SUCCESS,
    payload: data,
  };
};

const removeFromCartFailure = (error) => {
  return {
    type: REMOVE_FROM_CART_FAILURE,
    payload: {
      error,
    },
  };
};
