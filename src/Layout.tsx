import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Order from "./pages/Order";
import OrderDetail from "./sections/order/OrderDetail";
import StaffNavbar from "./components/staff/StaffNavbar";
import StaffLogin from "./pages/staff/StaffLogin";
import StaffMenu from "./pages/staff/StaffMenu";
import StaffOrderHistory from "./pages/staff/StaffOrderHistory";
import StaffMyInfo from "./pages/staff/StaffMyInfo";
import StaffAddMenuForm from "./pages/staff/menu/StaffAddMenuForm";
import { useAuth } from "./auth/AuthContext";
import StaffUpdateMenuForm from "./pages/staff/menu/StaffUpdateMenuForm";
import { ReactNode } from "react";  // Import ReactNode
import StaffSuppliers from "./pages/staff/StaffSuppliers";
import NotFound from "./pages/Notfound";
import Gallery from "./pages/OrderGarllery";

// 로그인된 사용자만 접근 가능한 컴포넌트
const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();  // useAuth 훅으로 로그인 상태 가져오기
  const location = useLocation();

  if (loading) return <Spinner />;
  if (!user)
    return <Navigate to="/staff/login" state={{ from: location }} replace />;
  return <>{children}</>; // Wrap children in a fragment to return
};

const Layout = () => {
  const location = useLocation();
  const isStaffPage = location.pathname.startsWith("/staff");
  const isLoginPage = location.pathname === "/staff/login"; // 로그인 페이지인지 확인

  return (
    <>
      {/* 로그인 페이지가 아닐 때만 Navbar 추가 */}
      {location.pathname !== "/staff/login" ? (
        isStaffPage ? (
          <StaffNavbar />
        ) : (
          <Navbar />
        )
      ) : (
        ""
      )}

      <div className={`pt-0 ${!isLoginPage ? "sm:pt-0" : ""} text-base`}> {/* 로그인 페이지일 경우 sm:pt-20을 제외 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/:boxType" element={<OrderDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

          {/* Staff Routes */}
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/staff/menu" element={<RequireAuth><StaffMenu /></RequireAuth>} />
          <Route path="/staff/add-menu" element={<RequireAuth><StaffAddMenuForm /></RequireAuth>} />
          <Route path="/staff/update-menu" element={<RequireAuth><StaffUpdateMenuForm /></RequireAuth>} />
          <Route path="/staff/order" element={<RequireAuth><StaffOrderHistory /></RequireAuth>} />
          <Route path="/staff/mypage" element={<RequireAuth><StaffMyInfo /></RequireAuth>} />
          <Route path="/staff/suppliers" element={<RequireAuth><StaffSuppliers/></RequireAuth>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

// 로딩용 스피너
const Spinner = () => (
  <div className="spinner">
    <div className="circle"></div>
    <style>
      {`
        .spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .circle {
          border: 4px solid transparent;
          border-top: 4px solid #007bff;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

export default Layout;
