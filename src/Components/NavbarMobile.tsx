import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiLogin, CiLogout } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../Assets/Images/logo.png";
import defaultuser from "../Assets/Images/defaultuser.png";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { FaRegHeart } from "react-icons/fa";

interface NavbarMobileProps {
  isAuthenticated: boolean;
  user: any;
  logout: any;
  cartItems: any;
  isLoginPage: boolean;
  redirectUrl: string;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({
  isAuthenticated,
  user,
  logout,
  cartItems,
  isLoginPage,
  redirectUrl,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navlinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Products", path: "/products" },
    { title: "Profile", path: "/account/profile" },
    { title: "Orders", path: "/account/orders" },
    { title: "Wishlist", path: "/account/wishlist" },
    { title: "Address", path: "/account/address" },
  ];

  const handleProfileClick = () => {
    navigate("/account/profile");
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <nav className="w-full h-16 p-3 bg-white flex items-center justify-between px-4 border-b border-gray-300 shadow-md md:hidden sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Vendio" className="w-9 h-9" />
        <div className="relative">
          <span className="text-2xl font-semibold text-gray-800">Vendio</span>
          <span className="text-xs text-teal-500 absolute -bottom-2 right-0">
            eCommerce
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-6">
        {/* Wishlist Icon */}
        {isAuthenticated && (
          <Link
            to="/account/wishlist"
            title="Wishlist"
            className="text-gray-600 hover:text-teal-600 transition-colors"
          >
            <FaRegHeart className="text-2xl" />
          </Link>
        )}

        {/* Cart Icon */}
        <Link
          to="/cart"
          title="Cart"
          className="relative flex items-center gap-2 text-lg font-bold text-gray-600 hover:text-teal-600 transition-colors"
        >
          <LiaShoppingCartSolid className="text-3xl" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-teal-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
              {cartItems.length}
            </span>
          )}
        </Link>

        {!isAuthenticated && (
          <Link
            to={
              isLoginPage
                ? `/signup?redirect=${redirectUrl}`
                : `/login?redirect=${redirectUrl}`
            }
            className="bg-teal-600 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-teal-700 transition-all duration-300"
          >
            {isLoginPage ? "Sign Up" : "Login"}
          </Link>
        )}

        {/* Hamburger Icon */}
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl cursor-pointer text-gray-600 hover:text-teal-600 transition-colors"
          title="Menu"
        >
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-white z-50 p-4 flex flex-col transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-6">
          <AiOutlineClose
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl text-gray-800 cursor-pointer"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col flex-grow gap-3">
          {navlinks.map((link) => (
            <Link
              to={link.path}
              key={link.title}
              className={`text-gray-800 font-semibold text-lg py-3 px-4 rounded-lg transition-colors duration-300 ${
                location.pathname === link.path
                  ? "bg-teal-100 shadow-md"
                  : "hover:bg-teal-200"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.title}
            </Link>
          ))}

          {/* User Section */}
          <div className="flex justify-between items-center gap-3 mt-auto p-3 border-t border-gray-200">
            <div
              onClick={handleProfileClick}
              className="flex items-center gap-3 cursor-pointer hover:text-teal-600 transition-colors"
            >
              <img
                src={user?.profilePic || defaultuser}
                alt="Profile"
                className="w-10 h-10 rounded-full bg-gray-100"
              />
              <span className="text-gray-800 max-w-40 truncate">
                {isAuthenticated ? user?.firstName : "Hi, Guest"}
              </span>
            </div>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors"
              >
                Logout
                <CiLogout className="text-xl" />
              </button>
            ) : (
              <Link
                to={
                  isLoginPage
                    ? `/signup?redirect=${redirectUrl}`
                    : `/login?redirect=${redirectUrl}`
                }
                className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors"
              >
                {isLoginPage ? "Sign Up" : "Login"}
                <CiLogin className="text-xl" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMobile;
