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
    <div className="min-h-screen rounded-lg">
      <div className="container mx-auto p-4 sm:p-6 bg-gray-50 rounded-lg shadow-lg">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Review Your Order</h1>
          <span className="text-lg text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="flex gap-6">
          {/* Left side: Order list */}
          <div className="flex-1 bg-white shadow-md rounded-lg">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="py-3 px-6 w-1/2">Product</th>
                  <th className="text-center py-3 px-6 w-1/6">Price</th>
                  <th className="text-center py-3 px-6 w-1/6">Quantity</th>
                  <th className="text-center py-3 px-6 w-1/6">Total</th>
                </tr>
              </thead>
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
          </div>

          {/* Right side: Address, Payment, and Order Summary */}
          <div className="w-1/3 flex flex-col space-y-6">
            {/* Order Summary Section */}
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h3>
              <div className="mt-4 pt-4 text-gray-800 font-semibold space-y-2 border-t">
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
                <div className="border-t mt-4 pt-4 flex justify-between text-xl">
                  <span>Grand Total:</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address Section */}
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Shipping Address
              </h3>
              <p className="text-gray-700">{shippingAddress.name}</p>
              <p className="text-gray-700">{shippingAddress.address}</p>
            </div>

            {/* Estimated Delivery Date Section */}
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Estimated Delivery Date
              </h3>
              <p className="text-gray-700">
                {estimatedDeliveryDate.toDateString()}
              </p>
            </div>

            {/* Payment Method Section */}
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Payment Method
              </h3>
              <p className="text-gray-700">{paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-teal-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
