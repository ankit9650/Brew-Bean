import React from "react";
import Herosection from "./Herosection";
import OurBrews from "./OurBrews";
import About from "./About";
import Contact from "./Contact";

function Home() {
  return (
    <div>
     <Herosection/>
      <OurBrews />
      <About />
      <Contact />
    </div>
  );
}

export default Home;
