import React from "react";
import { Address } from "../../../../Context/AddressContext";

interface AddressFormProps {
  newAddress: Address;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  editingAddress: Address | null;
}

const AddressForm: React.FC<AddressFormProps> = ({
  newAddress,
  handleInputChange,
  handleSubmit,
  editingAddress,
}) => {
  const addressFields: (keyof Address)[] = [
    "name",
    "phone",
    "addressLine",
    "area",
    "landmark",
    "city",
    "state",
    "pincode",
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {editingAddress ? "Edit address" : "Add a new address"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {addressFields.map((field) => (
            <input
              key={field}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
              type="text"
              name={field}
              value={newAddress[field]}
              onChange={handleInputChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required
            />
          ))}
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors duration-300"
          >
            {editingAddress ? "Update Address" : "Add Address & Continue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
