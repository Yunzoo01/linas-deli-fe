import { useState, useEffect } from "react";
import { MenuItem } from "@/type";

interface Props {
  item: MenuItem;
  handleOpen: (item: MenuItem) => void;
  index: number;
}

const MenuRow = ({ item, handleOpen, index }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log("MenuRow item:", item); // ✅ 콘솔에 출력
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    return () => clearTimeout(timeout);
  }, [index]);

  const imageUrl = item.imageUrl?.startsWith("http")
    ? item.imageUrl
    : `${import.meta.env.VITE_API_BASE_URL}${item.imageUrl}`;

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${isVisible ? "card-animate" : ""}`}
    >
      <img
        className="w-full h-60 object-cover rounded-2xl"
        src={imageUrl}
        alt={item.productName || "Image"}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/fallback.png"; // fallback image
        }}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">
          {item.productName ?? item.product?.productName ?? "No Name"}
        </h2>
        <p className="text-gray-600 mb-2">
          {item.countryName ?? "Unknown Country"}
        </p>
        <p className="text-gray-600 mb-2">
          {(() => {
            const desc = item.description ?? item.product?.description ?? "No description available.";
            return desc.length > 80 ? `${desc.slice(0, 80)}...` : desc;
          })()}
        </p>
        <div className="text-right">
          <button
            onClick={() => handleOpen(item)}
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
