import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Herosection from './Components/Herosection';
import Menu from './Components/Menu';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import NotFound from './Components/NotFound';
import Eshop from './Components/E-shop'; // Import your E-Shop component
import './App.css';

function App() {
  // State to track if the Menu component should be displayed
  const [showMenu, setShowMenu] = useState(false);
  
  // Function to toggle the menu view
  const handleViewMenuClick = () => {
    setShowMenu(true);
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
              <Menu />
            )
          }
        />
        
        <Route path="/eshop" element={<Eshop />} /> {/* Add E-Shop route */}
        
        {/* Catch-all route for non-existing paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer will always be rendered */}
      <Footer />
    </Router>
  );
}

export default App;
