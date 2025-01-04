import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// 회원 관련 컴포넌트
import Main from "../components/member/main/Main.jsx";
import LoginPage from "../components/member/login/Login.jsx";
import RegisterPage from "../components/member/register/Register.jsx";
import FindIdPass from "../components/member/login/FindIdPass.jsx";
//import MyAccount from "../components/member/mypage/MyAccount.jsx";
import Stylist from "../components/member/stylist/Stylist.jsx";

// 관리자 관련 컴포넌트
// import AdminLogin from "../components/manager/login/ManagerLogin.jsx";
// import MemAdmin from "../components/manager/member/ManagerMember.jsx";
// import NoticeAdmin from "../components/manager/notice/ManagerNotice.jsx";
import Reservation from "../components/member/reservation/Reservation";
import Notice from "../components/member/notice/Notice.jsx";
import NoticeDetail from "../components/member/notice/NoticeDetail.jsx";
import About from "../components/member/aboutshop/About.jsx";
import AcornShop from "../components/member/aboutshop/AcornShop.jsx";
import Product from "../components/member/product/product.jsx";
import Mypage from "../components/member/mypage/MyPage.jsx";
import Service from "../components/member/aboutservice/Service.jsx";
const AppRoutes = ({ isLogin, setIsLogin, logout }) => {
    const location = useLocation();
    return (
        <Routes>
            {/* 회원 라우트 */}
            {/* 로그아웃 */}
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
            <Route path="/register" element={!isLogin ? <RegisterPage /> : <Navigate to="/" />} />
            <Route path="/findidpass" element={<FindIdPass />} />
            <Route path="/acornshop" element={<AcornShop />} />
            <Route path="/product/:productCode" element={<Product />} />
            {/* <Route path="/mypage" element={isLogin ? <MyAccount /> : <Navigate to="/login" />} /> */}
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/stylist" element={<Stylist />} />
            <Route path="/service" element={<Service />} />

            {/*<Route path="/reservation" element={!isLogin ? <LoginPage setIsLogin={setIsLogin}/> : <Reservation />} />*/}
            {/*<Route path="/reservation/:memberId" element={!isLogin ? <LoginPage setIsLogin={setIsLogin}/> : <Reservation />} />*/}
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
