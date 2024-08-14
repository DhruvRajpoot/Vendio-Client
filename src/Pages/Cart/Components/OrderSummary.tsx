import React, { useState } from "react";
import toast from "react-hot-toast";

interface OrderSummaryProps {
  subtotal: number;
  deliveryCharges: number;
  taxes: number;
  total: number;
  discount: number;
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
      toast.success("Coupon removed.");
    } else {
      onApplyCoupon(couponCode);
      setIsCouponApplied(true);
    }
  };

  const discountAmount = ((subtotal * discount) / 100).toFixed(2);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

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
            className={`text-white px-4 py-2 rounded-r-md
              ${
                isCouponApplied
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
          >
            {isCouponApplied ? "Erase" : "Apply"}
          </button>
        </form>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount:</span>
          <span>-₹{discountAmount}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery Charges:</span>
          <span>₹{deliveryCharges}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Taxes:</span>
          <span>₹{taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors"
      >
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
