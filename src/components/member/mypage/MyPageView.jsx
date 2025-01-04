import React, { useEffect, useState } from "react";
import Header from "../../common/Header.jsx";
import axios from "axios";
import MyPageUpdate from "./MyPageUpdate.jsx";

function MyPageView() {
    const [customerInfo, setCustomerInfo] = useState({
        customerShopid: "",
        customerName: "",
        customerTel: "",
        customerMail: "",
        customerPostcode: "",
        customerAddr1: "",
        customerAddr2: "",
    });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        // 사용자 정보 조회
        axios
            .get("http://localhost:8080/mypage")
            .then((res) => {
                setCustomerInfo(res.data);
            })
            .catch((err) => {
                console.error("Error fetching user info:", err);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // 사용자 정보 저장
        axios
            .put("http://localhost:8080/mypage", customerInfo)
            .then((res) => {
                if (res.status === 200) {
                    alert("정보가 수정되었습니다.");
                    setEditMode(false);
                }
            })
            .catch((err) => {
                console.error("Error updating customer info:", err);
            });
    };

    return (
        <div>
            {/* <Header /> */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80vh",
                }}
            >
                <div style={{ width: "100%", maxWidth: "600px" }}>
                    <h1>마이 페이지</h1>

                    <form>
                        {/* 아이디 */}
                        <div className="mb-3">
                            <label>ID</label>
                            <input
                                type="text"
                                name="customerShopid"
                                value={customerInfo.customerShopid}
                                onChange={handleChange}
                                className="form-control"
                                disabled={!editMode}
                            />
                        </div>

                        {/* 이름 */}
                        <div className="mb-3">
                            <label>이름</label>
                            <input
                                type="text"
                                name="customerName"
                                value={customerInfo.customerName}
                                onChange={handleChange}
                                className="form-control"
                                disabled={!editMode}
                            />
                        </div>

                        {/* 전화번호 */}
                        <div className="mb-3">
                            <label>전화번호</label>
                            <input
                                type="text"
                                name="customerTel"
                                value={customerInfo.customerTel}
                                onChange={handleChange}
                                className="form-control"
                                disabled={!editMode}
                            />
                        </div>

                        {/* 이메일 */}
                        <div className="mb-3">
                            <label>이메일</label>
                            <input
                                type="email"
                                name="customerMail"
                                value={customerInfo.customerMail}
                                onChange={handleChange}
                                className="form-control"
                                disabled={!editMode}
                            />
                        </div>

                        {/* 우편번호 */}
                        <div className="mb-3">
                            <label>우편번호</label>
                            <input
                                type="text"
                                name="customerPostcode"
                                value={customerInfo.customerPostcode}
                                onChange={handleChange}
                                className="form-control"
                                disabled={!editMode}
                            />
                        </div>

                        {/* 주소 */}
                        <div className="mb-3">
                            <label>주소 1</label>
                            <input
                                type="text"
                                name="customerAddr1"
                                value={customerInfo.customerAddr1}
                                onChange={handleChange}
                                className="form-control"
                                disabled={!editMode}
                            />
                        </div>

                        <div className="mb-3">
                            <label>주소 2</label>
                            <input
                                type="text"
                                name="customerAddr2"
                                value={customerInfo.customerAddr2}
                                onChange={handleChange}
                                className="form-control"
                                disabled={!editMode}
                            />
                        </div>

                        <div className="mt-3" style={{ textAlign: "right" }}>
                            {!editMode ? (
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setEditMode(true)}
                                >
                                    수정하기
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleSave}
                                >
                                    저장
                                </button>
                            )}
                            {editMode && (
                                <button
                                    type="button"
                                    className="btn btn-secondary ml-2"
                                    onClick={() => setEditMode(false)}
                                >
                                    취소
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MyPageView;