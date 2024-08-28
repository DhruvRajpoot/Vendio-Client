import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Address, useAddress } from "../../../Context/AddressContext";

interface AddressItemProps {
  address: Address;
  onEdit: (event?: any) => void;
}

const AddressItem: React.FC<AddressItemProps> = ({ address, onEdit }) => {
  const { deleteAddress } = useAddress();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteAddress(address._id);
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-transparent shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{address.name}</h3>
        <div className="flex space-x-2 xs:space-x-4 items-center">
          <button
            onClick={onEdit}
            className="flex items-center text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300 rounded-md py-1 px-3 shadow transition-all duration-300"
            aria-label="Edit address"
          >
            <FaEdit size={18} />
            <span className="hidden sm:inline-block ml-2 text-sm">Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-md py-1 px-3 shadow transition-all duration-300"
            aria-label="Delete address"
          >
            <FaTrash size={18} />
            <span className="hidden sm:inline-block ml-2 text-sm">Delete</span>
          </button>
        </div>
      </div>
      <p className="text-gray-700">{address.phone}</p>
      <p className="text-gray-700">{address.addressLine}</p>
      <p className="text-gray-700">
        {address.area}, {address.city}
      </p>
      <p className="text-gray-700">
        {address.state} - {address.pincode}
      </p>
    </div>
  );
};

export default AddressItem;
