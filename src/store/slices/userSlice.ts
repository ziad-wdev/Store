import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  quantity: number;
}

interface UserState {
  likes: string[];
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
      state.likes = state.likes.filter((id) => id !== action.payload);
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addLike, removeLike, addToCart, removeFromCart, updateCartItemQuantity } = userSlice.actions;
export default userSlice.reducer;
