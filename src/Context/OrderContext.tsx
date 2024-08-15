import React, { createContext, useState, useContext, ReactNode } from "react";
import axiosInstance from "../Config/axiosInstance";
import toast from "react-hot-toast";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  product: { id: number; title: string; price: number };
  quantity: number;
  totalPrice: number;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  addressLine: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: string;
  discountAmount: number;
  totalItems: number;
  totalPrice: number;
  finalPrice: number;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: {
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    discountAmount: number;
  }) => Promise<void>;
  fetchOrders: () => void;
  updateOrderStatus: (orderId: string, status: string) => Promise<void>;
  updatePaymentStatus: (orderId: string, status: string) => Promise<void>;
  orderLoading: boolean;
  orderError: string | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setOrderLoading(true);
    try {
      const response = await axiosInstance.get("/order");
      setOrders(response.data.orders);
    } catch (err) {
      setOrderError("Failed to fetch orders");
      console.error("Error fetching orders:", err);
    } finally {
      setOrderLoading(false);
    }
  };

  const createOrder = async (orderData: {
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    discountAmount: number;
  }) => {
    setOrderLoading(true);
    try {
      const response = await axiosInstance.post("/order", orderData);
      setOrders((prevOrders) => [...prevOrders, response.data.order]);
      toast.success("Order placed successfully");
      navigate("/");
      clearCart();
    } catch (err) {
      setOrderError("Failed to place order");
      console.error("Error creating order:", err);
      toast.error("Failed to place order");
      throw new Error("Failed to place order");
    } finally {
      setOrderLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    setOrderLoading(true);
    try {
      const response = await axiosInstance.put("/order/status", {
        orderId,
        status,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? response.data.order : order
        )
      );
      toast.success("Order status updated");
    } catch (err) {
      setOrderError("Failed to update order status");
      console.error("Error updating order status:", err);
      toast.error("Failed to update order status");
    } finally {
      setOrderLoading(false);
    }
  };

  const updatePaymentStatus = async (orderId: string, status: string) => {
    setOrderLoading(true);
    try {
      const response = await axiosInstance.put("/order/payment", {
        orderId,
        status,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? response.data.order : order
        )
      );
      toast.success("Payment status updated");
    } catch (err) {
      setOrderError("Failed to update payment status");
      console.error("Error updating payment status:", err);
      toast.error("Failed to update payment status");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        fetchOrders,
        updateOrderStatus,
        updatePaymentStatus,
        orderLoading,
        orderError,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};
