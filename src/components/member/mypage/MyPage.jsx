import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mypage.css';

function MyPage({ isLogin, logout }) {
    const [customerData, setCustomerData] = useState(null); // 고객 데이터 상태
    const [editMode, setEditMode] = useState(false); // 수정 모드 상태
    const [formData, setFormData] = useState(null); // 수정 중 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        if (isLogin) {
            // 고객 데이터 가져오기
            axios
                .get('http://localhost:8080/customer/mypage', {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                    },
                })
                .then((response) => {
                    setCustomerData(response.data); // 고객 데이터 설정
                    setFormData({
                        customerName: response.data.customerName,
                        customerTel: response.data.customerTel,
                        customerMail: response.data.customerMail,
                        customerShoppw: '', // 비밀번호는 초기값 비워둠
                    });
                })
                .catch((error) => {
                    console.error('Error loading user data:', error);
                    setError('사용자 정보를 가져오는 중 오류가 발생했습니다.');
                })
                .finally(() => {
                    setLoading(false); // 로딩 상태 종료
                });
        } else {
            setLoading(false); // 로그인이 되어 있지 않은 경우에도 로딩 종료
        }
    }, [isLogin]);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (!formData) return;

        axios
            .put(`http://localhost:8080/customer/mypage/${customerData.customerShopid}`, formData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                },
            })
            .then(() => {
                alert('정보가 성공적으로 업데이트되었습니다.');
                setEditMode(false); // 수정 모드 종료
                setCustomerData((prev) => ({
                    ...prev,
                    ...formData, // 수정된 데이터 업데이트
                }));
            })
            .catch((error) => {
                console.error('Error updating customer data:', error);
                alert('정보 업데이트 중 오류가 발생했습니다.');
            });
    };

    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="mypage-container">
            <h1>내 정보</h1>
            {isLogin ? (
                customerData ? (
                    <div className="mypage-content">
                        <div className="mypage-field">
                            <label>이름</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleFieldChange}
                                    className="form-control"
                                />
                            ) : (
                                <p>{customerData.customerName}</p>
                            )}
                        </div>
                        <div className="mypage-field">
                            <label>전화번호</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="customerTel"
                                    value={formData.customerTel}
                                    onChange={handleFieldChange}
                                    className="form-control"
                                />
                            ) : (
                                <p>{customerData.customerTel}</p>
                            )}
                        </div>
                        <div className="mypage-field">
                            <label>이메일</label>
                            {editMode ? (
                                <input
                                    type="email"
                                    name="customerMail"
                                    value={formData.customerMail}
                                    onChange={handleFieldChange}
                                    className="form-control"
                                />
                            ) : (
                                <p>{customerData.customerMail}</p>
                            )}
                        </div>
                        {editMode && (
                            <div className="mypage-field">
                                <label>새 비밀번호</label>
                                <input
                                    type="password"
                                    name="customerShoppw"
                                    value={formData.customerShoppw}
                                    onChange={handleFieldChange}
                                    className="form-control"
                                />
                            </div>
                        )}
                        <div className="mypage-actions">
                            {editMode ? (
                                <>
                                    <button className="btn btn-primary" onClick={handleSave}>
                                        저장
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setEditMode(false)}
                                    >
                                        취소
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setEditMode(true)}
                                >
                                    수정
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>사용자 정보를 불러오는 중입니다...</p>
                )
            ) : (
                <p>로그인이 필요합니다.</p>
            )}
        </div>
    );
}

export default MyPage;