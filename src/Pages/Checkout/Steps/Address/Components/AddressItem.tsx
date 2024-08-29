import React from "react";
import { Address } from "../../../../../Context/AddressContext";

interface AddressItemProps {
  address: Address;
  onSelect?: () => void;
  onEdit?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
  isSelected?: boolean;
}

const AddressItem: React.FC<AddressItemProps> = ({
  address,
  onSelect,
  onEdit,
  onDelete,
  isSelected,
}) => {
  return (
    <div
      className={`relative border rounded-lg p-5 cursor-pointer transition-shadow duration-300 ease-in-out hover:bg-teal-50 hover:shadow-sm
      ${isSelected ? "border-teal-500 bg-teal-50" : " border-gray-300 bg-white"}
        `}
      onClick={() => onSelect && onSelect()}
    >
      <div className="text-gray-800">
        <p className="text-lg font-semibold text-gray-900">{address.name}</p>
        <p>{address.addressLine}</p>
        <p>
          {address.area}, {address.city}
        </p>
        <p>
          {address.state} -{" "}
          <span className="font-semibold">{address.pincode}</span>
        </p>
        {address.landmark && <p>{`Landmark: ${address.landmark}`}</p>}
        <p className="font-semibold">{`Mobile: ${address.phone}`}</p>
      </div>

      {onEdit || onDelete ? (
        <div className="absolute top-5 right-5 flex space-x-2">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(e);
              }}
              className="text-teal-600 hover:bg-teal-600 hover:text-white transition-colors duration-300 px-3 py-1 rounded"
            >
              Edit
            </button>
          )}

          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(e);
              }}
              className="text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 px-3 py-1 rounded"
            >
              Delete
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AddressItem;
