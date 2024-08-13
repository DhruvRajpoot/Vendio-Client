import { Link } from "react-router-dom";
import { RiSearch2Line } from "react-icons/ri";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { CiLogin } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="w-full h-16 p-3 bg-white flex items-center justify-between px-20 border-b border-b-stone-200">
      {/* Logo */}
      <div className="text-2xl font-bold cursor-pointer flex flex-col text-right">
        <Link to="/">Vendio</Link>
        <span className="text-xs text-gray-400 relative bottom-1.5">
          eCommerce
        </span>
      </div>

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

      {/* Others */}
      <div className="flex items-center gap-6 text-2xl">
        <Link
          to="/login"
          title="login"
          className="flex items-center gap-2 text-sm font-semibold hover:font-bold text-gray-600 hover:text-gray-900"
        >
          <span>Login</span>
          <CiLogin className="text-xl" />
        </Link>

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
