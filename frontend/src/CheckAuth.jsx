import React from "react";
import { Outlet, Navigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import {
  selectCurrentAuthenticated,
  selectCurrentAuthLoading,
  setLoadingFalse,
} from "./redux/slices/authReducer";
import { useDispatch, useSelector } from "react-redux";

const CheckAuth = () => {
  // const dispatch = useDispatch();
  const loading = useSelector(selectCurrentAuthLoading);
  const auth = useSelector(selectCurrentAuthenticated);
  // const notify = () => toast("login /sign up To access dashboard");
  // if (loading) return <div>loading...</div>;

  if (auth === false) {
    console.log(auth);
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default CheckAuth;
