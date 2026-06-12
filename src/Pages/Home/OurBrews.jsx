import React from "react";

const brews = [
  {
    id: 1,
    title: "Espresso",
    description: "A strong and bold coffee shot.",
    imageUrl: "/assets/espresso.jpg",
  },
  {
    id: 2,
    title: "Cappuccino",
    description: "A creamy coffee with steamed milk foam.",
    imageUrl: "/assets/capp.jpg",
  },
  {
    id: 3,
    title: "Latte",
    description: "Smooth coffee with a lot of steamed milk.",
    imageUrl: "/assets/latte.jpg",
  },
  {
    id: 4,
    title: "Tea",
    description: "A soothing beverage for every occasion.",
    imageUrl: "/assets/tea.jpg",
  },
  {
    id: 5,
    title: "Mocha",
    description: "A delightful blend of chocolate and coffee.",
    imageUrl: "/assets/mocha.jpeg",
  },
  {
    id: 6,
    title: "Frappe",
    description: "A chilled coffee treat for warm days.",
    imageUrl: "/assets/Frappe.jpg",
  },
];

function OurBrews() {
  return (
    <div className="w-full mt-5 flex flex-col items-center" id="Ourbrews">
      <h1 className="max-w-xl text-center mb-8 text-xl font-bold tracking-tight leading-none text-mainhead-heading md:text-2xl xl:text-5xl">
        Our Brews
      </h1>

      <div className="carousel w-full scroll-smooth">
        {brews.map((item) => (
          <div
            className="carousel-item relative w-72 h-80 md:h-96 group"
            key={item.id}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition duration-300 group-hover:brightness-50"
            />
            <div className="absolute inset-0 flex flex-col justify-end items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="text-sm text-white text-center">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-screen-md text-center mt-8 px-4">
        <p className="text-lg text-menu-para">
          Discover the rich flavors and aromas of our curated coffee selection.
          Each brew tells a story, whether it's the robust Espresso that kickstarts
          your day or the indulgent Mocha that treats your taste buds.
        </p>
      </div>
    </div>
  );
}

export default OurBrews;
