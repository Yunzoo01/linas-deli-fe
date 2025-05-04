import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        scrolling ? "bg-white shadow-md" : "bg-transparent"
      } absolute sm:fixed top-0 left-0 w-full z-100 max-w-[120rem] mx-auto sm:shadow-none transition-all duration-300`}
    >
      <div className="w-full flex h-[3.375rem] justify-end items-center sm:h-auto sm:justify-between sm:items-center sm:px-13 sm:py-6">
        {/* 로고 */}
        <Link to="/" className="text-2xl font-bold hidden sm:block w-[160px]">
          <img
            src={scrolling ? "logo_black.svg" : "logo_white.svg"} // 스크롤에 따라 로고 변경
            alt="Logo"
          />
        </Link>

        {/* 햄버거 버튼 */}
        <button
          className="sm:hidden w-12 h-12 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden sm:flex space-x-6 text-lg">
          <li>
            <Link
              to="/menu"
              className={`${
                scrolling ? "text-gray-900 hover:text-gray-700" : "text-white hover:text-gray-300"
              }`}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/order"
              className={`${
                scrolling ? "text-gray-900 hover:text-gray-700" : "text-white hover:text-gray-300"
              }`}
            >
              Order
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`${
                scrolling ? "text-gray-900 hover:text-gray-700" : "text-white hover:text-gray-300"
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* 배경 (클릭하면 메뉴 닫힘) */}
      <div
        className={`fixed inset-0 bg-[rgba(0,0,0,0.3)] transition-opacity duration-300 ${
          isOpen ? "bg-opacity-20 visible" : "bg-opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* 모바일 메뉴 */}
      <div
        className={`rounded-tl-3xl rounded-bl-3xl lg:hidden fixed top-0 right-0 w-40 h-screen bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col space-y-11 pt-11 items-center">
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 mb-4 shadow">
                <img
                  src={scrolling ? "logo_black.svg" : "logo_white.svg"} // 스크롤에 따라 로고 변경
                  alt="Logo"
                  className="w-full h-full object-cover scale-101"
                />
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className={`${
                scrolling ? "text-gray-900 hover:text-gray-700" : "text-white hover:text-gray-300"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/order"
              className={`${
                scrolling ? "text-gray-900 hover:text-gray-700" : "text-white hover:text-gray-300"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Order
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`${
                scrolling ? "text-gray-900 hover:text-gray-700" : "text-white hover:text-gray-300"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
