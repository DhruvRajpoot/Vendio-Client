import { Link, useLocation } from "react-router-dom";
import { RiSearch2Line } from "react-icons/ri";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { CiLogin, CiLogout } from "react-icons/ci";
import logo from "../Assets/Images/logo.png";
import defaultuser from "../Assets/Images/defaultuser.png";
import { useAppContext } from "../Context/AppContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAppContext();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

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
      <div className="rounded-full bg-gray-100 text-gray-800 px-6 py-1 w-full max-w-96 h-10">
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
      </div>

      {/* User Section */}
      <div className="flex items-center gap-6 text-2xl">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <span className="text-gray-800">Welcome, {user?.firstName}</span>
              <img
                src={user?.profilePic || defaultuser}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
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
            to="/signup"
            title="signup"
            className="flex items-center gap-2 text-sm font-semibold hover:font-bold text-gray-600 hover:text-gray-900"
          >
            <span>Sign Up</span>
            <CiLogin className="text-xl" />
          </Link>
        ) : (
          <Link
            to="/login"
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
          className="flex items-center gap-2 text-sm font-semibold hover:font-bold text-gray-600 hover:text-gray-900"
        >
          <span>Cart</span>
          <LiaShoppingCartSolid className="text-xl" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
