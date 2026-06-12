import React from "react";
import Herosection from "./Herosection";
import FeaturedCollection from "./FeaturedCollection";
import CoffeeStory from "./CoffeeStory";
import BestSellers from "./BestSellers";
import SeasonalSpecials from "./SeasonalSpecials";
import Testimonials from "./Testimonials";
import Experience from "./Experience";
import Newsletter from "./Newsletter";
import Contact from "./Contact";

function Home() {
  return (
    <main>
      <Herosection />
      <FeaturedCollection />
      <CoffeeStory />
      <BestSellers />
      <SeasonalSpecials />
      <Testimonials />
      <Experience />
      <Newsletter />
      <Contact />
    </main>
  );
}

export default Home;
