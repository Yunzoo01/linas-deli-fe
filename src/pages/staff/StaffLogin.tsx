import qs from "qs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const StaffLogin = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestData = qs.stringify({ id, password }); // ✅ qs 사용하여 문자열 변환

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        requestData, // ✅ qs 변환된 데이터 전송
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // ✅ 필요하면 수정
          },
          withCredentials: true,
        }
      );

      console.log(response); // 응답 확인용 로그

      if (response.status === 200 && response.data.user) {
        const { user } = response.data;

        localStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("sessionId", user.sessionId);

        navigate(user.role === "ROLE_STAFF" ? "/staff/order" : "/staff/login");

        setId("");
        setPassword("");
      } else {
        toast.error("로그인 정보가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      toast.error(error.response?.data?.message || "네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Id"
        required
        disabled={loading}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
};

export default StaffLogin;
