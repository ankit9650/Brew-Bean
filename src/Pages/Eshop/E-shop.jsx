import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import ECard from "../../Components/ECard";
import Cart from "../../Components/Cart";
import { selectCartCount } from "../../redux/reducers/cartSlice";
import { useGetProductsQuery } from "../../redux/services/productApi";
import logo from "../../../public/assets/logo.png";

const FALLBACK_TABS = ["Coffee & Tea", "Beverages", "Mugs & Accessories"];

function Eshop() {
  const { data, isLoading, isError } = useGetProductsQuery({ limit: 200 });
  const products = data?.data?.products ?? [];

  const grouped = useMemo(() => {
    const byCategory = {};
    for (const p of products) {
      const cat = p.category_name || "Other";
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(p);
    }
    return byCategory;
  }, [products]);

  const TABS = Object.keys(grouped).length ? Object.keys(grouped) : FALLBACK_TABS;
  const [activeTab, setActiveTab] = useState(null);
  const currentTab = activeTab && TABS.includes(activeTab) ? activeTab : TABS[0];

  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);

  return (
    <div className="min-h-screen bg-brand-light">
      {/* E-shop Navbar */}
      <nav className="bg-white border-b border-brand-cream shadow-coffee-sm sticky top-0 z-20">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 group">
            <img src={logo} className="h-8 transition-transform group-hover:scale-105" alt="Brew & Bean" />
            <span className="text-xl font-bold font-serif text-brand-dark">Brew & Bean</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              className="text-sm text-brand-medium hover:text-brand-dark transition-colors"
              onClick={() => navigate("/")}
            >
              ← Home
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-brand-dark hover:bg-brand-espresso text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Cart
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  className="bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-coffee-gradient text-white py-12 px-4 text-center">
        <motion.h1
          className="text-4xl font-bold font-serif mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Brew & Bean Shop
        </motion.h1>
        <p className="text-brand-latte text-sm max-w-md mx-auto">
          Premium coffee, teas, beverages, and accessories — delivered to your door
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-screen-xl mx-auto px-4 mt-8">
        <div className="flex gap-2 border-b border-brand-cream overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                currentTab === tab
                  ? "text-brand-warm"
                  : "text-brand-medium hover:text-brand-dark"
              }`}
            >
              {tab}
              {currentTab === tab && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-warm"
                  layoutId="activeTab"
                />
              )}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 border-brand-warm border-t-transparent animate-spin" />
          </div>
        ) : isError ? (
          <p className="text-center text-brand-medium py-16">Couldn&apos;t load the shop right now. Please try again shortly.</p>
        ) : (
          <motion.div
            key={currentTab}
            className="flex flex-wrap justify-center gap-6 py-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {(grouped[currentTab] ?? []).map((product) => (
              <ECard
                key={product.id}
                id={product.id}
                image={product.image_url}
                title={product.name}
                description={product.description}
                price={product.price}
                inStock={product.in_stock !== false}
              />
            ))}
          </motion.div>
        )}
      </div>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </div>
  );
}

export default Eshop;
