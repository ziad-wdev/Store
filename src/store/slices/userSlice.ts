import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../apis/productsApi";

interface CartItem {
  product: Product;
  quantity: number;
}

interface UserState {
  likes: Product[];
  cart: CartItem[];
}

const initialState: UserState = {
  likes: [],
  cart: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addLike: (state, action) => {
      state.likes.push(action.payload);
    },
    removeLike: (state, action) => {
      state.likes = state.likes.filter((product) => product.id !== action.payload);
    },
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const item = state.cart.find((item) => item.product.id === product.id);
      if (item) {
        item.quantity += quantity;
      } else {
        state.cart.push({ product, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cart.find((item) => item.product.id === productId);
      if (item) {
        if (item.quantity > quantity) {
          item.quantity -= quantity;
        } else {
          state.cart = state.cart.filter((item) => item.product.id !== productId);
        }
      }
    },
  },
});

export const { addLike, removeLike, addToCart, removeFromCart } = userSlice.actions;
export default userSlice.reducer;
