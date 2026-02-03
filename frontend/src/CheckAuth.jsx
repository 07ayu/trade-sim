import React from "react";
import { Outlet, Navigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import { selectCurrentAuthenticated } from "./redux/slices/authReducer";
import { useSelector } from "react-redux";

const CheckAuth = () => {
  const isAuthenticated = useSelector(selectCurrentAuthenticated);
  // const notify = () => toast("login /sign up To access dashboard");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default CheckAuth;
