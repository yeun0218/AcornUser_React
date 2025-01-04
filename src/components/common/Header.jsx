import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Button, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/AcornBeauty_logo_transparent.png";
import { LOGO_IMG } from "../../assets/styles/MainStyle.jsx";
import Profile from './Profile';
import axios from "axios";

const Header = ({ isLogin, logout }) => {
  const navigate = useNavigate();
  const [customerShopid, setCustomerShopid] = useState(null);

  useEffect(() => {
    if (isLogin) {
      const fetchCustomerData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/customer/mypage', {
            withCredentials: true,
          });
          if (response.data && response.data.customerShopid) {
            setCustomerShopid(response.data.customerShopid);
          } else {
            console.warn("CustomerShopid is missing in the response.");
          }
        } catch (error) {
          console.error("Error fetching customerShopid:", error);
        }
      };
  
      fetchCustomerData();
    }
  }, [isLogin]);

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
                  <NavDropdown.Item as={Link} to="/stylist">
                    디자이너 소개
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/service">
                    서비스 소개
                  </NavDropdown.Item>
                </NavDropdown>
                <Link to="/acornshop" className="nav-link">
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
              {/* {!isLogin ? (
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
              )} */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {isLogin ? (
                <>
                  {/* customerShopid 표시 */}
                  <span style={{ fontWeight: "bold", color: "#555" }}>
                    {customerShopid ? `${customerShopid}님` : "Loading..."}
                  </span>
                  {/* Profile 컴포넌트 */}
                  <Profile />
                  {/* 로그아웃 버튼 */}
                  <Button
                    className="btn btn-light btn-outline-secondary px-3"
                    onClick={logout}
                  >
                    로그아웃
                  </Button>
                </>
              ) : (
                // 로그인 버튼
                <Button
                  className="btn btn-light btn-outline-secondary px-3"
                  onClick={() => navigate("/login")}
                >
                  로그인
                </Button>
              )}
            </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
  );
};

export default Header;