import { toBeChecked } from "@testing-library/jest-dom/matchers";
import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContent } from "../../contexts/CartContent";
import toast from 'react-hot-toast';

function Product({ product }) {
  const {addToCart,setNumOfCartItems} = useContext(cartContent);
  async function addProductToCart(productId) {
    const res = await addToCart(productId);
    if(res.data.status == "success"){
      toast.success('Product added successfully',{
        position:"top-center"
      });
      setNumOfCartItems(res?.data?.numOfCartItems)
    }else{
      toast.error('Product not added ');
    }
  }
  async function addProductToWishlist(productId) {
    try {
      
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="product overflow-hidden px-2 py-3 cursor-pointer">
      <Link to={"/productdetails/" + product._id} className="a">
        <img className="w-100" src={product?.imageCover} alt="" />
        <h5 className="font-sm text-main">{product?.category.name}</h5>
        <h4>{product?.title.split(" ").slice(0, 2).join(" ")}</h4>
        <p className="d-flex justify-content-between">
          <span>{product?.price} EGP</span>
          <span>
            <i className="fas fa-star rating-color me-1"></i>
            {product?.ratingsAverage}
          </span>
        </p>
      </Link>
      <i
        onClick={() => {
          addProductToWishlist(product._id);
        }}
        className="fa-solid fa-heart px-2 "
      ></i>

      <button
        onClick={() => {
          addProductToCart(product._id);
        }}
        className="btn bg-main text-white w-100 "
      >
        +Add To Cart
      </button>
    </div>
  );
}

export default Product;
