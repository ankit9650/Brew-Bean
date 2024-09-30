import React, { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Function to handle scroll and set state
  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-20 top-0 start-0 transition-colors duration-300 ${
          scrolled ? 'bg-mainhead-heading text-white' : 'bg-transparent text-gray-900'
        }`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="src/assets/logo.png" className="h-8" alt="Logo" />
            <span className={`self-center text-2xl font-bold whitespace-nowrap ${scrolled ? 'text-white' : 'text-mainhead-heading'}`}>
              Brew & Beans
            </span>
          </a>

          <div className="flex items-center md:hidden space-x-3 rtl:space-x-reverse">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
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
          </div>

          <div className="hidden w-full md:flex md:w-auto md:items-center">
            <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 w-full justify-end md:p-0 p-4">
              <li>
                <a
                  href="#"
                  className={`flex items-center block py-2 px-3 rounded md:p-0 ${
                    scrolled
                      ? 'text-white hover:text-gray-300'
                      : 'text-gray-900 hover:text-blue-700'
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
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className={`block py-2 px-3 rounded md:p-0 ${
                    scrolled
                      ? 'text-white hover:text-gray-300'
                      : 'text-gray-900 hover:text-blue-700'
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
                      ? 'text-white hover:text-gray-300'
                      : 'text-gray-900 hover:text-blue-700'
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
                      ? 'text-white hover:text-gray-300'
                      : 'text-gray-900 hover:text-blue-700'
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
