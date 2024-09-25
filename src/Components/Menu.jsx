import React, { useState, useEffect } from 'react';

function Menu() {
  // State to manage loading
  const [isLoading, setIsLoading] = useState(true);
  // State to store the current image for the bottom section
  const [selectedImage, setSelectedImage] = useState('hotclassic.png'); // Initially show Coffee Specials

  // Function to handle navbar clicks
  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the loading time as needed (2000 ms = 2 seconds)

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

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
      <nav className={`w-full z-20 top-0 start-0 transition-colors duration-300`}>
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Logo Section */}
          <a href={"#"} className="flex items-center space-x-3">
            <img src="src/assets/logo.png" className="h-8" alt="Logo" />
            <span className={`self-center text-2xl font-bold whitespace-nowrap text-mainhead-heading`}>
              Brew & Beans
            </span>
          </a>

          {/* About Button */}
          <div className="hidden md:block">
            <ul className="flex items-center">
              <li>
                <a href="#" className={`block py-2 px-3 text-mainhead-heading`}>
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-16"> {/* Adjusted padding */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src="src/assets/menuhead.png"
              className="shrink-0 w-5/6 md:w-full"
              alt="Menu Image"
            />
          </div>

          {/* Right Side - Text */}
          <div className="space-y-4 text-center md:text-left">
            <h1 className="font-bold text-mainhead-heading text-4xl sm:text-5xl md:text-6xl lg:text-5xl">
              "A lot can happen over
            </h1>
            <p className="font-extrabold tracking-wide leading-none text-mainhead-heading md:text-5xl xl:text-6xl dark:text-mainhead-heading">
              Coffee"
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="w-full bg-mainhead-heading text-white py-4">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center space-x-8">
          <button
            className={`hover:text-gray-300 px-4 py-2 ${
              selectedImage === 'hotclassic.png' ? 'text-body' : ''
            }`}
            onClick={() => handleImageChange('hotclassic.png')}
          >
            Hot Classic
          </button>
          <button
            className={`hover:text-gray-300 px-4 py-2 ${
              selectedImage === 'alltimechiller.png' ? 'text-body' : ''
            }`}
            onClick={() => handleImageChange('alltimechiller.png')}
          >
            Chillers
          </button>
          <button
            className={`hover:text-gray-300 px-4 py-2 ${
              selectedImage === 'feedcoffees.png' ? 'text-body' : ''
            }`}
            onClick={() => handleImageChange('feedcoffees.png')}
          >
            Feed Coffees
          </button>
          <button
            className={`hover:text-gray-300 px-4 py-2 ${
              selectedImage === 'alltimedelight.png' ? 'text-body' : ''
            }`}
            onClick={() => handleImageChange('alltimedelight.png')}
          >
            Delight Stuff
          </button>
        </div>
      </div>

      {/* New Image Section Below the Navbar - Full Width */}
      <div className="w-full">
        {selectedImage && (
          <img
            src={`src/assets/${selectedImage}`}
            className="w-full h-auto"
            alt="Selected Menu Item"
          />
        )}
      </div>
    </>
  );
}

export default Menu;
