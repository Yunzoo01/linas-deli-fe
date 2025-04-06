import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // axios import

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
import StaffPromotionList from "./pages/staff/StaffPromotionList"
import StaffMyInfo from "./pages/staff/StaffMyInfo";

// ✅ AuthContext 생성
const AuthContext = createContext(null);

// ✅ AuthProvider 생성
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // 초기 user 값 설정
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 유지가 있는 지 확인(세션이 끊겼는 지)
    const storedUser = localStorage.getItem("user");
    console.log(storedUser)
    if (storedUser) { // 있을 시 저장된 유저 유지
      setUser(JSON.parse(storedUser));
      setLoading(false); // localStorage에서 데이터를 가져온 후 로딩 상태 해제
    } else { // 없을 시 세션에서 확인
      axios
        .get('http://localhost:8080/api/auth/session', { withCredentials: true })
        .then((response) => {
          const data = response.data;
          if (data.authenticated) {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user)); // 로그인 후 사용자 정보 저장
            sessionStorage.setItem("sessionId", data.user.sessionId); // 세션 ID 저장
          } else {
            setUser(null);
            localStorage.removeItem("user");
          }
        })
        .catch((error) => {
          setUser(null);
          localStorage.removeItem("user");
        })
        .finally(() => {
          setLoading(false); // 로딩 상태 해제
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


// ✅ useAuth hook 생성
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();  // 로그인 정보와 로딩 상태를 useAuth 훅으로 가져옵니다.
  const location = useLocation();       // 현재 페이지의 location을 가져옵니다.

  if (loading) {
    return <Spinner />;  // 로딩 중이면 로딩 스피너를 반환합니다.
  }

  if (!user) {
    // 로그인하지 않은 사용자라면 로그인 페이지로 리다이렉트합니다.
    return <Navigate to="/staff/login" state={{ from: location }} replace />;
  }

  return children;  // 로그인된 사용자라면 자식 컴포넌트를 렌더링합니다.
};

const Layout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // URL이 "/staff"로 시작하면 staff 페이지로 판단
  const isStaffPage =
    location.pathname.startsWith("/staff");

  // 세션 체크 및 로그인 상태 확인
  useEffect(() => {
    const sessionID = sessionStorage.getItem("sessionId");
    setIsLoading(false); // 로딩 상태 종료
  }, []);

  return (
    <>
      {isStaffPage ? <StaffNavbar /> : <Navbar />}
      <div className="pt-0 sm:pt-20 text-base">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/:boxType" element={<OrderDetail />} />
          <Route path="/contact" element={<Contact />} />

          {/* ✅ 로그인 안 하면 "/staff/*" 접근 불가 */}
          <Route path="/staff/login" element={<StaffLogin />} />
          {/* AuthProvider를 /staff 페이지에만 적용 */}
          {isStaffPage && (
            <Route path="/staff/menu" element={<AuthProvider><RequireAuth><StaffMenu /></RequireAuth></AuthProvider>} />
          )}
          {isStaffPage && (
            <Route path="/staff/order" element={<AuthProvider><RequireAuth><StaffOrderHistory /></RequireAuth></AuthProvider>} />
          )}
          {isStaffPage && (
            <Route path="/staff/profile" element={<AuthProvider><RequireAuth><StaffMyInfo /></RequireAuth></AuthProvider>} />
          )}
          {isStaffPage && (
            <Route path="/staff/promotion" element={<AuthProvider><RequireAuth><StaffPromotion /></RequireAuth></AuthProvider>} />
          )}
        </Routes>
      </div>
      <Footer />
      <ToastContainer autoClose={2000} />
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

//로딩을 위한 스피너
const Spinner = () => (
  <div className="spinner">
    <div className="circle"></div>
    <style jsx="true">{`
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
    `}</style>
  </div>
);

export default App;
