import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import CartItem from "./Components/CartItem";
import Navbar from "../../Components/Navbar";
import OrderSummary from "./Components/OrderSummary";
import EmptyCart from "./Components/EmptyCart";
import { deliveryCharges, taxRate } from "../../Constants/Constants";

const Cart: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, discount } = useCart();

  const handleQuantityChange = (id: number, amount: number) => {
    const item = cartItems.find((item) => item.product.id === id);
    if (item) {
      const newQuantity = item.quantity + amount;
      if (newQuantity <= 0) {
        removeFromCart(id);
      } else {
        addToCart(item.product, amount);
      }
    }
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  // Calculate subtotal, discount, delivery charges, taxes, and grand total
  const subtotal = cartItems.reduce((total, item) => {
    return (
      total +
      (item.product.price -
        item.product.price * (item.product.discount / 100)) *
        item.quantity
    );
  }, 0);

  const discountAmount = (subtotal * discount) / 100;
  const taxes = (subtotal - discountAmount) * taxRate;
  const grandTotal = subtotal - discountAmount + deliveryCharges + taxes;

  return (
    <>
      <Navbar />

      <div className="px-4 md:px-10 py-6 bg-gray-50 min-h-[calc(100vh-4rem)]">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <span className="text-lg text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white shadow-md rounded-lg">
            {cartItems.length === 0 ? (
              <EmptyCart />
            ) : (
              <div>
                <table className="w-full border-collapse">
                  <thead className="bg-gray-200 text-left hidden sm:table-header-group">
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
                        key={item.product.id}
                        id={item.product.id}
                        quantity={item.quantity}
                        onQuantityChange={(amount) =>
                          handleQuantityChange(item.product.id, amount)
                        }
                        onRemove={() => handleRemoveItem(item.product.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <OrderSummary
              subtotal={subtotal}
              deliveryCharges={deliveryCharges}
              taxes={taxes}
              total={grandTotal}
            />
          )}
        </div>

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
    </>
  );
};

export default Cart;
