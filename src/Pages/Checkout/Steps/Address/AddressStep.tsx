import React, { useState, useEffect } from "react";
import { useAddress, Address } from "../../../../Context/AddressContext";
import AddressList from "./Components/AddressList";
import AddressForm from "./Components/AddressForm";
import toast from "react-hot-toast";

interface AddressStepProps {
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address) => void;
  nextStep: () => void;
}

const AddressStep: React.FC<AddressStepProps> = ({
  selectedAddress,
  setSelectedAddress,
  nextStep,
}) => {
  const {
    addresses,
    fetchAddresses,
    addressError,
    createAddress,
    updateAddress,
  } = useAddress();

  const [newAddress, setNewAddress] = useState<Address>({
    _id: "",
    name: "",
    phone: "",
    addressLine: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const selectAddress = (address: Address) => {
    setSelectedAddress(address);
    nextStep();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingAddress) {
        if (!editingAddress._id) {
          toast.error("Address ID is missing.");
          return;
        }
        await updateAddress(editingAddress._id, newAddress);
        toast.success("Address updated successfully!");
      } else {
        await createAddress(newAddress);
        toast.success("Address added successfully!");
      }
      setSelectedAddress(newAddress);
      setNewAddress({
        _id: "",
        name: "",
        phone: "",
        addressLine: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
      });
      setEditingAddress(null);
      nextStep();
    } catch (error) {
      toast.error("Failed to save address. Please try again.");
    }
  };

  const handleEditClick = (address: Address) => {
    setEditingAddress(address);
    setNewAddress(address);
  };

  return (
    <div className="rounded-lg">
      <div className="mx-auto p-4 sm:p-6 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 mb-6 text-center">
          Shipping Address
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AddressList
            addresses={addresses}
            selectAddress={selectAddress}
            handleEditClick={handleEditClick}
            selectedAddress={selectedAddress}
            addressError={addressError}
          />
          <AddressForm
            newAddress={newAddress}
            handleInputChange={handleInputChange}
            handleSubmit={handleAddAddress}
            editingAddress={editingAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
