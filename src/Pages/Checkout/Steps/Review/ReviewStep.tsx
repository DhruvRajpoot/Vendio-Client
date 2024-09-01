import React from "react";
import { useCart } from "../../../../Context/CartContext";
import CartTable from "../../Components/CartTable";
import { useOrder } from "../../../../Context/OrderContext";
import { deliveryCharges, taxRate } from "../../../../Constants/Constants";
import { FaCreditCard, FaMapMarkerAlt, FaMoneyBillAlt } from "react-icons/fa";
import Spinner from "../../../../Components/Spinner";
import { Address } from "../../../../Context/AddressContext";
import RazorpayButton from "./Components/RazorpayButton";

interface ReviewStepProps {
  selectedPayment: string | null;
  selectedAddress: Address | null;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  selectedPayment,
  selectedAddress: shippingAddress,
}) => {
  const { cartItems, discount, couponCode } = useCart();

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
  const taxes = (subtotal - discountAmount) * taxRate;
  const grandTotal = subtotal - discountAmount + deliveryCharges + taxes;

  // Estimated delivery date
  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5);

  // Place Order function
  const { createOrder, orderLoading } = useOrder();

  const handlePlaceOrder = async () => {
    if (shippingAddress && selectedPayment === "cod") {
      try {
        await createOrder({
          shippingAddress,
          paymentMethod: selectedPayment,
          couponCode,
        });
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  return (
    <div className="rounded-lg">
      <div className="mx-auto p-4 sm:p-6 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 mb-6 text-center">
          Review Your Order
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side: Order list */}
          <div className="flex-1">
            <CartTable cartItems={cartItems} />
          </div>

          {/* Right side: Address, Payment, and Order Summary */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <div className="mb-8">
              <h2 className="flex items-center gap-1.5 text-xl font-semibold mb-3 text-gray-800">
                <FaMapMarkerAlt />
                Shipping Address
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                <p className="text-lg font-semibold text-gray-800">
                  {shippingAddress?.name}
                </p>
                <p className="text-gray-700">{shippingAddress?.addressLine}</p>
                <p className="text-gray-700">
                  {`${shippingAddress?.area}, ${shippingAddress?.city}, ${shippingAddress?.state} `}
                  <span className="font-semibold">
                    {shippingAddress?.pincode}
                  </span>
                </p>
                <p className="text-gray-700">{`Landmark: ${shippingAddress?.landmark}`}</p>
                <p className="text-gray-700 font-semibold">{`Mobile: ${shippingAddress?.phone}`}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="flex items-center gap-1.5 text-xl font-semibold mb-3 text-gray-800">
                <FaCreditCard />
                Payment Method
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                <p className="font-medium text-gray-700">
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
              <h2 className="flex items-center gap-1.5 text-xl font-semibold mb-3 text-gray-800">
                <FaMoneyBillAlt />
                Order Summary
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div>
                  <div className="flex justify-between mb-2 text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-gray-700">
                    <span>Delivery Charges</span>
                    <span>${deliveryCharges.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-gray-700">
                    <span>Taxes</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between mb-2 text-red-500 font-semibold">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-300 pt-4 flex justify-between font-semibold text-lg text-gray-800">
                    <span>Grand Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              {selectedPayment === "cod" ? (
                <button
                  type="button"
                  className="flex items-center justify-center bg-teal-600 text-white font-semibold text-lg py-2 px-6 rounded-md shadow-md hover:bg-teal-700 transition-colors duration-200 w-44 h-10 disabled:bg-gray-400 disabled:text-gray-200"
                  onClick={handlePlaceOrder}
                  disabled={orderLoading}
                >
                  {orderLoading ? <Spinner /> : "Place Order"}
                </button>
              ) : (
                <RazorpayButton
                  shippingAddress={shippingAddress!}
                  couponCode={couponCode}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
