import React, { useState } from "react";
import emailjs from "emailjs-com"; // EmailJS 라이브러리
import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 CSS
import "../../../assets/styles/ContactUs.css"

const ContactUs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [message, setMessage] = useState(""); // 메시지 상태 관리
    const [subject, setSubject] = useState(""); // 이메일 제목 상태
    const [fromName, setFromName] = useState(""); // 보내는 사람 이름
    const [email, setEmail] = useState(""); // 사용자 이메일 상태
    const [popupMessage, setPopupMessage] = useState(""); // 팝업 메시지
    const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태

    const naverMapUrl = "https://map.naver.com/p/entry/place/1093586259?c=15.00,0,0,0,dh";
    const googleMapUrl =
        "https://www.google.com/maps/place/%EC%97%90%EC%9D%B4%EC%BD%98%EC%95%84%EC%B9%B4%EB%8D%B0%EB%AF%B8+%EA%B0%95%EB%82%A8%EC%A0%90/data=!4m10!1m2!2m1!1z7JeQ7J207L2Y7JWE7Lm0642w66-4!3m6!1s0x357ca159d4b10f83:0xc672380e5228aa2e!8m2!3d37.4988896!4d127.0315494!15sChXsl5DsnbTsvZjslYTsubTrjbDrr7haGCIW7JeQ7J207L2YIOyVhOy5tOuNsOuvuJIBGGNvbXB1dGVyX3RyYWluaW5nX3NjaG9vbOABAA!16s%2Fg%2F11c5hkcnbd?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoJLDEwMjExMjMzSAFQAw%3D%3D";
    const address = "서울 강남구 테헤란로 124";
    const phoneNumber = "02-538-0958";
    const defaultEmail = "acorn@acornbeauty.com"; // 기본 이메일 주소

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const sendEmail = (e) => {
        e.preventDefault();

        // EmailJS를 사용하여 이메일 보내기
        emailjs
            .sendForm(
                "service_d3fdszu", // 서비스 ID
                "template_uxz4dfr", // 템플릿 ID
                e.target, // 폼 데이터
                "Py9u-iCs8pRLciFbL" // 공개 키
            )
            .then(
                (result) => {
                    console.log(result.text);
                    setPopupMessage("이메일이 전송되었습니다! 😊");
                    setIsPopupOpen(true);
                    setMessage(""); // 메시지 초기화
                    setFromName(""); // 이름 초기화
                    setSubject(""); // 제목 초기화
                    setEmail(""); // 이메일 초기화
                    handleModalClose(); // 모달 닫기
                },
                (error) => {
                    console.error(error.text);
                    setPopupMessage("이메일 전송에 실패했습니다. 다시 시도해주세요.");
                    setIsPopupOpen(true); // 팝업 열기
                }
            );
    };

    return (
        <section className="contact-us">
            <h3>CONTACT US</h3>
            <div className="contact-info">
                {/* 주소 정보 */}
                <div className="contact-item">
                    <span className="icon">📍</span>
                    <p>{address}</p>
                    <div className="buttons">
                        <a
                            href={naverMapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                        >
                            네이버지도 보기
                        </a>
                        <a
                            href={googleMapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                        >
                            구글지도 보기
                        </a>
                    </div>
                </div>

                {/* 전화 및 팩스 정보 */}
                <div className="contact-item">
                    <span className="icon">📞</span>
                    <p>전화: {phoneNumber}</p>
                    <div className="buttons">
                        <a href={`tel:${phoneNumber}`} className="btn">
                            전화로 문의하기
                        </a>
                    </div>
                </div>

                {/* 이메일 정보 */}
                <div className="contact-item">
                    <span className="icon">✉️</span>
                    <p>Email: {defaultEmail}</p>
                    <div className="buttons">
                        <button className="btn" onClick={handleModalOpen}>
                            메일로 문의하기
                        </button>
                    </div>
                </div>
            </div>

            {/* 이메일 문의 모달 */}
            {isModalOpen && (
                <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">문의하기</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleModalClose}
                                ></button>
                            </div>
                            <form onSubmit={sendEmail}>
                                <div className="modal-body">
                                    <label>
                                        이름:
                                        <input
                                            type="text"
                                            name="from_name"
                                            value={fromName}
                                            onChange={(e) => setFromName(e.target.value)} // 사용자 이름
                                            className="form-control"
                                            required
                                        />
                                    </label>
                                    <label>
                                        연락 받을 이메일:
                                        <input
                                            type="email"
                                            name="user_email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} // 사용자 이메일
                                            className="form-control"
                                            required
                                        />
                                    </label>
                                    <label>
                                        제목:
                                        <input
                                            type="text"
                                            name="subject"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)} // 제목 상태
                                            className="form-control"
                                            required
                                        />
                                    </label>
                                    <label>
                                        메시지:
                                        <textarea
                                            name="message"
                                            placeholder="문의 내용을 입력하세요"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)} // 메시지 내용
                                            className="form-control"
                                            required
                                        ></textarea>
                                    </label>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">
                                        보내기
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                                        닫기
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* 팝업 알림 */}
            {isPopupOpen && (
                <div className="popup-overlay" onClick={() => setIsPopupOpen(false)}>
                    <div className="popup">
                        <div className="popup-content">
                            {popupMessage}<br/><br/>
                            <button onClick={() => setIsPopupOpen(false)} className="btn btn-primary">
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ContactUs;