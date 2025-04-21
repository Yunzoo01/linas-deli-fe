import { useNavigate } from "react-router-dom";
import MenuCategory from "@/components/menu/MenuCategory";
import SearchBar from "@/components/SearchBar";
import StaffPageBanner from "@/components/staff/StaffPageBanner";

const productDetails = [
  {
    productDetailId: 1,
    code: "C1",
    name: "Canadian Cheese",
    imageUrl: "/image/menu/menu01.png",
  },
  {
    productDetailId: 2,
    code: "C2",
    name: "Truffle Ham",
    imageUrl: "/image/menu/menu02.png",
  },
  {
    productDetailId: 3,
    code: "C3",
    name: "Cheddar Cheese",
    imageUrl: "/image/menu/menu01.png",
  },
  // 필요 시 더 추가 가능
];

const StaffMenu = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/staff/add-menu");
  };
  const handleUpdateClick = () => {
    navigate("/staff/update-menu");
  };
  return (

    <>
    <div className="bg-[#C3E2C6] min-h-screen">
      <StaffPageBanner title="Menu" />
      <div className="flex flex-col lg:flex-row">
        <MenuCategory/>

        {/* Main Content */}
        <main className="flex-1 px-2 lg:px-10 py-4 lg:py-8 min-h-lvh ">
          {/* Search + Add */}
          <div className="flex flex-col mb-6">
          <SearchBar/>
            <button
              className="bg-[#A73F3F] hover:bg-[#8f3535] px-6 py-2 text-white rounded-lg w-[82px] ml-auto lg:mr-10 mt-3"
              onClick={handleAddClick}
            >+Add</button>
          </div>

          {/* Table Headers */}
          <div className="grid grid-cols-12 font-semibold text-sm px-6 py-4 my-4 border-y">
            <span className="col-span-3">Image</span>
            <span className="col-span-2">Code</span>
            <span className="col-span-5">Product name</span>
            <span className="col-span-2 text-center">In Stock</span>
          </div>

          {/* Product List */}
          <div className="rounded-lg shadow-sm">
            {productDetails.map((product) => (
              <div
                key={product.productDetailId}
                className="grid grid-cols-12 items-center px-6 py-4 mb-3 bg-white"
                onClick={handleUpdateClick}
              >
                <div className="col-span-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
                <div className="col-span-2 font-medium">{product.code}</div>
                <div className="col-span-5 font-medium">{product.name}</div>
                <div className="col-span-2 text-center">
                  <div className="w-6 h-6 rounded-full border-2 border-black mx-auto"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-4">
            <button className="text-xl">←</button>
            <button className="bg-[#6B3E26] text-white rounded-full w-8 h-8">1</button>
            <button className="bg-gray-200 text-black rounded-full w-8 h-8">2</button>
            <button className="bg-gray-200 text-black rounded-full w-8 h-8">3</button>
            <button className="text-xl">→</button>
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default StaffMenu;
