import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContent = createContext();
function addToCart(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => res)
    .catch((error) => error);
}

function getCart() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => res)
    .catch((error) => error);
}


export default function CartContentProvider({ children }) {
  function payment(shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shippingAddress,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => res)
      .catch((error) => error);
  }
  const[cartId,setCartId]= useState()
  const[numOfCartItems,setNumOfCartItems]= useState()

async function getInitialsItem(){
  const {data} = await getCart()
  setNumOfCartItems(data?.numOfCartItems)
  setCartId(data?.data?._id)

}
  useEffect(()=>{
    getInitialsItem()
      },[])

  return (
    <cartContent.Provider value={{ addToCart, getCart, payment,cartId,setCartId,numOfCartItems,setNumOfCartItems }}>
      {children}
    </cartContent.Provider>
  );
}
