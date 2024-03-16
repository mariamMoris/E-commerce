import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Brands() {
const [brands,setbrands] = useState([])
const [isLoading,setIsLoading] = useState()


  async function getBrands(){
    setIsLoading(true)
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    setIsLoading(false)
    setbrands(data.data);
  }
  useEffect(()=>{
    getBrands()
  },[])
  return( 
    <> {isLoading? 
      <>
      <div className='d-flex align-items-center justify-content-center my-5 py-5'>
          <i className='fas fa-spin fa-spinner fa-2x'></i>
      </div>
  </>
  :
  <>
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
    </>}
  </>
)}
