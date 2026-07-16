import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    },

    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount = calculateTotal(state.items);
    },

    removeFromCart: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalAmount = calculateTotal(state.items);
    },

    // 🌟 ADDED BACK: This handles the plus/minus buttons on your Cart Page
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string | number; quantity: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
      state.totalAmount = calculateTotal(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

// 🌟 Added updateQuantity to the exports list here
export const {
  hydrateCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
