import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentAuthenticated,
  selectCurrentAuthLoading,
} from "./redux/slices/authReducer";

const PublicRoute = () => {
  const loading = useSelector(selectCurrentAuthLoading);
  const auth = useSelector(selectCurrentAuthenticated);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-950">
        <div className="h-12 w-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If user is already authenticated, redirect them to dashboard
  if (auth === true) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not authenticated, allow access to public routes (Login/Signup)
  return <Outlet />;
};

export default PublicRoute;
