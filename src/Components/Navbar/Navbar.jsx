import React, { useContext } from "react";
import logo from "../../Assets/images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/Authcontext";
import { cartContent } from "../../contexts/CartContent";

export default function Navbar() {
  const { isLoggin, setIsLoggin } = useContext(authContext);
  const navigate = useNavigate();
  const { numOfCartItems } = useContext(cartContent);
  function logOut() {
    setIsLoggin(false);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary  position-fixed top-0 end-0 start-0 z-2">
        <div className="container">
          <a className="navbar-brand">
            <img src={logo} alt="fresh cart logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isLoggin && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="home" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="cart" className="nav-link">
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="products" className="nav-link">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="categories" className="nav-link">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="brands" className="nav-link">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="wishlist" className="nav-link">
                    WishList
                  </Link>
                </li>
              </ul>
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-instagram"></i>
                <i className="fab mx-2 fa-youtube"></i>
                <i className="fab mx-2 fa-tiktok"></i>
              </li>
              {isLoggin ? (
                <>
                  <li className="nav-item position-relative ">
                    <Link to="cart">
                      <i className="fa-solid fa-cart-shopping nav-link mt-1 mb-lg-0"></i>
                      <span className=" text-main fw-bold rounded position-absolute top-0 end-0 ">
                        {numOfCartItems}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span onClick={logOut} className="nav-link cursor-pointer">
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="register" className="nav-link">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
