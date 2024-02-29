import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Brands() {
const [brands,setbrands] = useState([])

  async function getBrands(){
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    setbrands(data.data);
  }
  useEffect(()=>{
    getBrands()
  },[])
  return <>
    <div className="row">
      <h1 className='text-main text-center fw-bold my-4'>All Brands</h1>
      {brands?.map((brand)=>{
        return (<div className="col-md-3">
        <div className="product px-2 py-3 mt-5 cursor-pointer ">
                  <Link  className='a'>
                      <img className='w-100' src={brand?.image} alt="" />
                      <h3 className='font-sm text-center'>{brand?.name}</h3>
                  </Link>
              </div>
        </div>)
      })}
    </div>
  </>
}
