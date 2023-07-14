import {
  FETCH_USERS_STARTED,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from "./users.types";
import axios from "axios";

export const fetchUsers = (query) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(fetchUsersStarted());
  console.log("QUERY: ", query);

  try {
    if (query === undefined) {
      const response = await axios.get(
        "http://localhost:4000/v1/users?page=1",
        { headers: { Authorization: token } }
      );
      console.log("RESPUESTA DE FETCH USERS: ", response.data.data);
      dispatch(fetchUsersSuccess(response.data.data));
    } else {
      const response = await axios.get(
        `http://localhost:4000/v1/users${query}`,
        { headers: { Authorization: token } }
      );
      console.log("RESPUESTA DE FETCH USERS: ", response.data.data);
      dispatch(fetchUsersSuccess(response.data.data));
    }
  } catch (err) {
    dispatch(fetchUsersFailure(err));
  }
};

const fetchUsersStarted = () => {
  return {
    type: FETCH_USERS_STARTED,
  };
};

const fetchUsersFailure = (err) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: { err },
  };
};

const fetchUsersSuccess = (data) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: data,
  };
};
