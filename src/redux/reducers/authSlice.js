import { createSlice } from "@reduxjs/toolkit";

const loadAuth = () => {
  try {
    const user = localStorage.getItem("brewbean_user");
    const token = localStorage.getItem("brewbean_token");
    return { user: user ? JSON.parse(user) : null, token: token || null };
  } catch {
    return { user: null, token: null };
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...loadAuth(),
    isLoading: false,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.error = null;
      localStorage.setItem("brewbean_user", JSON.stringify(user));
      localStorage.setItem("brewbean_token", accessToken);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("brewbean_user");
      localStorage.removeItem("brewbean_token");
      localStorage.removeItem("brewbean_refresh_token");
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, logout, setError } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => !!state.auth.token;

export default authSlice.reducer;
