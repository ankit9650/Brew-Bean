import React, { useState, useEffect } from "react";
import ECard from "./ECard";
import Cart from "./Cart"; // Import the Cart component

function Eshop() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(1);
    const [cartItems, setCartItems] = useState([]); // State for cart items
    const [isCartOpen, setIsCartOpen] = useState(false); // State to manage cart visibility

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const addToCart = (item, quantity) => {
        setCartItems(prevItems => {
            // Check if the item is already in the cart
            const existingItem = prevItems.find(cartItem => cartItem.title === item.title);
            if (existingItem) {
                // Update the quantity if it exists
                return prevItems.map(cartItem =>
                    cartItem.title === item.title
                        ? { ...cartItem, quantity: cartItem.quantity + quantity }
                        : cartItem
                );
            }
            // If it doesn't exist, add it to the cart
            return [...prevItems, { ...item, quantity }];
        });
        setIsCartOpen(false); // Close cart after adding item
    };

    // Calculate total price of items in cart
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

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

    const renderTabContent = () => {
        switch (activeTab) {
            case 1:
                return (
                    <div className="flex flex-col items-center">
                        <div className="flex justify-center mt-8 space-x-4 p-4">
                            <ECard image="https://m.media-amazon.com/images/I/51ajQfHc6QL.jpg" title="Arabica Coffee Beans" description="Arabica beans are larger, sweeter, and more expensive than their prime competition, the Robusta." price="1090" addToCart={addToCart} />
                            <ECard image="https://m.media-amazon.com/images/I/518qXcokIZL.jpg" title="Robusta Coffee Beans" description="Robusta beans have almost double the caffeine content of Arabica beans and are known for a stronger and more bitter taste and smell." price="900" addToCart={addToCart} />
                            <ECard image="https://kopicha.com/wp-content/uploads/2021/01/Arabica-Catimor.jpg" title="Catimor Coffee Beans" description="Catimor beans are a hybrid between Caturra & Timor beans which is where their unique name comes from" price="890" addToCart={addToCart} />
                        </div>
                        <div className="flex justify-center mt-0 space-x-4 p-4">
                            <ECard image="https://www.gitagged.com/wp-content/uploads/2020/12/Darjeeling-Black-tea-A2.jpg" title="Darjeeling Tea" description="Our Organic/Biodynamic Darjeeling 1st flush is harvested in mid-March following the spring rains and produces a sharp, clear, taste. Slightly astringent, makes a light golden cup." price="650" addToCart={addToCart} />
                            <ECard image="https://tasteofchai.in/cdn/shop/files/JasmineTea.jpg?v=1693488614" title="Jasmine Petals Tea" description="A smooth, delicate liquor is produced from organic green tea infused with the fragrance of jasmine petals" price="760" addToCart={addToCart} />
                            <ECard image="https://uk.ahmadtea.com/cdn/shop/products/20FApricotface1_600x600_crop_center.jpg?v=1634899183" title="Apricot Black Tea" description="A blend of Nepali black tea, fruity and floral notes" price="850" addToCart={addToCart} />
                        </div>
                    </div>
                    
                );
                case 2:
                  return (
                    <div className="flex flex-col items-center">
               
                      <div className="flex justify-center mt-8 space-x-4 p-4">
                        <ECard image="https://5.imimg.com/data5/SELLER/Default/2023/10/355068045/LM/XC/UW/199268574/coca-cola-cold-drink-bottle-size-500-ml-for-instant-refreshment.jpg" title="Coca Cola" description="Coca-Cola is a sweetened, carbonated beverage that is manufactured by the Coca-Cola Company. "  price="150"/>
                        <ECard image="https://snackstar.in/cdn/shop/products/532b3a20-33f9-495f-b8e5-c3f9bb769888.jpg?v=1598346308" title="Monster Energy Drink" description="Fueling our athletes, musicians, and fans, Monster Energy produces a variety of energy drinks, brewed coffee, hydrating sports drinks, juices and teas." price="90"/>
                        <ECard image="https://m.media-amazon.com/images/I/41oUx8AurjL.jpg" title="Prime Drink" description="Prime is a range of sports drinks, drink mixes, and energy drinks created and marketed by Prime Hydration, LLC." price="650"/>
                      </div>
                      <div className="flex justify-center mt-0 space-x-4 p-4">
                        <ECard image="https://www.tasteofhome.com/wp-content/uploads/2018/01/Country-Ham-Sandwiches_EXPS_FT23_25769_ST_1219_8.jpg" title="Sandwiches" description="A classic sandwich made with cheese melted between two slices of bread." price="150"/>
                        <ECard image="https://kwalitybakery.in/wp-content/uploads/2021/11/Patties-1.jpeg" title="Veg Patty" description="These ingredients are often combined with breadcrumbs, eggs (or a vegan egg substitute), and spices to create a patty-shaped patty." price="50"/>
                        <ECard image="https://theeburgerdude.com/wp-content/uploads/2022/09/9093e9_0c4e70b12b0843d3a2c78207361932d1_mv2.webp" title="Burgers" description=" A burger with a slice of cheese melted on top.The patty can be made from various types of meat, such as beef, pork, chicken, lamb, or even fish." price="250"/>
                      </div>
                    </div>
                  );
                case 3:
                  return (
                    <div className="flex flex-col items-center">
                    
                      <div className="flex justify-center mt-8 space-x-4 p-4">
                        <ECard image="https://images-cdn.ubuy.co.in/63b6398bc4f6ff2853297733-stainless-steel-thermos-coffee-mug.jpg" title="Stainless Steel Black Mug" description="A stainless steel black mug is a durable and stylish drinking vessel that offers both functionality and aesthetic appeal. " price="499"/>
                        <ECard image="https://m.media-amazon.com/images/I/51+vA2qAe9L._AC_UF894,1000_QL80_.jpg" title="Electric Frother" description="An electric frother is a small, handheld device used to create a frothy texture in liquids. " price="450" />
                        <ECard image="https://m.media-amazon.com/images/I/51sYkcpkeWL._AC_UF894,1000_QL80_.jpg" title="Coffee Sipper" description="Coffee sippers appreciate the ritual of drinking coffee and enjoy the experience as much as the taste." price="650" />
                      </div>
                      <div className="flex justify-center mt-0 space-x-4 p-4">
                        <ECard image="https://5.imimg.com/data5/SELLER/Default/2022/2/MJ/YL/HL/3541922/s-l1600.jpg" title="Coffee Sachets" description="50 Sachets of Nescafe coffee with different flavours and Brews" price="250"/>
                        <ECard image="https://nutcaseshop.com/cdn/shop/products/NC-CUS-TUMCFF-WHITE-0016b.jpg?v=1675255052" title="Travel Coffee Mug" description="A convenient way to enjoy your favorite hot beverages while commuting, traveling, or simply enjoying the outdoors." price="780" />
                        <ECard image="https://homafy.com/wp-content/uploads/2023/03/customized-mugs-for-girl-Copy.jpg" title="Customizable Mugs" description="Give a personalized mug to a friend, family member, or loved one.Look for a mug that is well-made and durable" price="799"/>
                      </div>
                    </div>)
           
            default:
                return null;
        }
    };

    return (
        <>
            {/* Navbar */}
            <nav className={`w-full z-20 top-0 start-0 transition-colors duration-300`}>
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    {/* Logo Section */}
                    <a href={"#"} className="flex items-center space-x-3">
                        <img src="src/assets/logo.png" className="h-8" alt="Logo" />
                        <span className={`self-center text-2xl font-bold whitespace-nowrap text-mainhead-heading`}>
                            Brew & Beans
                        </span>
                    </a>

                    {/* About Button */}
                    <div className="hidden md:block">
                        <ul className="flex items-center">
                            <li>
                                <button
                                    onClick={() => navigate('/')} // Navigate to Home on button click
                                    className={`block py-2 px-3 text-mainhead-heading`}
                                >
                                    Home
                                </button>
                            </li>
                            <li>
    <button
        onClick={toggleCart} // Toggle cart visibility
        className="block py-2 px-3 flex items-center text-mainhead-heading"
    >
        <span className="mr-2">Cart</span>
        <img
            width="22px"
            src="https://img.icons8.com/?size=100&id=fZYPODg2sGJm&format=png&color=000000"
            alt="Cart Icon"
            className="align-middle"
        />
        {/* Show item count only if there are items in the cart */}
        {cartItems.length > 0 && (
            <span className="ml-2 badge badge-secondary">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
        )}
    </button>
</li>

                        </ul>
                    </div>
                </div>
            </nav>
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

            {/* Cart Component */}
            {isCartOpen && (
                <Cart 
                    cartItems={cartItems} 
                    total={total} 
                    onClose={toggleCart} 
                />
            )}
        </>
    );
}

export default Eshop;
