import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// 회원 관련 컴포넌트
import Main from "../components/user/main/Main.jsx";
import LoginPage from "../components/user/login/Login.jsx";
import RegisterPage from "../components/user/register/Register.jsx";
import FindIdPass from "../components/user/login/FindIdPass.jsx";
import MyAccount from "../components/user/mypage/MyAccount.jsx";

// 관리자 관련 컴포넌트
import AdminLogin from "../components/manager/login/ManagerLogin.jsx";
import MemAdmin from "../components/manager/member/ManagerMember.jsx";
import NoticeAdmin from "../components/manager/notice/ManagerNotice.jsx";
import Reservation from "../components/member/reservation/Reservation";
import Notice from "../components/member/notice/Notice.jsx";
import NoticeDetail from "../components/member/notice/NoticeDetail.jsx";
import About from "../components/member/aboutshop/About.jsx";
import Mypage from "../components/user/mypage/MyPage.jsx";

const AppRoutes = ({ isLogin, setIsLogin, logout }) => {
  return (
    <Routes>
      {/* 회원 라우트 */}  
      {/* 로그아웃 */}
      <Route path="/" element={<Main isLogin={isLogin} logout={logout} />} /> 
    
      <Route path="/login" element={!isLogin ? <LoginPage setIsLogin={setIsLogin}/> : <Navigate to="/" />} />
      <Route path="/register" element={!isLogin ? <RegisterPage /> : <Navigate to="/" />} />
      <Route path="/findidpass" element={<FindIdPass />} />
      {/* <Route path="/mypage" element={isLogin ? <MyAccount /> : <Navigate to="/login" />} /> */}
      <Route path="/mypage" element={<Mypage />} />

      <Route path="/reservation" element={!isLogin ? <LoginPage /> : <Reservation isLogin={isLogin} logout={logout}/>} />
      {/* <Route path="/reservation" element={<Reservation />} /> */}
      <Route path="/about" element={<About />} />
      <Route path="/notice" element={<Notice />} />
      <Route path="/notice/:no" element={<NoticeDetail />} />

      {/* 관리자 라우트 */}
      {/* <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/member" element={isAdmin ? <MemAdmin /> : <Navigate to="/admin/login" />} />
      <Route path="/admin/notice" element={isAdmin ? <NoticeAdmin /> : <Navigate to="/admin/login" />} /> */}

      {/* 기본 라우트 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
