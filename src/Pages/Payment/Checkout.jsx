import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { selectCartItems, selectCartTotal, clearCart } from "../../redux/reducers/cartSlice";
import { selectIsAuthenticated, selectCurrentUser } from "../../redux/reducers/authSlice";
import { useAddToCartMutation, useClearCartMutation } from "../../redux/services/cartApi";
import { useCreateOrderMutation } from "../../redux/services/orderApi";
import {
  useCreateRazorpayOrderMutation,
  useVerifyPaymentMutation,
} from "../../redux/services/paymentApi";
import ReceiptModal from "../../Components/ReceiptModal";

const PAYMENT_METHODS = [
  { id: "upi",  label: "UPI / Card / Netbanking", icon: "💳", razorpay: true },
  { id: "cod",  label: "Cash on Delivery",         icon: "💵", razorpay: false },
];

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

function Checkout() {
  const navigate    = useNavigate();
  const dispatch    = useDispatch();
  const cartItems   = useSelector(selectCartItems);
  const total       = useSelector(selectCartTotal);
  const isAuth      = useSelector(selectIsAuthenticated);
  const user        = useSelector(selectCurrentUser);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress]             = useState("");
  const [isProcessing, setIsProcessing]   = useState(false);
  const [receipt, setReceipt]             = useState(null);

  const [addToCart]            = useAddToCartMutation();
  const [clearServerCart]      = useClearCartMutation();
  const [createOrder]          = useCreateOrderMutation();
  const [createRazorpayOrder]  = useCreateRazorpayOrderMutation();
  const [verifyPayment]        = useVerifyPaymentMutation();

  if (cartItems.length === 0 && !receipt) {
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

  const syncCartToServer = async () => {
    // Clear out any stale/orphaned rows from a previous incomplete checkout
    // before pushing the current local cart, so the server-side cart always
    // exactly mirrors what the customer is about to pay for.
    await clearServerCart().unwrap();
    for (const item of cartItems) {
      await addToCart({
        product_id:    item.id,
        product_name:  item.title,
        unit_price:    item.price,
        quantity:      item.quantity,
        product_image: item.image || null,
      }).unwrap();
    }
  };

  const finalizeOrder = async ({ razorpay_payment_id = null, payment_status = "pending" } = {}) => {
    const result = await createOrder({
      payment_method:      paymentMethod,
      delivery_address:    address.trim(),
      razorpay_payment_id,
      payment_status,
    }).unwrap();

    const { invoice, ...order } = result.data;
    setReceipt({ order, invoice, items: cartItems });
    dispatch(clearCart());
    setIsProcessing(false);
  };

  const handleCloseReceipt = () => {
    setReceipt(null);
    navigate("/profile");
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod)    return toast.warn("Please select a payment method");
    if (!address.trim())   return toast.warn("Please enter a delivery address");

    if (!isAuth) {
      toast.info("Please sign in to place an order");
      return navigate("/login", { state: { from: "/checkout" } });
    }

    setIsProcessing(true);

    try {
      await syncCartToServer();

      if (paymentMethod === "cod") {
        await finalizeOrder();
        return;
      }

      // ── Razorpay flow ────────────────────────────────────────────────────────
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Razorpay failed to load. Check your internet connection.");
        return;
      }

      const rzpOrderRes = await createRazorpayOrder({
        amount_paise: Math.round(total * 100),
      }).unwrap();

      const options = {
        key:         import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:      rzpOrderRes.data.amount,
        currency:    rzpOrderRes.data.currency,
        name:        "Brew & Bean",
        description: `Order of ${cartItems.length} item${cartItems.length !== 1 ? "s" : ""}`,
        order_id:    rzpOrderRes.data.order_id,
        prefill: {
          name:  user?.name  || "",
          email: user?.email || "",
        },
        theme: { color: "#7B4F2E" },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast.info("Payment cancelled");
          },
        },
        handler: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
            }).unwrap();

            await finalizeOrder({
              razorpay_payment_id: response.razorpay_payment_id,
              payment_status:      "paid",
            });
          } catch {
            toast.error("Payment verification failed. Contact support with your payment ID.");
            setIsProcessing(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp) => {
        setIsProcessing(false);
        toast.error(`Payment failed: ${resp.error.description}`);
      });
      rzp.open();

    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === paymentMethod);

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
            <p className="text-brand-latte text-sm mt-1">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your order
            </p>
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
                    <div className="flex-1">
                      <span className="font-medium text-brand-dark text-sm">{label}</span>
                      {id === "upi" && (
                        <p className="text-xs text-brand-medium mt-0.5">
                          Secure payment via Razorpay — UPI, cards, netbanking &amp; wallets
                        </p>
                      )}
                    </div>
                    {paymentMethod === id && (
                      <svg className="w-5 h-5 text-brand-warm flex-none" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>

              {/* Razorpay trust badge */}
              {paymentMethod === "upi" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-xs text-brand-medium flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 text-green-500 flex-none" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Payments are secured and processed by Razorpay. We never store your card details.
                </motion.p>
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
                  Processing…
                </>
              ) : selectedMethod?.razorpay ? (
                `Pay ₹${total.toFixed(2)} via Razorpay`
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

      {receipt && (
        <ReceiptModal
          order={receipt.order}
          invoice={receipt.invoice}
          items={receipt.items}
          onClose={handleCloseReceipt}
        />
      )}
    </div>
  );
}

export default Checkout;
