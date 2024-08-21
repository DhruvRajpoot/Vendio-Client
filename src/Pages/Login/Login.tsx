import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../../Assets/Lottie/cart.json";
import Navbar from "../../Components/Navbar";
import EmailVerification from "../Signup/Components/EmailVerification";
import LoginForm from "./Components/LoginForm";

const Login: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect") || "/";

  return (
    <div className="min-h-[100dvh]">
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        {/* Left side - Illustration */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-500 px-4 pb-8 md:p-4">
          <div className="text-center">
            <div className="flex justify-center items-center h-48 w-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-[350px] lg:h-auto 2xl:w-[450px] mx-auto">
              <Lottie animationData={loginAnimation} />
            </div>
            <h2 className="text-xl text-white md:text-2xl font-semibold mb-4">
              Access Your Account
            </h2>
            <p className="text-white text-sm md:text-base font-medium lg:px-10">
              Log in to access your personalized dashboard where you can manage
              your orders and enjoy a seamless shopping experience.
            </p>
          </div>
        </div>

        {/* Right side - Form or Email Verification */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            {step === 1 ? (
              <LoginForm setStep={setStep} redirectPath={redirectPath} />
            ) : (
              <EmailVerification />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
