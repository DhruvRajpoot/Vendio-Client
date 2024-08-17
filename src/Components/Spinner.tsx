import React from "react";
import Lottie from "lottie-react";
import spinnerAnimation from "../Assets/Lottie/spinner.json";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center max-w-10 max-h-10 w-full h-full">
      <Lottie animationData={spinnerAnimation} loop={true} />
    </div>
  );
};

export default Spinner;
