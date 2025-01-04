import React, { useState, useEffect } from "react";
import { Tab, Nav, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../../common/Pagination"; // 페이지네이션 컴포넌트

const ProductBTab = () => {
  const [key, setKey] = useState("샴푸"); // 기본값 설정
  const [products, setProducts] = useState([]); // 상품 데이터 상태
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 12; // 페이지당 항목 수
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  const tabs = ["샴푸", "린스", "트리트먼트", "염색약", "스타일링"]; // 대분류 탭
  const tabMappings = {
    샴푸: "P100",
    린스: "P200",
    트리트먼트: "P300",
    염색약: "P400",
    스타일링: "P500",
  };

  // 페이지별 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 기본 대분류 데이터 로드
  useEffect(() => {
    fetchProducts("샴푸");
  }, []);

  // 대분류별 상품 데이터를 불러오는 함수
  const fetchProducts = async (category) => {
    try {
      const productBCode = tabMappings[category];
      const response = await axios.get(
        `http://localhost:8080/product/order/${productBCode}`
      );
      console.log("API 응답 데이터:", response.data); // 디버깅용 로그
      setProducts(response.data || []);
      setFilteredData(response.data || []);
      setCurrentPage(1); // 첫 페이지로 초기화
    } catch (error) {
      console.error("상품 데이터를 불러오는 데 실패했습니다:", error);
      setProducts([]);
      setFilteredData([]);
    }
  };

  // 탭 전환 핸들러
  const handleTabSelect = (tabKey) => {
    setKey(tabKey);
    fetchProducts(tabKey);
  };

  // 상품 클릭 시 상세 페이지로 이동
  const handleProductClick = (productCode) => {
    navigate(`/product/${productCode}`);
  };

  return (
    <Container className="product-tabs-container mt-4"> {/* 헤더와 탭 사이 여백 추가 */}
      <Tab.Container id="product-tabs" activeKey={key} onSelect={handleTabSelect}>
        <Row className="mb-3"> {/* 추가 여백 설정 */}
          <Col sm={12}>
            {/* 탭 버튼 */}
            <Nav variant="tabs" className="mb-3 tab-buttons">
              {tabs.map((tabName, index) => (
                <Nav.Item key={index}>
                  <Nav.Link
                    eventKey={tabName}
                    className={key === tabName ? "active" : ""}
                    style={{
                      color: key === tabName ? "black" : "gray",
                      fontWeight: key === tabName ? "bold" : "normal",
                    }}
                  >
                    {tabName}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            {/* 탭 콘텐츠 */}
            <Tab.Content className="product-tab-content">
              {tabs.map((tabName) => (
                <Tab.Pane eventKey={tabName} key={tabName}>
                  {currentItems.length > 0 ? (
                    <div className="d-flex flex-wrap justify-content-center">
                      {currentItems.map((product) => (
                        <div
                          className="product-card card"
                          style={{ width: "18rem", margin: "10px", cursor: "pointer" }}
                          key={product.productCode}
                          onClick={() => handleProductClick(product.productCode)} // 클릭 시 이동
                        >
                          <img
                            src={product.productImagePath || "/default-product.png"}
                            className="card-img-top"
                            alt={product.productName}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{product.productName}</h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center mt-4">등록된 상품이 없습니다.</p>
                  )}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </Container>
  );
};

export default ProductBTab;