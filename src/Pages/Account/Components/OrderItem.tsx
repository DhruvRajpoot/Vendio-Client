import React from "react";
import { Order } from "../../../Context/OrderContext";
import {
  FaBox,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-teal-700">
          Order #{order._id.slice(-10).toUpperCase()}
        </h2>
        <p className="text-md font-medium text-gray-500">
          {new Date(order.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex justify-between mb-4">
        <p className="text-lg font-semibold text-gray-800">
          Total: ${order.finalPrice.toFixed(2)}
        </p>
        <p className="text-md font-medium">
          Status:{" "}
          <span
            className={`${
              order.orderStatus === "Delivered"
                ? "text-green-600"
                : "text-yellow-600"
            } font-semibold`}
          >
            {order.orderStatus}
          </span>
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-md font-semibold text-teal-700 flex items-center mb-3">
          <FaBox className="mr-2" /> Items
        </h3>
        <ul className="space-y-3">
          {order.items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="text-md font-medium text-gray-800">
                    {item.product.title}
                  </h4>
                  <p className="text-gray-500">
                    {item.product.category} -{" "}
                    <span className="text-yellow-500">
                      <FaStar className="inline mr-1" />
                      {item.product.rating}
                    </span>
                  </p>
                  {item.product.discount > 0 && (
                    <p className="text-red-500 font-semibold text-sm">
                      {item.product.discount}% off
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-700 font-medium">
                  Qty: {item.quantity}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  ${item.totalPrice.toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-md font-semibold text-teal-700 flex items-center mb-3">
          <FaMapMarkerAlt className="mr-2" /> Shipping Address
        </h3>
        <p className="text-gray-700 mb-1 font-medium">
          {order.shippingAddress.name}
        </p>
        <p className="text-gray-700 mb-1">{order.shippingAddress.phone}</p>
        <p className="text-gray-700 mb-1">
          {order.shippingAddress.addressLine}
        </p>
        <p className="text-gray-700 mb-1">
          {order.shippingAddress.area}, {order.shippingAddress.city}
        </p>
        <p className="text-gray-700">
          {order.shippingAddress.state} - {order.shippingAddress.pincode}
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-md font-semibold text-teal-700 flex items-center mb-3">
          <FaCreditCard className="mr-2" /> Payment Method
        </h3>
        <p className="text-gray-700 font-medium">
          {order.paymentMethod === "cod" ? "Cash on Delivery" : "Razorpay"}
        </p>
        <p className="text-gray-700">
          <strong>Payment Status:</strong>{" "}
          <span
            className={`${
              order.paymentStatus === "Paid" ? "text-green-600" : "text-red-600"
            } font-semibold`}
          >
            {order.paymentStatus}
          </span>
        </p>
      </div>

      {order.isDelivered && order.deliveredAt && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="text-md font-semibold text-teal-700 flex items-center mb-3">
            <FaCheckCircle className="mr-2" /> Delivery
          </h3>
          <p className="text-gray-700">
            Delivered on{" "}
            {new Date(order.deliveredAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
