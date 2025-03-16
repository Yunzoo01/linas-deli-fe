import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import axios from "axios";

const StaffOrderModal = ({ isOpen, setIsOpen, order, updateOrder }) => {
  const [formData, setFormData] = useState(order || {});

  // order가 변경될 때 formData를 업데이트
  useEffect(() => {
    if (order) {
      setFormData(order);
    }
  }, [order]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`http://localhost:8080/api/staff/orders/${formData.oid}`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Update Success:", response.data);

      // 성공 시 부모 상태 업데이트
      updateOrder(response.data);

      // 모달 닫기
      setIsOpen(false);
    } catch (error) {
      console.error("Update Failed:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[140]" onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black/30 bg-opacity-30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-5xl max-h-full bg-white rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-3 bg-[#AD343E] p-7 text-white">
                <Dialog.Title className="text-lg font-semibold">Order Information</Dialog.Title>
                <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>

              <form className="space-y-1 px-7 pb-7 max-h-10/12 overflow-auto" onSubmit={handleSubmit}>
                <div className="flex justify-between">
                  <p className="text-xl font-bold text-gray-700">
                    #{formData.oid || ""} - {formData.status || ""}
                  </p>
                  <p className="text-xl font-bold text-gray-700">7:50 PM, Feb 11</p>
                </div>
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="w-full lg:w-[49%]">
                    <label className="pt-3 block text-xl font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full py-4 px-5 border border-[#DBDFD0] rounded-[61px]"
                    />
                  </div>
                  <div className="w-full lg:w-[49%]">
                    <label className="pt-3 block text-xl font-medium text-gray-700">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full py-4 px-5 border border-[#DBDFD0] rounded-[61px]"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="flex flex-col justify-between lg:w-[49%]">
                    <div className="w-full">
                      <label className="pt-3 block text-xl font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full py-4 px-5 border border-[#DBDFD0] rounded-[61px]"
                      />
                    </div>
                    <div className="w-full">
                      <label className="pt-3 block text-xl font-medium text-gray-700">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full py-4 px-5 border border-[#DBDFD0] rounded-[61px]"
                      />
                    </div>
                    <div className="w-full">
                      <label className="pt-3 block text-xl font-medium text-gray-700">E-mail</label>
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
                    <label className="pt-3 block text-xl font-medium text-gray-700">Allergy</label>
                    <textarea
                      rows="3"
                      name="allergy"
                      value={formData.allergy || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full h-full py-4 px-5 border border-[#DBDFD0] rounded-[33px]"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full justify-between">
                  <label className="pt-3 block text-xl font-medium text-gray-700">Note</label>
                  <textarea
                    rows="3"
                    name="message"
                    value={formData.message || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full h-full py-4 px-5 border border-[#DBDFD0] rounded-[33px]"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="w-[30%] mt-3 py-2 bg-[#AD343E] text-white rounded-3xl ml-auto cursor-pointer" onClick={handleSubmit}>
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
