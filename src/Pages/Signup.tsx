import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import signupAnimation from "../Assets/Lottie/signup.json";
import GoogleButton from "../Components/GoogleButton";
import Navbar from "../Components/Navbar";
import { serverurl } from "../Config/baseurl";
import toast from "react-hot-toast";
import { useAppContext } from "../Context/AppContext";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAppContext();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect") || "/";

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${serverurl}/auth/signup`, {
        email,
        password,
        firstName,
        lastName,
      });

      if (response.status === 200 || response.status === 201) {
        const { user, token } = response.data;
        login(user, token.accessToken, token.refreshToken);
        toast.success("Signed up successfully!");
        navigate(redirectPath, { replace: true });
      }
    } catch (err: any) {
      console.log(err);
      const errorMessage =
        err?.response?.data?.message || "Sign up failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Right side - Sign-Up Form */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <h1 className="text-3xl md:text-4xl font-bold mt-4 md:mt-0 mb-4 md:mb-6 text-center">
              Welcome to Vendio
            </h1>
            <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-center">
              Create Your Account
            </h2>
            <form onSubmit={handleSignUp}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm outline-none border-b border-b-gray-200 focus:border-b-black"
                  placeholder="yourname@example.com"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm outline-none border-b border-b-gray-200 focus:border-b-black"
                  placeholder="********"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row md:gap-6">
                <div className="mb-4 flex-1">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm outline-none border-b border-b-gray-200 focus:border-b-black"
                    placeholder="John"
                    required
                  />
                </div>

                <div className="mb-4 flex-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm outline-none border-b border-b-gray-200 focus:border-b-black"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-center mb-4">{error}</div>
              )}

              <div className="flex justify-between items-center mb-4">
                <button
                  type="submit"
                  className="px-4 md:px-6 py-2 bg-gray-800 text-white rounded-md"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>

              <div className="text-center mb-4">
                <p className="text-gray-600 font-bold">or</p>
              </div>

              <div className="text-center mb-4">
                <GoogleButton />
              </div>

              <div className="text-center">
                Already have an account?{" "}
                <Link
                  to={`/login?redirect=${redirectPath}`}
                  className="text-sm text-indigo-600"
                >
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
