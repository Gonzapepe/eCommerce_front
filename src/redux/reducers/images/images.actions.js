import { IMAGES_DELETE_FAILURE, IMAGES_DELETE_SUCCESS } from "./images.types";
import axios from "axios";

export const deleteImage = (productId, imgId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `http://localhost:4000/v1/products/${productId}/deleteimage/${imgId}`,
      {
        headers: { Authorization: token },
      }
    );

    console.log("RESPUESTA DEL DELETE IMAGE: ", response.data);
    dispatch(deleteImageSuccess(response.data.data));
  } catch (err) {
    console.log("ERROR RESPONSE: ", err.response);
    console.log("ERROR MESSAGE", err.message);
    console.log("ERROR REQUEST: ", err.request);
    dispatch(deleteImageFailure(err));
  }
};

// Remove image types
const deleteImageFailure = (error) => {
  return {
    type: IMAGES_DELETE_FAILURE,
    payload: {
      error,
    },
  };
};

const deleteImageSuccess = (data) => {
  return {
    type: IMAGES_DELETE_SUCCESS,
    payload: data,
  };
};
