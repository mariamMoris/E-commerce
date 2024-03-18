import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { wishlistContent } from '../../contexts/WishlistContent'
import toast from 'react-hot-toast'
import { cartContent } from '../../contexts/CartContent'

export default function Wishlist() {
  const{addToCart,setNumOfCartItems} = useContext(cartContent)
    const [isLoading,setIsLoading] = useState()
    const {removeItemFromWishlist,wishlistProduct,setWishlistProduct} = useContext(wishlistContent)
    async function getWishlist(){
        setIsLoading(true)
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
         setIsLoading(false)
        setWishlistProduct(data?.data)
    }
    async function removeSpecificItem(productId){
        const {data} = await removeItemFromWishlist(productId)
        setWishlistProduct(data?.data);
      }
      async function addProductToCart(productId){
        const res = await addToCart(productId);
        if (res.data.status == "success") {
          toast.success(res.data.message, {
            position: "top-center",
          });
          setNumOfCartItems(res?.data?.numOfCartItems);
        } else {
          toast.error("Product not added in cart");
        }
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
{wishlistProduct?.map((product,index)=>{
  return(
      <div key={index} className="cart-product shadow rounded-2 my-5 py-3">
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
