import axios from 'axios';
import React, {  useState } from 'react';
import Product from '../Product/Product';
import { useQuery } from 'react-query';

export default function Products() {
   function getProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const {data,isLoading} = useQuery("Products",getProducts,{
    cacheTime: 5000,
  })

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
    {data?.data.data.map((product)=>{
      return (<div key={product._id} className="col-md-3" >
       <Product product={product}/>
       </div>)
    })}
    </div>
        </>
        }
  
   
  </>
)}
