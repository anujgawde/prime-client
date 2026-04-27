import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const auth = useAuthContext();
  const location = useLocation();

  if (!auth.currentUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (location.pathname === "/auth") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
