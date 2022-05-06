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
      console.log("FULFILLED");
      state.isLoading = false;
      state.cartItems = action.payload.cartItems;
    },
    [getCart.rejected]: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

export const { toggleCartHidden } = cartSlice.actions;
export default cartSlice.reducer;
