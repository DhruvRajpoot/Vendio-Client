import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ToastProvider from "./Components/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ToastProvider />
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
