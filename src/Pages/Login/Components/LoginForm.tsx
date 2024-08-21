import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import GoogleButton from "../../../Components/GoogleButton";
import { serverurl } from "../../../Config/baseurl";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";

interface LoginFormProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  redirectPath: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  setStep,
  setEmail,
  redirectPath,
}) => {
  const [email, setEmailLocal] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmailLocal(newEmail);
    setEmail(newEmail);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${serverurl}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        const { user, token } = response.data;
        login(user, token.accessToken, token.refreshToken);
        toast.success("Logged in successfully!");
        navigate(redirectPath, { replace: true });
      }
    } catch (err: any) {
      if (err.response.status === 403) {
        setStep(2);
      }

      const errorMessage =
        err?.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mt-4 md:mt-0 mb-4 md:mb-6 text-center">
        Welcome Back
      </h1>
      <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-center">
        Log In to Your Account
      </h2>
      <form onSubmit={handleLogin}>
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
            onChange={handleEmailChange}
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

        <div className="flex justify-between items-center mb-4">
          <button
            type="submit"
            className="px-4 md:px-6 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <Link to="/login" className="text-sm text-indigo-600">
            Forgot password?
          </Link>
        </div>

        <div className="flex items-center justify-center mb-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-600 font-bold">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="text-center mb-4">
          <GoogleButton />
        </div>

        <div className="text-center">
          Don't have an account?{" "}
          <Link
            to={`/signup?redirect=${redirectPath}`}
            className="text-sm text-indigo-600"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
