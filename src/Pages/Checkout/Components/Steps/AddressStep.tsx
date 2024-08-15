import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ShippingAddress } from "../../../../Context/OrderContext";

interface AddressStepProps {
  validateStep: (
    isValid: boolean,
    selectedAddress: ShippingAddress | null
  ) => void;

  selectedAddress: ShippingAddress | null;
  setSelectedAddress: (address: ShippingAddress) => void;
}

const AddressStep: React.FC<AddressStepProps> = ({
  validateStep,
  selectedAddress,
  setSelectedAddress,
}) => {
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);

  const [newAddress, setNewAddress] = useState<ShippingAddress>({
    name: "",
    phone: "",
    addressLine: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    validateStep(selectedAddress !== null, selectedAddress);
  }, [selectedAddress, validateStep]);

  const selectAddress = (address: ShippingAddress) => {
    setSelectedAddress(address);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAddresses([...addresses, newAddress]);
      toast.success("Address added successfully!");
      setNewAddress({
        name: "",
        phone: "",
        addressLine: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (error) {
      toast.error("Failed to add address. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-3 sm:p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">
        Shipping Address
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Address List */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Select a delivery address
          </h3>
          <div className="flex flex-col-reverse gap-6">
            {addresses.length === 0 ? (
              <div className="text-left text-gray-600">
                <p className="text-lg">No addresses available.</p>
                <p className="text-teal-600">Please add a new address.</p>
              </div>
            ) : (
              addresses.map((address, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-5 cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-md ${
                    selectedAddress === address
                      ? "border-teal-600 bg-teal-50"
                      : "border-gray-300 bg-white"
                  }`}
                  onClick={() => selectAddress(address)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {address.name}
                      </p>
                      <p className="text-gray-700">{address.addressLine}</p>
                      <p className="text-gray-700">
                        {`${address.area}, ${address.city}, ${address.state} `}
                        <span className="font-semibold">{address.pincode}</span>
                      </p>
                      <p className="text-gray-700">{`Landmark: ${address.landmark}`}</p>
                      <p className="text-gray-700 font-semibold">{`Mobile: ${address.phone}`}</p>
                    </div>
                    <input
                      type="radio"
                      name="selectedAddress"
                      checked={selectedAddress === address}
                      onChange={() => selectAddress(address)}
                      className="hidden"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Add New Address Form */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Add a new address
          </h3>
          <form onSubmit={handleAddAddress}>
            <div className="space-y-4">
              {/* Form Inputs */}
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                name="name"
                value={newAddress.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                name="phone"
                value={newAddress.phone}
                onChange={handleInputChange}
                placeholder="Mobile Number"
                pattern="[0-9]{10}"
                required
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                name="addressLine"
                value={newAddress.addressLine}
                onChange={handleInputChange}
                placeholder="Flat no, Building, Company, Apartment"
                required
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                name="area"
                value={newAddress.area}
                onChange={handleInputChange}
                placeholder="Area, Colony, Street, Village"
                required
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                name="landmark"
                value={newAddress.landmark}
                onChange={handleInputChange}
                placeholder="Landmark"
                required
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleInputChange}
                placeholder="Town/City"
                required
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleInputChange}
                placeholder="State"
                required
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                name="pincode"
                value={newAddress.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                pattern="[0-9]{6}"
                required
              />
              {/* <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="default"
                  name="default"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="default" className="ml-2 text-gray-700">
                  Use as my default address
                </label>
              </div> */}
              <button className="mt-6 w-full bg-teal-600 text-white p-3 rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-300">
                Save Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
