import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:4000/v1/products";
const CART_URL = "http://localhost:4000/v1/cart";

// const selectCart = (state) => state;
// export const selectCartItems = createSelector([selectCart], (cart) => cart);

export const getCart = createAsyncThunk("cart/getCart", async (token) => {
  try {
    const response = await axios.get(CART_URL, {
      headers: { Authorization: token },
    });
    return response.data.data;
  } catch (err) {
    console.log("ERROR GET CART: ", err);
    return err;
  }
});

export const addItem = createAsyncThunk(
  "cart/addItem",
  async ({ token, quantity, id }) => {
    try {
      const response = await axios.post(
        `${URL}/${id}`,
        { quantity: Number(quantity) },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("ERROR ADDITEM: ", err);
      return err;
    }
  }
);

export const deleteItem = createAsyncThunk(
  "cart/deleteItem",
  async ({ token, id }) => {
    try {
      const response = await axios.delete(`${CART_URL}/${id}`, {
        headers: { Authorization: token },
      });
      console.log("RESPUESTA DE DELETE ITEM: ", response);
      return response.data;
    } catch (err) {
      console.log(err);
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
  },
  extraReducers: {
    [addItem.pending]: (state) => {
      state.isLoading = true;
    },
    [addItem.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload?.response?.data.errorMessage) {
        state.errors = action.payload.response?.data.errorMessage;
      } else {
        console.log("CARTITEMS: ", action.payload);
        state.cartItems = action.payload;
      }
    },
    [addItem.rejected]: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    [getCart.pending]: (state) => {
      state.isLoading = true;
    },
    [getCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload.cartItems;
    },
    [getCart.rejected]: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    [deleteItem.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteItem.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("ACTION PAYLOAD DE DELETEITEM: ", action.payload);
      state.cartItems.filter((item) => item.id !== action.payload.data.id);
    },
    [deleteItem.rejected]: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

export const { toggleCartHidden } = cartSlice.actions;
export default cartSlice.reducer;
