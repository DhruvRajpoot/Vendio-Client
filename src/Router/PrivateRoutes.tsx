import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAppContext();
  const location = useLocation();
  const from = location.pathname;

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to={`/login?redirect=${from}`} replace />
  );
};

export default PrivateRoute;
