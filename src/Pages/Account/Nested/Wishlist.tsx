import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../../Context/WishlistContext";
import ProductCard from "../../../Components/ProductCard";
import { products } from "../../../Store/products";

const Wishlist: React.FC = () => {
  const { wishlist, wishlistLoading, wishlistError } = useWishlist();

  const renderState = () => {
    if (wishlistError) {
      return (
        <div className="text-red-600 text-center mt-4">
          <p className="text-lg">{wishlistError}</p>
        </div>
      );
    }

    if (wishlistLoading) {
      return (
        <div className="flex justify-center items-center mt-4">
          <p className="text-lg">Loading...</p>
        </div>
      );
    }

    if (wishlist.size === 0) {
      return (
        <div className="text-center mt-6">
          <p className="text-lg text-gray-700">
            Your wishlist is empty.{" "}
            <Link
              to="/products"
              className="text-teal-600 font-semibold underline"
            >
              Start shopping
            </Link>
            .
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-10 xl:gap-12 2xl:gap-20 mt-6">
        {[...wishlist].map((productId) => {
          const product = products.find((p) => p.id === productId);
          if (!product) return null;
          return <ProductCard key={productId} product={product} />;
        })}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Wishlist
      </h1>
      {renderState()}
    </div>
  );
};

export default Wishlist;
