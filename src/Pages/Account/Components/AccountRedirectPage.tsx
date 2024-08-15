import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../Assets/Lottie/account.json";
import { Link, useLocation } from "react-router-dom";
import { FaUserLock, FaHistory, FaAddressBook, FaHeart } from "react-icons/fa";

const AccountRedirectPage: React.FC = () => {
  const location = useLocation();

  const messages = [
    {
      path: "profile",
      message: "You need to be logged in to view your profile details.",
      icon: <FaUserLock className="text-red-600 text-5xl" />,
    },
    {
      path: "orders",
      message: "You need to be logged in to see your order history.",
      icon: <FaHistory className="text-yellow-700 text-5xl" />,
    },
    {
      path: "address",
      message: "You need to be logged in to manage your addresses.",
      icon: <FaAddressBook className="text-blue-600 text-5xl" />,
    },
    {
      path: "wishlist",
      message: "You need to be logged in to view your wishlist.",
      icon: <FaHeart className="text-pink-600 text-5xl" />,
    },
  ];

  const currentMessage = messages.find(({ path: p }) =>
    location.pathname.includes(p)
  ) || {
    message:
      "You are not logged in. Please log in to access your account details.",
    icon: <FaUserLock className="text-gray-600 text-5xl" />,
  };

  return (
    <div className="flex items-center justify-center w-full flex-1 bg-gray-50">
      <div className="relative max-w-md w-full mx-auto text-center bg-white p-7 rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gray-100 opacity-50 z-0"></div>
        <div className="relative z-10">
          <div className="flex justify-center">{currentMessage.icon}</div>
          <div className="mb-6 flex justify-center">
            <Lottie
              animationData={animationData}
              loop={true}
              className="mx-auto h-52 w-52"
            />
          </div>
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">{currentMessage.message}</p>
          <Link
            to={`/login?redirect=${location.pathname}`}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition-colors flex items-center justify-center"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountRedirectPage;
