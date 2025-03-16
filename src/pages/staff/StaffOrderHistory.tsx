import { useState, useEffect } from "react";
import StaffPageBanner from "../../components/staff/StaffPageBanner";
import axios from "axios";
import StaffOrderModal from "../../components/staff/StaffOrderModal";

const StaffOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false); // ✅ 명시적으로 boolean 타입 지정
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");

  function formatTime24To12(timeString) {
    const time = Number(timeString);
    if (isNaN(time)) return "Invalid time"; // 오류 방지
  
    let hours = time;
    const period = hours >= 12 ? "P.M" : "A.M";
    hours = hours % 12 || 12; // 0시는 12로 변환
    return `${hours}:00 ${period}`;
  }
  

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  //status 검색
  useEffect(() => {
    axios.get(`http://localhost:8080/api/staff/orders?page=${currentPage-1}&size=10&status=${selectedStatus}`, {
      headers: {
        "Authorization": "Bearer your-auth-token",
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      setOrders(response.data.orderList.content);
      setTotalElements(response.data.orderList.totalElements);
      setTotalPages(response.data.orderList.totalPages);
      setStatuses(response.data.statusCounts);
      setLoading(false);
    })
    .catch(err => {
      setError("Error fetching data: " + err.message);
      setLoading(false);
    });
  }, [currentPage, selectedStatus]); // ✅ currentPage 또는 selectedStatus가 변경될 때만 실행
  
  // ✅ 상태 변경 함수
  function searchByStatus(status: string) {
    setSelectedStatus(status);
    setCurrentPage(1);
  }
  

  // keyword로 검색
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchKeyword(search.trim()); // ✅ 검색어 업데이트
      fetchOrdersByKeyword();
    }
  };

  // ✅ API 호출 함수
  const fetchOrdersByKeyword = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/staff/orders?keyword=${searchKeyword}`, {
        headers: {
          "Authorization": "Bearer your-auth-token",
          "Content-Type": "application/json",
        },
      });
      setOrders(response.data.orderList.content);
      setTotalElements(response.data.orderList.totalElements);
      setTotalPages(response.data.orderList.totalPages);
      setStatuses(response.data.statusCounts);
    } catch (err) {
      setError("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // useEffect로 검색어 변경 시 자동 호출
  useEffect(() => {
    if (searchKeyword) fetchOrdersByKeyword();
  }, [searchKeyword]);


  // 초기 셋팅
  useEffect(() => {
    axios.get(`http://localhost:8080/api/staff/orders?page=${currentPage-1}&size=10`, {
      headers: {
        "Authorization": "Bearer your-auth-token",
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      setOrders(response.data.orderList.content);
      setTotalElements(response.data.orderList.totalElements);
      setTotalPages(response.data.orderList.totalPages);
      setStatuses(response.data.statusCounts);
      setLoading(false);
    })
    .catch(err => {
      setError("Error fetching data: " + err.message);
      setLoading(false);
    });
  }, [currentPage]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button 
        key={i} 
        onClick={() => handlePageChange(i)} 
        className={`px-3 py-1 rounded-3xl ${currentPage === i ? "bg-[#8E5927] text-white" : ""}`}
      >
        {i}
      </button>
    );
  }


  const updateOrder = (updatedOrder) => {
    setSelectedOrder(updatedOrder); 
    console.log("Updated Order:", updatedOrder);
  };
  return (
    <>
          <div className="bg-[#C3E2C6]">
      <StaffPageBanner title="Order History" />
      <div className="max-w-6xl mx-auto overflow-hidden py-16">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-4">
      <div className="flex">
        {statuses.map((item, index) => (
          <div 
            key={index}
            className={`ml-8 pb-3 cursor-pointer border-b-4 ${
              selectedStatus === item.status ? "border-[#AD343E] text-[#AD343E]" : "border-transparent"
            }`} 
            onClick={() => searchByStatus(`${item.status}`)}
          >
            {item.status}
            <span className={`inline-block text-center align-middle rounded-[7.5px] ml-3 w-8 h-8 ${
              selectedStatus === item.status ? "bg-[#AD343E]" : "bg-[#878787]"
            } text-white font-semibold`}>
              {item.count}
            </span>
          </div>
        ))}
        </div>


          {/* ✅ 검색 입력창 */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch} // ✅ 엔터 키 이벤트 추가
            placeholder="Search"
            className="min-w-[400px] px-2 py-4 border rounded-[30px] bg-white border-[rgba(18,18,18,0.08)] drop-shadow-sm"
          />
        </div>

        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}

        <div className="w-full border-[#525252] flex border-t border-b my-3 font-bold text-base py-2">
          <div className="w-[15%] text-center">Order No.</div>
          <div className="w-[30%] text-center">E-mail</div>
          <div className="w-[20%] text-center">Product</div>
          <div className="w-[20%] text-center">Pick Up Time</div>
          <div className="w-[15%] text-center">Order Status</div>
        </div>

        <div className="w-full border-collapse">
          {orders.map(order => (
            <div 
              key={order.oid} 
              className="flex text-center font-medium bg-white mb-6 py-[12.75px] rounded-[7.5px] "
              onClick={() => {
                setIsOpen(true);
                setSelectedOrder(order);
              }}
              >
              <div className="flex justify-center items-center w-[15%] border-r border-r-[#52525280] border-r-[1.5px] min-h-[61.5px]">#{order.oid}</div>
              <div className="flex justify-center items-center w-[30%] border-r border-r-[#52525280] border-r-[1.5px]">{order.email}</div>
              <div className="flex justify-center items-center w-[20%] border-r border-r-[#52525280] border-r-[1.5px]">{order.platterName}</div>
              <div className="flex justify-center items-center w-[20%] border-r border-r-[#52525280] border-r-[1.5px]">{formatTime24To12(new Date(order.time))} , {formatDate(new Date(order.date))}</div>
              <div className={`flex justify-center items-center w-[15%] ${order.status === "decline" ? "text-red-500" : ""}`}>
                {order.status}
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-4 justify-center">{paginationButtons}</div>
      </div>
    </div>
    <StaffOrderModal isOpen={isOpen} setIsOpen={setIsOpen} order={selectedOrder} updateOrder={updateOrder}/>
    </>
  );
}

export default StaffOrderHistory;
