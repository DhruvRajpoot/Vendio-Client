import React from "react";
import Navbar from "../../Components/Navbar";
import Lottie from "lottie-react";
import resetPasswordAnimation from "../../Assets/Lottie/account.json";
import SetNewPasswordForm from "./Components/SetNewPasswordForm";

const SetNewPassword: React.FC = () => {
  return (
    <div className="min-h-[100dvh]">
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
        {/* Left side - Illustration */}
        <div className="lg:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-[#a2c2e2] to-[#d1e3f8] px-4 pb-8 md:p-4">
          <div className="text-center">
            <div className="flex justify-center items-center h-48 w-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-[350px] lg:h-[350px] 2xl:w-[450px] 2xl:h-[450px] mx-auto">
              <Lottie animationData={resetPasswordAnimation} />
            </div>
            <h2 className="text-xl text-black md:text-2xl font-semibold mb-4">
              Set Your New Password
            </h2>
            <p className="text-black text-sm md:text-base font-medium lg:px-10">
              Create a new strong password for your account. Make sure it's
              unique and secure to protect your account.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="lg:w-1/2 w-full flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <SetNewPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
