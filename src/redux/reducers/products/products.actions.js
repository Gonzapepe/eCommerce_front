import axios from "axios";
import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_STARTED,
} from "./products.types";

// Fetch all products within a category if you pass a category, otherwise just fetch all
export const fetchProducts = (query) => async (dispatch) => {
  dispatch(fetchProductsStarted());
  console.log("QUERY: ", query);
  try {
    if (query === undefined) {
      const response = await axios.get(
        `http://localhost:4000/v1/products?page=1`
      );

      console.log("RESPUESTA DE FETCH PRODUCTS: ", response.data.data);
      dispatch(fetchProductsSuccess(response.data.data));
    } else {
      // Va a haber un problema con ${page} pero por el momento me preocupa la paginación más que nada
      const response = await axios.get(
        `http://localhost:4000/v1/products?${query}`
      );

      console.log("RESPUESTA DE FETCH PRODUCTS: ", response.data.data);
      dispatch(fetchProductsSuccess(response.data.data));
    }
  } catch (err) {
    dispatch(fetchProductsFailure(err));
  }
};

// Fetch all products functions
const fetchProductsStarted = () => {
  return {
    type: FETCH_PRODUCTS_STARTED,
  };
};

const fetchProductsSuccess = (data) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: data,
  };
};

const fetchProductsFailure = (err) => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: {
      err,
    },
  };
};
