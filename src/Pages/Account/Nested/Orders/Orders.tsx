import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../../../../Context/OrderContext";
import OrderSummary from "./Components/OrderSummary";

const Orders: React.FC = () => {
  const { orders, fetchOrders, orderLoading, orderError } = useOrder();

  useEffect(() => {
    if (orders.length <= 1) fetchOrders();
  }, []);

  const renderState = () => {
    if (orderError) {
      return (
        <div className="text-red-600 text-center mt-4">
          <p className="text-lg">{orderError}</p>
        </div>
      );
    }

    if (orderLoading) {
      return (
        <div className="flex justify-center items-center mt-4">
          <p className="text-lg">Loading...</p>
        </div>
      );
    }

    if (orders.length === 0) {
      return (
        <div className="text-center mt-6">
          <p className="text-lg text-gray-700">
            You have no orders.{" "}
            <Link
              to="/products"
              className="text-teal-600 font-semibold underline"
            >
              Start shopping
            </Link>
            .
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <OrderSummary key={order._id} order={order} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        My Orders
      </h1>
      {renderState()}
    </div>
  );
};

export default Orders;
