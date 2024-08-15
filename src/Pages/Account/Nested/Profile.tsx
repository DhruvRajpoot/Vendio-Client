import React from "react";
import { useAppContext } from "../../../Context/AppContext";
import defaultProfilePic from "../../../Assets/Images/defaultuser.png";

const Profile: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="flex flex-col relative">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>

        <div
          className={`px-5 py-1 font-medium rounded-full ${
            user?.isVerified
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user?.isVerified ? "Verified" : "Not Verified"}
        </div>
      </div>

      <p className="text-lg text-gray-700 mb-6">
        View and manage your personal details.
      </p>

      <div className="relative flex flex-col lg:flex-row lg:items-start lg:space-x-10 mb-8 space-y-6 lg:space-y-0">
        <div className="w-28 h-28 mx-auto lg:mx-0 flex-shrink-0">
          <img
            src={user?.profilePic || defaultProfilePic}
            alt="Profile Picture"
            className="w-full h-full object-cover rounded-full border-4 border-teal-500"
          />
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-800 font-semibold text-sm mb-1">
                First Name
              </label>
              <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                <p className="text-gray-900 text-lg">{user?.firstName}</p>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-gray-800 font-semibold text-sm mb-1">
                Last Name
              </label>
              <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                <p className="text-gray-900 text-lg">
                  {user?.lastName || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-gray-800 font-semibold text-sm mb-1">
              Email
            </label>
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
              <p className="text-gray-900 text-lg">{user?.email}</p>
            </div>
          </div>
          <div>
            <label className="block text-gray-800 font-semibold text-sm mb-1">
              Mobile
            </label>
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
              <p className="text-gray-900 text-lg">N/A</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
