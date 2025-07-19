import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import {
  faStar,
  faFire,
  faSnowflake,
  faCrown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Enhanced Menu Data
const menuItems = {
  hot: [
    {
      name: "Espresso",
      price: "₹120",
      img: espressoImage,
      desc: "Rich and bold single shot of pure coffee perfection",
      featured: true,
    },
    {
      name: "Cappuccino",
      price: "₹150",
      img: capucinno,
      desc: "Velvety espresso with luxurious milk foam",
      featured: true,
    },
    {
      name: "Latte",
      price: "₹130",
      img: latte,
      desc: "Smooth espresso with steamed milk",
    },
    {
      name: "Mocha",
      price: "₹160",
      img: mocha,
      desc: "Decadent chocolate meets premium espresso",
    },
    {
      name: "Flat White",
      price: "₹140",
      img: flat,
      desc: "Stronger than latte with microfoam",
    },
    {
      name: "Americano",
      price: "₹110",
      img: americano,
      desc: "Espresso diluted with hot water",
    },
  ],
  cold: [
    {
      name: "Iced Latte",
      price: "₹150",
      img: icedlatte,
      desc: "Smooth espresso over ice with milk",
      featured: true,
    },
    {
      name: "Cold Brew",
      price: "₹130",
      img: coldbrew,
      desc: "Slow-steeped for 18 hours for maximum smoothness",
    },
    {
      name: "Frappe",
      price: "₹180",
      img: frappe,
      desc: "Iced, blended coffee with whipped cream",
    },
    {
      name: "Nitro Cold Brew",
      price: "₹200",
      img: nitrocold,
      desc: "Creamy texture without dairy",
    },
    {
      name: "Iced Caramel Macchiato",
      price: "₹170",
      img: icedcaramel,
      desc: "Layered espresso with vanilla and caramel",
    },
    {
      name: "Vietnamese Iced Coffee",
      price: "₹160",
      img: vietnameseiced,
      desc: "Strong brew with sweetened condensed milk",
    },
  ],
  specials: [
    {
      name: "Pumpkin Spice Latte",
      price: "₹200",
      img: pumpkinlatte,
      desc: "Seasonal favorite with real pumpkin",
      featured: true,
    },
    {
      name: "Caramel Delight",
      price: "₹170",
      img: caremaldelight,
      desc: "House-made caramel sauce",
    },
    {
      name: "Hazelnut Dream",
      price: "₹175",
      img: hazelnutdream,
      desc: "Toasted hazelnut flavor",
    },
    {
      name: "Cinnamon Dolce",
      price: "₹165",
      img: cinammonlatte,
      desc: "Sweet cinnamon spice",
    },
    {
      name: "Salted Caramel Mocha",
      price: "₹190",
      img: saltedmocha,
      desc: "Perfect sweet-salty balance",
    },
    {
      name: "Matcha Latte",
      price: "₹175",
      img: machalatte,
      desc: "Premium ceremonial grade matcha",
    },
  ],
};

function Menu() {
  const [activeTab, setActiveTab] = useState("hot");

  return (
    <>
      <div className="min-h-screen bg-[#f8f5f2]">
        {/* Hero Section */}
       <section
  className="relative h-[70vh] min-h-[500px] bg-center bg-cover flex items-end justify-center pb-16"
  style={{ backgroundImage: `url(${heroImage})` }}
>
  <div className="absolute inset-0 bg-gradient-to-t from-[#2a2118]/90 via-[#2a2118]/30 to-transparent"></div>
  <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto">
    <div className="inline-block mb-6">
      <span className="block text-sm text-[#e2d5c4] tracking-widest mb-2">
        ARTISAN COFFEE EXPERIENCE
      </span>
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white font-serif mb-4 tracking-tight">
        Our Coffee Menu
      </h1>
      <div className="w-24 h-1 bg-[#8c6a4f] mx-auto mt-6"></div>
    </div>

    <p className="text-[#e2d5c4] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
      Handcrafted with premium beans and passionate precision
    </p>

    {/* Back Button */}
    <Link
      to="/"
      className="inline-flex items-center gap-2 mt-8 px-5 py-2 bg-[#8c6a4f] hover:bg-[#5d4a36] text-white rounded-full text-sm font-medium transition-all shadow-md"
    >
      <span>← Back to Home</span>
    </Link>
  </div>
</section>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 bg-[#3d2e1e] py-6 sticky top-0 z-20 shadow-lg">
          {["hot", "cold", "specials"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full text-white font-medium transition-all flex items-center gap-3 ${
                activeTab === tab
                  ? "bg-[#8c6a4f] shadow-lg"
                  : "hover:bg-[#5d4a36]/80"
              }`}
            >
              {tab === "hot" ? (
                <>
                  <FontAwesomeIcon icon={faFire} className="text-amber-200" />
                  <span>Hot Classics</span>
                </>
              ) : tab === "cold" ? (
                <>
                  <FontAwesomeIcon
                    icon={faSnowflake}
                    className="text-blue-100"
                  />
                  <span>Cold Brews</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCrown} className="text-yellow-200" />
                  <span>Seasonal Specials</span>
                </>
              )}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems[activeTab].map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-[#e2d5c4]/50 ${
                  item.featured ? "ring-1 ring-[#8c6a4f]" : ""
                }`}
              >
                {item.featured && (
                  <div className="absolute top-4 left-4 bg-[#3d2e1e] text-[#e2d5c4] px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2 tracking-wider">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-xs text-amber-300"
                    />
                    <span>FEATURED</span>
                  </div>
                )}
                <div className="h-64 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#3d2e1e] font-serif tracking-tight">
                      {item.name}
                    </h3>
                    <span className="text-lg font-bold text-[#8c6a4f]">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-[#5d4a36]/90 text-sm mb-6">{item.desc}</p>
                  <button className="w-full py-3 bg-[#3d2e1e] hover:bg-[#2a2118] text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                    <span>Add to Order</span>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-xs transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signature Brews Section */}
        <section className="relative py-20 px-4 sm:px-6 bg-[#3d2e1e] bg-opacity-5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-10"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex flex-col items-center mb-6">
                <span className="text-xs text-[#8c6a4f] tracking-widest font-medium mb-2">
                  EXCLUSIVE SELECTION
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#3d2e1e] font-serif tracking-tight">
                  Signature Brews{" "}
                  <FontAwesomeIcon icon={faCrown} className="text-yellow-600" />
                </h2>
                <div className="w-16 h-0.5 bg-[#8c6a4f] mt-4"></div>
              </div>
              <p className="text-[#5d4a36]/90 max-w-2xl mx-auto text-lg leading-relaxed">
                Exquisite coffee experiences crafted by our master baristas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.hot
                .filter((item) => item.featured)
                .concat(
                  menuItems.cold.filter((item) => item.featured),
                  menuItems.specials.filter((item) => item.featured)
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group relative isolate border border-[#e2d5c4]/50 hover:border-[#e2d5c4]/80"
                  >
                    <div className="absolute -right-8 top-6 w-32 bg-[#3d2e1e] text-[#e2d5c4] text-xs font-bold py-1 text-center transform rotate-45 z-10 shadow-md">
                      MASTER BLEND
                    </div>

                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3d2e1e]/90 via-[#3d2e1e]/20 to-transparent"></div>
                    </div>

                    <div className="p-6 relative">
                      <div className="absolute -top-5 right-6 bg-[#3d2e1e] text-[#e2d5c4] px-4 py-2 rounded-full shadow-lg">
                        <span className="font-serif font-bold">
                          {item.price}
                        </span>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-[#3d2e1e] font-serif tracking-tight">
                          {item.name}
                        </h3>
                        <span className="text-xs text-[#8c6a4f] uppercase tracking-wider block mt-1">
                          Seasonal Special
                        </span>
                      </div>

                      <p className="text-[#5d4a36]/80 mb-6 leading-relaxed text-sm border-b border-[#e2d5c4]/30 pb-6">
                        {item.desc}
                      </p>

                      <button className="w-full py-3 bg-transparent border border-[#8c6a4f] hover:bg-[#8c6a4f] text-[#8c6a4f] hover:text-white rounded-lg transition-all duration-300 font-medium tracking-wide flex items-center justify-center gap-2">
                        <span>Reserve Now</span>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-xs transition-transform group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="text-center mt-16">
              <button className="relative px-8 py-3 text-[#3d2e1e] hover:text-white rounded-full transition-all duration-300 font-medium tracking-wide group overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Discover Our Full Collection
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-xs transition-transform group-hover:translate-x-1"
                  />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#3d2e1e] to-[#8c6a4f] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                <span className="absolute inset-0 border border-[#3d2e1e] rounded-full -z-10"></span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Menu;
