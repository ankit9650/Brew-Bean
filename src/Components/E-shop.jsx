import React, { useState, useEffect } from "react";
import ECard from "./ECard";

function Eshop() {
  // State to manage loading
  const [isLoading, setIsLoading] = useState(true);
  // State to track the active tab
  const [activeTab, setActiveTab] = useState(1);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000); // Adjust the time as needed

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-infinity loading-lg bg-mainhead-heading" />
        <div className="loader text-mainhead-heading">
          Welcome to E-Shop...
        </div>
      </div>
    );
  }

  // Render different content for each tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold">Coffee & Tea</h2>
            <div className="flex justify-center mt-8 space-x-4 p-4">
              <ECard image="https://m.media-amazon.com/images/I/51ajQfHc6QL.jpg" title="Arabica Coffee Beans" description="Arabica beans are larger, sweeter, and more expensive than their prime competition, the Robusta." />
              <ECard image="https://m.media-amazon.com/images/I/518qXcokIZL.jpg" title="Robusta Coffee Beans" description="Robusta beans have almost double the caffeine content of Arabica beans and are known for a stronger and more bitter taste and smell." />
              <ECard image="https://kopicha.com/wp-content/uploads/2021/01/Arabica-Catimor.jpg" title="Catimor Coffee Beans" description="Catimor beans are a hybrid between Caturra & Timor beans which is where their unique name comes from" />
              
            </div>
            <div className="flex justify-center mt-0 space-x-4 p-4">
              <ECard image="https://www.gitagged.com/wp-content/uploads/2020/12/Darjeeling-Black-tea-A2.jpg" title="Darjeeling Tea" description="Our Organic/Biodynamic Darjeeling 1st flush is harvested in mid-March following the spring rains and produces a sharp, clear, taste. Slightly astringent, makes a light golden cup. " />
              <ECard image="https://tasteofchai.in/cdn/shop/files/JasmineTea.jpg?v=1693488614" title="Jasmine Petals Tea" description="A smooth, delicate liquor is produced from organic green tea infused with the fragrance of jasmine petals" />
              <ECard image="https://uk.ahmadtea.com/cdn/shop/products/20FApricotface1_600x600_crop_center.jpg?v=1634899183" title="Apricot Black Tea" description="A blend of Nepali black tea, fruity and floral notes" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold">Beverages</h2>
            <div className="flex justify-center mt-8 space-x-4 p-4">
              <ECard image="https://5.imimg.com/data5/SELLER/Default/2023/10/355068045/LM/XC/UW/199268574/coca-cola-cold-drink-bottle-size-500-ml-for-instant-refreshment.jpg" title="Coca Cola" description="Coca-Cola is a sweetened, carbonated beverage that is manufactured by the Coca-Cola Company. " />
              <ECard image="https://snackstar.in/cdn/shop/products/532b3a20-33f9-495f-b8e5-c3f9bb769888.jpg?v=1598346308" title="Monster Energy Drink" description="Fueling our athletes, musicians, and fans, Monster Energy produces a variety of energy drinks, brewed coffee, hydrating sports drinks, juices and teas." />
              <ECard image="https://m.media-amazon.com/images/I/41oUx8AurjL.jpg" title="Prime Drink" description="Prime is a range of sports drinks, drink mixes, and energy drinks created and marketed by Prime Hydration, LLC." />
            </div>
            <div className="flex justify-center mt-0 space-x-4 p-4">
              <ECard image="https://www.tasteofhome.com/wp-content/uploads/2018/01/Country-Ham-Sandwiches_EXPS_FT23_25769_ST_1219_8.jpg" title="Sandwiches" description="A classic sandwich made with cheese melted between two slices of bread." />
              <ECard image="https://kwalitybakery.in/wp-content/uploads/2021/11/Patties-1.jpeg" title="Veg Patty" description="These ingredients are often combined with breadcrumbs, eggs (or a vegan egg substitute), and spices to create a patty-shaped patty." />
              <ECard image="https://theeburgerdude.com/wp-content/uploads/2022/09/9093e9_0c4e70b12b0843d3a2c78207361932d1_mv2.webp" title="Burgers" description=" A burger with a slice of cheese melted on top.The patty can be made from various types of meat, such as beef, pork, chicken, lamb, or even fish." />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold">Mugs & Accessories</h2>
            <div className="flex justify-center mt-8 space-x-4 p-4">
              <ECard image="https://images-cdn.ubuy.co.in/63b6398bc4f6ff2853297733-stainless-steel-thermos-coffee-mug.jpg" title="Stainless Steel Black Mug" description="Description of Product M" />
              <ECard image="https://m.media-amazon.com/images/I/51+vA2qAe9L._AC_UF894,1000_QL80_.jpg" title="Electric Frother" description="Description of Product N" />
              <ECard image="https://m.media-amazon.com/images/I/51sYkcpkeWL._AC_UF894,1000_QL80_.jpg" title="Coffee Sipper" description="Description of Product O" />
            </div>
            <div className="flex justify-center mt-0 space-x-4 p-4">
              <ECard image="https://5.imimg.com/data5/SELLER/Default/2022/2/MJ/YL/HL/3541922/s-l1600.jpg" title="Coffee Sachets" description="Description of Product P" />
              <ECard image="https://nutcaseshop.com/cdn/shop/products/NC-CUS-TUMCFF-WHITE-0016b.jpg?v=1675255052" title="Travel Coffee Mug" description="Description of Product Q" />
              <ECard image="https://homafy.com/wp-content/uploads/2023/03/customized-mugs-for-girl-Copy.jpg" title="Customizable Mugs" description="Description of Product R" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Tab List */}
      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={`tab ${activeTab === 1 ? 'tab-active' : 'text-mainhead-heading'}`}
          onClick={() => setActiveTab(1)}
        >
          Coffee & Tea
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 2 ? 'tab-active' : ''} text-mainhead-heading`}
          onClick={() => setActiveTab(2)}
        >
          Beverages
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 3 ? 'tab-active' : ''} text-mainhead-heading`}
          onClick={() => setActiveTab(3)}
        >
          Mugs & Accessories
        </a>
      </div>

      {/* Tab Content */}
      <div className="mt-4 overflow-hidden">
        {renderTabContent()}
      </div>
    </>
  );
}

export default Eshop;
