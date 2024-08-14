import React, { useState, useEffect } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";

interface PaymentStepProps {
  validateStep: (isValid: boolean) => void;
  setSelectedPayment: (paymentMethod: string | null) => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ validateStep, setSelectedPayment }) => {
  const [selectedPayment, setSelectedPaymentState] = useState<string | null>(null);

  useEffect(() => {
    validateStep(selectedPayment !== null);
  }, [selectedPayment, validateStep]);

  const handlePaymentSelection = (method: string) => {
    setSelectedPaymentState(method);
    setSelectedPayment(method);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">
        Payment Method
      </h2>
      <div className="flex flex-col items-center space-y-6">
        {/* Cash on Delivery Option */}
        <div
          className={`flex items-center w-full max-w-[500px] border rounded-lg p-5 cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-md ${
            selectedPayment === "cod"
              ? "border-teal-600 bg-teal-50"
              : "border-gray-300 bg-white"
          }`}
          onClick={() => handlePaymentSelection("cod")}
        >
          <input
            type="radio"
            name="paymentMethod"
            id="cod"
            className="hidden"
            checked={selectedPayment === "cod"}
            readOnly
          />
          <label
            htmlFor="cod"
            className="flex-1 cursor-pointer flex items-center"
          >
            <FaMoneyBillWave className="text-2xl text-teal-600" />
            <div className="ml-4">
              <span className="text-lg font-semibold text-gray-800">
                Cash on Delivery
              </span>
              <p className="text-sm text-gray-600">
                Pay with cash upon delivery of your order.
              </p>
            </div>
          </label>
        </div>

        {/* Razorpay Option */}
        <div
          className={`flex items-center w-full max-w-[500px] border rounded-lg p-5 cursor-not-allowed transition-shadow duration-300 ease-in-out ${
            selectedPayment === "razorpay"
              ? "border-gray-300 bg-gray-100"
              : "border-gray-300 bg-white"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            id="razorpay"
            className="hidden"
            checked={selectedPayment === "razorpay"}
            readOnly
          />
          <label
            htmlFor="razorpay"
            className="flex-1 flex items-center cursor-not-allowed"
          >
            <RiSecurePaymentFill className="text-2xl text-gray-400" />
            <div className="ml-4">
              <span className="text-lg font-semibold text-gray-400">
                Razorpay
              </span>
              <p className="text-sm text-gray-500">
                This payment method is currently unavailable.
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
