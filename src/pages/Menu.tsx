// src/pages/Menu.tsx
import { useState } from "react";
import MenuCategory from "@/components/menu/MenuCategory";
import MenuRow from "@/components/menu/MenuRow";
import MenuModal from "@/components/menu/MenuModal";
import PageBanner from "@/components/PageBanner";
import SearchBar from "@/components/SearchBar";

// Import the types
import { MenuItem } from "@/type";  // import types here

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = (item: MenuItem) => {
    setSelectedMenu(item);
    setIsModalOpen(true);
  };

  const productDetails: MenuItem[] = [
    {
      productDetailId: 1,
      product: {
        id: 1,
        name: "Canadian Cheese",
        description: "A semi-hard cheese from Canada.",
        allergy: ["gluten"],
        price: 10,
        glutenFree: false,
        servingSuggestion: "Bread, crackers, apples, and white wine.",
        pasteurized: true,
        imageUrl: "/image/menu/menu01.png",
        ingredientImageUrl: "image/nutrition/nutrition01.png"
      },
      country: {
        id: 1,
        name: "Canada"
      },
      animal: {
        id: 1,
        name: "Cow"
      }
    },
    {
      productDetailId: 2,
      product: {
        id: 2,
        name: "Truffle Ham",
        description: "Premium ham with truffle aroma.",
        allergy: ["lactose"],
        price: 15,
        glutenFree: true,
        servingSuggestion: "Bread, crackers, apples, and white wine.",
        pasteurized: true,
        imageUrl: "/image/menu/menu02.png",
        ingredientImageUrl: "image/nutrition/nutrition01.png"
      },
      country: {
        id: 2,
        name: "Italy"
      },
      animal: {
        id: 2,
        name: "Pig"
      }
    }
  ];

  return (
    <div className="bg-[#FFFAEF]">
      <PageBanner title="Menu" />
      <div className="container mx-auto flex flex-col lg:flex-row">
        <MenuCategory />
        <div className="lg:ml-15 my-2 lg:my-10">
          <SearchBar />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-[30px]">
            {productDetails.map((item) => (
              <MenuRow key={item.product.id} item={item} handleOpen={handleOpen} />
            ))}
          </div>
        </div>
      </div>
      <MenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        menuItem={selectedMenu} // Pass MenuItem here
      />
    </div>
  );
};

export default Menu;
