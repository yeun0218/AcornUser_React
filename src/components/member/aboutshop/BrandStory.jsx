import React from "react";
import "../../../assets/styles/BrandStory.css";
import productImage from "../../../assets/images/logo_black.png"; // 이미지 경로

const BrandStory = () => {
    return (
        <section className="brand-story">
            <h2>Brand Story</h2>
            <p>당신만의 헤어 스타일을 찾아주는 퍼스널헤어 솔루션 브랜드 AcornBeauty</p>
            <hr />
            <div className="story-content">
                <div className="story-text">
                    <h3>PROFESSIONAL HAIR SOLUTION AcornBeauty</h3>
                    <p>
                        "작은 관심으로 전문가의 손길을 느끼다." <br/>
                        당신만의 헤어 스타일을 찾아주는 미용실전용 전문미용 브랜드, AcornBeauty !
                        AcornBeauty의 철학은 당신의 개성을 살리는 머리를 완성하는 것입니다.<br/>
                        완벽함보단 완전함을 추구하며, 나만의 패셔너블한 헤어 스타일을 발견하고 개척해가는
                        동반자 AcornBeauty<br/>
                        헤어 스타일의 완성은 건강한 모발에서 시작한다는 아론의 철학을 바탕으로 <br />
                        개인의 개성과 매력을 찾을 수 있도록 해줄 뿐 아니라, 헤어
                        아티스트들과 트랜디한 헤어 스타일을 완성함으로써 <br />
                        가장 패셔너블한 모습으로 스타일링해 줍니다.
                    </p>
                </div>
                <div className="story-image">
                    <img src={productImage} alt="Aaron Products" />
                </div>
            </div>
        </section>
    );
};

export default BrandStory;