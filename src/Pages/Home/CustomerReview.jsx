import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faQuoteLeft,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const reviews = [
  {
    id: 1,
    name: "Ankit Prabhakeer",
    role: "Coffee Shop Owner",
    rating: 5,
    review:
      "The quality of these coffee beans is exceptional. My customers keep coming back for that rich, aromatic experience. Truly the best beans I've worked with in 10 years.",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFrMf6Vn9aXHA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698210126887?e=1755734400&v=beta&t=LeL47MRg7otJGbHOHHT8j9GB0DV8pwqsfVRTczRxjLU",
  },
  {
    id: 2,
    name: "Carlos Mendez",
    role: "Home Brewer",
    rating: 4.5,
    review:
      "As someone who appreciates specialty coffee, I can confidently say these single-origin beans deliver complex flavors that rival the best cafes. My morning ritual just got upgraded!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Sophia Kim",
    role: "Barista Champion",
    rating: 5,
    review:
      "The consistency and freshness of these beans is remarkable. Perfect for espresso - I get creamy texture and balanced acidity every time. A barista's dream to work with.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Coffee Blogger",
    rating: 4,
    review:
      "I've sampled hundreds of coffees worldwide, and this stands among the top. The tasting notes are accurate and pronounced. Just wish the seasonal blends lasted longer!",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStarHalfAlt}
          className="text-yellow-500"
        />
      );
    } else {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStarRegular}
          className="text-yellow-500"
        />
      );
    }
  }

  return <div className="flex space-x-1">{stars}</div>;
};

function CustomerReview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const nextReview = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 text-sm font-semibold text-amber-800 bg-amber-200 rounded-full mb-4 uppercase tracking-wider">
            Coffee Lovers' Voices
          </span>
          <p className="mt-2 text-xl text-white max-w-2xl mx-auto">
            Join thousands of satisfied coffee enthusiasts
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Coffee bean decorative elements */}
          <div className="absolute -top-12 -left-12 w-24 h-24 opacity-10">
            <svg viewBox="0 0 100 100" className="text-amber-700 fill-current">
              <path d="M50 15C30 15,15 30,15 50C15 70,30 85,50 85C70 85,85 70,85 50C85 30,70 15,50 15M50 20C67 20,80 33,80 50C80 67,67 80,50 80C33 80,20 67,20 50C20 33,33 20,50 20" />
            </svg>
          </div>

          {/* Review card */}
          <div
            className={`bg-coffee-coco p-10 rounded-2xl shadow-lg relative overflow-hidden border border-amber-200 transition-all duration-500 transform ${
              direction === "right"
                ? "animate-slide-in-right"
                : "animate-slide-in-left"
            }`}
          >
            {/* Coffee stain effect */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-amber-100 opacity-10"></div>

            {/* Quote icon */}
            <div className="absolute top-8 left-8 text-darkchocolate text-5xl">
              <FontAwesomeIcon icon={faQuoteLeft} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-8">
                <StarRating rating={reviews[currentIndex].rating} />
              </div>

              <p className="text-xl text-white italic mb-10 leading-relaxed font-serif">
                "{reviews[currentIndex].review}"
              </p>

              <div className="flex items-center">
                <img
                  className="h-14 w-14 rounded-full object-cover border-2 border-amber-600"
                  src={reviews[currentIndex].avatar}
                  alt={reviews[currentIndex].name}
                />
                <div className="ml-5">
                  <h4 className="text-lg font-bold text-[#F3E5AB]">
                    {reviews[currentIndex].name}
                  </h4>
                  <p className="text-[#E6C28B]">
                    {" "}
                    {/* Latte shade for role */}
                    {reviews[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-16 bg-darkchocolate p-3 rounded-full shadow-lg hover:bg-amber-700 focus:outline-none transition-all duration-300 hover:scale-110 text-white"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-16 bg-darkchocolate p-3 rounded-full shadow-lg hover:bg-amber-700 focus:outline-none transition-all duration-300 hover:scale-110 text-white"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
          </button>

          {/* Dots indicator styled like coffee beans */}
          <div className="flex justify-center mt-10 space-x-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? "right" : "left");
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-amber-600 w-6" : "bg-amber-200"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add these styles to your global CSS or CSS-in-JS solution */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slide-in-left {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default CustomerReview;
