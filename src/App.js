import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import { AuthContextProvider } from "./contexts/Authcontext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthProtected from "./Components/ProtectedRoute/AuthProtected";
import ForgetPassword from "./Components/ForgetPass/ForgetPassword"
import ResetPassword from "./Components/ForgetPass/ResetPassword"
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import VerifyCode from "./Components/ForgetPass/VerifyCode";
import CheckOut from "./Components/CheckOut/CheckOut";
import Wishlist from "./Components/Wishlist/Wishlist";
import  CartContentProvider from "./contexts/CartContent"
import  WishlistContentProvider from "./contexts/WishlistContent"
import AllOrders from "./Components/AllOrders/AllOrders";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";



function App() {
 
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "E-commerce", element: <Navigate to={"/home"} /> },
        { path: "", element: <Navigate to={"home"} /> },
        { path: "home", element: <ProtectedRoute> <Home /> </ProtectedRoute>  },
        { path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute> <Wishlist /> </ProtectedRoute> },
        { path: "/checkout", element: <ProtectedRoute> <CheckOut /> </ProtectedRoute> },
        { path: "products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
        { path: "categories", element:<ProtectedRoute> <Categories /> </ProtectedRoute>  },
        { path: "brands", element:<ProtectedRoute> <Brands /> </ProtectedRoute>  },
        { path: "productdetails/:id", element:<ProtectedRoute> <ProductDetails /> </ProtectedRoute>  },
        { path: "allorders", element:<ProtectedRoute> <AllOrders /> </ProtectedRoute>  },
        { path: "login", element:<AuthProtected> <Login /> </AuthProtected> },
        { path: "register", element:<AuthProtected> <Register /> </AuthProtected>  },
        { path: "forget", element:<AuthProtected> <ForgetPassword/> </AuthProtected>  },
        { path: "verifyCode", element:<AuthProtected> <VerifyCode/> </AuthProtected>  },
        { path: "resetPass", element:<AuthProtected> <ResetPassword/> </AuthProtected>  },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
    <QueryClientProvider client={queryClient}>
    < WishlistContentProvider>
    <CartContentProvider>
      <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
      </AuthContextProvider>
      </ CartContentProvider>
      </ WishlistContentProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
    
    </>
  );
}

export default App;
