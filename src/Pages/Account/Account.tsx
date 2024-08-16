import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Navbar from "../../Components/Navbar";
import AccountRedirectPage from "./Components/AccountRedirectPage";
import { useAppContext } from "../../Context/AppContext";

const Account: React.FC = () => {
  const { isAuthenticated } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-y-scroll">
      <Navbar />

      <div className="flex flex-grow p-4">
        <div className="w-64 fixed top-20 left-0 h-[calc(100vh-6rem)]">
          <Sidebar />
        </div>

        <div className="flex-1 ml-64 py-6 px-8 bg-white rounded-lg shadow-md overflow-auto h-[calc(100vh-6rem)]">
          {!isAuthenticated ? <AccountRedirectPage /> : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Account;
