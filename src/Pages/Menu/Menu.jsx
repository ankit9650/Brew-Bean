import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useTypewriter from "../../Components/Hook/Typewriter";

// Import images
import logoImage from "../../../public/logo.png";
import menuHeadImage from "../../assets/menuhead.png";
import hotClassicImage from "../../assets/hotclassic.png";
import allTimeChillerImage from "../../assets/alltimechiller.png";
import feedCoffeesImage from "../../assets/feedcoffees.png";
import allTimeDelightImage from "../../assets/alltimedelight.png";

function Menu({ onHomeClick }) { 
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("hotclassic"); // Default tab
  const navigate = useNavigate();
  const location = useLocation();

  const typedText = useTypewriter("Coffee", 250); // Typewriter effect for "Coffee"

  const tabData = {
    hotclassic: { label: "Hot Classic", image: hotClassicImage },
    chillers: { label: "Chillers", image: allTimeChillerImage },
    feedcoffees: { label: "Feed Coffees", image: feedCoffeesImage },
    delight: { label: "Delight Stuff", image: allTimeDelightImage },
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    navigate(`?tab=${tab}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam && tabData[tabParam]) {
      setSelectedTab(tabParam);
    }
    setIsLoading(false);
  }, [location.search]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-infinity loading-lg bg-mainhead-heading"></span>
        <div className="loader text-mainhead-heading">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <nav className="w-full z-20 top-0 start-0 transition-colors duration-300">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3">
            <img src={logoImage} className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-bold whitespace-nowrap text-mainhead-heading">
              Brew & Beans
            </span>
          </a>
          <div className="hidden md:block">
            <ul className="flex items-center">
              <li>
                <button
                  onClick={onHomeClick}
                  className="block py-2 px-3 text-mainhead-heading"
                >
                  Home
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="flex items-center max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Adjusted Image Container */}
          <div className="flex justify-center md:justify-start">
            <img
              src={menuHeadImage}
              className="shrink-0 w-80 h-auto md:w-3/4"
              alt="Menu"
            />
          </div>

          {/* Right Side - Text */}
          <div className="space-y-4 text-center md:text-left">
            <h1 className="font-bold text-mainhead-heading text-4xl sm:text-4xl md:text-5xl lg:text-4xl">
              "A lot can happen over
            </h1>
            <p className="font-extrabold tracking-wide leading-none text-mainhead-heading md:text-5xl xl:text-6xl">
              {typedText}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="w-full bg-mainhead-heading font-extrabold text-white py-4">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center space-x-8">
          {Object.entries(tabData).map(([key, { label }]) => (
            <button
              key={key}
              className={`hover:text-gray-300 px-4 py-2 ${
                selectedTab === key ? "text-body underline" : ""
              }`}
              onClick={() => handleTabChange(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Display Selected Image */}
      <div className="w-full">
        <img
          src={tabData[selectedTab]?.image}
          className="w-full h-auto"
          alt={tabData[selectedTab]?.label}
        />
      </div>
    </>
  );
}

export default Menu;
