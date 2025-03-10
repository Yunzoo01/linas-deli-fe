import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[rgba(255,255,255,0.85)] shadow absolute sm:fixed top-0 left-0 w-full z-100 max-w-[120rem] mx-auto">
      <div className="w-full flex h-[3.375rem] justify-end items-center
            sm:h-auto sm:justify-between sm:items-center sm:px-13 sm:py-6 sm:bg-white">
        {/* 로고 */}
        <Link to="/" className="text-2xl font-bold text-gray-900 hidden sm:block">
          Lina's Deli
        </Link>

        {/* 햄버거 버튼 */}
        <button
          className="sm:hidden w-12 h-12 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden sm:flex space-x-6">
          <li><Link to="/staff/menu" className="text-gray-700 hover:text-gray-900">Menu</Link></li>
          <li><Link to="/staff/order" className="text-gray-700 hover:text-gray-900">Order</Link></li>
          <li><Link to="/staff/profile" className="text-gray-700 hover:text-gray-900">Profile</Link></li>
          <li><Link to="/staff/promotion" className="text-gray-700 hover:text-gray-900">Promotion</Link></li>
          <li className="text-gray-700 hover:text-gray-900">Logout</li>
        </ul>
      </div>

      {/* 배경 (클릭하면 메뉴 닫힘) */}
      <div
        className={`fixed inset-0 bg-[rgba(0,0,0,0.3)] transition-opacity duration-300 ${isOpen ? "bg-opacity-20 visible" : "bg-opacity-0 invisible"}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* 모바일 메뉴 */}
      <div
        className={`rounded-tl-3xl rounded-bl-3xl lg:hidden fixed top-0 right-0 w-40 h-screen bg-[#AD343E] shadow-lg p-4 transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <ul className="flex flex-col space-y-11 pt-11 items-center">
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 mb-4 shadow">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-full h-full object-cover scale-101"
                />
              </div>
            </Link>
          </li>
          <li><Link to="/staff/menu" className="text-white hover:text-gray-300" onClick={() => setIsOpen(false)}>Menu</Link></li>
          <li><Link to="/staff/order" className="text-white hover:text-gray-300" onClick={() => setIsOpen(false)}>Order</Link></li>
          <li><Link to="/staff/profile" className="text-white hover:text-gray-300" onClick={() => setIsOpen(false)}>Profile</Link></li>
          <li><Link to="/staff/promotion" className="text-white hover:text-gray-300" onClick={() => setIsOpen(false)}>Promotion</Link></li>
          <li className="text-white hover:text-gray-300">Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;