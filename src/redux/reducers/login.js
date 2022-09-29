// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import Cookies from "js-cookie";

// const LOGIN_URL = "http://localhost:4000/v1/auth/login";

// export const postLogin = createAsyncThunk(
//   "login/postLogin",
//   async (initialLogin) => {
//     try {
//       const { email, password } = initialLogin;
//       const response = await axios.post(LOGIN_URL, { email, password });
//       console.log("RESPUESTA: ", response);
//       return response.data;
//     } catch (err) {
//       console.log("ERROR: ", err);
//       return err;
//     }
//   }
// );

// const loginSlice = createSlice({
//   name: "login",

//   initialState: {
//     token: null,
//     isLoading: false,
//     errors: [],
//   },
//   reducers: {
//     setToken(state, action) {
//       if (state.token === null) {
//         state.token = action.payload;
//       }
//     },
//   },
//   extraReducers: {
//     [postLogin.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [postLogin.fulfilled]: (state, action) => {
//       state.isLoading = false;
//       if (action.payload.response?.data) {
//         state.errors = action.payload.response.data;
//       } else if (action.payload.response?.data.errors) {
//         state.errors = action.payload.response.data;
//       } else {
//         state.token = action.payload.data.token;
//         Cookies.set("user", "loggedIn");
//         Cookies.set("token", state.token);
//       }
//     },
//     [postLogin.rejected]: (state, action) => {
//       state.isLoading = false;
//       state.errors = action.payload;
//     },
//   },
// });

// export const { setToken } = loginSlice.actions;
// export default loginSlice.reducer;
