import { Order } from "@/type";

type StaffOrderRowProps = {
  order: Order;
  setIsOpen: (open: boolean) => void;
  setSelectedOrder: (order: Order) => void;
  formatTime24To12: (time: string) => string;
  formatDate: (date: string) => string;
  updateOrderStatus: (id: string, status: string) => void;
};

const StaffOrderRow = ({
  order,
  setIsOpen,
  setSelectedOrder,
  formatTime24To12,
  formatDate,
  updateOrderStatus,
}: StaffOrderRowProps) => {

  // ✅ 확인 다이얼로그와 함께 상태 업데이트
  const handleComplete = () => {
    if (window.confirm(`Mark order #${order.oid} as completed?`)) {
      console.log(`Marking order ${order.oid} as completed`); // 디버깅 로그
      updateOrderStatus(order.oid.toString(), "completed");
    }
  };

  const handleDecline = () => {
    if (window.confirm(`Mark order #${order.oid} as declined?`)) {
      console.log(`Marking order ${order.oid} as declined`); // 디버깅 로그
      updateOrderStatus(order.oid.toString(), "decline");
    }
  };

  // ✅ complete_decline 상태 처리 추가 (필요한 경우)
  const handleCompleteDecline = () => {
    if (window.confirm(`Mark order #${order.oid} as complete_decline?`)) {
      console.log(`Marking order ${order.oid} as complete_decline`); // 디버깅 로그
      updateOrderStatus(order.oid.toString(), "complete_decline");
    }
  };

  const handleViewDetails = () => {
    setIsOpen(true);
    setSelectedOrder(order);
  };

  // ✅ 상태별 스타일링 개선
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 font-semibold";
      case "decline":
        return "text-red-600 font-semibold";
      case "in progress":
        return "text-blue-600 font-semibold";
      case "complete_decline":
        return "text-orange-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-y-2 md:gap-y-0 text-center font-medium bg-white mb-6 py-4 px-3 rounded-[7.5px] shadow-sm">
      {/* Order No. */}
      <div className="flex flex-col md:flex-row justify-between md:justify-center md:items-center">
        <span className="md:hidden font-semibold text-[#1a1a1a]">Order No.</span>
        <span>#{order.oid}</span>
      </div>

      {/* Email */}
      <div
        className="flex flex-col md:flex-row justify-between md:justify-center md:items-center cursor-pointer hover:text-blue-600 transition-colors"
        onClick={handleViewDetails}
      >
        <span className="md:hidden font-semibold text-[#1a1a1a]">Email</span>
        <span className="truncate max-w-[200px]">{order.email}</span>
      </div>

      {/* Product */}
      <div className="flex flex-col md:flex-row justify-between md:justify-center md:items-center">
        <span className="md:hidden font-semibold text-[#1a1a1a]">Product</span>
        <span>{order.platterName}</span>
      </div>

      {/* Pickup Time */}
      <div className="flex flex-col md:flex-row justify-between md:justify-center md:items-center">
        <span className="md:hidden font-semibold text-[#1a1a1a]">Pickup</span>
        <span>
          {formatTime24To12(order.time)}, {formatDate(order.date)}
        </span>
      </div>

      {/* Status */}
      <div className="flex flex-col md:flex-row justify-between md:justify-center md:items-center">
        <span className="md:hidden font-semibold text-[#1a1a1a]">Status</span>
        
        {/* ✅ 상태별 렌더링 개선 */}
        {order.status === "completed" ? (
          <div className="flex flex-col items-center gap-2">
            <span className={getStatusColor(order.status)}>Completed</span>
            {/* 완료된 주문에 대해 complete_decline 옵션 제공 (필요한 경우) */}
            <button
              className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs hover:bg-orange-600 transition-colors"
              onClick={handleCompleteDecline}
            >
              Complete Decline
            </button>
          </div>
        ) : order.status === "decline" ? (
          <span className={getStatusColor(order.status)}>Declined</span>
        ) : order.status === "complete_decline" ? (
          <span className={getStatusColor(order.status)}>Complete Decline</span>
        ) : (
          // in progress 상태일 때 버튼들 표시
          <div className="flex gap-2 justify-center mt-1 md:mt-0 flex-wrap">
            <button
              className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors"
              onClick={handleComplete}
              disabled={false} // 필요시 로딩 상태 추가
            >
              Complete
            </button>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
              onClick={handleDecline}
              disabled={false} // 필요시 로딩 상태 추가
            >
              Decline
            </button>
          </div>
        )}
        
        {/* ✅ View Details 버튼 추가 (모든 상태에서 사용 가능) */}
        <button
          className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-600 transition-colors"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default StaffOrderRow;