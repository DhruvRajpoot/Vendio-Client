import React from "react";
import { useCart } from "../../../../Context/CartContext";
import ReadOnlyCart from "../ReadOnlyCart";

const ReviewStep: React.FC = () => {
  const { cartItems } = useCart();

  const orderItems = cartItems.map((item) => ({
    id: item.product.id,
    quantity: item.quantity,
  }));

  // Calculate total price
  const totalPrice = cartItems
    .reduce(
      (acc, item) =>
        acc +
        item.product.price * (1 - item.product.discount / 100) * item.quantity,
      0
    )
    .toFixed(2);

  // Placeholder address and payment method
  const shippingAddress = {
    name: "John Williams",
    address: "3817 Penhurst Dr. Richardson, California 62639",
  };

  const paymentMethod = "Credit/Debit Card";

  // Placeholder delivery date
  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5);

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">
        Review Your Order
      </h2>

      {/* Shipping Address Section */}
      <div className="border rounded-lg p-6 mb-6 bg-white shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Shipping Address
        </h3>
        <p className="text-gray-700">{shippingAddress.name}</p>
        <p className="text-gray-700">{shippingAddress.address}</p>
      </div>

      {/* Payment Method Section */}
      <div className="border rounded-lg p-6 mb-6 bg-white shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Payment Method
        </h3>
        <p className="text-gray-700">{paymentMethod}</p>
      </div>

      {/* Order Summary Section */}
      <div className="border rounded-lg p-6 mb-6 bg-white shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h3>
        <table className="w-full">
          <tbody>
            {orderItems.map((item, index) => (
              <ReadOnlyCart key={index} id={item.id} quantity={item.quantity} />
            ))}
          </tbody>
        </table>
        <div className="border-t mt-4 pt-4 flex gap-2 justify-end text-gray-800 font-semibold pr-20">
          <span>Total Price : </span>
          <span>₹{totalPrice}</span>
        </div>
      </div>

      {/* Estimated Delivery Date Section */}
      <div className="border rounded-lg p-6 mb-6 bg-white shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Estimated Delivery Date
        </h3>
        <p className="text-gray-700">{estimatedDeliveryDate.toDateString()}</p>
      </div>

      {/* Place Order Button */}
      <button className="bg-teal-600 text-white w-full p-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 mt-6">
        Place Order
      </button>
    </div>
  );
};

export default ReviewStep;
