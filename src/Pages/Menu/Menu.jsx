import React, { useState } from "react";

// Import images
import menuHeadImage from "../../../public/assets/menuhead.png";
import hotClassicImage from "../../../public/assets/hotclassic.png";
import allTimeChillerImage from "../../../public/assets/alltimechiller.png";
import feedCoffeesImage from "../../../public/assets/feedcoffees.png";
import allTimeDelightImage from "../../../public/assets/alltimedelight.png";

function Menu() {
  const [selectedTab, setSelectedTab] = useState("hotclassic"); // Default tab

  const tabData = {
    hotclassic: { label: "Hot Classic", image: hotClassicImage },
    chillers: { label: "Chillers", image: allTimeChillerImage },
    feedcoffees: { label: "Feed Coffees", image: feedCoffeesImage },
    delight: { label: "Delight Stuff", image: allTimeDelightImage },
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex items-center max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src={menuHeadImage}
              className="shrink-0 w-80 h-auto md:w-3/4"
              alt="Menu Header"
            />
          </div>

          {/* Right Side Text */}
          <div className="space-y-4 text-center md:text-left">
            <h1 className="font-bold text-mainhead-heading text-4xl sm:text-4xl md:text-5xl lg:text-4xl">
              "A lot can happen over Coffee"
            </h1>
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
              onClick={() => setSelectedTab(key)}
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
