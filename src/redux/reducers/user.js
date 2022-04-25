import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const URL = "http://localhost:4000/v1/users/self/data";

export const getUserData = createAsyncThunk("user/userData", async (token) => {
  try {
    console.log("TOKEN TIPO: ", token);
    const response = await axios.get(URL, {
      headers: { Authorization: token },
    });
    return response.data.data;
  } catch (err) {
    console.log("ERROR: ", err);
    return err;
  }
});

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
        state.data = action.payload;
      }
    },
    [getUserData.rejected]: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
