const OrderForm = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* 주문 폼 */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* ✅ Date | Time */}
        <div>
          <label className="block text-gray-800 font-semibold">Date</label>
          <input
            type="date"
            className="w-full p-4 border text-gray-800 rounded-4xl border-gray-300 text-lg"
            min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]}
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800">Time</label>
          <select className="w-full p-4 border text-gray-800 rounded-4xl border-gray-300 text-lg">
            <option>10:00</option>
            <option>10:30</option>
            <option>11:00</option>
            <option>11:30</option>
            <option>12:00</option>
            <option>12:30</option>
            <option>13:00</option>
            <option>13:30</option>
            <option>14:00</option>
            <option>14:30</option>
            <option>15:00</option>
            <option>15:30</option>
            <option>16:00</option>
          </select>
        </div>

        {/* ✅ Name (1컬럼 전체) */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-800">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-4 border rounded-4xl border-gray-300 text-lg"
          />
        </div>

        {/* ✅ Phone | Email */}
        <div>
          <label className="block font-semibold text-gray-800">Phone</label>
          <input
            type="tel"
            placeholder="x-xxx-xxx-xxxx"
            className="w-full p-4 border rounded-4xl border-gray-300 text-lg"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800">E-mail</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-4 border rounded-4xl border-gray-300 text-lg"
          />
        </div>

        {/* ✅ Allergy (1컬럼 전체) */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-800">Allergy</label>
          <textarea
            placeholder="Let us know about any allergies"
            className="w-full p-4 border rounded-4xl border-gray-300 h-24 text-lg resize-none"
          ></textarea>
        </div>

        {/* ✅ Order Message (1컬럼 전체) */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-800">Order Message</label>
          <textarea
            className="w-full p-4 border rounded-4xl border-gray-300 h-24 text-lg resize-none"
          ></textarea>
        </div>

        {/* ✅ 중앙 정렬된 Order 버튼 (1컬럼 전체) */}
        <div className="md:col-span-2 flex justify-center mt-6">
          <button className="w-1/2 p-4 bg-[#AD343E] text-white text-lg rounded-4xl flex items-center justify-center hover:bg-[#7D3225] transition">
            Order →
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;