import React from "react";
import img1 from "../../Assets/images/1.jpg";
import img2 from "../../Assets/images/2.jpg";
import img3 from "../../Assets/images/grocery-banner.png";
import img4 from "../../Assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick";
import Products from "../Products/Products";
import CategoriesSlider from "../Categories/CategoriesSlider";

export default function Home() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <>
      <header className="my-5 pt-4">
        <div className="row g-0">
          <div className="col-md-10">
            <Slider {...settings}>
              <div>
                <img src={img3} className="w-100" alt="" />
              </div>
              <div>
                <img src={img4} className="w-100" alt="" />
              </div>
            </Slider>
          </div>
          <div className="col-md-2">
            <img src={img1} className="w-100" alt="" />
            <img src={img2} className="w-100" alt="" />
          </div>
        </div>
      </header>
      <CategoriesSlider />
      <Products />
    </>
  );
}
