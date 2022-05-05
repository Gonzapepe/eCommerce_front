import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL =
  "http://localhost:4000/v1/products/6eeebba5-ce2e-4c90-9695-f35db2f9bc59";

const selectCart = (state) => state.cart;
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const addItem = createAsyncThunk(
  "cart/addItem",
  async ({ token, quantity, id }) => {
    console.log("CANTIDAD: ", quantity);
    console.log("TIPO ID: ", id);
    try {
      const response = await axios.post(URL, { quantity });
      console.log("RESPUESTA ITEM AÑADIDO: ", response);
      return response.data;
    } catch (err) {
      console.log("ERROR ADDITEM: ", err);
      return err;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    hidden: true,
    cartItems: [],
    errors: null,
  },
  reducers: {
    toggleCartHidden(state) {
      state.hidden = !state.hidden;
    },
    extraReducers: {
      [addItem.pending]: (state) => {
        state.isLoading = true;
      },
      [addItem.fulfilled]: (state, action) => {
        state.isLoading = false;
        if (action.payload.response?.data.errorMessage) {
          state.errors = action.payload.response?.data.errorMessage;
        } else {
          console.log("CARTITEMS: ", action.payload);
          // state.cartItems = action.payload;
        }
      },
      [addItem.rejected]: (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      },
    },
  },
});

export const { toggleCartHidden } = cartSlice.actions;
export default cartSlice.reducer;
