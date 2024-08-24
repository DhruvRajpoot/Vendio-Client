import React, { useState } from "react";
import axios from "axios";
import { contactEmail, serverurl } from "../../../Config/baseurl";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

interface ResetPasswordFormProps {
  onSubmitted: () => void;
  isSubmitted: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmitted,
  isSubmitted,
}) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${serverurl}/auth/forgot-password`, {
        email,
      });

      toast.success(response.data.message);
      onSubmitted();
    } catch (error: any) {
      toast.error(error.response.data.message || "Error sending reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-transparent rounded-lg p-4 xs:p-6 lg:p-8 border shadow-lg relative min-h-[350px] w-full"
      style={{
        transition: "transform 0.5s",
        transform: `${isSubmitted ? "rotateY(180deg)" : "rotate(0deg)"}`,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {!isSubmitted ? (
        <div
          className="relative w-full h-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
            Reset Your Password
          </h1>
          <h2 className="font-semibold mb-6 text-center text-gray-700">
            Enter Your Email to Receive a Reset Link
          </h2>
          <form onSubmit={handleForgotPassword}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
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
              className={`w-full px-6 py-3 bg-gray-800 text-white rounded-md font-semibold text-center mb-4 hover:shadow-lg transition-all ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "active:scale-[0.99]"
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-indigo-600 hover:underline"
              >
                Remembered your password? Log In
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center overflow-hidden p-4 xs:p-6 lg:p-8 "
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <FaCheckCircle className="text-green-500 text-4xl mb-4" />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Check Your Email
          </h1>
          <p className="lg:text-lg font-medium text-gray-800 mb-4 text-center">
            We’ve sent a password reset link to your email address.
          </p>
          <p className="font-medium text-gray-800 mb-4 text-center">
            Please check your inbox and follow the instructions to reset your
            password.
          </p>
          <p className="text-gray-600 text-center">
            If you don’t see the email, check your spam folder or{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-indigo-600 hover:underline"
            >
              contact support
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;
