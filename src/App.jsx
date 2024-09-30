import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Herosection from './Components/Herosection';
import Menu from './Components/Menu';
import Footer from './Components/Footer';
// import OurBrews from './Components/OurBrews';
// import Contact from './Components/Contact';
// import About from './Components/About'
// import Navbar from './Components/Navbar';
import NotFound from './Components/NotFound'; // Ensure this is in the correct folder
import './App.css';

function App() {
  // State to track if the Menu component should be displayed
  const [showMenu, setShowMenu] = useState(false);

  // Function to toggle the menu view
  const handleViewMenuClick = () => {
    setShowMenu(true); // Set the state to true when the button is clicked
  };

  return (
    <Router>
      {/* Navbar will always be rendered */}
      

      {/* Define the routes */}
      <Routes>
        
        <Route
          path="/"
          element={
            !showMenu ? (
              <>
                
                <Herosection onMenuClick={handleViewMenuClick} />              
                
              </>
            ) : (
              <Menu />
            )
          }
        />

        {/* Catch-all route for non-existing paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer will always be rendered */}
      <Footer />
    </Router>
  );
}

export default App; 