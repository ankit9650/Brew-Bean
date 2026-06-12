import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addItem } from "../../redux/reducers/cartSlice";

const EASE = [0.22, 1, 0.36, 1];

const BEST_SELLERS = [
  { id: "classic-cappuccino", title: "Classic Cappuccino", price: 199, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80" },
  { id: "hazelnut-mocha", title: "Hazelnut Mocha", price: 239, image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80" },
  { id: "flat-white", title: "Flat White", price: 209, image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80" },
  { id: "vienna-roast-beans", title: "Vienna Roast Beans 250g", price: 449, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" },
  { id: "iced-americano", title: "Iced Americano", price: 179, image: "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?auto=format&fit=crop&w=600&q=80" },
  { id: "affogato-classico", title: "Affogato Classico", price: 259, image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=600&q=80" },
];

function SliderCard({ item }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addItem({ id: item.id, title: item.title, price: item.price, quantity: 1, image: item.image }));
    toast.success(`${item.title} added to cart`);
  };

  return (
    <motion.div
      className="glass rounded-3xl overflow-hidden w-64 shrink-0 group"
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-brand-caramel text-brand-espresso rounded-full">
          Best Seller
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-serif font-bold text-brand-espresso dark:text-brand-foam truncate">{item.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-brand-espresso dark:text-brand-caramel">₹{item.price}</span>
          <motion.button
            onClick={handleAdd}
            className="w-8 h-8 rounded-full bg-brand-espresso dark:bg-brand-caramel text-white dark:text-brand-espresso flex items-center justify-center"
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Add ${item.title} to cart`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" d="M12 4v16m8-8H4" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function BestSellers() {
  const reduceMotion = useReducedMotion();
  const marqueeRef = useRef(null);
  // Duplicate the list so -50% translation loops seamlessly
  const loop = [...BEST_SELLERS, ...BEST_SELLERS];

  return (
    <section className="py-24 bg-brand-cream dark:bg-[#1a0f0b] transition-colors duration-500 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-caramel">
            Customer Favourites
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif font-bold text-brand-espresso dark:text-brand-foam">
            Best Sellers
          </h2>
        </motion.div>
        <motion.p
          className="text-brand-medium dark:text-brand-latte/80 max-w-xs text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          The cups our regulars can't stop ordering. Hover to pause, tap + to add.
        </motion.p>
      </div>

      {/* Infinite marquee — CSS transform loop, pauses on hover */}
      <div className="mask-fade-x" ref={marqueeRef}>
        <div
          className={`flex gap-6 w-max px-4 py-4 hover:[animation-play-state:paused] ${
            reduceMotion ? "" : "animate-marquee"
          }`}
          style={{ willChange: "transform" }}
        >
          {loop.map((item, i) => (
            <SliderCard key={`${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
