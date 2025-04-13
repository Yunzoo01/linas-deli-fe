import { useState } from "react";
import MenuCategory from "../components/menu/MenuCategory";
import MenuRow from "../components/menu/MenuRow";
import MenuModal from "../components/menu/MenuModal";
import PageBanner from "../components/PageBanner";
import SearchBar from "../components/SearchBar";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 메뉴 클릭 시
  const handleOpen = (item: MenuItem) => {
    setSelectedMenu(item);
    setIsModalOpen(true);
  };

  const productDetails: ProductDetail[] = [
    {
      productDetailId: 1,
      product: {
        id: 1,
        name: "Canadian Cheese",
        category:"cheese",
        description: "A semi-hard cheese from Canada.",
        pasteurized:true,
        allergy:"gluten",
        servingSuggestion:"Bread, crackers, apples, and white wine.",
        imageUrl: "/image/menu/menu01.png",
        ingredientImageUrl:"image/nutrition/nutrition01.png"
      },
      country: {
        id: 1,
        name: "Canada",
      },
      animal: {
        id: 1,
        name: "Cow",
      },
    },
    {
      productDetailId: 2,
      product: {
        id: 2,
        name: "Truffle Ham",
        category:"ham",
        description: "Premium ham with truffle aroma.",
        pasteurized:true,
        allergy:"lactose",
        servingSuggestion:"Bread, crackers, apples, and white wine.",
        imageUrl: "/image/menu/menu02.png",
        ingredientImageUrl:"image/nutrition/nutrition01.png"
      },
      country: {
        id: 2,
        name: "Italy",
      },
      animal: {
        id: 2,
        name: "Pig",
      },
    },
    {
      productDetailId: 3,
      product: {
        id: 2,
        name: "Truffle Ham",
        category:"ham",
        description: "Premium ham with truffle aroma.",
        pasteurized:true,
        allergy:"lactose",
        servingSuggestion:"Bread, crackers, apples, and white wine.",
        imageUrl: "/image/menu/menu03.png",
        ingredientImageUrl:"image/nutrition/nutrition01.png"
      },
      country: {
        id: 2,
        name: "Italy",
      },
      animal: {
        id: 2,
        name: "Pig",
      },
    },
    {
      productDetailId: 4,
      product: {
        id: 2,
        name: "Truffle Ham",
        category:"ham",
        description: "Premium ham with truffle aroma.",
        pasteurized:true,
        allergy:"lactose",
        servingSuggestion:"Bread, crackers, apples, and white wine.",
        imageUrl: "/image/menu/menu04.png",
        ingredientImageUrl:"image/nutrition/nutrition01.png"
      },
      country: {
        id: 2,
        name: "Italy",
      },
      animal: {
        id: 2,
        name: "Pig",
      },
    },
    // 추가 항목들 추가
  ];
    return (
      <div className="bg-[#FFFAEF]">
      <PageBanner title="Menu" />
      <div className="container mx-auto flex flex-col lg:flex-row">
        <MenuCategory/>
        <div className="lg:ml-15 my-10">
          <SearchBar/>  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-[30px]">
          {productDetails.map((item) => (
              <MenuRow key={item.id} item={item} handleOpen={handleOpen}></MenuRow>
            ))}
          </div>
        </div>
      </div>
      <MenuModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        menuItem={selectedMenu} 
      />
      </div>
      
    );
  };
  
  export default Menu;