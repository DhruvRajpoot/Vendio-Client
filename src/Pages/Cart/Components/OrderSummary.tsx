import React, { useState } from "react";

interface OrderSummaryProps {
  subtotal: number;
  deliveryCharges: number;
  taxes: number;
  total: number;
  discount: number; // New prop for discount
  onCheckout: () => void;
  onApplyCoupon: (code: string) => void;
  couponCode: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  deliveryCharges,
  taxes,
  total,
  discount,
  onCheckout,
  onApplyCoupon,
  couponCode,
  setCouponCode,
}) => {
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(discount > 0);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;

    if (isCouponApplied) {
      setCouponCode("");
      onApplyCoupon("");
      setIsCouponApplied(false);
    } else {
      onApplyCoupon(couponCode);
      setIsCouponApplied(true);
    }
  };

  const discountAmount = (subtotal * discount) / 100;

  return (
    <div className="w-80 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
      <div className="mb-4">
        <label htmlFor="" className="block text-gray-700 mb-2 font-medium">
          Apply Coupon
        </label>
        <form
          className="flex items-center space-x-2"
          onSubmit={handleCouponSubmit}
        >
          <input
            id="coupon"
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border border-gray-300 rounded-md p-2 flex-1"
            placeholder="Enter coupon code"
            disabled={isCouponApplied}
          />
          <button
            type="submit"
            className={`px-4 py-2.5 text-sm rounded-md transition-colors ${
              isCouponApplied
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-teal-600 text-white hover:bg-teal-700"
            }`}
          >
            {isCouponApplied ? "Remove" : "Apply"}
          </button>
        </form>
      </div>
      <div className="flex justify-between mb-4">
        <span className="font-medium">Subtotal:</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between mb-4">
          <span className="font-medium">Discount ({discount}%):</span>
          <span>-₹{discountAmount.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between mb-4">
        <span className="font-medium">Delivery Charges:</span>
        <span>₹{deliveryCharges.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="font-medium">Estimated Taxes:</span>
        <span>₹{taxes.toFixed(2)}</span>
      </div>
      <hr className="border-t border-gray-400 mb-4" />
      <div className="flex justify-between font-bold text-xl mb-6">
        <span>Total:</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
      <button
        onClick={onCheckout}
        className="bg-teal-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-teal-700 w-full text-center"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
