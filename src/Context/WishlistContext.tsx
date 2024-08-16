import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../Config/axiosInstance";
import { useAppContext } from "../Context/AppContext";

interface WishlistContextType {
  wishlist: Set<number>;
  wishlistLoading: boolean;
  wishlistError: string | null;
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
  const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);
  const [wishlistError, setWishlistError] = useState<string | null>(null);

  useEffect(() => {
    setWishlist(new Set());
  }, [isAuthenticated]);

  // Check if product is in wishlist
  const checkInWishlist = (productId: number) => {
    return wishlist.has(productId);
  };

  // Fetch wishlist
  const fetchWishlist = async () => {
    if (!isAuthenticated) return;

    setWishlistLoading(true);
    setWishlistError(null);

    try {
      const response = await axiosInstance.get("/wishlist");
      const wishlistProducts = response.data.wishlist.products;
      setWishlist(new Set(wishlistProducts));
    } catch (error) {
      setWishlistError("Failed to fetch wishlist");
      console.log("Failed to fetch wishlist", error);
    } finally {
      setWishlistLoading(false);
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

    setWishlistLoading(true);
    setWishlistError(null);

    try {
      const response = await axiosInstance.post("/wishlist", { productId });
      setWishlist(new Set(response.data.wishlist.products));
      toast.success("Product added to wishlist");
    } catch (error) {
      setWishlistError("Failed to add product to wishlist");
      toast.error("Failed to add product to wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  // Remove product from wishlist
  const removeProductFromWishlist = async (productId: number) => {
    if (!isAuthenticated) {
      toast.error("Please log in to manage your wishlist");
      return;
    }

    setWishlistLoading(true);
    setWishlistError(null);

    try {
      const response = await axiosInstance.delete("/wishlist", {
        data: { productId },
      });
      setWishlist(new Set(response.data.wishlist.products));
      toast.success("Product removed from wishlist");
    } catch (error) {
      setWishlistError("Failed to remove product from wishlist");
      toast.error("Failed to remove product from wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  // Clear wishlist
  const clearWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to clear your wishlist");
      return;
    }

    setWishlistLoading(true);
    setWishlistError(null);

    try {
      await axiosInstance.delete("/wishlist/clear");
      setWishlist(new Set());
      toast.success("Wishlist cleared");
    } catch (error) {
      setWishlistError("Failed to clear wishlist");
      toast.error("Failed to clear wishlist");
    } finally {
      setWishlistLoading(false);
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
        wishlistLoading,
        wishlistError,
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
