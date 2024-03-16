import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

export default function Products() {
  const [products,setProducts] = useState([])
  const [isLoading,setIsLoading] = useState()
  async function getProducts(){
    setIsLoading(true)
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setIsLoading(false)
    setProducts(data?.data);
  }
  useEffect( ()=>{
    getProducts()
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
    {products?.map((product)=>{
      return (<div key={product._id} className="col-md-3" >
       <Product product={product}/>
       </div>)
    })}
    </div>
        </>
        }
  
   
  </>
)}
