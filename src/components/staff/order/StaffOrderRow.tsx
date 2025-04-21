import { Order } from "@/type";

type StaffOrderRowProps = {
  order: Order;
  setIsOpen: (open: boolean) => void;
  setSelectedOrder: (order: Order) => void;
  formatTime24To12: (time: string) => string;
  formatDate: (date: string) => string;
  updateOrderStatus: (id: string, status: string) => void; // id를 string으로 수정
};


const StaffOrderRow = ({
  order,
  setIsOpen,
  setSelectedOrder,
  formatTime24To12,
  formatDate,
  updateOrderStatus,
}: StaffOrderRowProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-y-2 md:gap-y-0 text-center font-medium bg-white mb-6 py-4 px-3 rounded-[7.5px] shadow-sm">
      {/* Order No. */}
      <div className="flex flex-col md:flex-row justify-between md:justify-center md:items-center">
        <span className="md:hidden font-semibold text-[#1a1a1a]">Order No.</span>
        <span>#{order.oid}</span>
      </div>

      {/* Email */}
      <div
        className="flex flex-col md:flex-row justify-between md:justify-center md:items-center cursor-pointer"
        onClick={() => {
          setIsOpen(true);
          setSelectedOrder(order);
        }}
      >
        <span className="md:hidden font-semibold text-[#]">Email</span>
        <span>{order.email}</span>
      </div>

      {/* Product */}
      <div className="flex flex-col md:flex-row justify-between md:justify-center md:items-center">
        <span className="md:hidden font-semibold text-[#]">Product</span>
        <span>{order.platterName}</span>
      </div>

      {/* Pickup Time */}
      <div className="flex flex-col md:flex-row justify-between md:justify-center md:items-center">
        <span className="md:hidden font-semibold text-[#]">Pickup</span>
        <span>
          {formatTime24To12(order.time)}, {formatDate(order.date)}
        </span>
      </div>

      {/* Status */}
      <div
        className={`flex flex-col md:flex-row justify-between md:justify-center md:items-center ${
          order.status === "decline" ? "text-red-500" : ""
        }`}
      >
        <span className="md:hidden font-semibold text-[#]">Status</span>
        {order.status === "completed" ? (
          <span>completed</span>
        ) : order.status === "decline" ? (
          <span>decline</span>
        ) : (
          <div className="flex gap-2 justify-center mt-1 md:mt-0">
            <button
              className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
              onClick={() => updateOrderStatus(order.oid.toString(), "completed")}
            >
              Complete
            </button>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
              onClick={() => updateOrderStatus(order.oid.toString(), "decline")}
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffOrderRow;
