import React, { useState } from 'react';
import Herosection from './Components/Herosection';
import Menu from './Components/Menu';
import Footer from './Components/Footer';
import About from './Components/About';
import OurBrews from './Components/OurBrews';
import Contact from './Components/Contact';
import './App.css';
import Navbar from './Components/Navbar';

function App() {
  const [showMenu, setShowMenu] = useState(false); // State to control whether to show the Menu component

  const handleViewMenuClick = () => {
    setShowMenu(true); // Change state to show the Menu component
  };

  return (
    <>
    
      {/* Conditionally render the content */}
      {!showMenu ? (
        <>
          {/* Main sections */}
          <Navbar/>
          <Herosection onMenuClick={handleViewMenuClick} /> {/* Pass down the handler */}
          <OurBrews />
          <About />
          <Contact />
        </>
      ) : (
        <Menu /> // Render Menu when showMenu is true
      )}

      {/* Footer should always be rendered */}
      <Footer />
    </>
  );
}

export default App;
