import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/common/Header";

const App = () => {
  const [isLogin, setIsLogin] = useState(false); // 로그인 상태

  useEffect(() => {
    // 로그인 상태 확인
    const token = sessionStorage.getItem("accessToken");
    if (token) setIsLogin(true); // 토큰이 있으면 로그인 상태로 설정
  }, []);

  const logout = () => {
    sessionStorage.clear(); // 세션 초기화
    setIsLogin(false); // 로그아웃 상태로 설정
    alert("로그아웃되었습니다.");
  };

  return (
    <Router>
 
      <AppRoutes isLogin={isLogin} setIsLogin={setIsLogin} logout={logout} />
    </Router>
  );
};

export default App;
