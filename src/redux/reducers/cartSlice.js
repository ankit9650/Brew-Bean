import { createSlice } from "@reduxjs/toolkit";
import { setCredentials, logout } from "./authSlice";

// Cart is namespaced per-user so a different account signing in on the same
// browser never inherits (or overwrites) someone else's cart.
const storageKey = (owner) => `brewbean_cart_${owner}`;

const initialOwner = () => {
  try {
    const user = localStorage.getItem("brewbean_user");
    const parsed = user ? JSON.parse(user) : null;
    return parsed?.id ? `user_${parsed.id}` : "guest";
  } catch {
    return "guest";
  }
};

const loadCart = (owner) => {
  try {
    const data = localStorage.getItem(storageKey(owner));
    const items = data ? JSON.parse(data) : [];
    // Self-heal carts saved before the storefront was wired to real product
    // IDs — any leftover entries with a non-numeric (slug-based) id are from
    // a product that no longer maps to anything real and can't be ordered.
    return items.filter((item) => Number.isFinite(item.id));
  } catch {
    return [];
  }
};

const saveCart = (owner, items) => {
  try {
    localStorage.setItem(storageKey(owner), JSON.stringify(items));
  } catch {}
};

const startOwner = initialOwner();

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    ownerKey: startOwner,
    cartItems: loadCart(startOwner),
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
      saveCart(state.ownerKey, state.cartItems);
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      saveCart(state.ownerKey, state.cartItems);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart(state.ownerKey, state.cartItems);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveCart(state.ownerKey, []);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCredentials, (state, action) => {
        const userId = action.payload?.user?.id;
        const newOwner = userId ? `user_${userId}` : "guest";
        if (newOwner === state.ownerKey) return; // e.g. a silent token refresh — same user, no-op

        // Fold any items added while browsing as a guest into the identified user's cart.
        const guestItems = state.ownerKey === "guest" ? state.cartItems : loadCart("guest");
        const merged = loadCart(newOwner);
        for (const item of guestItems) {
          const existing = merged.find((m) => m.id === item.id);
          if (existing) existing.quantity += item.quantity;
          else merged.push(item);
        }
        if (guestItems.length) saveCart("guest", []);

        state.ownerKey = newOwner;
        state.cartItems = merged;
        saveCart(newOwner, merged);
      })
      .addCase(logout, (state) => {
        state.ownerKey = "guest";
        state.cartItems = loadCart("guest");
      });
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotal = (state) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartCount = (state) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
