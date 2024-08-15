import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../Config/axiosInstance";
import { useAppContext } from "../Context/AppContext";

interface WishlistContextType {
  wishlist: Set<number>;
  fetchWishlist: () => Promise<void>;
  addProductToWishlist: (productId: number) => Promise<void>;
  removeProductFromWishlist: (productId: number) => Promise<void>;
  clearWishlist: () => Promise<void>;
  checkInWishlist: (productId: number) => boolean;
  handleWishlistClick: (productId: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAppContext();
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  // Check if product is in wishlist
  const checkInWishlist = (productId: number) => {
    return wishlist.has(productId);
  };

  // Fetch wishlist
  const fetchWishlist = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await axiosInstance.get("/wishlist");
      const wishlistProducts = response.data.wishlist.products;
      setWishlist(new Set(wishlistProducts));
    } catch (error) {
      console.log("Failed to fetch wishlist", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  // Add product to wishlist
  const addProductToWishlist = async (productId: number) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your wishlist");
      return;
    }

    try {
      const response = await axiosInstance.post("/wishlist", { productId });
      setWishlist(new Set(response.data.wishlist.products));
      toast.success("Product added to wishlist");
    } catch (error) {
      toast.error("Failed to add product to wishlist");
    }
  };

  // Remove product from wishlist
  const removeProductFromWishlist = async (productId: number) => {
    if (!isAuthenticated) {
      toast.error("Please log in to manage your wishlist");
      return;
    }

    try {
      const response = await axiosInstance.delete("/wishlist", {
        data: { productId },
      });
      setWishlist(new Set(response.data.wishlist.products));
      toast.success("Product removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove product from wishlist");
    }
  };

  // Clear wishlist
  const clearWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to clear your wishlist");
      return;
    }

    try {
      await axiosInstance.delete("/wishlist/clear");
      setWishlist(new Set());
      toast.success("Wishlist cleared");
    } catch (error) {
      toast.error("Failed to clear wishlist");
    }
  };

  // Handle wishlist click
  const handleWishlistClick = (productId: number) => {
    if (checkInWishlist(productId)) {
      removeProductFromWishlist(productId);
    } else {
      addProductToWishlist(productId);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        fetchWishlist,
        addProductToWishlist,
        removeProductFromWishlist,
        clearWishlist,
        checkInWishlist,
        handleWishlistClick,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
