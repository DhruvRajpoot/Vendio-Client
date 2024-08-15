import React from "react";

interface StepProgressProps {
  currentStep: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
  const steps = ["Address", "Payment Method", "Review"];

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex justify-between items-center w-full max-w-lg relative">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="relative z-10 flex flex-col items-center">
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
                className={`hidden sm:block absolute -bottom-5 whitespace-nowrap mt-2 text-sm ${
                  index <= currentStep ? "text-teal-600" : "text-gray-600"
                }`}
              >
                {step}
              </p>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 h-1 bg-gray-300 relative z-0">
                <div
                  className={`h-1 bg-teal-600 transition-all duration-300`}
                  style={{
                    width: `${
                      index < currentStep ? 100 : currentStep > index ? 100 : 0
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepProgress;
