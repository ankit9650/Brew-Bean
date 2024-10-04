import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Herosection from './Components/Herosection';
import Menu from './Components/Menu';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import NotFound from './Components/NotFound';
import Eshop from './Components/E-shop'; // Import your E-Shop component
import Cart from "./Components/Cart"; // Adjust the path as necessary
import Checkout from "./Components/Checkout"; // Adjust the path as necessary
import './App.css';

function App() {
  const [showMenu, setShowMenu] = useState(false);

  // Function to toggle the menu view
  const handleViewMenuClick = () => {
    setShowMenu(true);
  };

  // Function to handle Home button click from Menu component
  const handleHomeClick = () => {
    setShowMenu(false);  // Set showMenu to false to show HeroSection again
  };

  return (
    <Router>
      {/* Define the routes */}
      <Routes>
        <Route
          path="/"
          element={
            !showMenu ? (
              <>
                <Navbar />
                <Herosection onMenuClick={handleViewMenuClick} />              
              </>
            ) : (
              <Menu onHomeClick={handleHomeClick} />  // Pass handleHomeClick to Menu component
            )
          }
        />
        
        <Route path="/eshop" element={<Eshop />} /> {/* Add E-Shop route */}
        <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
        <Route path="/checkout" element={<Checkout />} /> {/* Add Checkout route */}
        
        {/* Catch-all route for non-existing paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer will always be rendered */}
      <Footer />
    </Router>
  );
}

export default App;
