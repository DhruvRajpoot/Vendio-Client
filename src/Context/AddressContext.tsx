import React, { createContext, useState, useContext, ReactNode } from "react";
import axiosInstance from "../Config/axiosInstance";
import toast from "react-hot-toast";

export interface Address {
  _id: string;
  name: string;
  phone: string;
  addressLine: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
}

interface AddressContextType {
  addresses: Address[];
  createAddress: (addressData: Omit<Address, "_id">) => Promise<void>;
  updateAddress: (
    addressId: string,
    addressData: Partial<Omit<Address, "_id">>
  ) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  fetchAddresses: () => Promise<void>;
  addressLoading: boolean;
  addressError: string | null;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  const fetchAddresses = async () => {
    setAddressLoading(true);
    try {
      const response = await axiosInstance.get("/address");
      setAddresses(response.data.addresses);
    } catch (err: any) {
      setAddressError("Failed to fetch addresses");
      toast.error(err.response.data.message || "Failed to fetch addresses");
      console.error("Error fetching addresses:", err);
    } finally {
      setAddressLoading(false);
    }
  };

  const createAddress = async (addressData: Omit<Address, "_id">) => {
    setAddressLoading(true);
    try {
      const response = await axiosInstance.post("/address", addressData);
      setAddresses((prevAddresses) => [
        ...prevAddresses,
        response.data.address,
      ]);
      toast.success("Address created successfully");
    } catch (err: any) {
      setAddressError("Failed to create address");
      console.error("Error creating address:", err);
      toast.error(err.response.data.message || "Failed to create address");
      throw new Error("Failed to create address");
    } finally {
      setAddressLoading(false);
    }
  };

  const updateAddress = async (
    addressId: string,
    addressData: Partial<Omit<Address, "_id">>
  ) => {
    setAddressLoading(true);
    try {
      const response = await axiosInstance.put(
        `/address/${addressId}`,
        addressData
      );
      setAddresses((prevAddresses) =>
        prevAddresses.map((address) =>
          address._id === addressId ? response.data.address : address
        )
      );
      toast.success("Address updated successfully");
    } catch (err: any) {
      setAddressError("Failed to update address");
      console.error("Error updating address:", err);
      toast.error(err.response.data.message || "Failed to update address");
    } finally {
      setAddressLoading(false);
    }
  };

  const deleteAddress = async (addressId: string) => {
    setAddressLoading(true);
    try {
      await axiosInstance.delete(`/address/${addressId}`);
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address._id !== addressId)
      );
      toast.success("Address deleted successfully");
    } catch (err: any) {
      setAddressError("Failed to delete address");
      console.error("Error deleting address:", err);
      toast.error(err.response.data.message || "Failed to delete address");
    } finally {
      setAddressLoading(false);
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        createAddress,
        updateAddress,
        deleteAddress,
        fetchAddresses,
        addressLoading,
        addressError,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};
