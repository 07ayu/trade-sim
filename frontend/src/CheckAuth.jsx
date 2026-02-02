import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CheckAuth = () => {
  const isAuthenticated = false;
  const Navigate = useNavigate();
  // const notify = () => toast("login /sign up To access dashboard");
  useEffect(() => {
    if (!isAuthenticated) {
      toast("login /sign up To access dashboard");

      setTimeout(() => {
        Navigate("/signup");
      }, 2000);
    }
  }, [isAuthenticated, Navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
};

export default CheckAuth;
