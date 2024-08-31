import React, { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";

interface PaymentMethod {
  method: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface PaymentStepProps {
  setSelectedPayment: (paymentMethod: string | null) => void;
  nextStep: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  setSelectedPayment,
  nextStep,
}) => {
  const [selectedPayment, setSelectedPaymentState] = useState<string | null>(
    null
  );

  const paymentMethods: PaymentMethod[] = [
    {
      method: "cod",
      label: "Cash on Delivery",
      description: "Pay with cash upon delivery of your order.",
      icon: <FaMoneyBillWave className="text-2xl text-teal-600" />,
    },
    {
      method: "razorpay",
      label: "Razorpay",
      description: "Pay securely with Razorpay.",
      icon: <RiSecurePaymentFill className="text-2xl text-teal-600" />,
    },
  ];

  const handlePaymentSelection = (method: string) => {
    setSelectedPaymentState(method);
    setSelectedPayment(method);
    nextStep();
  };

  return (
    <div className="mx-auto p-4 sm:p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 mb-6 text-center">
        Payment Method
      </h2>
      <div className="flex flex-col items-center space-y-6">
        {paymentMethods.map(({ method, label, description, icon }) => (
          <div
            key={method}
            className={`flex items-center w-full max-w-[500px] border rounded-lg p-5 cursor-pointer transition-shadow duration-300 ease-in-out ${
              selectedPayment === method
                ? "border-teal-600 bg-teal-50"
                : "border-gray-300 bg-white hover:shadow-md"
            }`}
            onClick={() => handlePaymentSelection(method)}
          >
            <input
              type="radio"
              name="paymentMethod"
              id={method}
              className="hidden"
              checked={selectedPayment === method}
              readOnly
            />
            <label
              htmlFor={method}
              className="flex-1 cursor-pointer flex items-center"
            >
              {icon}
              <div className="ml-4">
                <span className="text-lg font-semibold text-gray-800">
                  {label}
                </span>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentStep;
