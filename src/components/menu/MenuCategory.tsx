import { useState } from "react";

const categories = ["All", "Meat", "Cheese", "Others"];

const MenuCategory = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
    <div className="flex lg:hidden flex-col w-80 mx-auto mt-[50px]">
      <h2 className="text-center text-xl font-semibold">Categories</h2>
      <ul className="flex justify-between py-5">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <li
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-200`}
              style={{
                backgroundColor: isActive ? "#8E5927" : "transparent",
                color: isActive ? "white" : "#1A202C",
              }}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
    {/* Sidebar */}
    <aside className="hidden lg:flex flex-col justify-end w-60 h-[400px] bg-[#AD343E] text-white p-6 rounded-b-xl ml-6">
    <h2 className="text-lg font-bold mb-6">Categories</h2>
    <ul className="space-y-2">
      <li className="flex justify-between items-center py-2 px-4 rounded-full bg-white text-black font-semibold cursor-pointer">
        All <span className="ml-2">→</span>
      </li>
      <li className="flex justify-between items-center py-2 px-4 rounded-full hover:bg-[#AD343E] cursor-pointer">
        Cheeses <span className="ml-2">→</span>
      </li>
      <li className="flex justify-between items-center py-2 px-4 rounded-full hover:bg-[#AD343E] cursor-pointer">
        Meat <span className="ml-2">→</span>
      </li>
      <li className="flex justify-between items-center py-2 px-4 rounded-full hover:bg-[#AD343E] cursor-pointer">
        Others <span className="ml-2">→</span>
      </li>
    </ul>
    </aside>
    </>
  );
};

export default MenuCategory;
