import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// import  from 'src/assets/checkoutbg.png'; // Replace with the actual path to your image

function Checkout() {
    const location = useLocation();
    const { cartItems, total } = location.state || { cartItems: [], total: 0 };

    const [paymentMethod, setPaymentMethod] = useState("");
    const [upiId, setUpiId] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [bankName, setBankName] = useState("");

    const handlePayment = () => {
        console.log("Processing payment for:", cartItems, "Total:", total, "Payment Method:", paymentMethod);
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen"
            style={{
                backgroundImage: `url(src/assets/checkoutbg.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="p-6 bg-mainhead-heading text-body rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    <div>
                        <h3 className="font-semibold mb-2">Items:</h3>
                        <ul className="mb-4">
                            {cartItems.map(item => (
                                <li key={item.title} className="flex justify-between border-b border-gray-200 py-2">
                                    <span>{item.title} x {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <h3 className="font-semibold mb-4">Total: ₹{total.toFixed(2)}</h3>
                        
                        <div>
                            <h3 className="font-semibold mb-2">Select Payment Method:</h3>
                            <div className="flex flex-col mb-4">
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        value="upi"
                                        checked={paymentMethod === "upi" }
                                        onChange={() => setPaymentMethod("upi")}
                                        className="radio mr-2"
                                    />
                                    UPI
                                </label>
                                {paymentMethod === "upi" && (
                                    <input
                                        type="text"
                                        placeholder="Enter UPI ID"
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                        className="input input-bordered mt-1 w-full"
                                    />
                                )}
                                <label className="cursor-pointer mt-2">
                                    <input
                                        type="radio"
                                        value="creditCard"
                                        checked={paymentMethod === "creditCard"}
                                        onChange={() => setPaymentMethod("creditCard")}
                                        className="radio mr-2"
                                    />
                                    Credit/Debit Card
                                </label>
                                {paymentMethod === "creditCard" && (
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            placeholder="Card Number"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            className="input input-bordered mb-1 w-full"
                                        />
                                        <input
                                            type="text"
                                            placeholder="CVV"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                            className="input input-bordered mb-1 w-full"
                                        />
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                )}
                                <label className="cursor-pointer mt-2">
                                    <input
                                        type="radio"
                                        value="netBanking"
                                        checked={paymentMethod === "netBanking"}
                                        onChange={() => setPaymentMethod("netBanking")}
                                        className="radio mr-2"
                                    />
                                    Net Banking
                                </label>
                                {paymentMethod === "netBanking" && (
                                    <input
                                        type="text"
                                        placeholder="Bank Name"
                                        value={bankName}
                                        onChange={(e) => setBankName(e.target.value)}
                                        className="input input-bordered mt-1"
                                    />
                                )}
                            </div>
                        </div>
                        
                        <button 
                            onClick={handlePayment} 
                            className="btn btn-success w-full mt-4"
                        >
                            Pay Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Checkout;
