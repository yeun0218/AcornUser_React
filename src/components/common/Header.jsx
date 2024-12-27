import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLogin }) => {
  const [show, setShow] = useState(false); // 로그아웃 버튼 상태 관리
  const navigate = useNavigate();

  // 로그인 상태 관리
  useEffect(() => {
    setShow(isLogin);
  }, [isLogin]);

  // 로그아웃 처리
  const logout = () => {
    sessionStorage.clear();
    alert("로그아웃되었습니다.");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Acorn Beauty</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">
                홈
              </Link>
              <Link to="/products" className="nav-link">
                Acorn Salon
              </Link>
              <Link to="/cart" className="nav-link">
                Acorn Shop
              </Link>
              <Link to="/mypage/profile" className="nav-link">
                마이페이지
              </Link>
              <Link to="/notice" className="nav-link">
                공지사항
              </Link>
              <Link to="/faq" className="nav-link">
                예약하기
              </Link>
            </Nav>
            {!isLogin ? (
              <Button
                className="btn btn-light btn-outline-secondary px-3"
                onClick={() => navigate("/")}
              >
                로그인
              </Button>
            ) : (
              <Button
                className="btn btn-light btn-outline-secondary px-3"
                onClick={logout}
              >
                로그아웃
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
