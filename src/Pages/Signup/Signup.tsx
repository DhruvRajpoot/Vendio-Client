import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import signupAnimation from "../../Assets/Lottie/signup.json";
import Navbar from "../../Components/Navbar";
import EmailVerification from "./Components/EmailVerification";
import SignUpForm from "./Components/SignupForm";

const SignUp: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect") || "/";

  return (
    <div className="min-h-[100dvh]">
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        {/* Left side - Illustration */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-green-300 to-green-400 px-4 pb-8 md:p-4">
          <div className="text-center">
            <div className="flex justify-center items-center h-48 w-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-[350px] lg:h-auto 2xl:w-[450px] mx-auto">
              <Lottie animationData={signupAnimation} />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Shop the Best Deals
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium px-10">
              Explore our wide range of products at unbeatable prices. Shop now
              and experience the convenience of our eCommerce platform.
            </p>
          </div>
        </div>

        {/* Right side - Form or Email Verification */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            {step === 1 ? (
              <SignUpForm
                setStep={setStep}
                setEmail={setEmail}
                redirectPath={redirectPath}
              />
            ) : (
              <EmailVerification email={email} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
