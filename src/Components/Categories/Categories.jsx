import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading,setIsLoading] = useState()

  async function getCategories() {
    setIsLoading(true)
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setIsLoading(false)
    setCategories(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <> {isLoading? 
      <>
      <div className='d-flex align-items-center justify-content-center my-5 py-5'>
          <i className='fas fa-spin fa-spinner fa-2x'></i>
      </div>
  </>
  :
  <>
  <div className="row gy-0">
    {categories?.map((category) => {
      return (
        <div className="col-md-4">
          <div className="product px-2 pb-5 pt-3 my-5 cursor-pointer border border-2 rounded-2 h-75 ">
            <Link className="a">
              <img className="w-100 h-100" src={category?.image} alt="" />
              <h3 className="mt-2 text-center">{category?.name}</h3>
            </Link>
          </div>
        </div>
      );
    })}
  </div>
  </> }
</>
  );
}
