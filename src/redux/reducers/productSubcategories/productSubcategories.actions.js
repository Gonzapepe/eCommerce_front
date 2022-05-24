import {
  FETCH_PRODUCTS_SUBCATEGORIES_FAILURE,
  FETCH_PRODUCTS_SUBCATEGORIES_STARTED,
  FETCH_PRODUCTS_SUBCATEGORIES_SUCCESS,
} from "./productSubcategories.types";
import axios from "axios";

// Fetch all Subcategories products
export const fetchProductsSubcategories =
  (subcategories) => async (dispatch) => {
    dispatch(fetchProductsSubcategoriesStarted());
    console.log("SUBCATEGORIAS: ", subcategories);
    try {
      if (subcategories !== [] && subcategories.length > 0) {
        const response = await axios.get(
          `http://localhost:4000/v1/subcategory?name=${subcategories}`
        );
        console.log("RESPUESTA FETCH P SUBCATEGORIES: ", response.data.data);
        dispatch(fetchProductsSubcategoriesSuccess(response.data.data));
      }
    } catch (err) {
      dispatch(fetchProductsSubcategoriesFailure(err));
    }
  };

// Fetch all subcategories products
const fetchProductsSubcategoriesStarted = () => {
  return {
    type: FETCH_PRODUCTS_SUBCATEGORIES_STARTED,
  };
};

const fetchProductsSubcategoriesSuccess = (data) => {
  return {
    type: FETCH_PRODUCTS_SUBCATEGORIES_SUCCESS,
    payload: data,
  };
};

const fetchProductsSubcategoriesFailure = (err) => {
  return {
    type: FETCH_PRODUCTS_SUBCATEGORIES_FAILURE,
    payload: {
      err,
    },
  };
};
