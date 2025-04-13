import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// AuthContext 생성
const AuthContext = createContext(null);

// AuthProvider 생성
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // 초기 user 값 설정
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      axios
        .get('http://localhost:8080/api/auth/session', { withCredentials: true })
        .then((response) => {
          const data = response.data;
          if (data.authenticated) {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            sessionStorage.setItem("sessionId", data.user.sessionId);
          } else {
            setUser(null);
            localStorage.removeItem("user");
          }
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem("user");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 훅 생성
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
