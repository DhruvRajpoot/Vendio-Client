import React from "react";
import { Product, useProduct } from "../../../../../Context/ProductContext";

interface CartTableProps {
  cartItems: { product: Product; quantity: number }[];
}

const CartTable: React.FC<CartTableProps> = ({ cartItems }) => {
  const { products } = useProduct();

  return (
    <div className="flex-1 bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="py-3 px-4 w-1/3 sm:w-1/4 md:w-1/6">Product</th>
            <th className="text-center py-3 px-4 w-1/6">Price</th>
            <th className="text-center py-3 px-4 w-1/6">Quantity</th>
            <th className="text-center py-3 px-4 w-1/6">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => {
            const product = products.find(
              (p: Product) => p._id === item.product._id
            );

            if (!product) {
              return (
                <tr key={index}>
                  <td
                    colSpan={4}
                    className="py-4 px-4 text-center text-red-500"
                  >
                    Product not found
                  </td>
                </tr>
              );
            }

            const { images, title, discountedPrice, categories } = product;

            const itemTotal = item.quantity * discountedPrice;

            return (
              <tr key={index} className="border-b border-gray-200">
                {/* Product */}
                <td className="py-4 px-4 flex items-center space-x-4 mr-6">
                  <img
                    src={images[0]}
                    alt={title}
                    className="w-12 h-12 object-cover rounded-md shadow-sm"
                  />
                  <div className="flex flex-col flex-grow">
                    <span
                      className="font-semibold text-sm truncate max-w-[12rem]"
                      title={title}
                    >
                      {title}
                    </span>

                    {categories.map((category) => (
                      <span
                        key={category}
                        className="text-gray-600 text-xs truncate"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Price */}
                <td className="py-4 px-4 text-center text-sm">
                  ₹{discountedPrice}
                </td>

                {/* Quantity */}
                <td className="py-4 px-4 text-center text-sm">
                  <span>{item.quantity}</span>
                </td>

                {/* Total */}
                <td className="py-4 px-4 text-center text-sm">₹{itemTotal}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
