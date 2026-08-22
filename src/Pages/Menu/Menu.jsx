import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { addItem } from "../../redux/reducers/cartSlice";
import { useGetProductsQuery } from "../../redux/services/productApi";

import heroImage from "../../../public/assets/menuhead.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFire, faSnowflake, faCrown, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const TABS = [
  { key: "hot", label: "Hot Classics", icon: faFire, iconClass: "text-amber-300" },
  { key: "cold", label: "Cold Brews", icon: faSnowflake, iconClass: "text-blue-200" },
  { key: "specials", label: "Seasonal Specials", icon: faCrown, iconClass: "text-yellow-200" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

function MenuCard({ item }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const inStock = item.in_stock !== false;

  const handleAddToOrder = () => {
    if (!inStock) return;
    dispatch(addItem({ id: item.id, title: item.name, price: parseFloat(item.price), quantity: 1, image: item.image_url }));
    toast.success(`${item.name} added to cart!`, { autoClose: 2000 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      className={`bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-[#e2d5c4]/50 ${
        item.is_featured ? "ring-1 ring-[#8c6a4f]" : ""
      }`}
      whileHover={{ y: -4 }}
    >
      {item.is_featured && (
        <div className="absolute top-4 left-4 bg-[#3d2e1e] text-[#e2d5c4] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 tracking-wider z-10">
          <FontAwesomeIcon icon={faStar} className="text-amber-300 text-xs" />
          FEATURED
        </div>
      )}
      {!inStock && (
        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider z-10">
          SOLD OUT
        </div>
      )}
      <div className="h-56 overflow-hidden">
        <img
          src={item.image_url}
          alt={item.name}
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${!inStock ? "grayscale opacity-60" : ""}`}
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-[#3d2e1e] font-serif tracking-tight">{item.name}</h3>
          <span className="text-base font-bold text-[#8c6a4f]">₹{item.price}</span>
        </div>
        <p className="text-[#5d4a36]/90 text-sm mb-4 leading-relaxed">{item.description}</p>
        <motion.button
          onClick={handleAddToOrder}
          disabled={!inStock}
          className={`w-full py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
            added
              ? "bg-green-600 text-white"
              : "bg-[#3d2e1e] hover:bg-[#2a2118] text-white"
          }`}
          whileTap={inStock ? { scale: 0.97 } : undefined}
        >
          <FontAwesomeIcon icon={faShoppingCart} className="text-xs" />
          {!inStock ? "Sold Out" : added ? "Added to Cart!" : "Add to Order"}
        </motion.button>
      </div>
    </motion.div>
  );
}

function SignatureBrew({ item }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const inStock = item.in_stock !== false;

  const handleAdd = () => {
    if (!inStock) return;
    dispatch(addItem({ id: item.id, title: item.name, price: parseFloat(item.price), quantity: 1, image: item.image_url }));
    toast.success(`${item.name} added!`, { autoClose: 2000 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={!inStock}
      className={`mt-3 w-full py-2 rounded-lg transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
        added ? "bg-green-600 text-white" : "bg-transparent border border-[#8c6a4f] hover:bg-[#8c6a4f] text-[#8c6a4f] hover:text-white"
      }`}
    >
      {!inStock ? "Sold Out" : added ? "Added!" : "Add to Order"}
    </button>
  );
}

function Menu() {
  const [activeTab, setActiveTab] = useState("hot");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProductsQuery({ limit: 200 });
  const products = data?.data?.products ?? [];

  // Menu tabs are driven by tags (set in the catalog), not category — this
  // page shows every drink regardless of which category it's filed under.
  const menuItems = useMemo(() => {
    const has = (item, tag) => Array.isArray(item.tags) && item.tags.includes(tag);
    return {
      hot: products.filter((p) => has(p, "hot") && !has(p, "seasonal")),
      cold: products.filter((p) => has(p, "cold") && !has(p, "seasonal")),
      specials: products.filter((p) => has(p, "seasonal")),
    };
  }, [products]);

  const featuredBrews = useMemo(
    () => [...menuItems.hot, ...menuItems.cold, ...menuItems.specials].filter((item) => item.is_featured),
    [menuItems]
  );

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[480px] bg-center bg-cover flex items-end justify-center pb-16"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/90 via-[#2a2118]/30 to-transparent" />
        <motion.div
          className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="block text-xs text-[#e2d5c4] tracking-widest mb-2 uppercase">
            Artisan Coffee Experience
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white font-serif mb-3 tracking-tight">
            Our Coffee Menu
          </h1>
          <div className="w-16 h-0.5 bg-[#8c6a4f] mx-auto mb-5" />
          <p className="text-[#e2d5c4] text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-6">
            Handcrafted with premium beans and passionate precision
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#8c6a4f] hover:bg-[#5d4a36] text-white rounded-full text-sm font-medium transition-all shadow-md"
            >
              ← Back to Home
            </Link>
            <button
              onClick={() => navigate("/eshop")}
              className="inline-flex items-center gap-2 px-5 py-2 border border-white/40 hover:border-white text-white rounded-full text-sm font-medium transition-all"
            >
              Shop Beans →
            </button>
          </div>
        </motion.div>
      </section>

      {/* Tabs */}
      <div className="flex justify-center gap-3 bg-[#3d2e1e] py-5 sticky top-0 z-20 shadow-lg">
        {TABS.map(({ key, label, icon, iconClass }) => (
          <motion.button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-6 py-2.5 rounded-full text-white text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === key ? "bg-[#8c6a4f] shadow-lg" : "hover:bg-[#5d4a36]/80"
            }`}
            whileTap={{ scale: 0.97 }}
          >
            <FontAwesomeIcon icon={icon} className={iconClass} />
            <span className="hidden sm:inline">{label}</span>
          </motion.button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 border-[#8c6a4f] border-t-transparent animate-spin" />
          </div>
        ) : isError ? (
          <p className="text-center text-[#5d4a36]/80 py-16">Couldn&apos;t load the menu right now. Please try again shortly.</p>
        ) : menuItems[activeTab].length === 0 ? (
          <p className="text-center text-[#5d4a36]/80 py-16">Nothing here yet — check back soon.</p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {menuItems[activeTab].map((item, i) => (
                <motion.div key={item.id} custom={i} variants={cardVariants} initial="hidden" animate="visible">
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Featured Section */}
      {featuredBrews.length > 0 && (
        <section className="py-20 px-4 bg-[#3d2e1e]/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs text-[#8c6a4f] tracking-widest font-medium uppercase">Exclusive Selection</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#3d2e1e] font-serif mt-2">
                Signature Brews <FontAwesomeIcon icon={faCrown} className="text-yellow-600" />
              </h2>
              <div className="w-12 h-0.5 bg-[#8c6a4f] mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredBrews.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all overflow-hidden group border border-[#e2d5c4]/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3d2e1e]/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-serif font-bold text-lg">{item.name}</h3>
                      <span className="text-amber-200 font-bold">₹{item.price}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-[#5d4a36]/80 text-sm">{item.description}</p>
                    <SignatureBrew item={item} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Menu;
