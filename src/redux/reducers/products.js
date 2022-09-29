// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const getProduct = createAsyncThunk(
//   "product/getProduct",
//   async ({ id }) => {
//     return fetch(`http://localhost:4000/v1/products/${id}`).then((res) =>
//       res.json()
//     );
//   }
// );

// const productsSlice = createSlice({
//   name: "product",
//   initialState: {
//     product: {},
//     isLoading: false,
//     errors: [],
//   },
//   extraReducers: {
//     [getProduct.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [getProduct.fulfilled]: (state, action) => {
//       state.product = action.payload;
//       state.isLoading = false;
//     },
//     [getProduct.rejected]: (state, action) => {
//       state.errors = action.payload;
//       state.isLoading = false;
//     },
//   },
// });

// export default productsSlice.reducer;
