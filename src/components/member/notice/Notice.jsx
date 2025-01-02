import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../common/Header.jsx"; // 상단 네비게이션 바
import Pagination from "../../common/Pagination.jsx"; // 페이지네이션 컴포넌트
import "./Notice.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Notice() {
  const [notices, setNotices] = useState([]); // 공지 데이터를 저장할 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [itemsPerPage] = useState(6); // 페이지당 아이템 수 (고정)
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  // 공지 목록을 가져오는 함수
  const fetchNotices = async (page) => {
    try {
      const token = localStorage.getItem("accessToken"); // 저장된 토큰 가져오기
      const response = await axios.get(
        `http://localhost:8080/notice?page=${page - 1}&size=6`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더 추가
          },
        }
      );
      console.log(response.data);
      setNotices(response.data.content);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsLoading(false);
    }
  };  

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchNotices(page);
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchNotices(currentPage);
  }, [currentPage]);

  if (isLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          데이터를 불러오는 중 오류가 발생했습니다: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <div>
      <Header />

      {/* 공지사항 리스트 */}
      <Container className="notice-container mt-5">
        <h1 className="mb-4">공지사항</h1>
        <Row>
          {notices.map((notice) => (
            <Col key={notice.noticeNo} md={4} className="mb-4">
              <Card className="notice-card">
                {notice.noticeImagePath ? (
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8080${notice.noticeImagePath}`}
                    alt="공지 사진"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/notice/${notice.noticeNo}`)}
                  />
                ) : (
                  <div className="no-image">이미지 없음</div>
                )}
                <Card.Body>
                  <Card.Title
                    className="notice-title"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/notice/${notice.noticeNo}`)}
                  >
                    {notice.noticeCheck && (
                      <span className="important">📍</span>
                    )}
                    {notice.noticeTitle}
                  </Card.Title>
                  <Card.Text className="notice-date">
                    작성일: {notice.noticeReg}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 페이지네이션 */}
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </Container>
    </div>
  );
}

export default Notice;