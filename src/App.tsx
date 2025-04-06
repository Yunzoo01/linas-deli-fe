import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Order from "./pages/Order";
import OrderDetail from "./sections/order/OrderDetail";

import StaffNavbar from "./components/staff/StaffNavbar"
import StaffLogin from "./pages/staff/StaffLogin";
import StaffMenu from "./pages/staff/StaffMenu";
import StaffOrderHistory from "./pages/staff/StaffOrderHistory";
import StaffPromotionList from "./pages/staff/StaffPromotionList"
import StaffMyInfo from "./pages/staff/StaffMyInfo";

const Layout = () => {
  const location = useLocation();
  const isStaffPage = location.pathname.startsWith("/staff"); // ✅ 현재 페이지가 "/staff"로 시작하는지 확인

  return (
    <>
      {isStaffPage ? <StaffNavbar /> : <Navbar />} {/* ✅ 네비게이션 자동 선택 */}
      <div className="pt-0 sm:pt-20">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/:boxType" element={<OrderDetail />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/staff" element={<StaffLogin />} />
          <Route path="/staff/menu" element={<StaffMenu />} />
          <Route path="/staff/order" element={<StaffOrderHistory />} />
          <Route path="/staff/profile" element={<StaffMyInfo />} />
          <Route path="/staff/promotion" element={<StaffPromotionList />} />
        </Routes>
        </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App
