import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  removeItem,
  updateQuantity,
} from "../redux/reducers/cartSlice";

function Cart({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);

  const handleCheckout = () => {
    navigate("/checkout");
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-coffee-lg w-full max-w-md max-h-[85vh] flex flex-col"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-brand-cream">
            <div>
              <h2 className="text-xl font-bold text-brand-dark">Your Cart</h2>
              <p className="text-sm text-brand-warm">{count} item{count !== 1 ? "s" : ""}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brand-cream text-brand-medium transition-colors"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">☕</div>
                <p className="text-brand-medium font-medium">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add some items to get started</p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-brand-cream hover:border-brand-latte transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    layout
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-brand-dark truncate text-sm">{item.title}</p>
                      <p className="text-brand-warm font-semibold text-sm">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        className="w-7 h-7 rounded-full border border-brand-cream hover:bg-brand-cream text-brand-medium transition-colors flex items-center justify-center text-sm font-bold"
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-brand-dark">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="w-7 h-7 rounded-full border border-brand-cream hover:bg-brand-cream text-brand-medium transition-colors flex items-center justify-center text-sm font-bold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="ml-1 w-7 h-7 rounded-full hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors flex items-center justify-center text-xs"
                        aria-label={`Remove ${item.title}`}
                      >
                        ✕
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-brand-cream space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-brand-dark">Total</span>
                <span className="text-xl font-bold text-brand-warm">₹{total.toFixed(2)}</span>
              </div>
              <motion.button
                onClick={handleCheckout}
                className="w-full py-3 bg-brand-dark hover:bg-brand-espresso text-white rounded-xl font-semibold transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Cart;
