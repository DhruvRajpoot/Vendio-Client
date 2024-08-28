import React, { useState, useEffect } from "react";
import { useAddress, Address } from "../../../../Context/AddressContext";
import AddressForm from "../../../Account/Components/AddressForm";
import AddressItem from "../../../Account/Components/AddressItem";
import { FaPlus } from "react-icons/fa";

interface AddressStepProps {
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address) => void;
  nextStep: () => void;
}

const AddressStep: React.FC<AddressStepProps> = ({
  setSelectedAddress,
  nextStep,
}) => {
  const { addresses, fetchAddresses, addressLoading, addressError } =
    useAddress();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedEditAddress, setSelectedEditAddress] =
    useState<Address | null>(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const selectAddress = (address: Address) => {
    setSelectedAddress(address);
    nextStep();
  };

  const handleEditAddress = (address: Address, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedEditAddress(address);
    setIsEditing(true);
  };

  const handleAddNewAddress = () => {
    setSelectedEditAddress(null);
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleSuccess = () => {
    fetchAddresses();
    setIsEditing(false);
  };

  return (
    <div className="mx-auto p-4 sm:p-6 bg-gray-50 rounded-lg shadow">
      <div className="relative mb-6 flex flex-col">
        <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 text-center mb-4 md:mb-0">
          Shipping Address
        </h2>

        <button
          onClick={handleAddNewAddress}
          className="flex items-center justify-center md:absolute md:top-0 md:right-0 text-teal-600 font-semibold px-4 py-2 bg-teal-100 rounded-md shadow hover:bg-teal-200 transition sm:w-auto w-full"
        >
          <FaPlus className="mr-2 text-lg" />
          <span>Add New</span>
          <span className="md:hidden lg:block">Address </span>
        </button>
      </div>

      <div className="space-y-6">
        {addressLoading ? (
          <p className="text-center">Loading...</p>
        ) : addressError ? (
          <p className="text-red-600">{addressError}</p>
        ) : addresses.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No addresses available. Please add a new address.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address, index) => (
              <div
                key={index}
                className="cursor-pointer rounded-lg transition hover:bg-teal-50"
                onClick={() => selectAddress(address)}
              >
                <AddressItem
                  address={address}
                  onEdit={(event) => handleEditAddress(address, event)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {isEditing && (
        <AddressForm
          address={selectedEditAddress}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default AddressStep;
