import React, { useRef, useState } from "react";
import { uploadFile } from "../../../../../Utils/Cloudinary";
import defaultProfilePic from "../../../../../Assets/Images/defaultuser.png";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useAppContext } from "../../../../../Context/AppContext";
import axiosInstance from "../../../../../Config/axiosInstance";
import toast from "react-hot-toast";

const ProfilePic: React.FC = () => {
  const { user, updateUserInfo } = useAppContext();
  const [selectedPic, setSelectedPic] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageInputClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedPic(e.target.files[0]);
      setImageError(false);
      e.target.value = "";
    }
  };

  const uploadProfilePicToServer = async (pic: string, oldPic: string) => {
    try {
      const response = await axiosInstance.put(`/user/updateprofilepic`, {
        pic: pic,
        oldPic: oldPic,
      });

      if (response.status === 200) {
        updateUserInfo(response.data.user);
        toast.success("Profile picture updated successfully.");
      }
    } catch (err) {
      console.error("Error updating profile picture:", err);
      toast.error("Failed to update profile picture.");
    }
  };

  const handleProfilePicUpload = async () => {
    if (!selectedPic) return;
    setLoading(true);
    try {
      const data = await uploadFile(
        selectedPic,
        "image",
        "high_res_image_preset"
      );
      await uploadProfilePicToServer(data.secure_url, user?.profilePic || "");
      setSelectedPic(null);
    } catch (error) {
      console.error("Profile picture upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelUpload = () => {
    setSelectedPic(null);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="w-28 h-28 rounded-full overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center"
        title="Profile Pic"
      >
        {loading ? (
          <p className="text-gray-600 text-sm">Uploading...</p>
        ) : selectedPic ? (
          <img
            src={URL.createObjectURL(selectedPic)}
            alt="Selected Profile Pic"
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
          />
        ) : imageError || !user?.profilePic ? (
          <span className="text-sm text-gray-600">Profile Pic</span>
        ) : (
          <img
            src={user?.profilePic || defaultProfilePic}
            alt="Profile Picture"
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
            onError={handleImageError}
          />
        )}
      </div>

      {/* TODO : Fix user details routes and unhide*/}
      <div className="hidden">
        {!selectedPic ? (
          <button
            className="mt-3 bg-teal-500 text-sm w-40 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-teal-600"
            onClick={handleImageInputClick}
          >
            Change Profile Pic
          </button>
        ) : (
          <div className="flex justify-center gap-6 mt-3 w-40">
            <button
              className={`flex items-center justify-center bg-teal-500 text-white px-4 py-1.5 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-teal-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleProfilePicUpload}
              disabled={loading}
              title="Upload"
            >
              <RiUploadCloud2Fill className="w-6 h-6" />
            </button>

            <button
              className="flex items-center justify-center bg-red-500 text-white px-4 py-1.5 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-red-600"
              onClick={handleCancelUpload}
              title="Cancel"
            >
              <RxCross2 className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={imageInputRef}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfilePic;
