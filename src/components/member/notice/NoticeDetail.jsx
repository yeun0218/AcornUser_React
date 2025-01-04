import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import defaultServiceImage from "../../../assets/images/logo_black.png"; // 기본 이미지

export default function NoticeDetail() {
  const navigate = useNavigate();
  const { no } = useParams();
  const [notice, setNotice] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/notice/${no}`)
      .then((response) => {
        setNotice(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("공지사항을 불러오는 도중 오류가 발생했습니다.");
        setIsLoading(false);
        console.error(error);
      });
  }, [no]);

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
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <img
              src={
                notice.noticeImagePath && notice.noticeImagePath.trim()
                  ? notice.noticeImagePath
                  : defaultServiceImage
              }
              alt="공지 이미지"
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col md={6}>
            <h2 className="mb-4">{notice.noticeTitle}</h2>
            <p>{notice.noticeContent}</p>
            <p className="text-muted">작성일: {new Date(notice.noticeReg).toLocaleDateString()}</p>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="d-flex justify-content-center">
            <Button
              variant="secondary"
              onClick={() => navigate(`/notice/${notice.prevNo}`)}
              disabled={!notice.prevNo}
              className="mx-2"
            >
              이전
            </Button>
            <Button variant="primary" onClick={() => navigate("/notice")} className="mx-2">
              목록
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(`/notice/${notice.nextNo}`)}
              disabled={!notice.nextNo}
              className="mx-2"
            >
              다음
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}