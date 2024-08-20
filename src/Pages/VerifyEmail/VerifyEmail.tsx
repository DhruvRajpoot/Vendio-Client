import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import loaderAnimation from "../../Assets/Lottie/loading.json";
import verifyEmailAnimation from "../../Assets/Lottie/cart.json";
import axios from "axios";
import { useAppContext } from "../../Context/AppContext";
import { serverurl } from "../../Config/baseurl";

const VerifyEmail: React.FC = () => {
  const { login } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(`${serverurl}/auth/verify-email`, {
          token,
        });

        if (response.status === 200) {
          toast.success("Email verified successfully!");
          setVerified(true);
          const { user, token } = response.data;
          login(user, token.accessToken, token.refreshToken);
          navigate("/");
        }
      } catch (error: any) {
        setError(true);
        toast.error(error.response.data.message || "Failed to verify email.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setError(true);
      setLoading(false);
      toast.error("Invalid verification token.");
    }
  }, [token]);

  const handleResendEmail = async () => {
    // TODO - Implement resend email verification logic
    toast.success("Verification email has been resent!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-400 to-teal-600 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
          <div className="flex items-center justify-center max-w-48 mx-auto -translate-x-2">
            <Lottie
              animationData={loaderAnimation}
              loop={true}
              className="mx-auto mb-6"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Verifying your email...
          </h1>
          <p className="text-lg text-gray-700">
            Please wait while we verify your email address.
          </p>
        </div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-400 to-teal-600 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
          <div className="flex items-center justify-center max-w-48 mx-auto -translate-x-2">
            <Lottie
              animationData={verifyEmailAnimation}
              loop={true}
              className="mx-auto mb-6"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Email Verified Successfully!
          </h1>
          <p className="text-gray-700 mb-8">
            Your email has been successfully verified. You can now explore all
            the features and benefits our platform offers.
          </p>
          <button
            className="inline-block bg-teal-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-teal-600 transition-colors"
            onClick={() => navigate("/login")}
          >
            Continue to Login
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 to-red-600 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Verification Failed
          </h1>
          <p className="text-gray-700 mb-8">
            We encountered an issue verifying your email. Please try again or
            contact support.
          </p>
          <button
            className="inline-block bg-teal-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-teal-600 transition-colors mb-4"
            onClick={handleResendEmail}
          >
            Resend Verification Email
          </button>
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              If you have any issues or questions, please reach out to our{" "}
              <a
                href="mailto:dhruvrajpootiiitbhopal@gmail.com"
                className="text-blue-500 hover:underline"
              >
                support team
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default VerifyEmail;
