import { useState } from "react";
import menu1 from "@/assets/home/bestmenu/menu1.png";
import menu2 from "@/assets/home/bestmenu/menu2.jpeg";
import menu3 from "@/assets/home/bestmenu/menu3.jpeg";
import menu4 from "@/assets/home/bestmenu/menu4.png";

const categories = ["Popular", "Meat", "Cheese", "Others"];

const menuItems = [
    { id: 1, category: "Popular", img: menu1, name: "All New Rush" },
    { id: 2, category: "Popular", img: menu2, name: "All New Rush" },
    { id: 3, category: "Popular", img: menu3, name: "All New Rush" },
    { id: 4, category: "Popular", img: menu4, name: "All New Rush" },
];

const BestMenu = () => {
    const [activeTab, setActiveTab] = useState("Popular");

    return (
        <section className="px-3 lg:px-6 py-12 lg:py-30 lg:bg-[#FAF6ED]">
            {/* 제목 & 부제목 */}
            <div className="lg:text-center mb-6 lg:mb-10">
                <h2 className="lg:text-4xl text-[1.375rem] font-semibold px-3">Most popular Menu</h2>
                <p className="hidden lg:block text-gray-600 text-sm lg:text-base mt-4">
                    Here's a list of the most popular menu items that are often in high demand
                </p>
            </div>

            {/* 카테고리 탭 */}
            <div className="flex justify-center border-b border-gray-300 mb-6 lg:mb-8 lg:justify-between lg:px-30">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`px-3 lg:px-6 lg:pb-2 text-xs lg:text-xl transition-all ${
                            activeTab === category ? "border-b-4 border-black font-semibold" : "text-gray-500"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* 메뉴 카드 리스트 (lg에서는 4열) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 lg:px-15">
                {menuItems
                    .filter((item) => item.category === activeTab)
                    .map((item) => (
                        <div key={item.id} className="relative rounded-xl overflow-hidden">
                            <img src={item.img} alt={item.name} className="w-full aspect-square object-cover rounded-xl" />
                            {/* 텍스트 오버레이 */}
                            <div className="absolute top-3 left-3 text-white text-md lg:text-xl font-semibold">
                                {item.name}
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default BestMenu;