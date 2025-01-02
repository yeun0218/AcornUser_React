import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Button, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/AcornBeauty_logo_transparent.png";
import { LOGO_IMG } from "../../assets/styles/MainStyle.jsx";

const Header = ({ isLogin, logout }) => {
  const navigate = useNavigate();

  return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <LOGO_IMG src={logo} alt="Acorn Beauty Logo" />
              AcornBeauty
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/*<Link to="/" className="nav-link">*/}
                {/*  홈*/}
                {/*</Link>*/}
                <NavDropdown title="Acorn Salon" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/about">
                    샵 소개
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/salon/designers">
                    디자이너 소개
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/salon/services">
                    서비스 소개
                  </NavDropdown.Item>
                </NavDropdown>
                <Link to="/cart" className="nav-link">
                  Acorn Shop
                </Link>
                <Link to="/mypage" className="nav-link">
                  마이페이지
                </Link>
                <Link to="/notice" className="nav-link">
                  공지사항
                </Link>
                <Link to="/reservation" className="nav-link">
                  예약하기
                </Link>
              </Nav>
              {!isLogin ? (
                  <Button
                      className="btn btn-light btn-outline-secondary px-3"
                      onClick={() => {
                        console.log("로그인 버튼 클릭");
                        navigate("/login")}}
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