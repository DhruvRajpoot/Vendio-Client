import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar";
import AccountRedirectPage from "./Components/AccountRedirectPage";
import { useAppContext } from "../../Context/AppContext";

const Account: React.FC = () => {
  const { isAuthenticated } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-grow p-4">
        <Sidebar />

        {!isAuthenticated ? (
          <AccountRedirectPage />
        ) : (
          <main className="flex-1 ml-6 p-6 bg-white rounded-lg shadow-md">
            <Outlet />
          </main>
        )}
      </div>
    </div>
  );
};

export default Account;
