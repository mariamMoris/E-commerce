import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContent } from "../../contexts/CartContent";
import toast from "react-hot-toast";
import { wishlistContent } from "../../contexts/WishlistContent";

function Product({ product }) {
  const { addToCart, setNumOfCartItems } = useContext(cartContent);
  const { addToWishlist, removeItemFromWishlist, setWishlistProduct } =
    useContext(wishlistContent);
  const [color,setColor] = useState()
  const [changeColor, setChangeColor] = useState(color);


  function changeHeart() {
    setChangeColor(!changeColor);
  }
  async function addProductToCart(productId) {
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
  async function addProductToWishlist(productId) {
    if (!changeColor) {
      const { data } = await addToWishlist(productId);
      toast.success(data.message, {
        position: "top-right",
      });

    } else {
      const { data } = await removeItemFromWishlist(productId);
      toast.error("Product remove from wishlist ");
      setWishlistProduct(data?.data);
    }
    localStorage.setItem("changeColor", !changeColor);

    setColor(localStorage.getItem("changeColor"));
    console.log(localStorage.getItem("changeColor"));

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
          {
            addProductToWishlist(product._id);
          }
          changeHeart();
        }}
        className={
          changeColor
            ? "fa-solid fa-heart text-danger px-2"
            : " fa-solid fa-heart px-2 "
        }
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
