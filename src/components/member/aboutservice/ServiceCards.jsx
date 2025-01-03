import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import '../../../assets/styles/Service/ServiceCard.css'
import defaultServiceImage from "../../../assets/images/logo_black.png"; // 기본 이미지

const ServiceCards = () => {
    const [services, setServices] = useState([]); // 서비스 상태

    // 모든 서비스 데이터를 API에서 불러오기
    useEffect(() => {
        axios.get('http://localhost:8080/user/service') // 전체 서비스 데이터 API 호출
            .then(response => {
                setServices(response.data); // 서비스 데이터 상태에 저장
            })
            .catch(error => {
                console.error('서비스 데이터를 불러오는 데 실패했습니다:', error);
            });
    }, []); // 컴포넌트가 마운트될 때 한 번만 호출

    // 숫자 형식 변환 함수
    const formatPrice = (price) => {
        return price.toLocaleString(); // 000 단위 , 삽입
    };

    return (
        <Container className="service-cards-container">
            <Row>
                {services.map((service) => (
                    <Col sm={12} md={6} lg={4} key={service.serviceCode} className="mb-4">
                        <div className="card" style={{ width: '100%' }}>
                            <img
                                src={service.image || defaultServiceImage} // 서비스 이미지 없으면 기본 이미지
                                className="card-img-top"
                                alt={service.serviceName}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{service.serviceName}</h5>
                                <p className="card-text">가격: {formatPrice(service.servicePrice)}원</p>
                                <p className="card-text">판매된 횟수: {service.serviceCnt}회</p>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ServiceCards;