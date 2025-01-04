import React, { useState, useEffect } from 'react';
import { Tab, Nav, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import '../../../assets/styles/Designer/DesignerTab.css'; // 스타일 추가
import designerImage from "../../../assets/images/abarta.jpg"; // 이미지 경로에 맞게 확장자도 포함

const DesignerTab = () => {
    const [key, setKey] = useState('원장'); // 기본값을 '원장'으로 설정
    const [designers, setDesigners] = useState([]); // 디자이너 상태 추가
    const [tabs, setTabs] = useState(['원장', '부원장', '실장', '디자이너', '인턴']); // 직책 탭 상태

    // 디자이너 데이터를 API에서 불러오기
    useEffect(() => {
        // 기본적으로 '원장' 직책의 디자이너 데이터를 불러옴
        fetchDesigners('원장');
    }, []); // 컴포넌트가 마운트될 때 한 번만 호출

    // 직책별 디자이너 데이터를 불러오는 함수
    const fetchDesigners = (job) => {
        axios.get(`http://localhost:8080/user/members?job=${job}`) // 직책별 디자이너 데이터 API 호출
            .then(response => {
                setDesigners(response.data); // 디자이너 데이터 상태에 저장
            })
            .catch(error => {
                console.error('디자이너 데이터를 불러오는 데 실패했습니다:', error);
            });
    };

    // 탭을 클릭하면 해당 직책의 디자이너 데이터를 불러옴
    const handleTabSelect = (tabKey) => {
        setKey(tabKey);
        fetchDesigners(tabKey); // 직책에 맞는 디자이너 데이터 불러오기
    };

    return (
        <Container className="designer-tabs-container">
            <Tab.Container id="designer-tabs" activeKey={key} onSelect={handleTabSelect}>
                <Row>
                    <Col sm={12}>
                        {/* Tab Buttons */}
                        <Nav variant="tabs" className="mb-3 tab-buttons">
                            {tabs.map((position, index) => (
                                <Nav.Item key={index}>
                                    <Nav.Link eventKey={position} className={key === position ? 'active' : ''}>
                                        {position}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        {/* Tab Content */}
                        <Tab.Content className="designer-tab-content">
                            {tabs.map((position) => (
                                <Tab.Pane eventKey={position} key={position}>
                                    <h3>{position}</h3>
                                    {/* Designer Cards */}
                                    <div className="designer-cards">
                                        {designers.filter(designer => designer.memberJob === position).map((designer) => (
                                            <div className="designer-card" style={{ width: '18rem' }} key={designer.memberId}>
                                                <img
                                                    src={designer.image || designerImage} // 디자이너 이미지 없으면 기본 이미지
                                                    className="designer-card-img-top"
                                                    alt={designer.memberName}
                                                />
                                                <div className="designer-card-body">
                                                    <h5 className="designer-card-title">{designer.memberName} {designer.memberJob}</h5>
                                                    <p className="designer-card-text">전화: {designer.memberTel}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default DesignerTab;