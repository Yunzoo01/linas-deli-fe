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
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    return () => clearTimeout(timeout);
  }, [index]);

  const imageUrl = item.imageUrl?.startsWith("http")
    ? item.imageUrl
    : `${import.meta.env.VITE_API_BASE_URL}${item.imageUrl}`;

  const flagUrl = item.countryName
    ? `/Icon/flag/flag_${item.countryName}.png`
    : null;

  const allergyMarks = item.allergies ?? [];

  return (
    <div
  className={`bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col ${isVisible ? "card-animate" : ""}`}
>
  <img
    className="w-full aspect-square object-cover"
    src={imageUrl}
    alt={item.productName || "Image"}
    onError={(e) => {
      (e.target as HTMLImageElement).src = "/fallback.png";
    }}
  />
  {/* ✅ 전체를 채우는 영역 + 버튼은 하단 고정 */}
  <div className="flex flex-col justify-between flex-1 p-4">
    <div>
      <h2 className="text-xl font-semibold flex items-center gap-2">
        {item.productName ?? item.product?.productName ?? "No Name"}

        {flagUrl && (
          <img
            src={flagUrl}
            alt="flag"
            className="w-6 h-4 rounded-sm"
            title={item.countryName ?? "Country"}
          />
        )}
        {allergyMarks.includes("G") && (
          <img
            src="/Icon/allergy/icon_glutenfree.png"
            alt="Gluten Free"
            className="w-6 h-6"
            title="Gluten Free"
          />
        )}
        {allergyMarks.includes("L") && (
          <img
            src="/Icon/allergy/icon_lactosefree.png"
            alt="Lactose Free"
            className="w-6 h-6"
            title="Lactose Free"
          />
        )}
      </h2>
      {/* <p className="text-gray-600 mb-2">
        {item.countryName ?? "Unknown Country"}
      </p> */}
      <p className="text-gray-600 mb-2">
        {(() => {
          const desc = item.description ?? item.product?.description ?? "No description available.";
          return desc.length > 80 ? `${desc.slice(0, 80)}...` : desc;
        })()}
      </p>
    </div>

    {/* ✅ 항상 하단에 유지 */}
    <div className="mt-2 text-right">
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