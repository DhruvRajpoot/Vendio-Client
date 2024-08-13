import Lottie from "lottie-react";
import React from "react";
import loginAnimation from "../assets/Lottie/cart.json";
import { Link } from "react-router-dom";
import GoogleButton from "../Components/GoogleButton";

const Login: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side - Illustration */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-500 px-4 pb-8 md:p-4">
        <div className="text-center">
          <div className="flex justify-center items-center md:mb-8 h-48 w-48 md:h-72 md:w-[450px] mx-auto">
            <Lottie animationData={loginAnimation} />
          </div>
          <h2 className="text-xl text-white md:text-2xl font-semibold mb-4">
            Access Your Account
          </h2>
          <p className="text-white text-sm md:text-base font-medium px-10">
            Log in to access your personalized dashboard where you can manage
            your orders, and enjoy a seamless, shopping experience designed just
            for you.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h1 className="text-3xl md:text-4xl font-bold mt-4 md:mt-0 mb-4 md:mb-6 text-center">
            Welcome Back
          </h1>
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-center">
            Log In to Your Account
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm outline-none border-b border-b-gray-200 focus:border-b-black"
                placeholder="yourname@example.com"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm outline-none border-b border-b-gray-200 focus:border-b-black"
                placeholder="********"
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <button
                type="submit"
                className="px-4 md:px-6 py-2 bg-gray-800 text-white rounded-md"
              >
                Log In
              </button>
              <Link to="/forgot-password" className="text-sm text-indigo-600">
                Forgot password?
              </Link>
            </div>

            <div className="text-center mb-4">
              <p className="text-gray-600 font-bold">or</p>
            </div>

            <div className="text-center mb-4">
              <GoogleButton type="login" />
            </div>

            <div className="text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-sm text-indigo-600">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
