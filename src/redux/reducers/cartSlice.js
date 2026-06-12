import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("brewbean_cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem("brewbean_cart", JSON.stringify(items));
  } catch {}
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromStorage(),
  },
  reducers: {
    addItem: (state, action) => {
      const incoming = action.payload;
      const existing = state.cartItems.find((item) => item.id === incoming.id);
      if (existing) {
        existing.quantity += incoming.quantity ?? 1;
      } else {
        state.cartItems.push({ ...incoming, quantity: incoming.quantity ?? 1 });
      }
      saveCartToStorage(state.cartItems);
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.cartItems);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
        saveCartToStorage(state.cartItems);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveCartToStorage([]);
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotal = (state) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartCount = (state) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
