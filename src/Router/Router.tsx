import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../Pages/Loading/Loading";
const PrivateRoute = lazy(() => import("./PrivateRoutes"));
const SignUp = lazy(() => import("../Pages/Signup/Signup"));
const Login = lazy(() => import("../Pages/Login/Login"));
const Home = lazy(() => import("../Pages/Home/Home"));
const Products = lazy(() => import("../Pages/Products/Products"));
const ProductDetails = lazy(
  () => import("../Pages/ProductDetails/ProductDetails")
);
const Cart = lazy(() => import("../Pages/Cart/Cart"));
const NotFoundPage = lazy(() => import("../Pages/Error/404"));
const Checkout = lazy(() => import("../Pages/Checkout/Checkout"));
const MyAccount = lazy(() => import("../Pages/Account/Account"));
const Profile = lazy(() => import("../Pages/Account/Nested/Profile/Profile"));
const Address = lazy(() => import("../Pages/Account/Nested/Address/Address"));
const Wishlist = lazy(() => import("../Pages/Account/Nested/Wishlist/Wishlist"));
const Orders = lazy(() => import("../Pages/Account/Nested/Orders/Orders"));
const OrderDetails = lazy(
  () => import("../Pages/Account/Nested/Orders/OrderDetails/OrderDetails")
);
const AboutUs = lazy(() => import("../Pages/AboutUs/AboutUs"));
const VerifyEmail = lazy(() => import("../Pages/VerifyEmail/VerifyEmail"));
const ForgotPassword = lazy(
  () => import("../Pages/ForgotPassword/ForgotPassword")
);
const SetNewPassword = lazy(
  () => import("../Pages/SetNewPassword/SetNewPassword")
);

export const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/setnewpassword" element={<SetNewPassword />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/checkout"
          element={<PrivateRoute element={<Checkout />} />}
        />
        <Route path="/account" element={<MyAccount />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />
          <Route path="address" element={<Address />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
