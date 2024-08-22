import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import loaderAnimation from "../../Assets/Lottie/loading.json";
import verifyEmailAnimation from "../../Assets/Lottie/cart.json";
import axios from "axios";
import { useAppContext } from "../../Context/AppContext";
import { contactEmail, serverurl } from "../../Config/baseurl";
import Navbar from "../../Components/Navbar";

const VerifyEmail: React.FC = () => {
  const { login } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingResend, setLoadingResend] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
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
    setLoadingResend(true);
    try {
      const response = await axios.post(
        `${serverurl}/auth/resend-verification-email`,
        { email }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Error resending email");
    } finally {
      setLoadingResend(false);
    }
  };

  const getBackgroundClass = () => {
    if (loading) return "bg-gradient-to-br from-teal-400 to-teal-600";
    if (verified) return "bg-gradient-to-br from-teal-400 to-teal-600";
    if (error) return "bg-gradient-to-br from-red-400 to-red-600";
    return "";
  };

  return (
    <div className={`flex flex-col min-h-screen ${getBackgroundClass()}`}>
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center w-full p-3 sm:p-6">
        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
            <Lottie
              animationData={loaderAnimation}
              loop={true}
              className="mx-auto mb-6 h-20 sm:h-40"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Verifying your email...
            </h1>
            <p className="sm:text-lg text-gray-700">
              Please wait while we verify your email address.
            </p>
          </div>
        )}

        {/* Verified */}
        {verified && (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
            <Lottie
              animationData={verifyEmailAnimation}
              loop={true}
              className="mx-auto mb-6"
            />
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
        )}

        {/* Error */}
        {error && (
          <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8 max-w-lg w-full text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Verification Failed
            </h1>
            <p className="text-sm sm:text-base text-gray-700 mb-8">
              We encountered an issue verifying your email. Please try again or
              contact support.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleResendEmail();
              }}
              className="mb-4"
            >
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm outline-none border-b border-b-gray-200 focus:border-b-black"
                  placeholder="yourname@example.com"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-block bg-teal-500 text-white px-6 py-3 rounded-md sm:text-lg font-semibold hover:bg-teal-600 transition-colors mb-4 max-w-[300px] w-full disabled:bg-gray-400"
                disabled={loadingResend}
              >
                {loadingResend
                  ? "Resending Email..."
                  : "Resend Verification Email"}
              </button>
            </form>
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                If you have any issues or questions, please reach out to our{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-blue-500 hover:underline"
                >
                  support team
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
