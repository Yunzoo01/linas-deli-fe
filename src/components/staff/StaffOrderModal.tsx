import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const StaffOrderModal = ({ isOpen, setIsOpen, order, updateOrder }) => {
  // 초기 formData를 order 객체로 설정 (order가 없으면 빈 객체)
  const [formData, setFormData] = useState(order || {});
  // 백엔드 유효성 에러를 저장할 상태
  const [errors, setErrors] = useState({});


  // order prop이 변경될 때 formData 업데이트
  useEffect(() => {
    if (order) {
      // 만약 order.time이 "HH:mm" 형식이라면, ":00"을 붙여 "HH:mm:ss" 형식으로 변환
      const formattedTime =
        order.time && order.time.length === 5 ? `${order.time}:00` : order.time;
      // order 객체에 변환된 시간을 덮어씌워서 formData에 저장
      setFormData({ ...order, time: formattedTime });
    }
  }, [order]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    // 해당 필드의 값을 업데이트
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Sending formData:", formData);
    try {
      // PUT 요청을 통해 주문 업데이트
      const response = await axios.put(`http://localhost:8080/api/staff/orders/${formData.oid}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      
      toast.success("Order created successfully!");
      console.log("Update Success:", response.data);
      // 업데이트된 주문을 상위 컴포넌트에 전달
      updateOrder(response.data);
      // 모달 닫기
      setIsOpen(false);
    } catch (error) {
      // 에러 응답이 존재하면 errors 상태에 저장하고 토스트 메시지 표시
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        toast.error("Please check the form for errors.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[140]"
          onClose={() => setIsOpen(false)}
        >
          {/* 배경 어둡게 처리 */}
          <div className="fixed inset-0 bg-black/30 bg-opacity-30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-5xl max-h-full bg-white rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-3 bg-[#AD343E] p-7 text-white">
                <Dialog.Title className="text-lg font-semibold">
                  Order Information
                </Dialog.Title>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-700 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <form
                className="space-y-1 px-7 pb-7 max-h-10/12 overflow-auto"
                onSubmit={handleSubmit}
              >
                {/* 주문 번호와 상태 표시 */}
                <div className="flex justify-between">
                  <p className="text-xl font-bold text-gray-700">
                    #{formData.oid || ""} - {formData.status || ""}
                  </p>
                  <p className="text-xl font-bold text-gray-700">
                    7:50 PM, Feb 11
                  </p>
                </div>

                {/* 날짜와 시간 입력 필드 */}
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="w-full lg:w-[49%]">
                    <label className="pt-3 block text-xl font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full py-4 px-5 border border-[#DBDFD0] rounded-[61px]"
                    />
                  </div>
                  <div className="w-full lg:w-[49%]">
                    <label className="pt-3 block text-xl font-medium text-gray-700">
                      Time
                    </label>
                    <select
                      name="time"
                      value={formData.time || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full py-4 px-5 border border-[#DBDFD0] rounded-[61px]"
                    >
                      <option value="">Select Time</option>
                      <option value="10:00:00">10:00</option>
                      <option value="10:30:00">10:30</option>
                      <option value="11:00:00">11:00</option>
                      <option value="11:30:00">11:30</option>
                      <option value="12:00:00">12:00</option>
                      <option value="12:30:00">12:30</option>
                      <option value="13:00:00">13:00</option>
                      <option value="13:30:00">13:30</option>
                      <option value="14:00:00">14:00</option>
                      <option value="14:30:00">14:30</option>
                      <option value="15:00:00">15:00</option>
                      <option value="15:30:00">15:30</option>
                      <option value="16:00:00">16:00</option>
                    </select>
                  </div>
                </div>

                {/* 고객 정보 입력 필드 */}
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="flex flex-col justify-between lg:w-[49%]">
                    <div className="w-full">
                      <label className="pt-3 block text-xl font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full py-4 px-5 border border-[#DBDFD0] rounded-[61px]"
                      />
                    </div>
                    <div className="w-full">
                      <label className="pt-3 block text-xl font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full py-4 px-5 border border-[#DBDFD0] rounded-[61px]"
                      />
                    </div>
                    <div className="w-full">
                      <label className="pt-3 block text-xl font-medium text-gray-700">
                        E-mail
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full py-4 px-5 border border-[#DBDFD0] rounded-[61px]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full lg:w-[50%] justify-between">
                    <label className="pt-3 block text-xl font-medium text-gray-700">
                      Allergy
                    </label>
                    <textarea
                      rows="3"
                      name="allergy"
                      value={formData.allergy || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full h-full py-4 px-5 border border-[#DBDFD0] rounded-[33px]"
                    />
                  </div>
                </div>

                {/* 추가 메모 입력 필드 */}
                <div className="flex flex-col w-full justify-between">
                  <label className="pt-3 block text-xl font-medium text-gray-700">
                    Note
                  </label>
                  <textarea
                    rows="3"
                    name="message"
                    value={formData.message || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full h-full py-4 px-5 border border-[#DBDFD0] rounded-[33px]"
                  />
                </div>

                {/* 제출 버튼 */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-[30%] mt-3 py-2 bg-[#AD343E] text-white rounded-3xl ml-auto cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default StaffOrderModal;
