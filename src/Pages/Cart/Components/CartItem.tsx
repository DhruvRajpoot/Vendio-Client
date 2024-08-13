import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { products } from "../../../Store/products";

interface CartItemProps {
  id: number;
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
  const product = products.find((p) => p.id === id);

  if (!product) {
    return null;
  }

  const { images, title, price, discount } = product;

  const discountedPrice = (price - price * (discount / 100)).toFixed(2);
  const itemTotal = (parseFloat(discountedPrice) * quantity).toFixed(2);

  return (
    <tr className="border-b border-gray-200">
      {/* Product */}
      <td className="py-4 px-6 w-1/2 flex items-center space-x-4">
        <img
          src={images[0]}
          alt={title}
          className="w-16 h-16 object-cover rounded-md shadow-sm"
        />
        <div className="flex flex-col flex-grow">
          <span className="font-semibold text-lg truncate">{title}</span>
          <span className="text-gray-600">{product.category}</span>
        </div>
      </td>

      {/* Price */}
      <td className="py-4 px-6 text-center w-1/6">₹{discountedPrice}</td>

      {/* Quantity */}
      <td className="py-4 px-6 text-center w-1/6">
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => onQuantityChange(-1)}
            className="bg-teal-600 text-white py-1 px-3 rounded-md hover:bg-teal-700 transition-colors"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={() => onQuantityChange(1)}
            className="bg-teal-600 text-white py-1 px-3 rounded-md hover:bg-teal-700 transition-colors"
          >
            +
          </button>
        </div>
      </td>

      {/* Total */}
      <td className="py-4 px-6 text-center font-semibold w-1/6">
        ₹{itemTotal}
      </td>

      {/* Remove Button */}
      <td className="py-4 px-6 text-center w-1/6">
        <button
          onClick={onRemove}
          className="text-red-600 hover:text-red-800 transition-colors"
        >
          <FaTrashAlt className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
