import React, { useEffect, useState } from "react";
import StepProgress from "./Components/StepProgress";
import AddressStep from "./Components/Steps/AddressStep";
import PaymentStep from "./Components/Steps/PaymentStep";
import ReviewStep from "./Components/Steps/ReviewStep";
import Navbar from "../../Components/Navbar";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

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
      <div className="container mx-auto px-4 py-6 bg-gray-50 min-h-screen">
        <StepProgress currentStep={currentStep} />

        <div className="flex justify-between my-8">
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              className="flex items-center mr-auto bg-gray-300 text-gray-800 p-3 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-200"
            >
              <AiOutlineCaretLeft className="inline mr-1" />
              Back
            </button>
          )}
          {currentStep < 2 ? (
            <button
              onClick={nextStep}
              className="flex items-center ml-auto bg-teal-600 text-white p-3 rounded-md shadow-md hover:bg-teal-700 transition-colors duration-200"
            >
              Next <AiOutlineCaretRight className="inline ml-1" />
            </button>
          ) : (
            <button className="bg-green-600 text-white p-3 rounded-md shadow-md hover:bg-green-700 transition-colors duration-200">
              Place Order
            </button>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mx-auto w-[90%]">
          {currentStep === 0 && <AddressStep />}
          {currentStep === 1 && <PaymentStep />}
          {currentStep === 2 && <ReviewStep />}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
