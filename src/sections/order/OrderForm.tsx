import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const OrderForm = () => {
  const { boxType } = useParams();
  console.log(boxType);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    customerName: "",
    phone: "",
    email: "",
    allergy: "",
    message: "",
    platter: boxType || ""
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Sending formData:", formData);
    try {
      const response = await axios.post(`http://localhost:8080/api/orders`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Create Success:", response.data);
    } catch (error) {
      console.error("Create Failed:", error.response?.data || error.message);
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      {/* 주문 폼 */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <input type="hidden" name="platter" value={formData.platter}/>
        {/* ✅ Date | Time */}
        <div>
          <label className="block text-gray-800 font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-4 border text-gray-800 rounded-4xl border-gray-300 text-lg"
            min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]}
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800">Time</label>
          <select 
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-4 border text-gray-800 rounded-4xl border-gray-300 text-lg"
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

        {/* ✅ Name (1컬럼 전체) */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-800">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full p-4 border rounded-4xl border-gray-300 text-lg"
          />
        </div>

        {/* ✅ Phone | Email */}
        <div>
          <label className="block font-semibold text-gray-800">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="x-xxx-xxx-xxxx"
            className="w-full p-4 border rounded-4xl border-gray-300 text-lg"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-4 border rounded-4xl border-gray-300 text-lg"
          />
        </div>

        {/* ✅ Allergy (1컬럼 전체) */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-800">Allergy</label>
          <textarea
            name="allergy"
            value={formData.allergy}
            onChange={handleChange}
            placeholder="Let us know about any allergies"
            className="w-full p-4 border rounded-4xl border-gray-300 h-24 text-lg resize-none"
          ></textarea>
        </div>

        {/* ✅ Order Message (1컬럼 전체) */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-800">Order Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-4 border rounded-4xl border-gray-300 h-24 text-lg resize-none"
          ></textarea>
        </div>

        {/* ✅ 중앙 정렬된 Order 버튼 (1컬럼 전체) */}
        <div className="md:col-span-2 flex justify-center mt-6">
          <button type="submit" className="w-1/2 p-4 bg-[#AD343E] text-white text-lg rounded-4xl flex items-center justify-center hover:bg-[#7D3225] transition">
            Order →
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;