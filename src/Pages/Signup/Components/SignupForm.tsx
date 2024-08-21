import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import GoogleButton from "../../../Components/GoogleButton";
import { serverurl } from "../../../Config/baseurl";
import { Link } from "react-router-dom";

interface SignUpFormProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  redirectPath: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  setStep,
  setEmail,
  redirectPath,
}) => {
  const [email, setEmailLocal] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmailLocal(newEmail);
    setEmail(newEmail);
  };

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
        toast.success("Signed up successfully! Please verify your email.");
        setStep(2);
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
    <>
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

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <div className="flex justify-between items-center mb-4">
          <button
            type="submit"
            className="px-4 md:px-6 py-2 bg-gray-800 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
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
          Already have an account?{" "}
          <Link
            to={`/login?redirect=${redirectPath}`}
            className="text-sm text-indigo-600"
          >
            Log In
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
