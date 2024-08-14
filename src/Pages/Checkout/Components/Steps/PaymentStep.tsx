import React, { useState } from "react";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";

interface PaymentMethod {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    label: "Credit/Debit Card",
    description: "Pay with your credit or debit card.",
    icon: <FaCreditCard className="text-2xl text-teal-600" />,
  },
  {
    id: "net-banking",
    label: "Net Banking",
    description: "Pay using your net banking account.",
    icon: <RiBankFill className="text-2xl text-teal-600" />,
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay with cash upon delivery of your order.",
    icon: <FaMoneyBillWave className="text-2xl text-teal-600" />,
  },
];

const PaymentStep: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedMethod(id);
    // Handle the selection logic here
    console.log(`Selected payment method: ${id}`);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">
        Payment Method
      </h2>
      <div className="flex flex-col items-center space-y-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`flex items-center bg-white w-full max-w-[500px] border rounded-lg p-5 cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-md ${
              selectedMethod === method.id
                ? "border-teal-600 bg-teal-50"
                : "border-gray-300"
            }`}
            onClick={() => handleSelect(method.id)}
          >
            <input
              type="radio"
              name="paymentMethod"
              id={method.id}
              className="hidden"
              checked={selectedMethod === method.id}
              readOnly
            />
            <label htmlFor={method.id} className="flex-1 flex items-center">
              {method.icon}
              <div className="ml-4">
                <span className="text-lg font-semibold text-gray-800">
                  {method.label}
                </span>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentStep;
