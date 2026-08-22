import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCurrentToken } from "../redux/reducers/authSlice";
import { downloadInvoicePdf } from "../utils/downloadInvoice";
import logo from "../../public/assets/logo.png";

// Torn-paper edge, no image assets needed.
const TORN_EDGE = {
  backgroundImage:
    "linear-gradient(135deg, transparent 8px, white 0), linear-gradient(-135deg, transparent 8px, white 0)",
  backgroundSize: "16px 16px",
  backgroundPosition: "top",
  backgroundRepeat: "repeat-x",
};

function ReceiptModal({ order, invoice, items, onClose }) {
  const token = useSelector(selectCurrentToken);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadInvoicePdf({ orderId: order.id, token, filename: `${invoice.invoice_number}.pdf` });
    } catch (err) {
      toast.error(err.message || "Couldn't download the bill");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
        >
          {/* Success banner */}
          <div className="bg-gradient-to-br from-brand-espresso to-[#2a1a10] px-6 pt-8 pb-10 text-center text-white flex-none">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
              className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-500 flex items-center justify-center"
            >
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h2 className="text-lg font-bold font-serif">Order Confirmed!</h2>
            <p className="text-white/70 text-xs mt-1">
              Order #{order.id} · {order.status}
            </p>
          </div>

          {/* Receipt body */}
          <div className="relative -mt-5 bg-white pt-6 px-6 pb-2 overflow-y-auto flex-1" style={TORN_EDGE}>
            <div className="flex flex-col items-center mb-4">
              <img src={logo} alt="Brew & Bean" className="h-10 mb-1 object-contain" />
              <span className="font-serif font-bold text-brand-espresso text-sm">Brew &amp; Bean</span>
              <span className="text-[10px] text-brand-medium mt-1">{invoice.invoice_number}</span>
              <span className="text-[10px] text-brand-medium">
                {new Date(invoice.created_at).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="border-t border-dashed border-brand-cream my-3" />

            <div className="space-y-1.5 font-mono text-xs text-brand-dark">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-2">
                  <span className="truncate">
                    {item.title} <span className="text-brand-medium">×{item.quantity}</span>
                  </span>
                  <span className="flex-none">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-brand-cream my-3" />

            <div className="space-y-1 font-mono text-xs text-brand-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{parseFloat(invoice.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({parseFloat(invoice.tax_rate).toFixed(0)}%)</span>
                <span>₹{parseFloat(invoice.tax_amount).toFixed(2)}</span>
              </div>
              {parseFloat(invoice.discount_amount) > 0 && (
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>−₹{parseFloat(invoice.discount_amount).toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="border-t border-brand-dark/20 my-3" />

            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-brand-dark text-sm">Total Paid</span>
              <span className="font-bold text-xl text-brand-warm">₹{parseFloat(invoice.total_amount).toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-brand-medium uppercase tracking-wide mb-3">
              {order.payment_method === "cod" ? "Cash on Delivery" : "Paid via Razorpay"}
            </p>

            <div className="border-t border-dashed border-brand-cream mb-4" />

            <p className="text-center text-[11px] text-brand-medium italic pb-2">
              Thank you for choosing Brew &amp; Bean! ☕
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 p-5 pt-4 bg-white border-t border-brand-cream flex-none">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-brand-cream text-brand-medium font-semibold text-sm hover:bg-brand-light transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 py-3 rounded-xl bg-brand-dark hover:bg-brand-espresso text-white font-semibold text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {downloading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                "Download Bill"
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ReceiptModal;
