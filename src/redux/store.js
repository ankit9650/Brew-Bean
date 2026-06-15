import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./services/cartApi";
import { authApi } from "./services/authApi";
import { contactApi } from "./services/contactservice";
import { orderApi } from "./services/orderApi";
import { adminApi } from "./services/adminApi";
import cartReducer from "./reducers/cartSlice";
import authReducer from "./reducers/authSlice";
import notificationReducer from "./reducers/notificationSlice";

export const store = configureStore({
  reducer: {
    [cartApi.reducerPath]: cartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    cart: cartReducer,
    auth: authReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cartApi.middleware,
      authApi.middleware,
      contactApi.middleware,
      orderApi.middleware,
      adminApi.middleware
    ),
});

export default store;
