import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const LOGIN_URL = "http://localhost:4000/v1/auth/login";

export const postLogin = createAsyncThunk(
  "login/postLogin",
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

const loginSlice = createSlice({
  name: "login",

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
      console.log("PAYLOAD: ", action.payload.response.data);
      state.isLoading = false;
      if (action.payload.response.data.errorsValidation) {
        state.errors = action.payload.response.data.errorsValidation;
      } else if (action.payload.response.data.errors) {
        state.errors = action.payload.response.data.errors;
      } else {
        state.token = action.payload.token;
        Cookies.set("user", "loggedIn");
        Cookies.set("token", state.token);
      }
    },
    [postLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

export default loginSlice.reducer;
