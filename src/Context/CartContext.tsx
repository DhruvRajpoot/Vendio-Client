import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import toast from "react-hot-toast";
import axiosInstance from "../Config/axiosInstance";
import { useAppContext } from "./AppContext";
import { couponCodes } from "../Constants/Constants";
import { Product } from "./ProductContext";

interface CartContextType {
  cartItems: { product: Product; quantity: number }[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCart: (productId: string, quantity: number) => void;
  syncCartWithBackend: () => void;
  couponCode: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
  applyCoupon: (code: string) => number;
  discount: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<
    { product: Product; quantity: number }[]
  >([]);

  const { isAuthenticated } = useAppContext();

  // Fetch cart items from localStorage initially
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        } else {
          console.error("Invalid cart data in localStorage");
        }
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
      }
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated]);

  // Sync cart with backend when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      syncCartWithBackend();
    }
  }, [isAuthenticated]);

  const addToCart = async (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(
        (item) => item.product._id === product._id
      );
      const updatedItems = existingProduct
        ? prevItems.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prevItems, { product, quantity }];

      if (!isAuthenticated)
        localStorage.setItem("cart", JSON.stringify(updatedItems));

      return updatedItems;
    });

    try {
      if (isAuthenticated) {
        await axiosInstance.post("/cart", {
          productId: product._id,
          quantity,
        });
      }
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Error syncing cart with backend:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (productId: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.product._id !== productId
      );

      if (!isAuthenticated)
        localStorage.setItem("cart", JSON.stringify(updatedItems));

      return updatedItems;
    });

    try {
      if (isAuthenticated) {
        await axiosInstance.delete(`/cart`, { data: { productId } });
      }
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error syncing cart with backend:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const updateCart = async (productId: string, quantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      );

      if (!isAuthenticated)
        localStorage.setItem("cart", JSON.stringify(updatedItems));

      return updatedItems;
    });

    try {
      if (isAuthenticated) {
        await axiosInstance.put("/cart", {
          productId,
          quantity,
        });
      }
      toast.success("Cart updated");
    } catch (error) {
      console.error("Error syncing cart with backend:", error);
      toast.error("Failed to update cart");
    }
  };

  const syncCartWithBackend = async () => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          const response = await axiosInstance.post("/cart/sync", {
            items: parsedCart,
          });

          setCartItems(response.data.cart.items);
          localStorage.removeItem("cart");
        }
      } else {
        const response = await axiosInstance.get("/cart");
        setCartItems(response.data.cart.items);
      }
    } catch (error) {
      console.error("Error syncing cart with backend:", error);
      toast.error("Failed to sync cart");
    }
  };

  const [couponCode, setCouponCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  const applyCoupon = (code: string) => {
    if (code === "") {
      setDiscount(0);
      return 0;
    } else {
      if (couponCodes[code]) {
        setDiscount(couponCodes[code] * 100);
        toast.success("Coupon applied!");
        return couponCodes[code] * 100;
      } else {
        setDiscount(0);
        toast.error("Invalid coupon code.");
        return 0;
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setCouponCode("");
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCart,
        syncCartWithBackend,
        applyCoupon,
        discount,
        couponCode,
        setCouponCode,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
