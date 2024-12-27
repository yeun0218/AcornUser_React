import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // 로그인 상태 확인
    const userNo = sessionStorage.getItem("user_no");
    const admin = sessionStorage.getItem("admin");

    if (userNo) setIsLogin(true);
    if (admin) setIsAdmin(true);
  }, []);

  const logout = () => {
    sessionStorage.clear();
    setIsLogin(false);
    setIsAdmin(false);
    alert("로그아웃되었습니다.");
  };

  return (
    <Router>
      <AppRoutes isLogin={isLogin} isAdmin={isAdmin} logout={logout} />
    </Router>
  );
};

export default App;
