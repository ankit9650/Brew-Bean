import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "brewbean_notifications";

const load = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
};

const persist = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { items: load() },
  reducers: {
    addNotification: (state, { payload }) => {
      if (state.items.find((n) => n.id === payload.id)) return;
      state.items = [payload, ...state.items].slice(0, 50);
      persist(state.items);
    },
    markRead: (state, { payload: id }) => {
      const n = state.items.find((n) => n.id === id);
      if (n) { n.read = true; persist(state.items); }
    },
    markAllRead: (state) => {
      state.items.forEach((n) => (n.read = true));
      persist(state.items);
    },
    clearAll: (state) => {
      state.items = [];
      persist(state.items);
    },
  },
});

export const { addNotification, markRead, markAllRead, clearAll } = notificationSlice.actions;

export const selectNotifications = (state) => state.notifications.items;
export const selectUnreadCount   = (state) => state.notifications.items.filter((n) => !n.read).length;

export default notificationSlice.reducer;
