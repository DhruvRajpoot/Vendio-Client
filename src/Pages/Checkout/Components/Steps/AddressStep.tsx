import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Address {
  name: string;
  mobileNumber: string;
  addressLine: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  zip: string;
}

interface AddressStepProps {
  validateStep: (isValid: boolean) => void;
}

const AddressStep: React.FC<AddressStepProps> = ({ validateStep }) => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      name: "Robert Fox",
      mobileNumber: "123-456-7890",
      addressLine: "4257 Washington Ave.",
      area: "Manchester",
      landmark: "Near Park",
      city: "Manchester",
      state: "Kentucky",
      zip: "39495",
    },
    {
      name: "John Williams",
      mobileNumber: "987-654-3210",
      addressLine: "3817 Penhurst Dr.",
      area: "Richardson",
      landmark: "Near School",
      city: "Richardson",
      state: "California",
      zip: "62639",
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  const [newAddress, setNewAddress] = useState<Address>({
    name: "",
    mobileNumber: "",
    addressLine: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    zip: "",
  });

  const selectAddress = (index: number) => {
    setSelectedAddress(index);
  };

  useEffect(() => {
    validateStep(selectedAddress !== null);
  }, [selectedAddress, validateStep]);

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
        mobileNumber: "",
        addressLine: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        zip: "",
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
          <div className="space-y-6">
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
                    selectedAddress === index
                      ? "border-teal-600 bg-teal-50"
                      : "border-gray-300 bg-white"
                  }`}
                  onClick={() => selectAddress(index)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {address.name}
                      </p>
                      <p className="text-gray-700">{address.addressLine}</p>
                      <p className="text-gray-700">{`${address.area}, ${address.city}, ${address.state} ${address.zip}`}</p>
                      <p className="text-gray-700">{`Landmark: ${address.landmark}`}</p>
                      <p className="text-gray-700">{`Mobile: ${address.mobileNumber}`}</p>
                    </div>
                    <input
                      type="radio"
                      name="selectedAddress"
                      checked={selectedAddress === index}
                      onChange={() => selectAddress(index)}
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
                name="mobileNumber"
                value={newAddress.mobileNumber}
                onChange={handleInputChange}
                placeholder="Mobile Number"
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
                name="zip"
                value={newAddress.zip}
                onChange={handleInputChange}
                placeholder="Pincode"
                required
              />
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="default"
                  name="default"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="default" className="ml-2 text-gray-700">
                  Use as my default address
                </label>
              </div>
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
