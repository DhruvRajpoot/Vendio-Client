import React, { useState, useEffect } from "react";
import StepProgress from "./Components/StepProgress";
import AddressStep from "./Components/Steps/AddressStep";
import PaymentStep from "./Components/Steps/PaymentStep";
import ReviewStep from "./Components/Steps/ReviewStep";
import Navbar from "../../Components/Navbar";
import { AiOutlineCaretLeft } from "react-icons/ai";
import { ShippingAddress } from "../../Context/OrderContext";

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] =
    useState<ShippingAddress | null>(null);

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-10 py-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between gap-6">
          <div className="w-11 sm:w-20">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="flex items-center mr-auto bg-gray-300 text-gray-800 p-3 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-200"
              >
                <AiOutlineCaretLeft className="inline mr-1" />
                <span className="hidden sm:inline-block">Back</span>
              </button>
            )}
          </div>

          <div className="flex-1">
            <StepProgress currentStep={currentStep} />
          </div>

          <div className="w-11 sm:w-20"></div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mx-auto">
          {currentStep === 0 && (
            <AddressStep
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              nextStep={nextStep}
            />
          )}
          {currentStep === 1 && (
            <PaymentStep
              setSelectedPayment={setSelectedPayment}
              nextStep={nextStep}
            />
          )}
          {currentStep === 2 && (
            <ReviewStep
              selectedPayment={selectedPayment}
              selectedAddress={selectedAddress}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
