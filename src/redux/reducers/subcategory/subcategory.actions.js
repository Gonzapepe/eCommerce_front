import {
  ADD_SUBCATEGORY_FAILURE,
  ADD_SUBCATEGORY_SUCCESS,
} from "./subcategory.types";

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
