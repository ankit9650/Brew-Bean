import React, { useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addItem } from "../../redux/reducers/cartSlice";
import { useGetProductsQuery } from "../../redux/services/productApi";

const EASE = [0.22, 1, 0.36, 1];

// Curated picks, resolved against live catalog data in BestSellers() below.
const BEST_SELLER_SLUGS = [
  "classic-cappuccino",
  "hazelnut-mocha",
  "flat-white",
  "vienna-roast-beans-250g",
  "iced-americano",
  "affogato-classico",
];

function SliderCard({ item }) {
  const dispatch = useDispatch();
  const inStock = item.in_stock !== false;

  const handleAdd = () => {
    if (!inStock) return;
    dispatch(addItem({ id: item.id, title: item.title, price: parseFloat(item.price), quantity: 1, image: item.image }));
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
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!inStock ? "grayscale opacity-60" : ""}`}
        />
        <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-brand-caramel text-brand-espresso rounded-full">
          {inStock ? "Best Seller" : "Sold Out"}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-serif font-bold text-brand-espresso dark:text-brand-foam truncate">{item.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-brand-espresso dark:text-brand-caramel">₹{parseFloat(item.price).toFixed(0)}</span>
          <motion.button
            onClick={handleAdd}
            disabled={!inStock}
            className="w-8 h-8 rounded-full bg-brand-espresso dark:bg-brand-caramel text-white dark:text-brand-espresso flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={inStock ? { scale: 1.15, rotate: 90 } : undefined}
            whileTap={inStock ? { scale: 0.9 } : undefined}
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
  const { data } = useGetProductsQuery({ limit: 200 });
  const products = data?.data?.products ?? [];

  const bestSellers = useMemo(() => {
    return BEST_SELLER_SLUGS.map((slug) => {
      const p = products.find((pr) => pr.slug === slug);
      return p ? { id: p.id, title: p.name, price: p.price, image: p.image_url, in_stock: p.in_stock } : null;
    }).filter(Boolean);
  }, [products]);

  if (bestSellers.length === 0) return null;

  // Duplicate the list so -50% translation loops seamlessly
  const loop = [...bestSellers, ...bestSellers];

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
