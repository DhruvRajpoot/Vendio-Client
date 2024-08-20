import React from "react";
import { useEffect, useState } from "react";

const EmailVerification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleResendEmail = () => {
    // TODO - Resend email verification
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-full xs:p-6 lg:p-8 my-4 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`max-w-lg w-full bg-white rounded-lg p-6 lg:p-8 border border-gray-300 shadow-lg transform transition-transform duration-500 ${
          isVisible ? "translate-y-0" : "translate-y-5"
        }`}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 text-center">
          Verify Your Email
        </h1>

        <p className="lg:text-lg font-medium text-gray-800 mb-4 text-center">
          We’ve sent a verification link to your email address.
        </p>

        <p className="text-gray-600 mb-6 text-center">
          Please check your inbox and click the link to confirm your email and
          complete the signup process.
        </p>

        <button
          className="block w-full max-w-xs mx-auto px-6 py-3 bg-gray-800 text-white rounded-md font-semibold text-center mb-4 hover:shadow-lg transition-all active:scale-[0.99]"
          onClick={handleResendEmail}
        >
          <span className="xs:hidden">Resend Email</span>
          <span className="hidden xs:inline-block">
            Resend Verification Email
          </span>
        </button>

        <div className="text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            If you don’t see the email, check your spam folder or{" "}
            <a
              href="mailto:dhruvrajpootiiitbhopal@gmail.com"
              className="text-indigo-600 hover:underline"
            >
              contact support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
