import React from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, Navigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen.js";

function AuthRequire({ children }) {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isInitialized) {
    return <LoadingScreen />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ form: location }} replace></Navigate>;
  }
  return children;
}

export default AuthRequire;
