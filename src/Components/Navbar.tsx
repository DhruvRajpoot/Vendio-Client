import { Link } from "react-router-dom";
import { RiSearch2Line } from "react-icons/ri";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { CiLogin } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="w-full h-20 p-3 bg-white flex items-center justify-between px-20 border-b border-b-stone-200">
      {/* Logo */}
      <div className="text-2xl font-bold cursor-pointer flex flex-col text-right">
        <Link to="/">Go Shop</Link>
        <span className="text-xs text-gray-500">eCommerce</span>
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
        <Link to="/login" title="login">
          <CiLogin />
        </Link>

        <Link to="/cart" title="cart">
          <LiaShoppingCartSolid />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
