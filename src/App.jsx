import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "../src/Pages/Menu/Menu";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import NotFound from "./Components/NotFound";
import Eshop from "../src/Pages/Eshop/E-shop"; // Import your E-Shop component
import Cart from "../src/Components/Cart"; // Adjust the path as necessary
import Checkout from "../src/Pages/Payment/Checkout"; // Adjust the path as necessary
import "./App.css";
import Home from "./Pages/Home/Home";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  // Function to handle Home button click from Menu component
  const handleHomeClick = () => {
    setShowMenu(false); // Set showMenu to false to show HeroSection again
  };

  return (
    <Router>
      {/* Define the routes */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/eshop" element={<Eshop />} /> {/* Add E-Shop route */}
        <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
        <Route path="/menu" element= {<Menu/>}/>
        <Route path="/checkout" element={<Checkout />} />{" "}
        {/* Add Checkout route */}
        {/* Catch-all route for non-existing paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer will always be rendered */}
      <Footer />
    </Router>
  );
}

export default App;
