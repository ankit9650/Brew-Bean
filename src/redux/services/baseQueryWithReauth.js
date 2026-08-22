import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../reducers/authSlice";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const rawBaseQuery = (subPath) =>
  fetchBaseQuery({
    baseUrl: `${API_URL}/api/v1${subPath}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  });

// De-dupes concurrent 401s across queries so only one refresh request fires.
let refreshPromise = null;

// Wraps fetchBaseQuery so an expired access token is silently refreshed
// (using the stored refresh token) and the original request retried once.
// If the refresh token itself is invalid/expired, the user is logged out.
export const createBaseQueryWithReauth = (subPath = "") => {
  const baseQuery = rawBaseQuery(subPath);

  return async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
      if (!refreshPromise) {
        const refreshToken = localStorage.getItem("brewbean_refresh_token");
        refreshPromise = refreshToken
          ? rawBaseQuery("/auth")(
              { url: "/refresh", method: "POST", body: { refreshToken } },
              api,
              extraOptions
            )
          : Promise.resolve({ error: { status: 401, data: { message: "No refresh token" } } });
      }

      const refreshResult = await refreshPromise;
      refreshPromise = null;

      const newAccessToken = refreshResult.data?.data?.accessToken;
      if (newAccessToken) {
        const newRefreshToken = refreshResult.data.data.refreshToken;
        const currentUser = api.getState().auth?.user;
        api.dispatch(setCredentials({ user: currentUser, accessToken: newAccessToken }));
        if (newRefreshToken) localStorage.setItem("brewbean_refresh_token", newRefreshToken);
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }

    return result;
  };
};
