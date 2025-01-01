import React from "react";
import "../../../assets/styles/Story.css";

import productImage from "../../../assets/images/img.png"; // 왼쪽 이미지 경로

const Story = () => {
    return (
        <section className="story">
            <h2>AcornBeauty STORY</h2>
            <div className="story-content">
                <div className="story-image">
                    <img src={productImage} alt="Aaron Product"/>
                </div>
                <ul className="timeline-list">
                    <li>
                        <span className="timeline-point"></span>
                        <div className="timeline-content">
                            <strong>2024.10</strong>
                            <p>에이콘뷰티 브랜드 설립</p>
                        </div>
                    </li>
                    <li>
                        <span className="timeline-point"></span>
                        <div className="timeline-content">
                            <strong>2024.12</strong>
                            <p>오프라인 매장 설립</p>
                        </div>
                    </li>
                    <li>
                        <span className="timeline-point"></span>
                        <div className="timeline-content">
                            <strong>2025.02</strong>
                            <p>아론 브랜드 리뉴얼</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Story;