import React, { useState, useEffect } from "react";
import { Address, useAddress } from "../../../../../Context/AddressContext";
import { FaTimes } from "react-icons/fa";

interface AddressFormProps {
  address: Address | null;
  onClose: () => void;
  onSuccess: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    addressLine: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });
  const { createAddress, updateAddress } = useAddress();
  const isEditing = !!address;

  useEffect(() => {
    if (address) {
      const { name, phone, addressLine, area, landmark, city, state, pincode } =
        address;
      setFormData({
        name,
        phone,
        addressLine,
        area,
        landmark,
        city,
        state,
        pincode,
      });
    }
  }, [address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        if (!address?._id) {
          throw new Error("Address ID is missing.");
        }
        await updateAddress(address?._id, formData);
      } else {
        await createAddress(formData);
      }
      onSuccess();
    } catch (err) {
      console.error("Error handling address:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50 p-4 sm:p-6">
      <div className="relative bg-white px-6 rounded-lg shadow-lg max-w-2xl w-full overflow-auto max-h-[90vh]">
        <header className="flex justify-between items-center mb-4 sm:mb-6 border-b py-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {isEditing ? "Edit Address" : "Add New Address"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-300 text-xl sm:text-2xl"
          >
            <FaTimes />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 capitalize">
                {key}
              </label>
              <input
                type="text"
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow duration-300"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                required
              />
            </div>
          ))}

          <footer className="flex justify-end gap-3 sm:gap-4 mt-4 sm:mt-6 pb-4 sm:pb-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-teal-700 transition-colors duration-300"
            >
              {isEditing ? "Update Address" : "Add Address"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
