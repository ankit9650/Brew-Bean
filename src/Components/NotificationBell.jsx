import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  selectNotifications,
  selectUnreadCount,
  markRead,
  markAllRead,
  clearAll,
} from "../redux/reducers/notificationSlice";

// ── Icons ─────────────────────────────────────────────────────────────────────

const TYPE_ICON = {
  order_status: {
    confirmed: "✅",
    preparing: "☕",
    ready:     "🎉",
    delivered: "📦",
    cancelled: "❌",
  },
  new_order:   "🛍️",
  new_message: "✉️",
};

function getIcon(n) {
  if (n.type === "order_status") return TYPE_ICON.order_status[n.status] ?? "🔔";
  return TYPE_ICON[n.type] ?? "🔔";
}

// ── Time formatting ───────────────────────────────────────────────────────────

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ── Bell SVG ──────────────────────────────────────────────────────────────────

function BellIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

// ── Single notification row ───────────────────────────────────────────────────

function NotifItem({ n, onRead }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      onClick={onRead}
      className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-brand-cream/60 dark:hover:bg-white/5 border-b border-brand-latte/20 dark:border-white/5 last:border-0 ${
        n.read ? "opacity-60" : "bg-brand-caramel/5 dark:bg-brand-caramel/8"
      }`}
    >
      <span className="text-xl mt-0.5 shrink-0 leading-none">{getIcon(n)}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className={`text-sm font-semibold truncate ${
            n.read
              ? "text-brand-medium dark:text-brand-latte/60"
              : "text-brand-espresso dark:text-brand-cream"
          }`}>
            {n.title}
          </p>
          {!n.read && (
            <span className="w-2 h-2 rounded-full bg-brand-caramel shrink-0" />
          )}
        </div>
        <p className="text-xs text-brand-medium dark:text-brand-latte/60 mt-0.5 line-clamp-2 leading-relaxed">
          {n.body}
        </p>
        <p className="text-[10px] text-brand-latte dark:text-brand-latte/40 mt-1">
          {timeAgo(n.at)}
        </p>
      </div>
    </motion.button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function NotificationBell({ iconClass = "text-brand-espresso dark:text-brand-cream" }) {
  const dispatch      = useDispatch();
  const notifications = useSelector(selectNotifications);
  const unreadCount   = useSelector(selectUnreadCount);

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Mark all read when dropdown opens
  const handleOpen = () => {
    setOpen((v) => !v);
  };

  return (
    <div ref={ref} className="relative">
      {/* Bell button */}
      <motion.button
        onClick={handleOpen}
        className="relative p-2 rounded-lg hover:bg-brand-caramel/15 transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? ` — ${unreadCount} unread` : ""}`}
        whileTap={{ scale: 0.92 }}
      >
        <motion.div
          animate={unreadCount > 0 && !open ? { rotate: [0, 15, -15, 10, -10, 5, -5, 0] } : {}}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 4 }}
        >
          <BellIcon className={`w-6 h-6 transition-colors duration-500 ${iconClass}`} />
        </motion.div>

        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              key={unreadCount}
              className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#241712] rounded-2xl shadow-coffee-xl border border-brand-latte/40 dark:border-white/10 overflow-hidden z-50"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-brand-latte/20 dark:border-white/10">
              <span className="font-bold text-sm text-brand-espresso dark:text-brand-cream">
                Notifications
              </span>
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <button
                    onClick={() => dispatch(markAllRead())}
                    className="text-xs text-brand-caramel hover:text-brand-caramel-light font-medium transition-colors"
                  >
                    Mark all read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={() => dispatch(clearAll())}
                    className="text-xs text-brand-latte dark:text-brand-latte/50 hover:text-brand-medium transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="max-h-[340px] overflow-y-auto scrollbar-hide">
              <AnimatePresence initial={false}>
                {notifications.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10 px-4"
                  >
                    <div className="text-4xl mb-2 opacity-40">🔔</div>
                    <p className="text-sm text-brand-medium dark:text-brand-latte/50">
                      No notifications yet
                    </p>
                    <p className="text-xs text-brand-latte dark:text-brand-latte/30 mt-1">
                      Order updates will appear here
                    </p>
                  </motion.div>
                ) : (
                  notifications.map((n) => (
                    <NotifItem
                      key={n.id}
                      n={n}
                      onRead={() => dispatch(markRead(n.id))}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
