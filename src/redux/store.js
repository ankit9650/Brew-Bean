import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./services/cartApi";
import { authApi } from "./services/authApi";
import { contactApi } from "./services/contactservice";
import { orderApi } from "./services/orderApi";
import cartReducer from "./reducers/cartSlice";
import authReducer from "./reducers/authSlice";

export const store = configureStore({
  reducer: {
    [cartApi.reducerPath]: cartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cartApi.middleware,
      authApi.middleware,
      contactApi.middleware,
      orderApi.middleware
    ),
});

export default store;
