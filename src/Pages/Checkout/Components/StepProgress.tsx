import React from "react";

interface StepProgressProps {
  currentStep: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
  const steps = ["Address", "Payment Method", "Review"];

  const calculateWidth = () => {
    return (currentStep / (steps.length - 1)) * 100;
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex justify-between w-full max-w-lg">
        {steps.map((step, index) => (
          <div key={index} className="text-center flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                index <= currentStep
                  ? "bg-teal-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <p
              className={`mt-2 text-sm ${
                index <= currentStep ? "text-teal-600" : "text-gray-600"
              }`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>
      <div className="relative w-full max-w-lg mt-4">
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300"></div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-teal-600 transition-all duration-300"
          style={{ width: `${calculateWidth()}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StepProgress;
