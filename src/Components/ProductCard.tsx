import React from "react";
import { FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const navigate = useNavigate();

  const discountedPrice = (
    product.price -
    product.price * (product.discount / 100)
  ).toFixed(2);

  const renderRating = () => {
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
  };

  return (
    <div
      className="bg-white rounded-xl shadow-xl overflow-hidden relative group transition-transform transform hover:scale-[1.02]"
      onClick={() => {
        navigate(`/products/${product.id}`);
      }}
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-68 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div className="absolute top-4 right-4">
        <button
          className="p-2 bg-white rounded-full border border-gray-300 shadow-md text-gray-500 hover:text-red-600 hover:bg-gray-100 transition-colors"
          onClick={(e) => e.stopPropagation()}
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
            <Link
              to={`/products/${product.id}`}
              className="bg-gradient-to-r from-teal-400 to-teal-600 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gradient-to-l hover:from-teal-500 hover:to-teal-700 transition-colors w-fit"
            >
              More Details
            </Link>

            {renderRating()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
