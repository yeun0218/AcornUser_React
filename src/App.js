import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/common/Header";
import axios from "axios";
import Cookies from 'js-cookie';
import ThemeCustomization from "./themes";

const App = () => {
  const [isLogin, setIsLogin] = useState(false); // 로그인 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태
  const [popupMessage, setPopupMessage] = useState(""); // 팝업 메시지


  useEffect(() => {
    // 로그인 상태 확인
    const token = sessionStorage.getItem("accessToken");
    if (token) setIsLogin(true); // 토큰이 있으면 로그인 상태로 설정
  }, []);

  const openPopup = (message) => {
    setPopupMessage(message);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8080/logoutProcess", null,
      { withCredentials: true , 
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`, // 토큰 추가
      },});
      sessionStorage.clear(); // 세션 초기화
      Cookies.remove("accessToken"); // 쿠키 삭제
      setIsLogin(false); // 로그아웃 상태로 설정
      openPopup("로그아웃되었습니다.");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      openPopup("로그아웃 요청 중 문제가 발생했습니다.");
    }
  };

  return (
    <>
    <Router>
      <Header isLogin={isLogin} logout={logout} />
      <AppRoutes isLogin={isLogin} setIsLogin={setIsLogin} logout={logout} />
    </Router>

    {/* 팝업 알림 */}
    {isPopupOpen && (
      <div className="popup-overlay">
        <div className="popup">
          <div className="popup-content">
            {popupMessage}
            <br />
            <br />
            <button onClick={closePopup} className="btn btn-primary">
              닫기
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default App;
