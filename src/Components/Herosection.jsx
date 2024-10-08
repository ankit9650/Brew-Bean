import React from "react";
import OurBrews from "./OurBrews";
import About from "./About";
import Contact from "./Contact";
import heroImage from 'src/assets/hero.png'; // Import your image

function Herosection({ onMenuClick }) {
  return (
    <>
      <div id="hero-section">
        <section className="bg-body dark:bg-gray-900 p-2">
          <div className="grid w-full px-4 py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none text-mainhead-heading md:text-5xl xl:text-6xl dark:text-mainhead-heading">
                Brew & Beans
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                "Savor every sip, discover every bean—where coffee meets craft at Brew & Bean."
              </p>
              <button
                onClick={onMenuClick} // Trigger the onMenuClick when button is clicked
                className="inline-flex bg-mainhead-button items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg"
              >
                View Menu
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src={heroImage} alt="mockup" /> {/* Use the imported image */}
            </div>
          </div>
        </section>

        <hr />
        <OurBrews />
        <About />
        <Contact />
      </div>
    </>
  );
}

export default Herosection;
