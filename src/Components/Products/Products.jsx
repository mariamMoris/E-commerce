import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

export default function Products() {
  const [products,setProducts] = useState([])
  async function getProducts(){
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setProducts(data?.data);
  }

  useEffect( ()=>{
    getProducts()
  },[])
  return <>
    <div className="row">
    {products?.map((product)=>{
      return (<div key={product._id} className="col-md-3" >
       <Product product={product}/>
       </div>)
    })}
    </div>
  </>
}
