import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiSearch2Line } from "react-icons/ri";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { CiLogin, CiLogout } from "react-icons/ci";
import logo from "../Assets/Images/logo.png";
import defaultuser from "../Assets/Images/defaultuser.png";
import { useAppContext } from "../Context/AppContext";
import { useCart } from "../Context/CartContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAppContext();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";

  const navlinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
  ];

  const handleProfileClick = () => {
    navigate("/my-account");
  };

  return (
    <div className="w-full h-16 p-3 bg-white flex items-center justify-between px-20 border-b border-b-stone-200">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold cursor-pointer flex gap-1 items-center text-right"
      >
        <img src={logo} alt="Vendio" className="w-8 h-8" />
        <div className="relative">
          <span>Vendio</span>
          <span className="text-xs text-gray-400 absolute -bottom-2 right-0">
            eCommerce
          </span>
        </div>
      </Link>

      {/* Search */}
      {/* <div className="rounded-full bg-gray-100 text-gray-800 px-6 py-1 w-full max-w-96 h-10">
        <form
          className="flex items-center gap-3 w-full h-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search in products..."
            className="bg-transparent w-full h-full outline-none text-sm"
          />
          <button type="submit">
            <RiSearch2Line className="text-xl" />
          </button>
        </form>
      </div> */}

      {/* Links */}
      {
        <div className="flex items-center gap-6">
          {navlinks.map((link) => (
            <Link
              to={link.path}
              key={link.title}
              className={`text-gray-600 hover:text-gray-900
                ${location.pathname === link.path ? "font-semibold" : ""}
                `}
            >
              {link.title}
            </Link>
          ))}
        </div>
      }

      {/* User Section */}
      <div className="flex items-center gap-6 text-2xl">
        {isAuthenticated ? (
          <>
            <div
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 cursor-pointer"
              onClick={handleProfileClick}
            >
              <span className="text-gray-800">{user?.firstName}</span>
              <div className="bg-gray-100 rounded-full">
                <img
                  src={user?.profilePic || defaultuser}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm font-semibold hover:font-bold text-gray-600 hover:text-gray-900"
            >
              Logout
              <CiLogout className="text-xl" />
            </button>
          </>
        ) : isLoginPage ? (
          <Link
            to={`/signup?redirect=${location.pathname}`}
            title="signup"
            className="flex items-center gap-2 text-sm font-semibold hover:font-bold text-gray-600 hover:text-gray-900"
          >
            <span>Sign Up</span>
            <CiLogin className="text-xl" />
          </Link>
        ) : (
          <Link
            to={`/login?redirect=${location.pathname}`}
            title="login"
            className="flex items-center gap-2 text-sm font-semibold hover:font-bold text-gray-600 hover:text-gray-900"
          >
            <span>Login</span>
            <CiLogin className="text-xl" />
          </Link>
        )}

        <Link
          to="/cart"
          title="cart"
          className="relative flex items-center gap-2 text-sm font-semibold hover:font-bold text-gray-600 hover:text-gray-900"
        >
          <LiaShoppingCartSolid className="text-xl" />
          {/* Badge */}
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
