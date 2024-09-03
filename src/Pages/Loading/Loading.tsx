import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#e0f2f1] to-[#e3f2fd]">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-t-4 border-b-4 border-black rounded-full animate-spin"></div>
        <p className="mt-6 text-xl font-semibold text-black animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
