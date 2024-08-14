import React, { useEffect, useState } from "react";
import StepProgress from "./Components/StepProgress";
import AddressStep from "./Components/Steps/AddressStep";
import PaymentStep from "./Components/Steps/PaymentStep";
import ReviewStep from "./Components/Steps/ReviewStep";
import Navbar from "../../Components/Navbar";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const validateStep = (isValid: boolean) => {
    setIsStepValid(isValid);
  };

  const nextStep = () => {
    if (isStepValid && currentStep < 2) {
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
      <div className="mx-auto px-4 py-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between">
          <div className="w-20">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="flex items-center mr-auto bg-gray-300 text-gray-800 p-3 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-200"
              >
                <AiOutlineCaretLeft className="inline mr-1" />
                Back
              </button>
            )}
          </div>

          <div className="flex-1">
            <StepProgress currentStep={currentStep} />
          </div>

          <div className="w-20">
            {currentStep < 2 && (
              <button
                onClick={nextStep}
                className={`flex items-center ml-auto p-3 rounded-md shadow-md transition-colors duration-200 ${
                  isStepValid
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!isStepValid}
              >
                Next <AiOutlineCaretRight className="inline ml-1" />
              </button>
            )}
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mx-auto sm:w-[90%]">
          {currentStep === 0 && <AddressStep validateStep={validateStep} />}
          {currentStep === 1 && (
            <PaymentStep
              validateStep={validateStep}
              setSelectedPayment={setSelectedPayment}
            />
          )}
          {currentStep === 2 && (
            <ReviewStep selectedPayment={selectedPayment} />
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
