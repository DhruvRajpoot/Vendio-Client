import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Navbar from "../../Components/Navbar";
import AccountRedirectPage from "./Components/AccountRedirectPage";
import Breadcrumb from "../../Components/Breadcrumb";
import { useAppContext } from "../../Context/AppContext";

const Account: React.FC = () => {
  const { isAuthenticated } = useAppContext();
  const location = useLocation();

  const breadcrumbMap = {
    "/account": "Account",
    "/account/profile": "Profile",
    "/account/orders": "Orders",
    "/account/address": "Address",
    "/account/wishlist": "Wishlist",
  };

  const breadcrumbItems = Object.entries(breadcrumbMap)
    .filter(([path]) => location.pathname.startsWith(path))
    .map(([path, label]) => ({
      label,
      link: path,
    }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-y-scroll">
      <Navbar />

      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-grow p-4">
        <div className="hidden md:block w-64 fixed top-32 left-0 h-[calc(100vh-9rem)]">
          <Sidebar />
        </div>

        <div className="flex-1 md:ml-64 py-4 md:py-6 px-4 md:px-8 bg-white rounded-lg shadow-md overflow-auto h-[calc(100vh-9rem)]">
          {!isAuthenticated ? <AccountRedirectPage /> : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Account;
