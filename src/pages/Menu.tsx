import { useState, useEffect } from "react";
import MenuCategory from "@/components/menu/MenuCategory";
import MenuRow from "@/components/menu/MenuRow";
import MenuModal from "@/components/menu/MenuModal";
import PageBanner from "@/components/PageBanner";
import SearchBar from "@/components/SearchBar";

// Import the types
import { MenuItem } from "@/type";
import api from "@/api/axios";
import Pagination from "@/components/Pagination";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // Track the search term
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProductsByCategoryAndSearch = async (category: string, search: string) => {
    setLoading(true);
    setError(null);

    try {
      const endpoint =
        category === "All"
          ? `/api/products?keyword=${encodeURIComponent(search)}`
          : `/api/products?category=${encodeURIComponent(category)}&keyword=${encodeURIComponent(search)}`;

      const response = await api.get(endpoint);
      console.log(response.data);
      setProductDetails(response.data.content); // Assuming your response structure has `content`
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleSearch = (search: string) => {
    setSearchTerm(search);
  };
  

  const handleOpen = (item: MenuItem) => {
    setSelectedMenu(item);
    setIsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchProductsByCategoryAndSearch(selectedCategory, searchTerm);
  }, [selectedCategory, searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-[#FFFAEF]">
      <PageBanner title="Menu" />
      <div className="container mx-auto flex flex-col lg:flex-row">
        <MenuCategory 
          onCategoryChange={handleCategoryChange} 
          selectedCategory={selectedCategory}  // Pass selectedCategory to MenuCategory
        />
        <div className="lg:ml-15 my-2 lg:my-10 w-full">
          <SearchBar onSearch={handleSearch} /> {/* Pass handleSearch function to SearchBar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-[30px]">
            {productDetails.map((item, index) => (
              <MenuRow 
                key={item.pid} 
                item={item} 
                handleOpen={handleOpen} 
                index={index * 0.1}
              />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
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
