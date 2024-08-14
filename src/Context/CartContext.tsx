import React, { createContext, useState, ReactNode, useContext } from "react";
import toast from "react-hot-toast";

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<
    { product: Product; quantity: number }[]
  >([]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });

    toast.success("Item added to cart");
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.product.id !== productId);
    });

    toast.success("Item removed from cart");
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
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
