import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { addItem } from "../../redux/reducers/cartSlice";

import heroImage from "../../../public/assets/menuhead.jpg";
import espressoImage from "../../../public/assets/espresso.jpg";
import capucinno from "../../../public/assets/menuimages/capuccino.jpg";
import latte from "../../../public/assets/menuimages/latte.jpg";
import mocha from "../../../public/assets/menuimages/mocha.avif";
import flat from "../../../public/assets/menuimages/flat.webp";
import americano from "../../../public/assets/menuimages/americano.webp";
import icedlatte from "../../../public/assets/menuimages/icedlatte.jpg";
import coldbrew from "../../../public/assets/menuimages/coldbrew.webp";
import frappe from "../../../public/assets/menuimages/frappe.webp";
import nitrocold from "../../../public/assets/menuimages/nitrocold.jpeg";
import icedcaramel from "../../../public/assets/menuimages/icedcaramel.webp";
import vietnameseiced from "../../../public/assets/menuimages/vietnameseiced.webp";
import pumpkinlatte from "../../../public/assets/menuimages/pumpkinlatte.jpg";
import machalatte from "../../../public/assets/menuimages/machalatte.webp";
import hazelnutdream from "../../../public/assets/menuimages/hazelnutdream.jpg";
import caremaldelight from "../../../public/assets/menuimages/caremaldelight.png";
import cinammonlatte from "../../../public/assets/menuimages/cinammonlatte.jpeg";
import saltedmocha from "../../../public/assets/menuimages/saltedmocha.webp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFire, faSnowflake, faCrown, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const menuItems = {
  hot: [
    { id: "espresso", name: "Espresso", price: 120, img: espressoImage, desc: "Rich and bold single shot of pure coffee perfection", featured: true },
    { id: "cappuccino", name: "Cappuccino", price: 150, img: capucinno, desc: "Velvety espresso with luxurious milk foam", featured: true },
    { id: "latte", name: "Latte", price: 130, img: latte, desc: "Smooth espresso with steamed milk" },
    { id: "mocha", name: "Mocha", price: 160, img: mocha, desc: "Decadent chocolate meets premium espresso" },
    { id: "flat-white", name: "Flat White", price: 140, img: flat, desc: "Stronger than latte with velvety microfoam" },
    { id: "americano", name: "Americano", price: 110, img: americano, desc: "Espresso diluted with hot water for a longer drink" },
  ],
  cold: [
    { id: "iced-latte", name: "Iced Latte", price: 150, img: icedlatte, desc: "Smooth espresso over ice with milk", featured: true },
    { id: "cold-brew", name: "Cold Brew", price: 130, img: coldbrew, desc: "Slow-steeped 18 hours for maximum smoothness" },
    { id: "frappe", name: "Frappe", price: 180, img: frappe, desc: "Iced, blended coffee with whipped cream" },
    { id: "nitro-cold-brew", name: "Nitro Cold Brew", price: 200, img: nitrocold, desc: "Creamy nitrogen-infused texture without dairy" },
    { id: "iced-caramel", name: "Iced Caramel Macchiato", price: 170, img: icedcaramel, desc: "Layered espresso with vanilla and caramel drizzle" },
    { id: "vietnamese-iced", name: "Vietnamese Iced Coffee", price: 160, img: vietnameseiced, desc: "Bold brew with sweetened condensed milk" },
  ],
  specials: [
    { id: "pumpkin-latte", name: "Pumpkin Spice Latte", price: 200, img: pumpkinlatte, desc: "Seasonal favorite with real pumpkin purée", featured: true },
    { id: "caramel-delight", name: "Caramel Delight", price: 170, img: caremaldelight, desc: "House-made caramel sauce with espresso" },
    { id: "hazelnut-dream", name: "Hazelnut Dream", price: 175, img: hazelnutdream, desc: "Toasted hazelnut syrup with velvety milk" },
    { id: "cinnamon-dolce", name: "Cinnamon Dolce", price: 165, img: cinammonlatte, desc: "Sweet cinnamon spice latte" },
    { id: "salted-mocha", name: "Salted Caramel Mocha", price: 190, img: saltedmocha, desc: "Perfect sweet-salty balance" },
    { id: "matcha-latte", name: "Matcha Latte", price: 175, img: machalatte, desc: "Premium ceremonial grade matcha" },
  ],
};

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
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleAddToOrder = () => {
    dispatch(addItem({ id: item.id, title: item.name, price: item.price, quantity: 1, image: item.img }));
    toast.success(`${item.name} added to cart!`, { autoClose: 2000 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      className={`bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-[#e2d5c4]/50 ${
        item.featured ? "ring-1 ring-[#8c6a4f]" : ""
      }`}
      whileHover={{ y: -4 }}
    >
      {item.featured && (
        <div className="absolute top-4 left-4 bg-[#3d2e1e] text-[#e2d5c4] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 tracking-wider z-10">
          <FontAwesomeIcon icon={faStar} className="text-amber-300 text-xs" />
          FEATURED
        </div>
      )}
      <div className="h-56 overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-[#3d2e1e] font-serif tracking-tight">{item.name}</h3>
          <span className="text-base font-bold text-[#8c6a4f]">₹{item.price}</span>
        </div>
        <p className="text-[#5d4a36]/90 text-sm mb-4 leading-relaxed">{item.desc}</p>
        <motion.button
          onClick={handleAddToOrder}
          className={`w-full py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold ${
            added
              ? "bg-green-600 text-white"
              : "bg-[#3d2e1e] hover:bg-[#2a2118] text-white"
          }`}
          whileTap={{ scale: 0.97 }}
        >
          <FontAwesomeIcon icon={faShoppingCart} className="text-xs" />
          {added ? "Added to Cart!" : "Add to Order"}
        </motion.button>
      </div>
    </motion.div>
  );
}

function SignatureBrew({ item }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    dispatch(addItem({ id: item.id, title: item.name, price: item.price, quantity: 1, image: item.img }));
    toast.success(`${item.name} added!`, { autoClose: 2000 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  return (
    <button
      onClick={handleAdd}
      className={`mt-3 w-full py-2 rounded-lg transition-all text-sm font-medium ${
        added ? "bg-green-600 text-white" : "bg-transparent border border-[#8c6a4f] hover:bg-[#8c6a4f] text-[#8c6a4f] hover:text-white"
      }`}
    >
      {added ? "Added!" : "Add to Order"}
    </button>
  );
}

function Menu() {
  const [activeTab, setActiveTab] = useState("hot");
  const navigate = useNavigate();

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
      </div>

      {/* Featured Section */}
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
            {[...menuItems.hot, ...menuItems.cold, ...menuItems.specials]
              .filter((item) => item.featured)
              .map((item, i) => (
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
                      src={item.img}
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
                    <p className="text-[#5d4a36]/80 text-sm">{item.desc}</p>
                    <SignatureBrew item={item} />
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Menu;
