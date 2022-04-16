import { useContext } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const LOGIN_URL = "http://localhost:4000/v1/auth/login";

export const postLogin = createAsyncThunk(
  "user/postLogin",
  async (initialLogin) => {
    try {
      const { email, password } = initialLogin;
      const response = await axios.post(LOGIN_URL, { email, password });
      return response.data.data;
    } catch (err) {
      console.log("ERROR: ", err);
      return err;
    }
  }
);

export const postRegister = createAsyncThunk(
  "user/postRegister",
  async (initialRegister) => {
    try {
      // aca van los datos que se mandan al postman
      // const {  }
    } catch (err) {
      return err;
    }
  }
);

const userSlice = createSlice({
  name: "user",

  initialState: {
    token: null,
    isLoading: false,
    errors: [],
  },
  extraReducers: {
    [postLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [postLogin.fulfilled]: (state, action) => {
      console.log("PAYLOAD: ", action.payload);
      if (action.payload.token) {
        state.isLoading = false;
        state.token = action.payload.token;
        Cookies.set("user", "loggedIn");
        Cookies.set("token", state.token);
      } else {
        state.isLoading = false;
        state.errors = action.payload.response.data.errors;
      }
    },
    [postLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

export default userSlice.reducer;
