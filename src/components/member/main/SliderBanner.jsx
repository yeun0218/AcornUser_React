import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { Link} from 'react-router-dom';
import { SLIDER, SLIDEIMG } from "../../../assets/styles/MainStyle";
import discountImage from "../../../assets/images/discount.png";
import firstwon from "../../../assets/images/firstwon.png";


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
      centerPadding: "0px",
      pauseOnHover: true,
    };

    return (
      <SLIDER>
        <Slider {...settings}>
          <div>
            <Link to="/subscription">
              <SLIDEIMG src={discountImage} alt="slider1" />
            </Link>
          </div>
          <div>
            <Link to="/subscription">
              <SLIDEIMG src="https://res.cloudinary.com/drxxdsv01/image/upload/v1666423297/slide2_mvg0qi.png" alt="slider2" />
            </Link>
          </div>
          <div>
            <Link to="/subscription">
              <SLIDEIMG src={firstwon} alt="slider3" />
            </Link>
          </div>
        </Slider>
      </SLIDER>
    );
  }


export default SliderBanner;