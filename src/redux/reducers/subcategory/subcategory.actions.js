import {
  ADD_SUBCATEGORY_FAILURE,
  ADD_SUBCATEGORY_SUCCESS,
  FETCH_SUBCATEGORY_FAILURE,
  FETCH_SUBCATEGORY_STARTED,
  FETCH_SUBCATEGORY_SUCCESS,
  UPDATE_SUBCATEGORY_FAILURE,
  UPDATE_SUBCATEGORY_SUCCESS,
} from "./subcategory.types";
import axios from "axios";

export const addSubcategory = (subcategory) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      "http://localhost:4000/v1/subcategory/create",
      subcategory,
      { headers: { Authorization: token, "Content-Type": "application/json" } }
    );

    console.log("RESPUESTA DE ADD SUBCATEGORY: ", response.data);

    dispatch(addSubcategorySuccess(response.data));
  } catch (err) {
    console.log("ERROR REQUEST: ", err.request);
    console.log("ERROR RESPONSE: ", err.response);
    console.log("ERROR MESSAGE", err.message);
    dispatch(addSubcategoryFailure(err));
  }
};

export const fetchSubcategory = (id) => async (dispatch) => {
  dispatch(fetchSubcategoryStarted());

  try {
    const response = await axios.get(
      `http://localhost:4000/v1/subcategory/${id}`
    );
    console.log("RESPUESTA DEL FETCH SUBCATEGORY: ", response.data.data);
    dispatch(fetchSubcategorySuccess(response.data.data));
  } catch (err) {
    console.log("ERROR REQUEST: ", err.request);
    console.log("ERROR RESPONSE: ", err.response);
    console.log("ERROR MESSAGE: ", err.message);
    dispatch(fetchSubcategoryFailure(err));
  }
};

export const updateSubcategory = (subcategory) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const { id } = subcategory;
  console.log("SUBCATEGORY:", subcategory);

  try {
    const response = await axios.patch(
      `http://localhost:4000/v1/subcategory/${id}`,
      subcategory,
      { headers: { Authorization: token } }
    );
    console.log("RESPUESTA DEL UPDATE SUBCATEGORY: ", response.data);

    dispatch(updateSubcategorySuccess(response.data));
  } catch (err) {
    console.log("ERROR REQUEST: ", err.request);
    console.log("ERROR RESPONSE: ", err.response);
    console.log("ERROR MESSAGE: ", err.message);
    dispatch(updateSubcategoryFailure(err));
  }
};

const updateSubcategorySuccess = (data) => {
  return {
    type: UPDATE_SUBCATEGORY_SUCCESS,
    payload: data,
  };
};

const updateSubcategoryFailure = (err) => {
  return {
    type: UPDATE_SUBCATEGORY_FAILURE,
    payload: { err },
  };
};

const fetchSubcategoryStarted = () => {
  return {
    type: FETCH_SUBCATEGORY_STARTED,
  };
};

const fetchSubcategoryFailure = (err) => {
  return {
    type: FETCH_SUBCATEGORY_FAILURE,
    payload: {
      err,
    },
  };
};

const fetchSubcategorySuccess = (data) => {
  return {
    type: FETCH_SUBCATEGORY_SUCCESS,
    payload: data,
  };
};

const addSubcategorySuccess = (data) => {
  return {
    type: ADD_SUBCATEGORY_SUCCESS,
    payload: data,
  };
};

const addSubcategoryFailure = (err) => {
  return {
    type: ADD_SUBCATEGORY_FAILURE,
    payload: { err },
  };
};
