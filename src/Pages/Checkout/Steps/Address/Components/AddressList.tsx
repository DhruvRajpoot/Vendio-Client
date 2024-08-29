import React from "react";
import { Address } from "../../../../../Context/AddressContext";
import AddressItem from "./AddressItem";

interface AddressListProps {
  addresses: Address[];
  selectAddress: (address: Address) => void;
  handleEditClick: (address: Address) => void;
  selectedAddress: Address | null;
  addressError: string | null;
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  selectAddress,
  handleEditClick,
  selectedAddress,
  addressError,
}) => {
  return (
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Select a delivery address
      </h3>
      <div className="flex flex-col gap-6">
        {addresses.length === 0 ? (
          <div className="text-left text-gray-600">
            <p className="text-lg">No addresses available.</p>
            <p className="text-teal-600">Please add a new address.</p>
          </div>
        ) : (
          addresses.map((address) => (
            <AddressItem
              key={address._id}
              address={address}
              onSelect={() => selectAddress(address)}
              onEdit={() => handleEditClick(address)}
              isSelected={selectedAddress?._id === address._id}
            />
          ))
        )}
      </div>
      {addressError && <p className="text-red-500 mt-4">{addressError}</p>}
    </div>
  );
};

export default AddressList;
