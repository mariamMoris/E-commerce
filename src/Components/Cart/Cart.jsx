import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CartProducts from '../CartProducts/CartProducts';

export default function Cart() {
  const [isLoading,setIsLoading] = useState()
   const [cart,setCart] = useState({})
   const [timeOutId,setTimeOutId] = useState()
  async function getCartProducts(){
    setIsLoading(true)
   try {
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
      headers:{
        token:localStorage.getItem("token")
      }
    })
    setIsLoading(false)
    setCart(data?.data)
   } catch (error) {
    setIsLoading(false)
    console.log(error);
   }
  }

  async function removeSpecificCartItem(productId){
    const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/"+ productId,{
      headers:{
        token: localStorage.getItem("token")
      }
    })
    setCart(data?.data);
  }
  async function clearCart(){
    const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
      headers:{
        token: localStorage.getItem("token")
      }
    })
    setCart(data?.data);
  }
  async function updateCartQuantity(productId,count){
    clearTimeout(timeOutId)
    setTimeOutId( setTimeout(async()=>{
      if(count == 0){
        removeSpecificCartItem(productId)
       }else{
        const {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/"+productId,{
          count
      },{
        headers:{
          token:localStorage.getItem("token")
        }
      })
      setCart(data?.data);
       }
    },500))
 
  }
  useEffect(()=>{
    getCartProducts()
  },[])
  return <>
  {isLoading ?
   <>
   <div className='d-flex align-items-center justify-content-center my-5 py-5'>
       <i className='fas fa-spin fa-spinner fa-2x'></i>
   </div>
</>
:
     <>{cart?.products?.length> 0 ?
  <div className='my-5'>
  <button onClick={clearCart} className='btn btn-outline-danger d-block ms-auto'>Clear Cart</button>
  
  {cart?.products?.map((cartProduct,index)=>{
  return <CartProducts key={index} updateCartQuantity={updateCartQuantity} removeSpecificCartItem={removeSpecificCartItem} cartProduct={cartProduct}/>
  })}
  
  <div className='d-flex justify-content-between'>
    <a className='btn bg-main text-white'>CheckOut</a>
    <p>Total cart Price: {cart?.totalCartPrice} EGP</p>
  </div>
  </div>
:
<h2 className='alert alert-warning text-center my-5'>No products in your cart</h2>
  }
  </>
  }
 
    
   
  </>
}
