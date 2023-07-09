import {
  FETCH_SUBCATEGORIES_SUCCESS,
  FETCH_SUBCATEGORIES_FAILURE,
  FETCH_SUBCATEGORIES_STARTED,
} from "./subcategories.types";
import axios from "axios";

export const fetchSubcategories = (query) => async (dispatch) => {
  dispatch(fetchSubcategoriesStarted());
  console.log("QUERY: ", query);
  try {
    if (query === undefined) {
      const response = await axios.get(
        "http://localhost:4000/v1/subcategory?page=1"
      );
      console.log("RESPUESTA FETCH SUBCATEGORIES: ", response.data.data);
      dispatch(fetchSubcategoriesSuccess(response.data.data));
    } else {
      const response = await axios.get(
        `http://localhost:4000/v1/subcategory${query}`
      );
      console.log("RESPUESTA FETCH SUBCATEGORIES: ", response.data.data);
      dispatch(fetchSubcategoriesSuccess(response.data.data));
    }
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
