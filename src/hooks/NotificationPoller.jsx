import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, selectIsAuthenticated } from "../redux/reducers/authSlice";
import { addNotification } from "../redux/reducers/notificationSlice";
import { useGetOrdersQuery } from "../redux/services/orderApi";
import { useGetAllOrdersQuery, useGetContactsQuery } from "../redux/services/adminApi";

const ORDER_STATUS_CACHE = "brewbean_order_status_cache";
const LAST_ORDER_ID_KEY  = "brewbean_last_order_id";
const LAST_MSG_COUNT_KEY = "brewbean_last_msg_count";

const STATUS_COPY = {
  confirmed: { title: "Order Confirmed ✓",   body: (id) => `Your order #${id} is confirmed and on its way to prep.` },
  preparing: { title: "Being Prepared ☕",    body: (id) => `Your order #${id} is being prepared right now.` },
  ready:     { title: "Ready for Pickup! 🎉", body: (id) => `Your order #${id} is ready — come collect it!` },
  delivered: { title: "Order Delivered 📦",   body: (id) => `Your order #${id} has been delivered. Enjoy!` },
  cancelled: { title: "Order Cancelled",      body: (id) => `Your order #${id} has been cancelled.` },
};

// ── Customer poller ───────────────────────────────────────────────────────────

function CustomerPoller() {
  const dispatch = useDispatch();
  const firstRun = useRef(true);
  const { data }  = useGetOrdersQuery(undefined, { pollingInterval: 30_000 });

  useEffect(() => {
    const orders = data?.data?.orders ?? [];
    if (orders.length === 0) return;

    const cache = JSON.parse(localStorage.getItem(ORDER_STATUS_CACHE) || "{}");

    if (firstRun.current) {
      firstRun.current = false;
      orders.forEach((o) => { cache[o.id] = o.status; });
      localStorage.setItem(ORDER_STATUS_CACHE, JSON.stringify(cache));
      return;
    }

    let dirty = false;
    orders.forEach((o) => {
      const prev = cache[o.id];
      if (prev && prev !== o.status && STATUS_COPY[o.status]) {
        dispatch(addNotification({
          id:    `order_${o.id}_${o.status}`,
          type:  "order_status",
          status: o.status,
          title: STATUS_COPY[o.status].title,
          body:  STATUS_COPY[o.status].body(o.id),
          read:  false,
          at:    new Date().toISOString(),
        }));
      }
      cache[o.id] = o.status;
      dirty = true;
    });
    if (dirty) localStorage.setItem(ORDER_STATUS_CACHE, JSON.stringify(cache));
  }, [data, dispatch]);

  return null;
}

// ── Admin poller ──────────────────────────────────────────────────────────────

function AdminPoller() {
  const dispatch      = useDispatch();
  const firstOrder    = useRef(true);
  const firstMsg      = useRef(true);

  const { data: ordersData }   = useGetAllOrdersQuery({ limit: 50 }, { pollingInterval: 30_000 });
  const { data: contactsData } = useGetContactsQuery({ unread: true, limit: 1 }, { pollingInterval: 60_000 });

  // New orders
  useEffect(() => {
    const orders = ordersData?.data ?? [];
    if (orders.length === 0) return;

    const lastId = parseInt(localStorage.getItem(LAST_ORDER_ID_KEY) || "0", 10);
    const maxId  = Math.max(...orders.map((o) => o.id));

    if (firstOrder.current) {
      firstOrder.current = false;
      localStorage.setItem(LAST_ORDER_ID_KEY, maxId.toString());
      return;
    }

    orders
      .filter((o) => o.id > lastId)
      .forEach((o) => {
        dispatch(addNotification({
          id:    `new_order_${o.id}`,
          type:  "new_order",
          title: `New Order #${o.id} 🛍️`,
          body:  `${o.customer_name || "A customer"} placed an order — ₹${parseFloat(o.total_amount).toFixed(0)}`,
          read:  false,
          at:    new Date().toISOString(),
        }));
      });

    if (maxId > lastId) localStorage.setItem(LAST_ORDER_ID_KEY, maxId.toString());
  }, [ordersData, dispatch]);

  // New contact messages
  useEffect(() => {
    const count = contactsData?.data?.total ?? 0;
    const prev  = parseInt(localStorage.getItem(LAST_MSG_COUNT_KEY) || "0", 10);

    if (firstMsg.current) {
      firstMsg.current = false;
      localStorage.setItem(LAST_MSG_COUNT_KEY, count.toString());
      return;
    }

    if (count > prev) {
      const diff = count - prev;
      dispatch(addNotification({
        id:    `new_messages_${Date.now()}`,
        type:  "new_message",
        title: `${diff} New Message${diff > 1 ? "s" : ""} ✉️`,
        body:  "You have unread contact messages in the admin panel.",
        read:  false,
        at:    new Date().toISOString(),
      }));
      localStorage.setItem(LAST_MSG_COUNT_KEY, count.toString());
    }
  }, [contactsData, dispatch]);

  return null;
}

// ── Entry point — rendered in AppWrapper ─────────────────────────────────────

export function NotificationPoller() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user            = useSelector(selectCurrentUser);

  if (!isAuthenticated) return null;
  return user?.role === "admin" ? <AdminPoller /> : <CustomerPoller />;
}
