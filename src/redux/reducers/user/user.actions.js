import {
  USER_LOADING,
  USER_LOADED,
  LOGOUT_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "./user.types";
import axios from "axios";

// Cargar usuario
export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({ type: USER_LOADING });
    const response = await axios.get(
      "http://localhost:4000/v1/users/self/data",
      { headers: { Authorization: token } }
    );
    console.log("RESPUESTA DEL LOAD USER: ", response.data.data);
    dispatch(userLoadedSuccess(response.data.data));
  } catch (err) {
    console.log("ERROR DEL LOAD USER", err);
  }
};

// login y logout, autenticacion
export const login = (user) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/v1/auth/login",
      user
    );
    console.log("RESPUESTA: ", response);
    let token = response.data.data.token;
    dispatch(loginUserSuccess(token));
    return response.data.data;
  } catch (err) {
    console.log("ERROR:", err);
    dispatch(loginUserFailure(err));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER_SUCCESS });
};

// Editar datos del usuario
export const editUser = (id, userData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.patch(
      `http://localhost:4000/v1/users/edit/${id}`,
      userData,
      { headers: { Authorization: token } }
    );
    console.log("RESPUESTA EDIT USER: ", response.data.data);
    dispatch(updateUserSuccess(response.data.data));
    return response.data.data;
  } catch (err) {
    console.log("ERROR DEL EDIT USER: ", err);
    dispatch(updateUserFailure(err));
  }
};

// Funciones para mandar los tipos a los reducer
// Update user
const updateUserSuccess = (data) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: data,
  };
};

const updateUserFailure = (error) => {
  return {
    type: UPDATE_USER_FAILURE,
    payload: {
      error,
    },
  };
};

// Load user
const userLoadedSuccess = (data) => {
  return {
    type: USER_LOADED,
    payload: data,
  };
};

const loginUserSuccess = (token) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token,
    },
  };
};

const loginUserFailure = (error) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      error,
    },
  };
};
