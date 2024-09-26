import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiLogin, CiLogout, CiSearch } from "react-icons/ci";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import logo from "../Assets/Images/logo.png";
import defaultuser from "../Assets/Images/defaultuser.png";
import NavbarMobile from "./NavbarMobile";
import { useAppContext } from "../Context/AppContext";
import { useCart } from "../Context/CartContext";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAppContext();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isLoginPage = location.pathname === "/login";
  const redirectUrl =
    new URLSearchParams(location.search).get("redirect") || "/";

  // const navlinks = [
  //   { title: "About Us", path: "/about" },
  //   { title: "Products", path: "/products" },
  // ];

  const handleProfileClick = () => {
    navigate("/account/profile");
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?query=${searchQuery.trim()}`);
    }
  };

  // Set search query from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    if (query) {
      setSearchQuery(query);
    } else {
      setSearchQuery("");
    }
  }, [location.search]);

  return (
    <>
      <nav className="hidden md:flex w-full h-16 bg-white items-center justify-between px-6 xl:px-16 2xl:px-20 border-b border-b-stone-200 sticky top-0 z-50">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <img src={logo} alt="Vendio" className="w-8 h-8" />
          <div className="relative">
            <span className="text-gray-800">Vendio</span>
            <span className="text-xs text-teal-500 absolute -bottom-2 right-0">
              eCommerce
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center xl:gap-3 2xl:gap-6 ml-4">
          <Link
            to={"/about"}
            key={"About Us"}
            className={`hidden lg:flex items-center text-gray-600 font-medium 
              ${
                location.pathname === "/about"
                  ? "text-teal-700 border-b-2 border-teal-600"
                  : "hover:text-teal-600"
              }
              p-2 transition-colors duration-300 ease-in-out rounded-md`}
          >
            About Us
          </Link>

          <Link
            to={"/products"}
            key={"Products"}
            className={`flex items-center text-gray-600 font-medium 
               ${
                 location.pathname === "/products"
                   ? "text-teal-700 border-b-2 border-teal-600"
                   : "hover:text-teal-600"
               }
              p-2 transition-colors duration-300 ease-in-out rounded-md`}
          >
            Products
          </Link>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-grow max-w-sm xl:max-w-md mx-4"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
            <button
              type="submit"
              className="absolute top-1/2 transform -translate-y-1/2 right-2 text-teal-600 hover:text-teal-800"
            >
              <CiSearch className="text-xl" />
            </button>
          </div>
        </form>

        {/* User and Cart Section */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-300"
            title="account"
            onClick={handleProfileClick}
          >
            <span className="text-gray-800 max-w-20 md:max-w-24 lg:max-w-48 truncate">
              {isAuthenticated ? `Hi, ${user?.firstName}` : "Hi, Guest"}
            </span>
            <div className="bg-gray-100 rounded-full w-8">
              <img
                src={user?.profilePic || defaultuser}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>

          <Link
            to="/cart"
            title="cart"
            className="relative flex items-center text-sm font-semibold hover:text-gray-900 transition-colors duration-300"
          >
            <LiaShoppingCartSolid className="text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-teal-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-colors duration-300"
            >
              <CiLogout className="text-xl" />
              Logout
            </button>
          ) : isLoginPage ? (
            <Link
              to={`/signup?redirect=${redirectUrl}`}
              title="signup"
              className="flex items-center gap-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md shadow-sm transition-colors duration-300"
            >
              <CiLogin className="text-xl" />
              <span>Sign Up</span>
            </Link>
          ) : (
            <Link
              to={`/login?redirect=${redirectUrl}`}
              title="login"
              className="flex items-center gap-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md shadow-sm transition-colors duration-300"
            >
              <CiLogin className="text-xl" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </nav>

      <NavbarMobile
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
        cartItems={cartItems}
        isLoginPage={isLoginPage}
        redirectUrl={redirectUrl}
      />
    </>
  );
};

export default Navbar;
