import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../Context/CartContext";
import { deliveryCharges, taxRate } from "../../../Constants/Constants";

interface OrderSummaryProps {}

const OrderSummary: React.FC<OrderSummaryProps> = ({}) => {
  const { cartItems, couponCode, setCouponCode, applyCoupon, discount } =
    useCart();
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(discount > 0);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;

    if (isCouponApplied) {
      setCouponCode("");
      applyCoupon("");
      setIsCouponApplied(false);
    } else {
      const discountapplied = applyCoupon(couponCode);
      if (discountapplied) setIsCouponApplied(true);
    }
  };

  // Calculate subtotal, discount, delivery charges, taxes, and grand total
  const subtotal = cartItems.reduce((total, item) => {
    return total + item.product.discountedPrice * item.quantity;
  }, 0);

  const discountAmount = Math.floor((subtotal * discount) / 100);
  const taxes = Math.floor((subtotal - discountAmount) * taxRate);
  const grandTotal = subtotal - discountAmount + deliveryCharges + taxes;

  return (
    <div className="bg-white shadow-md rounded-lg p-3 sm:p-6 flex flex-col">
      <h2 className="text-xl text-left sm:text-2xl font-semibold mb-4">
        Order Summary
      </h2>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Coupon Code</label>
        <form className="flex" onSubmit={handleCouponSubmit}>
          <input
            id="coupon"
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border border-gray-300 outline-none rounded-l-md px-4 py-2 flex-1"
            placeholder="Enter coupon code"
            disabled={isCouponApplied}
          />
          <button
            type="submit"
            className={`text-white p-2 rounded-r-md w-16
              ${
                isCouponApplied
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
          >
            {isCouponApplied ? "Clear" : "Apply"}
          </button>
        </form>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery Charges:</span>
          <span>₹{deliveryCharges}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Taxes:</span>
          <span>₹{taxes}</span>
        </div>
        {isCouponApplied && (
          <div className="flex justify-between mb-2 text-red-500 font-semibold">
            <span>Discount:</span>
            <span>-₹{discountAmount}</span>
          </div>
        )}

        <div className="border-t border-gray-300 my-2" />

        <div className="flex justify-between font-semibold text-lg">
          <span>Grand Total:</span>
          <span>₹{grandTotal}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center"
      >
        Checkout
      </Link>
    </div>
  );
};

export default OrderSummary;
