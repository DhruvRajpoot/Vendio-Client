import React, { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../Store/products";
import CartItem from "./Components/CartItem";
import Navbar from "../../Components/Navbar";
import OrderSummary from "./Components/OrderSummary";
import EmptyCart from "./Components/EmptyCart";

interface CartItem {
  id: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (id: number, amount: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyCoupon = (code: string) => {
    if (code === "SAVE10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);
      return (
        total +
        (product
          ? (product.price - product.price * (product.discount / 100)) *
            item.quantity
          : 0)
      );
    }, 0);
  };

  const totalBeforeDiscount = calculateTotal();
  const discountAmount = (totalBeforeDiscount * discount) / 100;
  const totalAfterDiscount = totalBeforeDiscount - discountAmount;

  // Additional calculations
  const deliveryCharges = 50; // Example delivery charges
  const taxes = totalAfterDiscount * 0.05; // Example taxes (5%)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Cart Heading */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <span className="text-lg text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="flex gap-6">
          {/* Cart Items or Empty Cart */}
          <div className="flex-1 bg-white shadow-md rounded-lg">
            {cartItems.length === 0 ? (
              <EmptyCart />
            ) : (
              <div>
                <table className="w-full border-collapse">
                  <thead className="bg-gray-200 text-left ">
                    <tr>
                      <th className="py-3 px-6 w-1/2">Product</th>
                      <th className="text-center py-3 px-6 w-1/6">Price</th>
                      <th className="text-center py-3 px-6 w-1/6">Quantity</th>
                      <th className="text-center py-3 px-6 w-1/6">Total</th>
                      <th className="text-center py-3 px-6 w-1/6">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        quantity={item.quantity}
                        onQuantityChange={(amount) =>
                          handleQuantityChange(item.id, amount)
                        }
                        onRemove={() => handleRemoveItem(item.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <OrderSummary
              subtotal={totalBeforeDiscount}
              deliveryCharges={deliveryCharges}
              taxes={taxes}
              total={totalAfterDiscount + deliveryCharges + taxes}
              discount={discount}
              onCheckout={() => {
                /* Handle checkout logic */
              }}
              onApplyCoupon={handleApplyCoupon}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
            />
          )}
        </div>

        {/* Continue Shopping Button */}
        {cartItems.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-700 mb-4">
              Not ready to checkout? Continue shopping to add more items to your
              cart.
            </p>
            <Link
              to="/products"
              className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md shadow-md hover:bg-gray-300 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
