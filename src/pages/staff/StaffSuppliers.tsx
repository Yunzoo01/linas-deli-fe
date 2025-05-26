import { useState, useEffect } from "react";
import StaffPageBanner from "@/components/staff/StaffPageBanner";
import { Supplier } from "@/type"; 
import api from "@/api/axios";
import Pagination from "@/components/Pagination"; // 페이지 네이션 컴포넌트 import
import StaffSupplierRow from "@/components/staff/supplier/StaffSupplierRow";

const StaffSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      try {
        const params: any = {
          page: currentPage - 1,
          size: 10,
        };
  
  
        const queryString = new URLSearchParams(params).toString();
        const response = await api.get(`/api/staff/suppliers?${queryString}`);
        // console.log(response.data.suppliers.content);
        setSuppliers(response.data.suppliers.content);
        setTotalPages(response.data.suppliers.totalPages);
        // setStatuses(response.data.statusCounts);
      } catch (err) {
        if (err instanceof Error) setError("Error fetching data: " + err.message);
        else setError("Unknown error fetching data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchSuppliers();
  }, [currentPage]);
  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="bg-[#C3E2C6]">
        <StaffPageBanner title="Suppliers" />
        <div className="max-w-6xl mx-auto overflow-hidden py-16 px-2">

          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          <div className="hidden md:flex w-full border-[#525252] flex border-t border-b my-3 font-bold text-base py-2">
            <div className="w-[20%] text-center">Supplier No.</div>
            <div className="w-[20%] text-center">Supplier Name</div>
            <div className="w-[20%] text-center">Contact Name</div>
            <div className="w-[20%] text-center">Email</div>
            <div className="w-[20%] text-center">Phone num</div>
          </div>

          <div className="w-full border-collapse">
            {suppliers.length > 0 ? (
              suppliers.map((suppliers) => (
                <StaffSupplierRow 
                  key={suppliers.sid}  // key prop 추가
                  suppliers={suppliers} 
                  // setIsOpen={setIsOpen} 
                  // setSelectedSupplier={setSelectedSupplier} 
                />
              ))
            ) : (
              <div className="w-full text-center py-4 text-gray-500">No data</div>
            )}
          </div>

          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      </div>

      {/* <StaffSupplierModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        order={selectedSupplier as Supplier}
        updateSupplier={updateSupplier}
      /> */}
    </>
  );
};

export default StaffSuppliers;
