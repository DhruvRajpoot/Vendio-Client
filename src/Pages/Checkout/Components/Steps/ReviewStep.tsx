import React from "react";
import { useCart } from "../../../../Context/CartContext";
import CartTable from "../CartTable";

interface ReviewStepProps {
  selectedPayment: string | null;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ selectedPayment }) => {
  const { cartItems, discount } = useCart();

  // Calculate subtotal, discount, delivery charges, taxes, and grand total
  const subtotal = cartItems.reduce((total, item) => {
    return (
      total +
      (item.product.price -
        item.product.price * (item.product.discount / 100)) *
        item.quantity
    );
  }, 0);

  const discountAmount = (subtotal * discount) / 100;
  const deliveryCharges = 50;
  const taxes = (subtotal - discountAmount) * 0.05;
  const grandTotal = subtotal - discountAmount + deliveryCharges + taxes;

  const shippingAddress = {
    name: "Robert Fox",
    mobileNumber: "1234567890",
    addressLine: "4257 Washington Ave.",
    area: "Manchester",
    landmark: "Near Park",
    city: "Manchester",
    state: "Kentucky",
    zip: "39495",
  };

  // Placeholder delivery date
  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5);

  return (
    <div className="rounded-lg">
      <div className="container mx-auto p-4 sm:p-6 bg-gray-50 rounded-lg shadow-lg">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Review Your Order</h1>
          <span className="text-lg text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="flex gap-6">
          {/* Left side: Order list */}
          <CartTable cartItems={cartItems} />

          {/* Right side: Address, Payment, and Order Summary */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Shipping Address
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                <p className="text-lg font-semibold text-gray-800">
                  {shippingAddress.name}
                </p>
                <p className="text-gray-700">{shippingAddress.addressLine}</p>
                <p className="text-gray-700">
                  {`${shippingAddress.area}, ${shippingAddress.city}, ${shippingAddress.state} `}
                  <span className="font-semibold">{shippingAddress.zip}</span>
                </p>
                <p className="text-gray-700">{`Landmark: ${shippingAddress.landmark}`}</p>
                <p className="text-gray-700 font-semibold">{`Mobile: ${shippingAddress.mobileNumber}`}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Payment Method
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                <p className="text-md font-medium text-gray-700">
                  {selectedPayment === "cod" ? "Cash on Delivery" : "Razorpay"}
                </p>
                {selectedPayment === null && (
                  <p className="text-red-600 text-sm">
                    Please select a payment method.
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Order Summary
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div>
                  <div className="flex justify-between mb-3 text-md text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-3 text-md text-gray-700">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-3 text-md text-gray-700">
                    <span>Delivery Charges</span>
                    <span>${deliveryCharges.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-3 text-md text-gray-700">
                    <span>Taxes</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-4 flex justify-between font-semibold text-lg text-gray-800">
                    <span>Grand Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="bg-teal-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-teal-700 transition-colors duration-200"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
