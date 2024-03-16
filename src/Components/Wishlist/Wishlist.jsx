import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Wishlist() {
    const [isLoading,setIsLoading] = useState()
    const [wishlistProduct,setWishlistProduct] = useState()
    async function getWishlist(){
        setIsLoading(true)
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        console.log(data.data);
        setIsLoading(false)
        setWishlistProduct(data?.data)
    }
    async function removeSpecificItem(productId){
        const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/"+ productId,{
          headers:{
            token: localStorage.getItem("token")
          }
        })
        setWishlistProduct(data?.data);
      }
      async function addProductToCart(productId){
        const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            productId
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        console.log(data)
        alert(data.message)
    }
    useEffect(()=>{
        getWishlist()
    },[])
  return  <>
  {isLoading?
  <>
  <div className='d-flex align-items-center justify-content-center my-5 py-5'>
      <i className='fas fa-spin fa-spinner fa-2x'></i>
  </div>
</>
:
<>
{wishlistProduct?.length>0 ?
<div>
{wishlistProduct?.map((product)=>{
  return(
      <div className="cart-product shadow rounded-2 my-3">
      <div className="row align-items-center">
        <div className="col-md-2">
          <img className='w-100' src={product?.imageCover} alt="" />
        </div>
        <div className="col-md-8">
          <h2>{product?.title}</h2>
          <h5>{product?.category?.name}</h5>
          <p className='d-flex justify-content-between'>
            <span>{product?.price} EGP</span>
            <button onClick={()=>{addProductToCart(product?._id)}} className='btn bg-main text-white mt-2'>Add To Cart</button>
          </p>  
          <button onClick={()=>{removeSpecificItem(product?._id)}} className='btn text-danger'>Remove</button>

          </div>
          </div>
          </div>
  )
  })}
</div>
  :
  <h2 className='alert alert-warning text-center my-5'>No products in your wishlist</h2>

}
</>
  }
  </>
}
