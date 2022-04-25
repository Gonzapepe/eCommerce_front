import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const REGISTER_URL = "http://localhost:4000/v1/auth/register";

export const postRegister = createAsyncThunk(
  "register/postRegister",
  async (initialRegister) => {
    try {
      // aca van los datos que se mandan al postman
      // const { name, surname, email, password, confirmPassword, phone } = initialRegister
      const response = await axios.post(REGISTER_URL, initialRegister);
      console.log("RESPUESTA DEL REGISTER: ", response.data);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

const registerSlice = createSlice({
  name: "register",

  initialState: {
    userCreated: null,
    isLoading: false,
    errors: [],
  },
  extraReducers: {
    [postRegister.pending]: (state) => {
      state.isLoading = true;
    },
    [postRegister.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload.response?.data) {
        state.errors = action.payload.response.data;
      } else {
        state.userCreated = action.payload;
      }
    },
    [postRegister.rejected]: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

export default registerSlice.reducer;
