import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// 회원 관련 컴포넌트
import Main from "../components/member/main/Main.jsx";
import LoginPage from "../components/member/login/Login.jsx";
import RegisterPage from "../components/member/register/Register.jsx";
import FindIdPass from "../components/member/login/FindIdPass.jsx";
import Stylist from "../components/member/stylist/Stylist.jsx";
import Reservation from "../components/member/reservation/Reservation.jsx";
import Notice from "../components/member/notice/Notice.jsx";
import NoticeDetail from "../components/member/notice/NoticeDetail.jsx";
import About from "../components/member/aboutshop/About.jsx";
import Mypage from "../components/member/mypage/MyPage.jsx";
import Service from "../components/member/aboutservice/Service.jsx";

// 관리자 관련 컴포넌트 (주석 처리된 코드 포함)
import AdminLogin from "../components/manager/login/ManagerLogin.jsx";
import MemAdmin from "../components/manager/member/ManagerMember.jsx";
import NoticeAdmin from "../components/manager/notice/ManagerNotice.jsx";

const AppRoutes = ({ isLogin, setIsLogin, logout }) => {
    const location = useLocation();

    return (
        <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<Main isLogin={isLogin} logout={logout} />} />

            {/* 로그인 페이지 */}
            <Route
                path="/login"
                element={
                    !isLogin ? (
                        <LoginPage setIsLogin={setIsLogin} />
                    ) : (
                        // 로그인 후 이전 페이지 또는 메인 페이지로 리디렉션
                        <Navigate to={location.state?.from || "/"} replace />
                    )
                }
            />

            {/* 회원가입 페이지 */}
            <Route
                path="/register"
                element={!isLogin ? <RegisterPage /> : <Navigate to="/" />}
            />

            {/* 아이디/비밀번호 찾기 */}
            <Route path="/findidpass" element={<FindIdPass />} />

            {/* 마이페이지 */}
            <Route path="/mypage" element={isLogin ? <Mypage /> : <Navigate to="/login" />} />

            {/* 스타일리스트 페이지 */}
            <Route path="/stylist" element={<Stylist />} />

            {/* 서비스 소개 페이지 */}
            <Route path="/service" element={<Service />} />

            {/* 예약하기 페이지 (로그인한 사용자만 접근 가능) */}
            <Route
                path="/reservation"
                element={
                    isLogin ? (
                        <Reservation />
                    ) : (
                        // 로그인 페이지로 이동하며 이전 경로를 state로 저장
                        <Navigate to="/login" state={{ from: "/reservation" }} replace />
                    )
                }
            />
            <Route
                path="/reservation/:memberId"
                element={
                    isLogin ? (
                        <Reservation isLogin={isLogin} />
                    ) : (
                        // useLocation의 값을 변수로 추출해 사용
                        <Navigate
                            to="/login"
                            state={{ from: `/reservation/${location.pathname.split('/')[2]}` }}
                            replace
                        />
                    )
                }
            />

            {/* 매장 소개 페이지 */}
            <Route path="/about" element={<About />} />

            {/* 공지사항 */}
            <Route path="/notice" element={<Notice />} />
            <Route path="/notice/:no" element={<NoticeDetail />} />

            {/* 관리자 관련 페이지 (주석 처리된 부분) */}
            {/*
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/member" element={isAdmin ? <MemAdmin /> : <Navigate to="/admin/login" />} />
      <Route path="/admin/notice" element={isAdmin ? <NoticeAdmin /> : <Navigate to="/admin/login" />} />
      */}

            {/* 기본 라우트 */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;