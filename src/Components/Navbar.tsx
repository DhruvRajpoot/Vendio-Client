import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiLogin, CiLogout } from "react-icons/ci";
import logo from "../Assets/Images/logo.png";
import defaultuser from "../Assets/Images/defaultuser.png";
import { useAppContext } from "../Context/AppContext";
import { useCart } from "../Context/CartContext";
import NavbarMobile from "./NavbarMobile";
import { LiaShoppingCartSolid } from "react-icons/lia";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAppContext();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";
  const redirectUrl =
    new URLSearchParams(location.search).get("redirect") || "/";

  const navlinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Products", path: "/products" },
  ];

  const handleProfileClick = () => {
    navigate("/account/profile");
  };

  return (
    <>
      <nav className="hidden md:flex w-full h-16 p-3 bg-white items-center justify-between px-8 lg:px-20 border-b border-b-stone-200 sticky top-0 z-50">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex gap-2 items-center">
          <img src={logo} alt="Vendio" className="w-8 h-8" />
          <div className="relative">
            <span className="text-gray-800">Vendio</span>
            <span className="text-xs text-gray-400 absolute -bottom-2 right-0">
              eCommerce
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {navlinks.map((link) => (
            <Link
              to={link.path}
              key={link.title}
              className={`flex items-center text-gray-600 font-medium 
              ${
                location.pathname === link.path
                  ? "text-teal-700 border-b-2 border-teal-600"
                  : "hover:text-teal-600"
              }
              py-2 px-4 transition-colors duration-300 ease-in-out rounded-md
              `}
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* User Section and Cart */}
        <div className="flex items-center gap-4 lg:gap-8">
          <div
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-300"
            title="account"
            onClick={handleProfileClick}
          >
            <span className="text-gray-800 max-w-40 truncate">
              {isAuthenticated ? `Hello, ${user?.firstName}` : "Hi, Guest"}
            </span>
            <div className="bg-gray-100 rounded-full overflow-hidden">
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
