import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./services/cartApi";
import cartReducer from "./reducers/cartSlice";

export const store = configureStore({
  reducer: {
    [cartApi.reducerPath]: cartApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartApi.middleware),
});

export default store;
