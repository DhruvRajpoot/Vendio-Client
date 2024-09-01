import React, { createContext, useState, useContext, ReactNode } from "react";
import axiosInstance from "../Config/axiosInstance";
import toast from "react-hot-toast";
import { Product, useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { Address } from "./AddressContext";

interface OrderItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

interface Payment {
  paymentMethod: string;
  paymentStatus: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  amount: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  paymentId?: Payment;
  discountAmount: number;
  totalItems: number;
  totalPrice: number;
  deliveryCharges: number;
  taxes: number;
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
    shippingAddress: Address;
    paymentMethod: string;
    couponCode: string | null;
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
    try {
      const response = await axiosInstance.get("/order");
      setOrders(response.data.orders);
    } catch (err: any) {
      setOrderError("Failed to fetch orders");
      toast.error(err.response.data.message || "Failed to fetch orders");
      console.error("Error fetching orders:", err);
    } finally {
      setOrderLoading(false);
    }
  };

  const createOrder = async (orderData: {
    shippingAddress: Address;
    paymentMethod: string;
    couponCode: string | null;
  }) => {
    setOrderLoading(true);
    try {
      const response = await axiosInstance.post("/order", orderData);
      setOrders((prevOrders) => [...prevOrders, response.data.order]);
      toast.success("Order placed successfully");
      clearCart();
      navigate("/account/orders");
    } catch (err: any) {
      setOrderError("Failed to place order");
      console.error("Error creating order:", err);
      toast.error(err.response.data.message || "Failed to place order");
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
    } catch (err: any) {
      setOrderError("Failed to update order status");
      console.error("Error updating order status:", err);
      toast.error(err.response.data.message || "Failed to update order status");
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
    } catch (err: any) {
      setOrderError("Failed to update payment status");
      console.error("Error updating payment status:", err);
      toast.error(
        err.response.data.message || "Failed to update payment status"
      );
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
