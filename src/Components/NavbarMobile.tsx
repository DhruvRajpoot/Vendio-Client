import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiLogin, CiLogout } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../Assets/Images/logo.png";
import defaultuser from "../Assets/Images/defaultuser.png";
import { LiaShoppingCartSolid } from "react-icons/lia";

const NavbarMobile = ({
  isAuthenticated,
  user,
  logout,
  cartItems,
  navlinks,
  isLoginPage,
  redirectUrl,
}: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/account/profile");
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <nav className="w-full h-16 p-3 bg-gray-100 flex items-center justify-between px-4 border-b border-b-gray-300 md:hidden sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold flex gap-2 items-center">
        <img src={logo} alt="Vendio" className="w-8 h-8" />
        <div className="relative">
          <span className="text-gray-800 font-semibold">Vendio</span>
          <span className="text-xs text-gray-500 absolute -bottom-2 right-0">
            eCommerce
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        {/* Cart Icon */}
        <Link
          to="/cart"
          title="Cart"
          className="relative flex items-center gap-2 text-lg font-bold hover:text-gray-700"
        >
          <LiaShoppingCartSolid className="text-3xl" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-teal-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>

        {/* Hamburger Icon */}
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl cursor-pointer"
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
        <div className="flex flex-col flex-grow gap-2">
          {navlinks.map((link: any) => (
            <Link
              to={link.path}
              key={link.title}
              className={`flex items-center text-gray-800 font-medium text-lg py-3 px-4 rounded-lg ${
                location.pathname === link.path
                  ? "bg-teal-100 shadow-md"
                  : "hover:bg-teal-200"
              } transition-colors duration-300 ease-in-out`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.title}
            </Link>
          ))}

          {/* User Section */}
          <div className="flex justify-between items-center gap-3 mt-auto p-3">
            <div
              onClick={handleProfileClick}
              className="flex items-center gap-2 font-semibold text-gray-600 cursor-pointer"
            >
              <div className="bg-gray-100 rounded-full">
                <img
                  src={user?.profilePic || defaultuser}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>

              <span className="text-gray-800 max-w-40 truncate">
                {isAuthenticated ? user?.firstName : "Hi, Guest"}
              </span>
            </div>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 font-semibold hover:text-gray-900"
              >
                Logout
                <CiLogout className="text-xl" />
              </button>
            ) : isLoginPage ? (
              <Link
                to={`/signup?redirect=${redirectUrl}`}
                title="Sign Up"
                className="flex items-center gap-2 font-semibold hover:text-gray-900"
              >
                <span>Sign Up</span>
                <CiLogin className="text-xl" />
              </Link>
            ) : (
              <Link
                to={`/login?redirect=${redirectUrl}`}
                title="Login"
                className="flex items-center gap-2 font-semibold hover:text-gray-900"
              >
                <span>Login</span>
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
