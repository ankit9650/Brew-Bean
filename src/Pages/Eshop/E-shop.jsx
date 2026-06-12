import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import ECard from "../../Components/ECard";
import Cart from "../../Components/Cart";
import { selectCartCount } from "../../redux/reducers/cartSlice";
import logo from "../../../public/assets/logo.png";

const PRODUCTS = {
  "Coffee & Tea": [
    {
      id: "arabica-beans",
      image: "https://m.media-amazon.com/images/I/51ajQfHc6QL.jpg",
      title: "Arabica Coffee Beans",
      description: "Larger, sweeter, and aromatic — the finest arabica beans for a premium cup.",
      price: "1090",
    },
    {
      id: "robusta-beans",
      image: "https://m.media-amazon.com/images/I/518qXcokIZL.jpg",
      title: "Robusta Coffee Beans",
      description: "Double the caffeine with a bold, strong character perfect for espresso blends.",
      price: "900",
    },
    {
      id: "catimor-beans",
      image: "https://kopicha.com/wp-content/uploads/2021/01/Arabica-Catimor.jpg",
      title: "Catimor Coffee Beans",
      description: "A unique Caturra & Timor hybrid with complex, earthy notes.",
      price: "890",
    },
    {
      id: "darjeeling-tea",
      image: "https://www.gitagged.com/wp-content/uploads/2020/12/Darjeeling-Black-tea-A2.jpg",
      title: "Darjeeling Tea",
      description: "First flush organic Darjeeling — sharp, clear, and slightly astringent.",
      price: "650",
    },
    {
      id: "jasmine-tea",
      image: "https://tasteofchai.in/cdn/shop/files/JasmineTea.jpg",
      title: "Jasmine Petals Tea",
      description: "Organic green tea infused with the delicate fragrance of jasmine.",
      price: "760",
    },
    {
      id: "apricot-tea",
      image: "https://uk.ahmadtea.com/cdn/shop/products/20FApricotface1_600x600_crop_center.jpg",
      title: "Apricot Black Tea",
      description: "Nepali black tea with fruity and floral apricot notes.",
      price: "850",
    },
  ],
  "Beverages": [
    {
      id: "coca-cola",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/10/355068045/LM/XC/UW/199268574/coca-cola-cold-drink-bottle-size-500-ml-for-instant-refreshment.jpg",
      title: "Coca Cola",
      description: "Classic carbonated refreshment, cold and crisp.",
      price: "150",
    },
    {
      id: "monster-energy",
      image: "https://snackstar.in/cdn/shop/products/532b3a20-33f9-495f-b8e5-c3f9bb769888.jpg",
      title: "Monster Energy Drink",
      description: "The fuel of champions — bold energy for bold ambitions.",
      price: "90",
    },
    {
      id: "prime-drink",
      image: "https://m.media-amazon.com/images/I/41oUx8AurjL.jpg",
      title: "Prime Hydration Drink",
      description: "Sports hydration drink with electrolytes and natural flavors.",
      price: "650",
    },
    {
      id: "sandwich",
      image: "https://www.tasteofhome.com/wp-content/uploads/2018/01/Country-Ham-Sandwiches_EXPS_FT23_25769_ST_1219_8.jpg",
      title: "Club Sandwich",
      description: "Fresh and filling club sandwich made with quality ingredients.",
      price: "150",
    },
    {
      id: "veg-patty",
      image: "https://kwalitybakery.in/wp-content/uploads/2021/11/Patties-1.jpeg",
      title: "Veg Patty",
      description: "Crispy vegetable patty baked fresh every morning.",
      price: "50",
    },
    {
      id: "burger",
      image: "https://theeburgerdude.com/wp-content/uploads/2022/09/9093e9_0c4e70b12b0843d3a2c78207361932d1_mv2.webp",
      title: "Classic Burger",
      description: "Juicy patty with fresh lettuce, tomato, and our signature sauce.",
      price: "250",
    },
  ],
  "Mugs & Accessories": [
    {
      id: "steel-mug",
      image: "https://images-cdn.ubuy.co.in/63b6398bc4f6ff2853297733-stainless-steel-thermos-coffee-mug.jpg",
      title: "Stainless Steel Black Mug",
      description: "Insulated double-wall construction keeps drinks hot for 12 hours.",
      price: "499",
    },
    {
      id: "electric-frother",
      image: "https://m.media-amazon.com/images/I/51+vA2qAe9L._AC_UF894,1000_QL80_.jpg",
      title: "Electric Milk Frother",
      description: "Create café-quality froth at home in seconds.",
      price: "450",
    },
    {
      id: "coffee-sipper",
      image: "https://m.media-amazon.com/images/I/51sYkcpkeWL._AC_UF894,1000_QL80_.jpg",
      title: "Coffee Sipper",
      description: "Elegant sipper for savoring your brew, one sip at a time.",
      price: "650",
    },
    {
      id: "coffee-sachets",
      image: "https://5.imimg.com/data5/SELLER/Default/2022/2/MJ/YL/HL/3541922/s-l1600.jpg",
      title: "Coffee Sachets (50 pcs)",
      description: "50 individually wrapped Nescafe sachets in assorted flavors.",
      price: "250",
    },
    {
      id: "travel-mug",
      image: "https://nutcaseshop.com/cdn/shop/products/NC-CUS-TUMCFF-WHITE-0016b.jpg",
      title: "Travel Coffee Mug",
      description: "Leak-proof travel mug — your perfect on-the-go companion.",
      price: "780",
    },
    {
      id: "custom-mug",
      image: "https://homafy.com/wp-content/uploads/2023/03/customized-mugs-for-girl-Copy.jpg",
      title: "Customizable Mug",
      description: "Personalize a mug for yourself or as a thoughtful gift.",
      price: "799",
    },
  ],
};

const TABS = Object.keys(PRODUCTS);

function Eshop() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
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
                activeTab === tab
                  ? "text-brand-warm"
                  : "text-brand-medium hover:text-brand-dark"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-warm"
                  layoutId="activeTab"
                />
              )}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <motion.div
          key={activeTab}
          className="flex flex-wrap justify-center gap-6 py-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {PRODUCTS[activeTab].map((product) => (
            <ECard key={product.id} {...product} />
          ))}
        </motion.div>
      </div>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </div>
  );
}

export default Eshop;
