import axios from "axios";
import {
  FETCH_PRODUCT_STARTED,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from "./product.types";

export const updateProduct = (product) => async (dispatch) => {
  const token = localStorage.getItem("token");
  console.log("PRODUCTO: ", product);
  try {
    // sends data as multipart/form-data instead of application/json
    const formData = new FormData();
    if (product.images) {
      formData.append("image", product.images);
    }
    formData.append("title", product.title);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("description", product.description);

    const response = await axios.patch(
      `http://localhost:4000/v1/products/${product.id}`,
      formData,
      { headers: { Authorization: token } }
    );
    console.log("ASDASDOIHASHODSADASIODIASO");
    console.log("RESPUESTA DEL UPDATE PRODUCT", response.data);
    dispatch(updateProductSuccess(response.data.data));
  } catch (err) {
    console.log("ERROR REQUEST: ", err.request);
    console.log("ERROR RESPONSE: ", err.response);
    console.log("ERROR MESSAGE", err.message);
    dispatch(updateProductFailure(err));
  }
};

export const addProduct = (product) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    // Sends data as multipart/form-data instead of application/json
    const formData = new FormData();
    formData.append("image", product.images);
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

// Update product success and failure
const updateProductSuccess = (data) => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload: data,
  };
};

const updateProductFailure = (err) => {
  return {
    type: UPDATE_PRODUCT_FAILURE,
    payload: {
      err,
    },
  };
};
