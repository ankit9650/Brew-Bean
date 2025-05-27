// Components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from '../../public/assets/notFound.png'; // Adjust the path to your image

function NotFound() {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto">
        {/* Coffee cup image */}
        <img 
          src={notFoundImage} 
          alt="Spilled coffee" 
          className="w-60 h-60 mx-auto animate-slowBounce"
        />
        
        {/* 404 Text */}
        <h1 className="text-5xl font-bold text-amber-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-amber-800 mb-2">Brew Not Found</h2>
        
        {/* Message */}
        <p className="text-amber-700 mb-8 text-lg">
          Oops! The page you're looking for has disappeared like the last sip of coffee.
          <br />
          Let's get you back to something delicious.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-full transition-all hover:scale-105 shadow-lg"
          >
            Back to Home
          </Link>
          <Link 
            to="/eshop" 
            className="px-6 py-3 border-2 border-amber-700 text-amber-700 hover:bg-amber-50 font-medium rounded-full transition-all hover:scale-105"
          >
            Visit E-shop 
          </Link>
        </div>
        
        {/* Coffee stains decoration */}
        <div className="mt-12 flex justify-center space-x-8 opacity-30">
          <div className="w-12 h-12 rounded-full bg-amber-300"></div>
          <div className="w-8 h-8 rounded-full bg-amber-400"></div>
          <div className="w-10 h-10 rounded-full bg-amber-300"></div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;