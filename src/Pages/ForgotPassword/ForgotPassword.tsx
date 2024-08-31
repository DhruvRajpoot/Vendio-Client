import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Lottie from "lottie-react";
import forgotPasswordAnimation from "../../Assets/Lottie/account.json";
import ResetPasswordForm from "./Components/ResetPasswordForm";

const ForgotPassword: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return (
    <div className="min-h-[100dvh]">
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
        {/* Left side - Illustration */}
        <div className="lg:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-500 px-4 pb-8 md:p-4">
          <div className="text-center">
            <div className="flex justify-center items-center h-48 w-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-[350px] lg:h-[350px] 2xl:w-[450px] 2xl:h-[450px] mx-auto">
              <Lottie animationData={forgotPasswordAnimation} />
            </div>
            <h2 className="text-xl text-white md:text-2xl font-semibold mb-4">
              Reset Your Password
            </h2>
            <p className="text-white text-sm md:text-base font-medium lg:px-10">
              Enter your email, and we’ll send you a link to reset your
              password. It’s quick and secure.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="lg:w-1/2 w-full flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <ResetPasswordForm
              onSubmitted={() => setIsSubmitted(true)}
              isSubmitted={isSubmitted}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
