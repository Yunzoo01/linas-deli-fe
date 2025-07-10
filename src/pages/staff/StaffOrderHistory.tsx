import { useState, useEffect } from "react";
import StaffPageBanner from "@/components/staff/StaffPageBanner";
import StaffOrderModal from "@/components/staff/order/StaffOrderModal";
import { Order } from "@/type"; 
import api from "@/api/axios";
import StaffOrderRow from "@/components/staff/order/StaffOrderRow";
import StaffOrderStatus from "@/components/staff/order/StaffOrderStatus";
import Pagination from "@/components/Pagination";

type StatusCountType = {
  status: string;
  count: number;
};

const StaffOrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statuses, setStatuses] = useState<StatusCountType[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");

  function formatTime24To12(timeString: string) {
    const [hourStr, minuteStr] = timeString.split(":");
    const hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    if (isNaN(hours) || isNaN(minutes)) return "Invalid time";

    const period = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinute = minuteStr.padStart(2, "0");

    return `${formattedHour}:${formattedMinute} ${period}`;
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const params: any = {
          page: currentPage - 1,
          size: 10,
        };
  
        if (searchKeyword) {
          params.keyword = searchKeyword;
        }
  
        if (selectedStatus !== "All") {
          params.status = selectedStatus;
        }
  
        const queryString = new URLSearchParams(params).toString();
        const response = await api.get(`/api/staff/orders?${queryString}`);
  
        setOrders(response.data.orderList.content);
        setTotalPages(response.data.orderList.totalPages);
        setStatuses(response.data.statusCounts);
      } catch (err) {
        if (err instanceof Error) setError("Error fetching data: " + err.message);
        else setError("Unknown error fetching data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, [currentPage, searchKeyword, selectedStatus]);

  function searchByStatus(status: string) {
    setSelectedStatus(status);
    setCurrentPage(1);
    setSearch("");
    setSearchKeyword("");
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
      setSearchKeyword(search.trim());
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const updateOrder = (updatedOrder: Order) => {
    setSelectedOrder(updatedOrder);
  };

  // ✅ 수정된 부분: status 매개변수를 받도록 변경
  const updateOrderStatus = async (id: string, newStatus: string) => {
    console.log(`Updating order ${id} to status: ${newStatus}`); // 디버깅용 로그
    
    if (!["completed", "decline", "complete_decline", "in progress"].includes(newStatus)) {
      console.error("Invalid status:", newStatus);
      alert(`Invalid status: ${newStatus}`);
      return;
    }

    try {
      const response = await api.put(
        `/api/staff/orders/updateStatus/${id}?status=${newStatus}`,
        {}
      );
      
      console.log("Status update response:", response.data); // 디버깅용 로그
      
      // 페이지 새로고침 대신 상태만 업데이트 (선택적)
      // window.location.reload();
      
      // 또는 특정 주문만 업데이트
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.oid.toString() === id 
            ? { ...order, status: newStatus }
            : order
        )
      );
      
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
    }
  };

  return (
    <>
      <div className="bg-[#C3E2C6]">
        <StaffPageBanner title="Order History" />
        <div className="max-w-6xl mx-auto overflow-hidden py-16 px-2">
          <div className="flex flex-col lg:flex-row justify-between items-center md:items-end mb-6">
            <div className="flex mb-2 gap-4">
              {statuses.map((item, index) => (
                <StaffOrderStatus 
                  key={index}
                  item={item} 
                  index={index} 
                  selectedStatus={selectedStatus} 
                  searchByStatus={searchByStatus}
                />
              ))}
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search"
              className="w-full sm:w-[400px] px-2 py-4 border rounded-[30px] bg-white border-[rgba(18,18,18,0.08)] drop-shadow-sm"
            />
          </div>

          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          
          <div className="hidden md:flex w-full border-[#525252] flex border-t border-b my-3 font-bold text-base py-2">
            <div className="w-[20%] text-center">Order No.</div>
            <div className="w-[20%] text-center">E-mail</div>
            <div className="w-[20%] text-center">Product</div>
            <div className="w-[20%] text-center">Pick Up Time</div>
            <div className="w-[20%] text-center">Order Status</div>
          </div>

          <div className="w-full border-collapse">
            {orders.length > 0 ? (
              orders.map((order) => (
                <StaffOrderRow 
                  key={order.oid}
                  order={order} 
                  setIsOpen={setIsOpen} 
                  setSelectedOrder={setSelectedOrder} 
                  formatTime24To12={formatTime24To12} 
                  formatDate={formatDate}
                  // ✅ 수정된 부분: updateOrderStatus 함수 자체를 전달
                  updateOrderStatus={updateOrderStatus}
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

      <StaffOrderModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        order={selectedOrder as Order}
        updateOrder={updateOrder}
      />
    </>
  );
};

export default StaffOrderHistory;