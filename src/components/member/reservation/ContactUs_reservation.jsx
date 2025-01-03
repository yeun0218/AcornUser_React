import React, { useState } from "react";
import './contectreservation.css';

const ContactUsReservation = () => {
    const phoneNumber = "02-538-0958";


    return (
        <section className="reservation-contact-us">
            <h3>예약 변경 및 취소 문의</h3>
            <div className="reservation-contact-info">

                {/* 전화 및 팩스 정보 */}
                <div className="reservation-contact-item">
                    <span className="icon">📞</span>
                    <p>전화: {phoneNumber}</p>
                    <div className="buttons">
                        <a href={`tel:${phoneNumber}`} className="btn">
                            전화로 문의하기
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUsReservation;