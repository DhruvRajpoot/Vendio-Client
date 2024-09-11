import React, { useEffect, useState } from "react";
import { useAddress } from "../../../../Context/AddressContext";
import AddressForm from "./Components/AddressForm";
import AddressItem from "./Components/AddressItem";
import { FaPlus } from "react-icons/fa";

const Address: React.FC = () => {
  const { addresses, fetchAddresses, addressLoading, addressError } =
    useAddress();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleEdit = (address: any) => {
    setSelectedAddress(address);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setSelectedAddress(null);
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const renderState = () => {
    if (addressError) {
      return (
        <div className="text-red-600 text-center mt-4">
          <p className="text-lg">{addressError}</p>
        </div>
      );
    }

    if (addressLoading) {
      return (
        <div className="flex justify-center items-center mt-4">
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      );
    }

    if (addresses.length === 0) {
      return (
        <div className="text-center mt-6">
          <p className="text-lg text-gray-700">
            You have no addresses.{" "}
            <button
              onClick={handleAddNew}
              className="text-teal-600 font-semibold underline"
            >
              Add a new address
            </button>
            .
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-6 mt-6">
        {addresses.map((address) => (
          <AddressItem
            key={address._id}
            address={address}
            onEdit={() => handleEdit(address)}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-6 space-y-4 xs:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          My Address
        </h1>
        
        <button
          onClick={handleAddNew}
          className="flex items-center text-teal-600 font-semibold px-4 py-2 bg-teal-100 rounded-md shadow hover:bg-teal-200 transition"
        >
          <FaPlus className="mr-2 text-lg" />
          Add New Address
        </button>
      </div>

      {renderState()}

      {isEditing && (
        <AddressForm
          address={selectedAddress}
          onClose={handleClose}
          onSuccess={() => {
            handleClose();
            fetchAddresses();
          }}
        />
      )}
    </div>
  );
};

export default Address;
