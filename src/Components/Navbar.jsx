import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo.png"; // Dynamic import for logo

function Navbar({ onEshopclick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEshopClick = () => {
    navigate("/eshop");
    if (onEshopclick) onEshopclick();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-20 top-0 transition-colors duration-300 ${
          scrolled ? "bg-mainhead-heading text-white" : "bg-transparent text-gray-900"
        }`}
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} className="h-8" alt="Logo" />
            <span
              className={`self-center text-2xl font-bold ${
                scrolled ? "text-white" : "text-mainhead-heading"
              }`}
            >
              Brew & Beans
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:items-center`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 w-full justify-end p-4 md:p-0">
              <li>
                <button
                  onClick={handleEshopClick}
                  className={`flex items-center block py-2 px-3 rounded md:p-0 ${
                    scrolled
                      ? "text-white hover:text-gray-300"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  E-Shop
                  <span className="ml-2">
                    <img
                      width="22px"
                      src="https://img.icons8.com/?size=100&id=gD6jY1ZThEJD&format=png&color=000000"
                      alt="Cart Icon"
                      className="align-middle"
                    />
                  </span>
                </button>
              </li>
              <li>
                <a
                  href="#about"
                  className={`block py-2 px-3 rounded md:p-0 ${
                    scrolled
                      ? "text-white hover:text-gray-300"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#Ourbrews"
                  className={`block py-2 px-3 rounded md:p-0 ${
                    scrolled
                      ? "text-white hover:text-gray-300"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  Our Brews
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`block py-2 px-3 rounded md:p-0 ${
                    scrolled
                      ? "text-white hover:text-gray-300"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
