import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./services/cartApi";
import { authApi } from "./services/authApi";
import { contactApi } from "./services/contactservice";
import { orderApi } from "./services/orderApi";
import { adminApi } from "./services/adminApi";
import { paymentApi } from "./services/paymentApi";
import { productApi } from "./services/productApi";
import cartReducer from "./reducers/cartSlice";
import authReducer, { logout } from "./reducers/authSlice";
import notificationReducer from "./reducers/notificationSlice";

const appReducer = combineReducers({
  [cartApi.reducerPath]: cartApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  cart: cartReducer,
  auth: authReducer,
  notifications: notificationReducer,
});

// On logout (manual sign-out or a forced logout from an expired refresh token),
// drop cached data from every *authenticated* RTK Query slice so a different
// user signing in on the same browser never sees a flash of the previous
// user's orders/admin data. The public productApi and the cart/notifications
// slices are intentionally left untouched.
const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    state = {
      ...state,
      [cartApi.reducerPath]: undefined,
      [orderApi.reducerPath]: undefined,
      [adminApi.reducerPath]: undefined,
      [paymentApi.reducerPath]: undefined,
    };
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cartApi.middleware,
      authApi.middleware,
      contactApi.middleware,
      orderApi.middleware,
      adminApi.middleware,
      paymentApi.middleware,
      productApi.middleware
    ),
});

export default store;
