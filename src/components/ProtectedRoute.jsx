import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import AuthPage from "../pages/auth";
import HomePage from "../pages/home";

const ProtectedRoute = ({ children }) => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/auth");
    } else {
      if (auth.currentUser && location.pathname === "/auth") {
        navigate("/dashboard");
      }
    }
  }, []);

  return !auth.currentUser ? (
    <AuthPage />
  ) : location.pathname === "/auth" ? (
    <HomePage />
  ) : (
    children
  );
};

export default ProtectedRoute;
