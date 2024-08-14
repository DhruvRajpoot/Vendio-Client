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

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: string;
  discount: number;
  rating: number;
}

interface CartContextType {
  cartItems: { product: Product; quantity: number }[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCart: (productId: number, quantity: number) => void;
  syncCartWithBackend: () => void;
  couponCode: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
  applyCoupon: (code: string) => number;
  discount: number;
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
        (item) => item.product.id === product.id
      );
      const updatedItems = existingProduct
        ? prevItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prevItems, { product, quantity }];

      localStorage.setItem("cart", JSON.stringify(updatedItems));

      return updatedItems;
    });

    try {
      if (isAuthenticated) {
        await axiosInstance.post("/cart", {
          productId: product.id,
          quantity,
        });
      }
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Error syncing cart with backend:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (productId: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.product.id !== productId
      );

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

  const updateCart = async (productId: number, quantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );

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
      const response = await axiosInstance.get("/cart");
      const backendCartItems = response.data.cart.items;

      if (Array.isArray(backendCartItems)) {
        if (backendCartItems.length > 0) {
          setCartItems(backendCartItems);
          localStorage.setItem("cart", JSON.stringify(backendCartItems));
        } else if (cartItems.length > 0) {
          await axiosInstance.post("/cart/bulk", {
            items: cartItems,
          });
        }
      } else {
        console.error("Invalid cart data from backend");
      }
    } catch (error) {
      console.error("Error fetching cart from backend:", error);
    }
  };

  const [couponCode, setCouponCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  const applyCoupon = (code: string) => {
    if (code === "") {
      setDiscount(0);
      return 0;
    } else {
      if (code === "SAVE10") {
        setDiscount(10);
        toast.success("Coupon applied!");
        return 10;
      } else {
        setDiscount(0);
        toast.error("Invalid coupon code.");
        return 0;
      }
    }
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
