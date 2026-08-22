import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { logout, selectCurrentUser, selectCurrentToken } from "../../redux/reducers/authSlice";
import { useLogoutMutation } from "../../redux/services/authApi";
import { useGetOrdersQuery } from "../../redux/services/orderApi";
import { downloadInvoicePdf } from "../../utils/downloadInvoice";

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-purple-100 text-purple-800",
  ready: "bg-teal-100 text-teal-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const [logoutApi] = useLogoutMutation();
  const { data, isLoading } = useGetOrdersQuery();
  const [downloadingId, setDownloadingId] = useState(null);

  const orders = data?.data?.orders ?? [];

  const handleDownloadInvoice = async (orderId) => {
    setDownloadingId(orderId);
    try {
      await downloadInvoicePdf({ orderId, token });
    } catch (err) {
      toast.error(err.message || "Couldn't download invoice");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("brewbean_refresh_token");
      if (refreshToken) await logoutApi({ refreshToken }).unwrap();
    } catch {
      // Even if the API call fails, clear local state
    } finally {
      dispatch(logout());
      toast.success("Signed out. See you soon!");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-[#1a0f0b] pt-28 pb-16 px-4 transition-colors duration-500">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile card */}
        <motion.div
          className="card-coffee p-6 flex flex-col sm:flex-row items-center gap-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-20 h-20 rounded-full bg-caramel-gradient flex items-center justify-center text-3xl font-serif font-bold text-brand-espresso shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() || "☕"}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-serif font-bold text-brand-espresso dark:text-brand-foam">
              {user?.name}
            </h1>
            <p className="text-brand-medium dark:text-brand-latte/80 text-sm">{user?.email}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-brand-espresso/10 dark:bg-brand-caramel/15 text-brand-espresso dark:text-brand-caramel rounded-full">
                {user?.role || "customer"}
              </span>
              {["staff", "admin"].includes(user?.role) && (
                <Link
                  to="/admin"
                  className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-brand-espresso text-white dark:bg-brand-caramel dark:text-brand-espresso rounded-full hover:opacity-80 transition-opacity"
                >
                  Admin Panel →
                </Link>
              )}
            </div>
          </div>
          <motion.button
            onClick={handleLogout}
            className="px-5 py-2.5 border-2 border-brand-warm text-brand-warm hover:bg-brand-warm hover:text-white rounded-xl font-semibold text-sm transition-colors"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Sign Out
          </motion.button>
        </motion.div>

        {/* Order history */}
        <motion.div
          className="card-coffee p-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-lg font-serif font-bold text-brand-espresso dark:text-brand-foam mb-4">
            Order History
          </h2>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="skeleton-coffee h-20" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">☕</div>
              <p className="text-brand-medium dark:text-brand-latte/80">No orders yet.</p>
              <button
                onClick={() => navigate("/eshop")}
                className="mt-4 px-6 py-2.5 bg-brand-espresso dark:bg-brand-caramel text-white dark:text-brand-espresso rounded-xl font-semibold text-sm"
              >
                Start Your First Order
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-brand-latte/50 dark:border-white/10 rounded-xl p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-brand-espresso dark:text-brand-foam">
                      Order #{order.id}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 text-[11px] font-bold uppercase rounded-full ${
                        STATUS_STYLES[order.status] || STATUS_STYLES.pending
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-brand-medium dark:text-brand-latte/80 space-y-0.5">
                    {(order.items || [])
                      .filter(Boolean)
                      .map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>
                            {item.product_name} × {item.quantity}
                          </span>
                          <span>₹{parseFloat(item.subtotal ?? item.unit_price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-brand-latte/40 dark:border-white/10 text-sm">
                    <span className="text-brand-medium dark:text-brand-latte/70">
                      {new Date(order.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      {order.payment_method ? ` · ${order.payment_method.toUpperCase()}` : ""}
                    </span>
                    <span className="font-bold text-brand-espresso dark:text-brand-caramel">
                      ₹{parseFloat(order.total_amount).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDownloadInvoice(order.id)}
                    disabled={downloadingId === order.id}
                    className="mt-3 w-full py-2 text-xs font-semibold rounded-lg border border-brand-espresso/30 dark:border-brand-caramel/30 text-brand-espresso dark:text-brand-caramel hover:bg-brand-espresso/5 dark:hover:bg-brand-caramel/10 transition-colors disabled:opacity-50"
                  >
                    {downloadingId === order.id ? "Preparing…" : "Download Invoice"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
