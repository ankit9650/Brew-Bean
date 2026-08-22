import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/reducers/cartSlice";
import { toast } from "react-toastify";

function ECard({ id, image, title, description, price, inStock = true }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();

  const parsedPrice = parseFloat(price);

  const handleAddToCart = () => {
    if (!inStock) return;
    dispatch(addItem({
      id,
      title,
      price: parsedPrice,
      quantity,
      image,
    }));
    toast.success(`${title} added to cart!`, { autoClose: 2000 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-coffee hover:shadow-coffee-lg transition-all duration-300 overflow-hidden w-72 flex flex-col border border-brand-cream"
      whileHover={{ y: -4 }}
      layout
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${!inStock ? "grayscale opacity-60" : ""}`}
          loading="lazy"
        />
        {!inStock && (
          <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-red-600 text-white rounded-full">
            Sold Out
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-bold text-brand-dark text-base leading-snug mb-1">{title}</h2>
        <p className="text-brand-medium text-xs leading-relaxed flex-1 mb-3 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between gap-2">
          {/* Quantity */}
          <div className="flex items-center gap-1 bg-brand-light rounded-lg p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-md hover:bg-brand-cream flex items-center justify-center text-brand-medium font-bold transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-bold text-brand-dark">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-7 h-7 rounded-md hover:bg-brand-cream flex items-center justify-center text-brand-medium font-bold transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <span className="font-extrabold text-brand-warm text-base">₹{parsedPrice}</span>

          <motion.button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              added
                ? "bg-green-500 text-white"
                : "bg-brand-dark hover:bg-brand-espresso text-white"
            }`}
            whileTap={inStock ? { scale: 0.95 } : undefined}
          >
            {!inStock ? "Sold Out" : added ? "Added!" : "Add"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ECard;
