import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

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
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.quantity += quantity;
      } else {
        state.cart.push({ id, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        if (item.quantity > quantity) {
          item.quantity -= quantity;
        } else {
          state.cart = state.cart.filter((item) => item.id !== id);
        }
      }
    },
  },
});

export const { addLike, removeLike, addToCart, removeFromCart } = userSlice.actions;
export default userSlice.reducer;
