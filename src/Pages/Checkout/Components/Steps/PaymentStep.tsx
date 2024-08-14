import React, { useState, useEffect } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";

interface PaymentStepProps {
  validateStep: (isValid: boolean) => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ validateStep }) => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  useEffect(() => {
    validateStep(selectedPayment !== null);
  }, [selectedPayment, validateStep]);

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">
        Payment Method
      </h2>
      <div className="flex flex-col items-center space-y-6">
        {/* Razorpay Option */}
        <div
          className={`flex items-center w-full max-w-[500px] border rounded-lg p-5 cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-md ${
            selectedPayment === "razorpay"
              ? "border-teal-600 bg-teal-50"
              : "border-gray-300 bg-white"
          }`}
          onClick={() => setSelectedPayment("razorpay")}
        >
          <input
            type="radio"
            name="paymentMethod"
            id="razorpay"
            className="hidden"
            checked={selectedPayment === "razorpay"}
            readOnly
          />
          <label htmlFor="razorpay" className="flex-1 flex items-center">
            <RiSecurePaymentFill className="text-2xl text-teal-600" />
            <div className="ml-4">
              <span className="text-lg font-semibold text-gray-800">
                Razorpay
              </span>
              <p className="text-sm text-gray-600">
                Pay securely using Razorpay.
              </p>
            </div>
          </label>
        </div>

        {/* Cash on Delivery Option */}
        <div
          className={`flex items-center w-full max-w-[500px] border rounded-lg p-5 cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-md ${
            selectedPayment === "cod"
              ? "border-teal-600 bg-teal-50"
              : "border-gray-300 bg-white"
          }`}
          onClick={() => setSelectedPayment("cod")}
        >
          <input
            type="radio"
            name="paymentMethod"
            id="cod"
            className="hidden"
            checked={selectedPayment === "cod"}
            readOnly
          />
          <label htmlFor="cod" className="flex-1 flex items-center">
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
      </div>
    </div>
  );
};

export default PaymentStep;
