import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ToastProvider from "./Components/ToastProvider.tsx";
import { AppContextProvider } from "./Context/AppContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Context/CartContext.tsx";
import { OrderProvider } from "./Context/OrderContext.tsx";
import { WishlistProvider } from "./Context/WishlistContext.tsx";
import { AddressProvider } from "./Context/AddressContext.tsx";
import { ProductProvider } from "./Context/ProductContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ToastProvider />
      <BrowserRouter>
        <AppContextProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
                <WishlistProvider>
                  <AddressProvider>
                    <App />
                  </AddressProvider>
                </WishlistProvider>
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </AppContextProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
