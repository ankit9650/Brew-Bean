import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useTypewriter from './Hook/Typewriter'; // Ensure the typewriter hook is imported

// Update paths based on your folder structure
import logoImage from '../assets/logo.png'; // Corrected path
import menuHeadImage from '../assets/menuhead.png'; // Corrected path
import hotClassicImage from '../assets/hotclassic.png'; // Corrected path
import allTimeChillerImage from '../assets/alltimechiller.png'; // Corrected path
import feedCoffeesImage from '../assets/feedcoffees.png'; // Corrected path
import allTimeDelightImage from '../assets/alltimedelight.png'; // Corrected path

function Menu({ onHomeClick }) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(hotClassicImage); // Default image
  const navigate = useNavigate();
  const location = useLocation();

  // Use the typewriter effect
  const typedText = useTypewriter('Coffee', 250); // Typewriter effect for "Coffee"

  const handleImageChange = (image) => {
    setSelectedImage(image);
    navigate(`?image=${image}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const imageParam = params.get('image');
    if (imageParam) {
      // Check if the image exists in the imported images
      switch (imageParam) {
        case 'hotclassic.png':
          setSelectedImage(hotClassicImage);
          break;
        case 'alltimechiller.png':
          setSelectedImage(allTimeChillerImage);
          break;
        case 'feedcoffees.png':
          setSelectedImage(feedCoffeesImage);
          break;
        case 'alltimedelight.png':
          setSelectedImage(allTimeDelightImage);
          break;
        default:
          setSelectedImage(hotClassicImage); // Fallback to default
          break;
      }
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
      <nav className={`w-full z-20 top-0 start-0 transition-colors duration-300`}>
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Logo Section */}
          <a href={"#"} className="flex items-center space-x-3">
            <img src={logoImage} className="h-8" alt="Logo" />
            <span className={`self-center text-2xl font-bold whitespace-nowrap text-mainhead-heading`}>
              Brew & Beans
            </span>
          </a>

          {/* Home Button */}
          <div className="hidden md:block">
            <ul className="flex items-center">
              <li>
                <button
                  onClick={onHomeClick}  // onClick calls the passed down function
                  className={`block py-2 px-3 text-mainhead-heading`}
                >
                  Home
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src={menuHeadImage} // Use the imported image
              className="shrink-0 w-5/6 md:w-full"
              alt="Menu Image"
            />
          </div>

          {/* Right Side - Text */}
          <div className="space-y-4 text-center md:text-left">
            <h1 className="font-bold text-mainhead-heading text-4xl sm:text-5xl md:text-6xl lg:text-5xl">
              "A lot can happen over
            </h1>
            <p className="font-extrabold tracking-wide leading-none text-mainhead-heading md:text-5xl xl:text-6xl">
              {typedText} {/* Render the typed text */}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="w-full bg-mainhead-heading font-extrabold text-white py-4">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center space-x-8">
          <button
            className={`hover:text-gray-300 px-4 py-2 ${selectedImage === hotClassicImage ? 'text-body' : ''}`}
            onClick={() => handleImageChange(hotClassicImage)}
          >
            Hot Classic
          </button>
          <button
            className={`hover:text-gray-300 px-4 py-2 ${selectedImage === allTimeChillerImage ? 'text-body' : ''}`}
            onClick={() => handleImageChange(allTimeChillerImage)}
          >
            Chillers
          </button>
          <button
            className={`hover:text-gray-300 px-4 py-2 ${selectedImage === feedCoffeesImage ? 'text-body' : ''}`}
            onClick={() => handleImageChange(feedCoffeesImage)}
          >
            Feed Coffees
          </button>
          <button
            className={`hover:text-gray-300 px-4 py-2 ${selectedImage === allTimeDelightImage ? 'text-body' : ''}`}
            onClick={() => handleImageChange(allTimeDelightImage)}
          >
            Delight Stuff
          </button>
        </div>
      </div>

      {/* New Image Section Below the Navbar - Full Width */}
      <div className="w-full">
        {selectedImage && (
          <img
            src={selectedImage}  // Use the currently selected image
            className="w-full h-auto"
            alt="Selected Menu Item"
          />
        )}
      </div>
    </>
  );
}

export default Menu;
