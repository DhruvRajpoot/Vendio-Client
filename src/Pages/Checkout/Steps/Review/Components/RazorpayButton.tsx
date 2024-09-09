import React, { useState } from "react";
import axiosInstance from "../../../../../Config/axiosInstance";
import { Address } from "../../../../../Context/AddressContext";
import { useAppContext } from "../../../../../Context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../../../Context/CartContext";
import Spinner from "../../../../../Components/Spinner";
import { useOrder } from "../../../../../Context/OrderContext";

interface RazorpayButtonProps {
  shippingAddress: Address;
  couponCode: string | null;
}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({
  shippingAddress,
  couponCode,
}) => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const { clearCart } = useCart();
  const { insertOrder } = useOrder();
  const [loading, setLoading] = useState(false);

  const handleRazorpayPayment = async () => {
    setLoading(true);
    try {
      // Create the order
      const { data: orderData } = await axiosInstance.post("/order", {
        shippingAddress,
        paymentMethod: "razorpay",
        couponCode,
      });

      // Create Razorpay payment order
      const { data: paymentData } = await axiosInstance.post(
        "/payment/create",
        {
          amount: Math.round(orderData.order.finalPrice * 100),
          orderId: orderData.order._id,
        }
      );

      // Configure Razorpay options
      const options: any = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: paymentData.amount,
        currency: "INR",
        name: "Vendio",
        description: "Order Payment for Vendio",
        image:
          "https://res.cloudinary.com/dp3kpqzce/image/upload/v1724084071/logo_scddl1.png",
        order_id: paymentData.razorpayOrderId,
        handler: async function (response: any) {
          try {
            // Verify payment with backend
            await axiosInstance.post("/payment/verify", {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              orderId: orderData.order._id,
            });

            toast.success("Payment successful and order placed!");
            clearCart();

            orderData.order.orderStatus = "Placed";
            insertOrder(orderData.order);
            navigate("/account/orders");
          } catch (err) {
            console.error("Payment verification failed:", err);
            toast.error("Payment verification failed. Please try again.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: shippingAddress.name,
          email: user?.email || "",
          contact: shippingAddress.phone,
        },
        theme: {
          color: "#00897b",
        },
        modal: {
          ondismiss: function () {
            insertOrder(orderData.order);
            toast.error("Payment process was interrupted.");
            setLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        toast.error("Payment failed.");
      });

      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
      toast.error("Payment initiation failed.");
    }
  };

  return (
    <button
      type="button"
      className="flex items-center justify-center bg-teal-600 text-white font-semibold text-lg py-2 px-6 rounded-md shadow-md hover:bg-teal-700 transition-colors duration-200 w-60 h-10 truncate disabled:bg-gray-400 disabled:text-gray-200"
      onClick={handleRazorpayPayment}
      disabled={loading}
    >
      {loading ? <Spinner /> : "Pay and Place Order"}
    </button>
  );
};

export default RazorpayButton;
