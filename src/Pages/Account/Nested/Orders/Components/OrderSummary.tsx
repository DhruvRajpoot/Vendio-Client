import React from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { Order } from "../../../../../Context/OrderContext";

interface OrderSummaryProps {
  order: Order;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div
      className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-[0px_0px_2px_0.5px_rgb(0,0,0,.1)] bg-white cursor-pointer transition-all duration-300 group"
      onClick={() => {
        navigate(`/account/orders/${order._id}`);
      }}
    >
      <div className="flex justify-between items-center mb-4">
        {/* Status Section */}
        <div
          className={`flex items-center justify-center px-4 py-1 rounded-md w-fit ${getStatusBgColor(
            order.orderStatus
          )}`}
        >
          <p
            className={`font-semibold text-sm ${getStatusColor(
              order.orderStatus
            )}`}
          >
            {order.orderStatus}
          </p>
        </div>

        <div className="text-teal-600 font-semibold flex items-center group-hover:text-teal-800 transition-colors duration-300">
          <span className="group-hover:underline group-hover:underline-offset-2">
            View Details
          </span>
          <FiChevronRight className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>

      {/* Order Details */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <p className="text-xs text-gray-500">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="text-sm font-medium text-gray-900 mt-1">
            {order.totalItems} Item{order.totalItems > 1 ? "s" : ""}
          </p>
          {order.finalPrice && (
            <p className="text-sm font-medium text-gray-900 mt-1">
              Total Price:{" "}
              <span className="font-semibold">
                ₹{order.finalPrice.toFixed(2)}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {order.items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center border border-gray-200 rounded-lg p-2 space-x-4 bg-gray-50"
          >
            <img
              src={item.product.images[0]}
              alt={item.product.title}
              className="w-16 h-16 object-cover rounded-md shadow-sm"
            />
            <p className="text-sm text-gray-700 font-medium truncate">
              {item.product.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper functions for status styling
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "text-yellow-600";
    case "placed":
    case "shipped":
      return "text-blue-600";
    case "delivered":
      return "text-green-700";
    case "cancelled":
      return "text-red-700";
    default:
      return "text-gray-600";
  }
};

const getStatusBgColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100";
    case "placed":
    case "shipped":
      return "bg-blue-100";
    case "delivered":
      return "bg-green-100";
    case "cancelled":
      return "bg-red-100";
    default:
      return "bg-gray-100";
  }
};

export default OrderSummary;
