import React, { useState, useEffect, useRef } from "react";

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 16);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function About() {
  const { count: happyClients, ref } = useCountUp(1050);

  return (
    <section id="about" className="py-24 relative xl:mr-0 lg:mr-5 mr-0" ref={ref}>
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                <h6 className="text-gray-400 text-base font-normal leading-relaxed">
                  About Us
                </h6>
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 className="text-coffee-coco text-4xl font-bold leading-normal lg:text-start text-center">
                    The Tale of{" "}
                    <span className="text-mainhead-heading italic">
                      "Brew & Bean"
                    </span>
                  </h2>
                  <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    In the heart of a bustling city, nestled between towering
                    skyscrapers and quaint cobblestone streets, stood Brew &
                    Bean. What began as a humble coffee cart on a street corner
                    soon transformed into a beloved haven for coffee enthusiasts,
                    artists, and dreamers alike.
                  </p>
                </div>
              </div>
              <div className="w-full flex-col justify-center items-start gap-6 flex">
                <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-mainhead-heading transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 text-2xl font-bold">10+ Stores</h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      Across the city, serving every neighborhood
                    </p>
                  </div>
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 text-2xl font-bold">125+ Products</h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      Curated beans, brews, and accessories
                    </p>
                  </div>
                </div>
                <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  <div className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 text-2xl font-bold">Visit Us</h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      Open daily 7 AM – 10 PM, every day of the year
                    </p>
                  </div>
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 text-2xl font-bold">
                      {happyClients.toLocaleString()}+ Happy Clients
                    </h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      And growing every day
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button className="sm:w-fit border border-mainhead-heading w-full group px-3.5 py-2 bg-body hover:bg-mainhead-heading rounded-lg shadow-sm transition-all duration-700 ease-in-out justify-center items-center flex">
              <span className="px-1.5 text-mainhead-heading group-hover:text-body text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                Read More
              </span>
              <svg
                className="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out fill-current text-mainhead-heading group-hover:text-body"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="w-full lg:justify-start justify-center items-start flex">
            <div className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-about-img rounded-3xl sm:border border-about-img relative">
              <img
                className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                src="/assets/about.jpg"
                alt="About Brew & Bean"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
