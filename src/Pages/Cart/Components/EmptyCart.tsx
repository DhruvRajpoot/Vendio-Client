import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import cartAnimation from "../../../Assets/Lottie/cart.json";

const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Lottie
        animationData={cartAnimation}
        loop
        className="w-48 h-48 md:w-64 md:h-64 md:scale-125 mb-6"
      />
      <p className="text-2xl font-semibold mb-4">Your cart is empty.</p>
      <p className="text-lg mb-6">
        It looks like you haven't added anything to your cart yet.
      </p>
      <Link
        to="/products"
        className="bg-teal-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-teal-700 transition-colors"
      >
        Browse Products
      </Link>
    </div>
  );
};

export default EmptyCart;
