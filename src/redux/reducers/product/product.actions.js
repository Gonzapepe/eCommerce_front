import axios from "axios";
import {
  FETCH_PRODUCT_STARTED,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
} from "./product.types";

export const addProduct = (product) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    // Sends data as multipart/form-data instead of application/json
    const formData = new FormData();
    formData.append("image", product.image);
    formData.append("title", product.title);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("description", product.description);

    const response = await axios.post(
      "http://localhost:4000/v1/products",
      formData,
      {
        headers: { Authorization: token },
      }
    );
    console.log("RESPUESTA ADD PRODUCT", response.data.data);
    dispatch(addProductSuccess(response.data.data));
  } catch (err) {
    console.log("ERROR REQUEST: ", err.request);
    console.log("ERROR RESPONSE: ", err.response);
    console.log("ERROR MESSAGE: ", err.message);
    dispatch(addProductFailure(err));
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  dispatch(fetchProductStarted());
  try {
    const response = await axios.get(`http://localhost:4000/v1/products/${id}`);
    console.log("RESPUESTA DEL FETCH PRODUCTS: ", response.data.data);
    dispatch(fetchProductSuccess(response.data.data));
    return response.data;
  } catch (err) {
    console.log("ERROR REQUEST: ", err.request);
    console.log("ERROR RESPONSE: ", err.response);
    console.log("ERROR MESSAGE: ", err.message);
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

// Add product success and failure
const addProductSuccess = (data) => {
  return {
    type: ADD_PRODUCT_SUCCESS,
    payload: data,
  };
};

const addProductFailure = (err) => {
  return {
    type: ADD_PRODUCT_FAILURE,
    payload: {
      err,
    },
  };
};
