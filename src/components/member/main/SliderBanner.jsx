import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { SLIDER, SLIDEIMG } from "../../../assets/styles/MainStyle";
import firstImage from "../../../assets/images/main_hair1.jpeg";
import secondImage from "../../../assets/images/main_hair2.jpeg";
import thirdImage from "../../../assets/images/main_hair3.jpeg";

const SliderBanner = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
      <SLIDER>
        <Slider {...settings}>
          <div>
            <Link to="/subscription">
              <SLIDEIMG src={firstImage} alt="slider1" />
            </Link>
          </div>
          <div>
            <Link to="/subscription">
              <SLIDEIMG src={secondImage} alt="slider2" />
            </Link>
          </div>
          <div>
            <Link to="/subscription">
              <SLIDEIMG src={thirdImage} alt="slider3" />
            </Link>
          </div>
        </Slider>
      </SLIDER>
  );
};

export default SliderBanner;