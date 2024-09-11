import React, { useRef, useState } from "react";
import { uploadFile } from "../../../../../Utils/Cloudinary";
import defaultProfilePic from "../../../../../Assets/Images/defaultuser.png";
import { useAppContext } from "../../../../../Context/AppContext";
import axiosInstance from "../../../../../Config/axiosInstance";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

const ProfilePic: React.FC = () => {
  const { user, updateUserInfo } = useAppContext();
  const [selectedPic, setSelectedPic] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageInputClick = () => {
    imageInputRef.current?.click();
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

  const handleProfilePicUpload = async (file: File) => {
    setLoading(true);
    try {
      const data = await uploadFile(file, "image", "low_res_image_preset");
      await uploadProfilePicToServer(data.secure_url, user?.profilePic || "");
      setSelectedPic(null);
    } catch (error) {
      console.error("Profile picture upload failed", error);
      toast.error("Profile picture upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setSelectedPic(selectedFile);
      setImageError(false);
      handleProfilePicUpload(selectedFile);
      e.target.value = "";
    }
  };

  const handleRemovePic = async () => {
    if (window.confirm("Are you sure you want to remove your profile pic?")) {
      setLoading(true);
      try {
        await uploadProfilePicToServer("", user?.profilePic || "");
      } catch (error) {
        console.error("Failed to remove profile picture:", error);
        toast.error("Failed to remove profile picture.");
      } finally {
        setLoading(false);
      }
    }
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
        ) : imageError ? (
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

      <div className="mt-3">
        <div className="flex gap-2 w-40">
          <button
            className={`flex-1 text-sm text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out ${
              loading ? "bg-gray-400" : "bg-teal-500  hover:bg-teal-600"
            }`}
            onClick={handleImageInputClick}
            title="Update"
            disabled={loading}
          >
            {user?.profilePic ? "Update Pic" : "Upload Pic"}
          </button>

          {user?.profilePic && (
            <button
              className={`text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out ${
                loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-700"
              }`}
              onClick={handleRemovePic}
              title="Remove"
              disabled={loading}
            >
              <FaTrashAlt />
            </button>
          )}
        </div>
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
