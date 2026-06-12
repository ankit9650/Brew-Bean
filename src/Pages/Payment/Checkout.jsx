import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { selectCartItems, selectCartTotal, clearCart } from "../../redux/reducers/cartSlice";
import { selectIsAuthenticated } from "../../redux/reducers/authSlice";
import { useAddToCartMutation } from "../../redux/services/cartApi";
import { useCreateOrderMutation } from "../../redux/services/orderApi";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", icon: "📱" },
  { id: "card", label: "Credit / Debit Card", icon: "💳" },
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
];

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [addToCart] = useAddToCartMutation();
  const [createOrder] = useCreateOrderMutation();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-light gap-4">
        <div className="text-6xl">☕</div>
        <h2 className="text-2xl font-bold text-brand-dark">Your cart is empty</h2>
        <p className="text-brand-medium">Add something delicious before checking out.</p>
        <button
          onClick={() => navigate("/eshop")}
          className="mt-2 px-6 py-2.5 bg-brand-dark text-white rounded-xl font-medium hover:bg-brand-espresso transition-colors"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!paymentMethod) return toast.warn("Please select a payment method");
    if (!address.trim()) return toast.warn("Please enter a delivery address");
    if (paymentMethod === "upi" && !upiId.trim()) return toast.warn("Please enter your UPI ID");

    if (!isAuthenticated) {
      toast.info("Please sign in to place an order");
      return navigate("/login", { state: { from: "/checkout" } });
    }

    setIsProcessing(true);
    try {
      // Sync the local cart to the server cart. Local ids are slugs, not DB
      // ids, so product_id is omitted — the server keys items by name/price.
      for (const item of cartItems) {
        await addToCart({
          product_name: item.title,
          unit_price: item.price,
          quantity: item.quantity,
          product_image: item.image || null,
        }).unwrap();
      }

      // Create the order — the server snapshots the cart and clears it atomically
      const result = await createOrder({
        payment_method: paymentMethod,
        delivery_address: address.trim(),
        notes: paymentMethod === "upi" ? `UPI: ${upiId.trim()}` : null,
      }).unwrap();

      dispatch(clearCart());
      toast.success(
        `Order #${result?.data?.id ?? ""} placed successfully! We'll notify you when it's ready.`
      );
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-coffee overflow-hidden"
        >
          {/* Header */}
          <div className="bg-brand-dark text-white p-6">
            <h1 className="text-2xl font-bold font-serif">Checkout</h1>
            <p className="text-brand-latte text-sm mt-1">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your order</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Order Summary */}
            <section>
              <h2 className="font-bold text-brand-dark mb-3">Order Summary</h2>
              <div className="space-y-2 bg-brand-light rounded-xl p-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-brand-medium">
                      {item.title} × {item.quantity}
                    </span>
                    <span className="font-semibold text-brand-dark">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-brand-cream pt-2 mt-2 flex justify-between font-bold text-base">
                  <span className="text-brand-dark">Total</span>
                  <span className="text-brand-warm">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </section>

            {/* Delivery Address */}
            <section>
              <h2 className="font-bold text-brand-dark mb-3">Delivery Address</h2>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full delivery address..."
                rows={3}
                className="w-full px-4 py-3 border border-brand-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-warm text-sm resize-none"
                required
              />
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="font-bold text-brand-dark mb-3">Payment Method</h2>
              <div className="grid gap-3">
                {PAYMENT_METHODS.map(({ id, label, icon }) => (
                  <label
                    key={id}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === id
                        ? "border-brand-warm bg-amber-50"
                        : "border-brand-cream hover:border-brand-latte"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={id}
                      checked={paymentMethod === id}
                      onChange={() => setPaymentMethod(id)}
                      className="sr-only"
                    />
                    <span className="text-2xl">{icon}</span>
                    <span className="font-medium text-brand-dark text-sm">{label}</span>
                    {paymentMethod === id && (
                      <svg className="ml-auto w-5 h-5 text-brand-warm" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>

              {paymentMethod === "upi" && (
                <motion.div
                  className="mt-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-4 py-3 border border-brand-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-warm text-sm"
                  />
                </motion.div>
              )}

              {paymentMethod === "card" && (
                <motion.div
                  className="mt-3 p-4 bg-amber-50 rounded-xl border border-amber-200 text-sm text-amber-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <strong>Note:</strong> Card payments will be processed securely at the point of delivery via a POS terminal. We do not store card details online.
                </motion.div>
              )}
            </section>

            {/* Place Order */}
            <motion.button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-4 bg-brand-dark hover:bg-brand-espresso text-white rounded-xl font-bold text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileTap={{ scale: 0.98 }}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Processing...
                </>
              ) : (
                `Place Order — ₹${total.toFixed(2)}`
              )}
            </motion.button>

            <p className="text-center text-xs text-brand-medium">
              By placing your order you agree to our Terms of Service
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Checkout;
