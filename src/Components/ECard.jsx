import React, { useState } from 'react';

function ECard({ image, title, description, price, addToCart }) {
    // State to manage the quantity
    const [quantity, setQuantity] = useState(1);

    // Function to increase quantity
    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Function to decrease quantity, ensuring it doesn't go below 1
    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    // Function to handle adding to cart
    const handleAddToCart = () => {
        addToCart({ title, price: parseFloat(price) }, quantity); // Pass the item and quantity to addToCart
    };

    return (
        <div className="card bg-mainhead-heading text-body w-96 shadow-xl">
            <figure className="flex justify-center">
                <img
                    src={image}
                    alt={title} // Use title for alt attribute for better accessibility
                    className="object-cover" // Optional: To maintain image aspect ratio
                />
            </figure>
            <div className="card-body text-center">
                <h2 className="card-title justify-center">{title}</h2>
                <p>{description}</p>

                {/* Flex container for quantity selector, price, and add to cart button */}
                <div className="card-actions flex items-center justify-between text-white mt-4">
                    {/* Quantity controls */}
                    <div className="flex items-center space-x-2">
                        <button onClick={decreaseQuantity} className="btn btn-sm btn-outline hover:bg-white hover:text-black">
                            -
                        </button>
                        <span className="text-lg font-bold">{quantity}</span>
                        <button onClick={increaseQuantity} className="btn btn-sm btn-outline hover:bg-white hover:text-black">
                            +
                        </button>
                    </div>

                    {/* Price */}
                    <p className="font-extrabold text-lg mx-4">₹ {price}</p>

                    {/* Add to Cart Button */}
                    <button onClick={handleAddToCart} className="btn btn-sm bg-transparent btn-outline hover:bg-white hover:text-black">
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ECard;
