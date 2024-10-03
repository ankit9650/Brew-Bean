import React from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation

function Cart({ cartItems, total, onClose }) {
    const navigate = useNavigate(); // Create a navigate instance for navigation

    const handleCheckout = () => {
        // You can pass cartItems and total to the payment page if needed
        navigate("/checkout", { state: { cartItems, total } }); // Navigating to the checkout page
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 max-w-md transition-transform transform hover:scale-105">
                <button onClick={onClose} className="text-red-500 float-right text-xl hover:text-red-700 transition-colors">
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Cart Items</h2>
                {cartItems.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                    cartItems.map(item => (
                        <div key={item.title} className="flex justify-between items-center border-b border-gray-200 py-2">
                            <span className="text-gray-800">{item.title} x {item.quantity}</span>
                            <span className="text-gray-700 font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))
                )}
                <div className="flex justify-between items-center mt-4">
                    <h3 className="font-bold text-gray-800">Total:</h3>
                    <h3 className="font-bold text-indigo-600 text-lg">₹{total.toFixed(2)}</h3>
                </div>
                <button 
                    onClick={handleCheckout} // Handle checkout button click
                    className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default Cart;
