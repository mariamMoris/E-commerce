import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function CategoriesSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        arrows: false,
      };
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
    <h5 className="mt-5">Show All Categories</h5>
     <Slider {...settings}>
     {categories?.map((category) => {
          return (
              <>
                <img style={{height:200}} className="w-100" src={category?.image} alt="" />
                  <h3 className="font-sm text-center fw-bold">{category?.name}</h3>
               </>
          );
        })}
                </Slider>
        
    </>
  );
}
