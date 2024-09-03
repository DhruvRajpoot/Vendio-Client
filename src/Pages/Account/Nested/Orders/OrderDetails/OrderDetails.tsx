import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOrder } from "../../../../../Context/OrderContext";
import OrderItem from "./Components/OrderItem";

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders, fetchOrders, orderLoading, orderError } = useOrder();
  const order = orders.find((o) => o._id === orderId);

  useEffect(() => {
    if (!orders.length) fetchOrders();
  }, []);

  if (orderLoading) {
    return (
      <div className="flex justify-center items-center mt-4">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (orderError) {
    return (
      <div className="text-red-600 text-center mt-4">
        <p className="text-lg">{orderError}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center mt-6">
        <p className="text-lg text-gray-700">Order not found.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Order Details
      </h1>
      <OrderItem order={order} />
    </div>
  );
};

export default OrderDetail;
