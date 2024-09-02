import React from "react";
import { Order, useOrder } from "../../../Context/OrderContext";
import {
  FaBox,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCheckCircle,
  FaStar,
  FaMoneyBillAlt,
  FaTimesCircle,
} from "react-icons/fa";

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const { cancelOrder } = useOrder();

  return (
    <div className="border border-gray-200 rounded-lg p-4 sm:p-6 shadow-md bg-white">
      {/* Order Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-teal-700">
          Order #{order._id.slice(-6).toUpperCase()}
        </h2>
        <p className="text-md font-medium text-gray-500">
          {new Date(order.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Order Summary */}
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
                : order.orderStatus === "Pending"
                ? "text-red-600"
                : "text-yellow-600"
            } font-semibold`}
          >
            {order.orderStatus}
          </span>
        </p>
      </div>

      {/* Items */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-md font-semibold text-teal-700 flex items-center mb-3">
          <FaBox className="mr-2" /> Items Ordered
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
                  <h4 className="text-md font-medium text-gray-800 h-6 overflow-hidden">
                    {item.product.title}
                  </h4>
                  <p className="text-gray-500 flex flex-col xs:flex-row gap-1">
                    {item.product.category} -{" "}
                    <span className="text-yellow-500 flex items-center">
                      <FaStar className="inline mr-1" />
                      {item.product.rating}
                    </span>
                  </p>
                  {item.product.discount > 0 && (
                    <p className="text-red-500 font-semibold text-sm">
                      {item.product.discount}% Off
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

      {/* Order Summary */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-md font-semibold text-teal-700 flex items-center mb-3">
          <FaMoneyBillAlt className="mr-2" /> Order Summary
        </h3>
        <div className="space-y-2">
          <p className="text-gray-700 flex justify-between">
            <span>Subtotal:</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </p>
          <p className="text-gray-700 flex justify-between">
            <span>Taxes:</span>
            <span>${order.taxes.toFixed(2)}</span>
          </p>
          <p className="text-gray-700 flex justify-between">
            <span>Delivery Charges:</span>
            <span>${order.deliveryCharges.toFixed(2)}</span>
          </p>
          {order.discountAmount > 0 && (
            <p className="text-red-500 flex justify-between font-semibold">
              <span>Discount:</span>
              <span>- ${order.discountAmount.toFixed(2)}</span>
            </p>
          )}
          <hr className="border-gray-200 my-2" />
          <p className="text-gray-800 flex justify-between font-semibold text-lg">
            <span>Grand Total:</span>
            <span>${order.finalPrice.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* Shipping Address */}
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

      {/* Payment Details */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-md font-semibold text-teal-700 flex items-center mb-3">
          <FaCreditCard className="mr-2" /> Payment Details
        </h3>
        <div className="flex flex-col space-y-3">
          <p className="text-gray-700 text-md font-medium">
            <span className="font-semibold">Payment Method:</span>{" "}
            {order.paymentMethod === "cod" ? "Cash on Delivery" : "Razorpay"}
          </p>
          {order.paymentMethod === "razorpay" && order.paymentId && (
            <p className="text-gray-700 text-md font-medium">
              <span className="font-semibold">Transaction ID:</span>{" "}
              {order.paymentId.razorpayOrderId}
            </p>
          )}
          {order.paymentMethod !== "cod" && (
            <p className="text-gray-700 text-md font-medium">
              <span className="font-semibold">Payment Status:</span>{" "}
              <span
                className={`${
                  order.paymentId?.paymentStatus === "Paid"
                    ? "text-green-600"
                    : "text-red-600"
                } font-semibold`}
              >
                {order.paymentId?.paymentStatus}
              </span>
            </p>
          )}
        </div>
      </div>

      {order.orderStatus !== "Delivered" &&
        order.orderStatus !== "Cancelled" && (
          <div className="mt-4">
            <button
              onClick={() => {
                cancelOrder(order._id);
              }}
              className="text-sm text-red-600 font-semibold flex items-center gap-2 border border-red-600 px-4 py-2 rounded hover:bg-red-100 transition-colors duration-200"
            >
              <FaTimesCircle />
              Cancel Order
            </button>
          </div>
        )}

      {/* Delivery Status */}
      {order.isDelivered && order.deliveredAt && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="text-md font-semibold text-teal-700 flex items-center mb-3">
            <FaCheckCircle className="mr-2" /> Delivery Status
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
