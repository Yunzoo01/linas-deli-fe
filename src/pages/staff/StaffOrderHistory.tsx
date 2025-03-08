import { useState, useEffect } from "react";
import StaffPageBanner from "../../components/staff/StaffPageBanner";
import axios from "axios";

const StaffOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function formatTime24To12(time) {
    let hours = time;
    const period = hours >= 12 ? 'P.M' : 'A.M';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:00 ${period}`;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/api/staff/orders?page=${currentPage-1}&size=10`, {
      headers: {
        "Authorization": "Bearer your-auth-token",
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      setOrders(response.data.content);
      setTotalElements(response.data.totalElements);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    })
    .catch(err => {
      setError("Error fetching data: " + err.message);
      setLoading(false);
    });
  }, [currentPage]);

  const filteredOrders = orders.filter(order => order.email.includes(search));

  const completedOrders = orders.filter(order => order.status === 'Completed').length;
  const inProgressOrders = orders.filter(order => order.status === 'In Progress').length;
  const declinedOrders = orders.filter(order => order.status === 'Decline').length;

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

  return (
    <div className="bg-[#C3E2C6]">
      <StaffPageBanner title="Order History" />
      <div className="max-w-6xl mx-auto overflow-hidden py-16">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-4">
          <div className="flex justify-end items-end  border-b-1 border-[#878787] text-lg font-bold">
            <div className="ml-8 pb-3 border-b-4 border-[#AD343E]">All orders <span className="inline-block text-center align-middle rounded-[7.5px] ml-3 w-8 h-8 bg-[#AD343E] text-white font-semibold">{totalElements}</span></div>
            <div className="ml-8 pb-3">Completed <span className="inline-block text-center align-middle rounded-[7.5px] ml-3 w-8 h-8 bg-[#878787] text-white font-semibold">{completedOrders}</span></div>
            <div className="ml-8 pb-3">In Progress <span className="inline-block text-center align-middle rounded-[7.5px] ml-3 w-8 h-8 bg-[#878787] text-white font-semibold">{inProgressOrders}</span></div>
            <div className="ml-8 pb-3">Decline <span className="inline-block text-center align-middle rounded-[7.5px] ml-3 w-8 h-8 bg-[#878787] text-white font-semibold">{declinedOrders}</span></div>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
          {filteredOrders.map(order => (
            <div key={order.id} className="flex text-center font-medium bg-white mb-6 py-[12.75px] rounded-[7.5px] ">
              <div className="flex justify-center items-center w-[15%] border-r border-r-[#52525280] border-r-[1.5px] min-h-[61.5px]">#{order.oid}</div>
              <div className="flex justify-center items-center w-[30%] border-r border-r-[#52525280] border-r-[1.5px]">{order.email}</div>
              <div className="flex justify-center items-center w-[20%] border-r border-r-[#52525280] border-r-[1.5px]">{order.platter}</div>
              <div className="flex justify-center items-center w-[20%] border-r border-r-[#52525280] border-r-[1.5px]">{formatTime24To12(new Date(order.time))} , {formatDate(new Date(order.date))}</div>
              <div className={`flex justify-center items-center w-[15%] ${order.status === "Pending" ? "text-red-500" : "text-green-500"}`}>
                {order.status}
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-4 justify-center">{paginationButtons}</div>
      </div>
    </div>
  );
}

export default StaffOrderHistory;
