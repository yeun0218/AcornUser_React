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
import Reservation from "../components/user/reservation/Reservation.jsx";


const AppRoutes = ({ isLogin, isAdmin, logout }) => {
  return (
    <Routes>
      {/* 회원 라우트 */}
      <Route path="/" element={<Main />} />
      <Route path="/login" element={!isLogin ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/register" element={!isLogin ? <RegisterPage/> : <Navigate to="/" />} />
      <Route path="/findidpass" element={<FindIdPass />} />
      <Route path="/mypage" element={isLogin ? <MyAccount /> : <Navigate to="/login" />} />

        {/*<Route path="/reservation" element={!isLogin ? <LoginPage /> : <Navigate to="/reservation" />} />*/}
        <Route path="/reservation" element={<Reservation />} />
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
