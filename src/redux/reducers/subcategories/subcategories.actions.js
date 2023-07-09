import {
  FETCH_SUBCATEGORIES_SUCCESS,
  FETCH_SUBCATEGORIES_FAILURE,
  FETCH_SUBCATEGORIES_STARTED,
} from "./subcategories.types";
import axios from "axios";

export const fetchSubcategories = () => async (dispatch) => {
  dispatch(fetchSubcategoriesStarted());
  try {
    const response = await axios.get("http://localhost:4000/v1/subcategory");
    console.log("RESPUESTA FETCH SUBCATEGORIES: ", response.data.data);
    dispatch(fetchSubcategoriesSuccess(response.data.data));
  } catch (err) {
    dispatch(fetchSubcategoriesFailure(err));
  }
};

const fetchSubcategoriesStarted = () => {
  return {
    type: FETCH_SUBCATEGORIES_STARTED,
  };
};

const fetchSubcategoriesFailure = (err) => {
  return {
    type: FETCH_SUBCATEGORIES_FAILURE,
    payload: { err },
  };
};

const fetchSubcategoriesSuccess = (data) => {
  return {
    type: FETCH_SUBCATEGORIES_SUCCESS,
    payload: data,
  };
};
