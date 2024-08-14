import React from "react";
import { products } from "../../../Store/products";
import { FaTrashAlt } from "react-icons/fa";

interface CartItemReadOnlyProps {
  id: number;
  quantity: number;
}

const ReadOnlyCart: React.FC<CartItemReadOnlyProps> = ({ id, quantity }) => {
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
        <span className="text-lg">{quantity}</span>
      </td>

      {/* Total */}
      <td className="py-4 px-6 text-center w-1/6">₹{itemTotal}</td>
    </tr>
  );
};

export default ReadOnlyCart;
