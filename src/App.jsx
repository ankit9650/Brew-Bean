import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Menu from "../src/Pages/Menu/Menu";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import NotFound from "./Components/NotFound";
import Eshop from "../src/Pages/Eshop/E-shop";
import Cart from "../src/Components/Cart";
import Checkout from "../src/Pages/Payment/Checkout";
import "./App.css";
import Home from "./Pages/Home/Home";
import VoiceAssistant from "./Pages/AiFeatures/VoiceAssistant";
import { toast } from "react-toastify";

// Wrapper component so useNavigate can be used
const AppWrapper = () => {
  const navigate = useNavigate();

  const handleVoiceCommand = (text) => {
    const command = text.toLowerCase();

    if (/menu|our brews|show menu/.test(command)) {
      navigate("/menu");
    } else if (/home|go home/.test(command)) {
      navigate("/");
    } else if (/cart|shopping cart|open cart/.test(command)) {
      navigate("/cart");
    } else if (/checkout|pay/.test(command)) {
      navigate("/checkout");
    } else if (/shop|e-shop|open shop/.test(command)) {
      navigate("/eshop");
    } else {
      toast.warn("❓ Sorry, I didn’t catch that command.");
      console.log("Command not recognized.");
    }
  };
  const hideNavbarRoutes = ["/menu", "/eshop"]; // add other routes where you want to hide it

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <VoiceAssistant onCommandDetected={handleVoiceCommand} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eshop" element={<Eshop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
