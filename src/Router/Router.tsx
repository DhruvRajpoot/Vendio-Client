// src/Router.tsx
import { Routes, Route } from "react-router-dom";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Cart from "../Pages/Cart/Cart";
import NotFoundPage from "../Pages/Error/404";
import Checkout from "../Pages/Checkout/Checkout";
import PrivateRoute from "./PrivateRoutes";
import MyAccount from "../Pages/Account/Account";
import Profile from "../Pages/Account/Nested/Profile";
import Address from "../Pages/Account/Nested/Address";
import Wishlist from "../Pages/Account/Nested/Wishlist";
import Orders from "../Pages/Account/Nested/Orders";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/checkout"
        element={<PrivateRoute element={<Checkout />} />}
      />
      <Route path="/account" element={<MyAccount />}>
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
        <Route path="address" element={<Address />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
