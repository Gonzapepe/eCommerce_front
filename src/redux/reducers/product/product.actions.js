import axios from "axios";
import {
  FETCH_PRODUCT_STARTED,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
} from "./product.types";

export const fetchProduct = (id) => async (dispatch) => {
  dispatch(fetchProductStarted());
  try {
    const response = await axios.get(`http://localhost:4000/v1/products/${id}`);
    console.log("RESPUESTA DEL FETCH PRODUCTS: ", response.data.data);
    dispatch(fetchProductSuccess(response.data.data));
    return response.data;
  } catch (err) {
    dispatch(fetchProductFailure(err));
  }
};

// Fetch single product functions
const fetchProductStarted = () => {
  return {
    type: FETCH_PRODUCT_STARTED,
  };
};

const fetchProductFailure = (err) => {
  return {
    type: FETCH_PRODUCT_FAILURE,
    payload: {
      err,
    },
  };
};

const fetchProductSuccess = (data) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: data,
  };
};
