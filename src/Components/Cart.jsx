import React from 'react';

function Cart({ cartItems, total, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        <ul className="mb-4">
                            {cartItems.map((item, index) => (
                                <li key={index} className="flex justify-between mb-2">
                                    <span>{item.title} x {item.quantity}</span>
                                    <span>₹{item.price * item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>₹{total}</span>
                        </div>
                    </div>
                )}
                <button onClick={onClose} className="btn btn-primary mt-4">Close</button>
            </div>
        </div>
    );
}

export default Cart;
