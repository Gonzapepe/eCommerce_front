import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const URL = "http://localhost:4000/v1/users";

export const getUserData = createAsyncThunk("user/userData", async () => {
  try {
    const token = Cookies.get("tokem");
    console.log("TOKEN DEL USER DATA: ", token);
    const response = await axios.get(`${URL}/self/data`, {
      headers: { Authorization: token },
    });
    return response.data.data;
  } catch (err) {
    console.log("ERROR: ", err);
    return err;
  }
});

export const editUserData = createAsyncThunk(
  "user/editUserData",
  async ({ id, userData, token }) => {
    console.log("ID: ", id);
    console.log("USERDATA: ", userData);
    console.log("TOKEN: ", token);
    try {
      const response = await axios.patch(`${URL}/edit/${id}`, userData, {
        headers: { Authorization: token },
      });
      console.log("RESPUESTA DE EDITAR: ", response.data);
      return response.data.data;
    } catch (err) {
      console.log("ERROR: ", err);
      return err;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    isLoading: false,
    errors: [],
  },
  extraReducers: {
    [getUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserData.fulfilled]: (state, action) => {
      console.log("PAYLOAD: ", action.payload.response?.data);
      state.isLoading = false;
      if (action.payload.response?.data.errorMessage) {
        state.errors = action.payload.response?.data.errorMessage;
      } else {
        state.errors = [];
        state.data = action.payload;
      }
    },
    [getUserData.rejected]: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    [editUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [editUserData.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload.response?.data.errorMessage) {
        console.log("PAYLOAD: ", action.payload.response?.data);
        state.errors = action.payload.response?.data.errorMessage;
      } else {
        state.data = action.payload;
      }
    },
    [editUserData.rejected]: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
