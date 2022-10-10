import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    // getting the context
  const { currentUser } = useAuthContext();

//   if user Logged, redirect to dashboard
  return currentUser ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
