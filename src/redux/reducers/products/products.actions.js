import axios from "axios";
import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_STARTED,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
} from "./products.types";

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
    dispatch(addProductFailure(err));
  }
};

// Fetch all products within a category if you pass a category, otherwise just fetch all
export const fetchProducts = (category) => async (dispatch) => {
  dispatch(fetchProductsStarted());
  console.log("CATEGORIA: ", category);
  try {
    if (category === undefined) {
      const response = await axios.get(
        `http://localhost:4000/v1/products?category=`
      );

      console.log("RESPUESTA DE FETCH PRODUCTS: ", response.data.data);
      dispatch(fetchProductsSuccess(response.data.data));
    } else {
      const response = await axios.get(
        `http://localhost:4000/v1/products?category=${category}`
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
