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
    return (
      <tr>
        <td colSpan={5} className="py-4 px-6 text-center text-red-500">
          Product not found
        </td>
      </tr>
    );
  }

  const { images, title, price, discount, category } = product;

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
          <span className="text-gray-600">{category}</span>
        </div>
      </td>

      {/* Price */}
      <td className="py-4 px-6 text-center w-1/6">₹{discountedPrice}</td>

      {/* Quantity */}
      <td className="py-4 px-6 text-center w-1/6">
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => {
              if (quantity > 1) {
                onQuantityChange(-1);
              } else {
                console.warn("Cannot decrease quantity below 1");
              }
            }}
            className="bg-teal-600 text-white py-1 px-3 rounded-md disabled:opacity-50"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => onQuantityChange(1)}
            className="bg-teal-600 text-white py-1 px-3 rounded-md"
          >
            +
          </button>
        </div>
      </td>

      {/* Total */}
      <td className="py-4 px-6 text-center w-1/6">₹{itemTotal}</td>

      {/* Remove */}
      <td className="py-4 px-6 text-center w-1/6">
        <button onClick={onRemove} className="text-red-600 hover:text-red-800">
          <FaTrashAlt size={20} />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
