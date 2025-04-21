// src/components/menu/MenuRow.tsx
import { MenuItem } from "@/type";  // import types here

interface Props {
  item: MenuItem;
  handleOpen: (item: MenuItem) => void;
}

const MenuRow = ({ item, handleOpen }: Props) => {
  return (
    <div key={item.product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <img className="w-full h-60 object-cover rounded-2xl" src={item.product.imageUrl} alt="Card Image" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{item.product.name}</h2>
        <p className="text-gray-600 mb-2">{item.country.name}</p>
        <p className="text-gray-600 mb-2">{item.product.description}</p>
        <p className="text-gray-600 mb-4">Allergy: {item.product.allergy.join(', ')}</p>
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
