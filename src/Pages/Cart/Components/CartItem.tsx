import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Product, useProduct } from "../../../Context/ProductContext";

interface CartItemProps {
  id: string;
  quantity: number;
  onQuantityChange: (amount: number) => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  quantity,
  onQuantityChange,
  onRemove,
}) => {
  const navigate = useNavigate();
  const { products } = useProduct();
  const product = products.find((p: Product) => p._id === id);

  if (!product) {
    return (
      <tr>
        <td colSpan={5} className="py-4 px-6 text-center text-red-500">
          Product not found
        </td>
      </tr>
    );
  }

  const { images, title, discountedPrice, categories } = product;

  const itemTotal = discountedPrice * quantity;

  const navigateToProduct = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <tr className="border-b border-gray-200 sm:table-row">
      {/* Mobile View */}
      <td className="block sm:hidden p-3">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={images[0]}
              alt={title}
              className="w-16 h-16 object-cover rounded-md shadow-sm"
              onClick={navigateToProduct}
            />
            <div className="flex-1">
              <h3
                className="font-semibold max-h-12 overflow-hidden text-gray-800"
                onClick={navigateToProduct}
              >
                {title}
              </h3>
              {categories.map((category) => (
                <p key={category} className="text-gray-500 text-sm">
                  {category}
                </p>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 font-medium">Price:</span>
              <span className="text-lg font-semibold text-gray-800">
                ₹{discountedPrice}
              </span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 font-medium">Quantity:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    onQuantityChange(-1);
                  }}
                  className="bg-teal-600 text-white py-.5 px-2 rounded-full disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => onQuantityChange(1)}
                  className="bg-teal-600 text-white py-.5 px-2 rounded-full"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 font-medium">Total:</span>
              <span className="text-lg font-semibold text-gray-800">
                ₹{itemTotal}
              </span>
            </div>
            <div className="flex justify-end">
              <button
                onClick={onRemove}
                className="text-red-600 hover:text-red-800 flex items-center gap-2 p-2 text-sm rounded-lg border border-red-600 transition-all duration-200 ease-in-out "
              >
                <FaTrashAlt size={18} />
              </button>
            </div>
          </div>
        </div>
      </td>

      {/* Desktop View */}
      <td className="hidden sm:table-cell py-4 px-6">
        <div className="flex items-center space-x-4">
          <img
            src={images[0]}
            alt={title}
            className="w-16 h-16 object-cover rounded-md shadow-sm cursor-pointer"
            onClick={navigateToProduct}
          />
          <div className="flex flex-col">
            <span
              className="font-semibold max-h-12 xl:max-h-14 overflow-hidden cursor-pointer"
              onClick={navigateToProduct}
            >
              {title}
            </span>
            {categories.map((category) => (
              <span key={category} className="text-gray-500 text-sm">
                {category}
              </span>
            ))}
          </div>
        </div>
      </td>

      <td className="hidden sm:table-cell py-4 px-6 text-center">
        ₹{discountedPrice}
      </td>

      <td className="hidden sm:table-cell py-4 px-6 text-center">
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => {
              onQuantityChange(-1);
            }}
            className="bg-teal-600 text-white py-.5 px-2 rounded-md disabled:opacity-50"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => onQuantityChange(1)}
            className="bg-teal-600 text-white py-.5 px-2 rounded-md"
          >
            +
          </button>
        </div>
      </td>

      <td className="hidden sm:table-cell py-4 px-6 text-center">
        ₹{itemTotal}
      </td>

      <td className="hidden sm:table-cell py-4 px-6 text-center">
        <button onClick={onRemove} className="text-red-600 hover:text-red-800">
          <FaTrashAlt size={20} />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
