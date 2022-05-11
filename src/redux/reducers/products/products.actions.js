import axios from "axios";
import {
  FETCH_PRODUCT_STARTED,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
} from "./products.types";

export const fetchProduct = (id) => async (dispatch) => {
  dispatch(fetchProductsStarted());
  try {
    const response = await axios.get(`http://localhost:4000/v1/products/${id}`);
    console.log("RESPUESTA DEL FETCH PRODUCTS: ", response.data.data);
    dispatch(fetchProductsSuccess(response.data.data));
    return response.data;
  } catch (err) {
    dispatch(fetchProductsFailure(err));
  }
};

const fetchProductsStarted = () => {
  return {
    type: FETCH_PRODUCT_STARTED,
  };
};

const fetchProductsFailure = (err) => {
  return {
    type: FETCH_PRODUCT_FAILURE,
    payload: {
      err,
    },
  };
};

const fetchProductsSuccess = (data) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: data,
  };
};
