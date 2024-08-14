import React from "react";
import { useCart } from "../../../../Context/CartContext";
import ReadOnlyCart from "../ReadOnlyCart";

const ReviewStep: React.FC = () => {
  const { cartItems } = useCart();

  // Calculate subtotal, discount, delivery charges, taxes, and grand total
  const subtotal = cartItems.reduce((total, item) => {
    return (
      total +
      (item.product.price -
        item.product.price * (item.product.discount / 100)) *
        item.quantity
    );
  }, 0);

  const discount = 0;
  const deliveryCharges = 50;
  const taxes = (subtotal - discount) * 0.05;
  const grandTotal = subtotal - discount + deliveryCharges + taxes;

  const shippingAddress = {
    name: "John Williams",
    address: "3817 Penhurst Dr. Richardson, California 62639",
  };

  const paymentMethod = "Razorpay";

  // Placeholder delivery date
  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5);

  return (
    <div className="container mx-auto p-3 sm:p-6 bg-gray-50 rounded-lg shadow-lg">
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
            {cartItems.map((item, index) => (
              <ReadOnlyCart
                key={index}
                id={item.product.id}
                quantity={item.quantity}
              />
            ))}
          </tbody>
        </table>
        <div className="mt-4 pt-4 text-gray-800 font-semibold space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount:</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges:</span>
            <span>₹{deliveryCharges.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes:</span>
            <span>₹{taxes.toFixed(2)}</span>
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between">
            <span>Grand Total:</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
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
      <button className="bg-teal-800 text-white w-full p-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 mt-6">
        Place Order
      </button>
    </div>
  );
};

export default ReviewStep;
