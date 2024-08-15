import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Navbar from "../../Components/Navbar";
import AccountRedirectPage from "./Components/AccountRedirectPage";
import { useAppContext } from "../../Context/AppContext";
import Footer from "../../Components/Footer";

const Account: React.FC = () => {
  const { isAuthenticated } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-grow p-4 min-h-[80vh]">
        <Sidebar />

        {!isAuthenticated ? (
          <AccountRedirectPage />
        ) : (
          <main className="flex-1 ml-6 py-6 px-8 bg-white rounded-lg shadow-md">
            <Outlet />
          </main>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Account;
