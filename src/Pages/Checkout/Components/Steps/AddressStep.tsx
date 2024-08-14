import React, { useState } from "react";

interface Address {
  name: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
}

const AddressStep: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      name: "Robert Fox",
      addressLine: "4257 Washington Ave. Manchester, Kentucky 39495",
      city: "Manchester",
      state: "Kentucky",
      zip: "39495",
    },
    {
      name: "John Williams",
      addressLine: "3817 Penhurst Dr. Richardson, California 62639",
      city: "Richardson",
      state: "California",
      zip: "62639",
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  const selectAddress = (index: number) => {
    setSelectedAddress(index);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle adding new address
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
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
            {addresses.map((address, index) => (
              <div
                key={index}
                className={`border bg-white rounded-lg p-5 cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-md ${
                  selectedAddress === index
                    ? "border-teal-600 bg-teal-50"
                    : "border-gray-300"
                }`}
                onClick={() => selectAddress(index)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {address.name}
                    </p>
                    <p className="text-gray-700">{address.addressLine}</p>
                    <p className="text-gray-700">{`${address.city}, ${address.state} ${address.zip}`}</p>
                  </div>
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddress === index}
                    onChange={() => selectAddress(index)}
                    className="form-radio h-5 w-5 text-teal-600"
                  />
                </div>
              </div>
            ))}
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
                placeholder="Name"
                required
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                placeholder="Mobile Number"
                required
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                placeholder="Flat no, Building, Company, Apartment"
                required
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                placeholder="Area, Colony, Street, Village"
                required
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                placeholder="Landmark"
                required
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                placeholder="Town/City"
                required
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                placeholder="Pincode"
                required
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                type="text"
                placeholder="State"
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
              <button className="mt-6 w-full bg-teal-600 text-white p-3 rounded-lg font-semibold outline-none">
                Add New Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
