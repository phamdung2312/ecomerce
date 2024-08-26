import React from "react";
import Slider from "react-slick";
import slide1 from "../../asset/ImageSlide/slide1.jpg";
import slide2 from "../../asset/ImageSlide/slide2.jpg";

export default function SlideComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplaySpeed: 1000,
    autoplay: 1000,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={slide1}
            alt=""
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
        <div>
          <img
            src={slide2}
            alt=""
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
        <div>
          <img
            src={slide1}
            alt=""
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
        <div>
          <img
            src={slide2}
            alt=""
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
        <div>
          <img
            src={slide1}
            alt=""
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
        <div>
          <img
            src={slide2}
            alt=""
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
      </Slider>
    </div>
  );
}
