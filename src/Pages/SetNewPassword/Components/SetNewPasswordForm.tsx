import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { serverurl } from "../../../Config/baseurl";

const SetNewPasswordForm: React.FC = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const token = new URLSearchParams(location.search).get("token");

  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${serverurl}/auth/setnewpassword`, {
        token,
        password,
      });

      toast.success("Password updated successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent rounded-lg p-4 xs:p-6 lg:p-8 border shadow-lg w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
        Set New Password
      </h1>
      <h2 className="font-semibold mb-6 text-center text-gray-700">
        Create a strong, unique password
      </h2>
      <form onSubmit={handleSetNewPassword} className="space-y-6">
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm outline-none border-b border-b-gray-200 focus:border-b-black"
            placeholder="Enter your new password"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm outline-none border-b border-b-gray-200 focus:border-b-black"
            placeholder="Confirm your new password"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full px-6 py-3 bg-gray-800 text-white rounded-md font-semibold text-center mb-4 hover:shadow-lg transition-all ${
            loading ? "opacity-50 cursor-not-allowed" : "active:scale-[0.99]"
          }`}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Set New Password"}
        </button>
      </form>
    </div>
  );
};

export default SetNewPasswordForm;
