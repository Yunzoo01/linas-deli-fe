import { useState, useEffect } from "react";
import { MenuItem } from "@/type";

interface Props {
  item: MenuItem;
  handleOpen: (item: MenuItem) => void;
  index: number; // 카드의 인덱스를 받도록 함
}

const MenuRow = ({ item, handleOpen, index }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
// console.log(item);
  useEffect(() => {
    // 카드가 일정 시간 후에 보이도록 설정 (순차적으로)
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, index * 200); // index에 따라 지연 시간 설정

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div
      key={item.product.id}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${isVisible ? "card-animate" : ""}`}
    >
      <img
        className="w-full h-60 object-cover rounded-2xl"
        src={`${import.meta.env.VITE_API_BASE_URL}${item.imageUrl}`}
        alt="Card Image"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{item.product.productName}</h2>
        <p className="text-gray-600 mb-2">{item.country.name}</p>
        <p className="text-gray-600 mb-2">{item.product.description}</p>
        <div className="text-right">
          <button
            onClick={() => handleOpen(item)} // Pass MenuItem
            className="border border-black text-black bg-transparent px-4 py-2 rounded-l-full rounded-r-full hover:bg-black hover:text-white transition"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuRow;
