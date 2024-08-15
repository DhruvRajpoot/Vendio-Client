import React, { useEffect } from "react";
import { useOrder } from "../../../Context/OrderContext";
import { Link } from "react-router-dom";
import OrderItem from "../Components/OrderItem";

const Orders: React.FC = () => {
  const { orders, fetchOrders, orderLoading, orderError } = useOrder();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orderError) {
    return (
      <div className="text-red-600 text-center mt-4">
        <p>{orderError}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

      {orderLoading ? (
        <div className="text-center mt-4">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {orders.length === 0 ? (
            <p className="text-lg text-gray-700">
              You have no orders.{" "}
              <Link to="/" className="text-teal-600 underline">
                Start shopping
              </Link>
              .
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {orders.map((order) => (
                <OrderItem key={order._id} order={order} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
