import React, { useCallback, useMemo } from "react";
import { FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";

const ProductCard: React.FC<{ product: any }> = React.memo(({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { checkInWishlist, handleWishlistClick } = useWishlist();

  const discountedPrice = useMemo(() => {
    return (product.price - product.price * (product.discount / 100)).toFixed(
      2
    );
  }, [product.price, product.discount]);

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      addToCart(product, 1);
    },
    [addToCart, product]
  );

  const handleWishlist = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      handleWishlistClick(product.id);
    },
    [handleWishlistClick, product.id]
  );

  const renderRating = useMemo(() => {
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    const totalStars = 5;

    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar key={`full-${index}`} className="text-yellow-500 text-lg" />
        ))}
        {hasHalfStar && (
          <FaStarHalfAlt key="half" className="text-yellow-500 text-lg" />
        )}
        {Array.from(
          { length: totalStars - fullStars - (hasHalfStar ? 1 : 0) },
          (_, index) => (
            <FaStar key={`empty-${index}`} className="text-gray-300 text-lg" />
          )
        )}
      </div>
    );
  }, [product.rating]);

  return (
    <div
      className="bg-white rounded-xl shadow-xl overflow-hidden relative group"
      onClick={() => {
        navigate(`/products/${product.id}`);
      }}
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-68 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        loading="lazy"
      />
      <div className="absolute top-4 right-4">
        <button
          className={`w-fit h-fit p-2 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out ${
            checkInWishlist(product.id)
              ? "bg-red-100 text-red-500 hover:bg-red-200"
              : "bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-600"
          }`}
          onClick={handleWishlist}
        >
          <FaHeart className="w-4 h-4" />
        </button>
      </div>
      <div className="p-6 flex flex-col justify-between h-44">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
            {product.title}
          </h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <p className="text-xl font-extrabold text-red-600 ">
                ${discountedPrice}
              </p>
              <p className="text-lg font-semibold text-gray-500 line-through">
                ${product.price}
              </p>
            </div>
            <div className="text-gray-600 text-sm bg-gray-100 px-2 py-1 rounded-full">
              {product.category}
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              className="bg-gradient-to-r from-teal-400 to-teal-600 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gradient-to-r hover:from-teal-400 hover:to-teal-700 transition-all w-fit active:scale-[0.98]"
              onClick={handleButtonClick}
            >
              Add to Cart
            </button>
            {renderRating}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
