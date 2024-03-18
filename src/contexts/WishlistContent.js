import axios from "axios";
import {  createContext , useState} from "react";


export const wishlistContent = createContext()


 function addToWishlist(productId){
   return axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      ).then((res)=>res).catch((error)=>error)
}

function removeItemFromWishlist(productId){
    return axios.delete(
        "https://ecommerce.routemisr.com/api/v1/wishlist/"+ productId,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      ).then((res)=>res).catch((error)=>error)
}
export default function WishlistContentProvider({children}){
    const [wishlistProduct,setWishlistProduct] = useState()

   return( <wishlistContent.Provider value={{addToWishlist, removeItemFromWishlist,wishlistProduct,setWishlistProduct}}>
        {children}
    </wishlistContent.Provider>);
}