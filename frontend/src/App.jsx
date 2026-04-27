import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Landing_page from "./landing_page/Landing_Layout";
import { axios_api } from "./network/axios_api";
import "./index.css";

import About from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/product/ProductPage";
import Pricing from "./landing_page/pricing/PricingPage";
import Support from "./landing_page/support/Support";
import NotFound from "./landing_page/Notfound";
import HomePage from "./landing_page/home/HomePage";

import Dashboard from "./Dashboard/Dashboard";
import Summary from "./Dashboard/Summary";
import Orders from "./Dashboard/Orders";
import Holdings from "./Dashboard/Holdings";
import Positions from "./Dashboard/Positions";
import Funds from "./Dashboard/FundsDashBoard/Funds";
import TradingViewWidget from "./Dashboard/TradingViewWidget";

import CheckAuth from "./CheckAuth";
import PublicRoute from "./PublicRoute";
import Aigen from "./signup/Signup";
import Login from "./signup/login";
import { useDispatch } from "react-redux";

import {
  setAuth,
  setError,
  setLoading,
  setLoadingFalse,
} from "./redux/slices/authReducer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("effect ran");
    const restoreAuth = async () => {
      try {
        dispatch(setLoading());
        const res = await axios_api.post("/auth/refresh");

        console.log(res.data);
        if (res.data.Authenticated) {
          dispatch(setAuth(res.data));
        } else {
          dispatch(setError({ error: "auth failed" }));
        }
      } catch (err) {
        console.log("Restore Auth Failed", err);
        dispatch(setError({ error: "auth failed" }));
      } finally {
        dispatch(setLoadingFalse());
      }
    };

    restoreAuth();

  }, []);

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing_page />}>
          <Route index element={<HomePage />} />
          
          {/* Public Routes protected from authenticated users */}
          <Route element={<PublicRoute />}>
            <Route path="signup" element={<Aigen />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="about" element={<About />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        
        {/* Protected Routes for authenticated users */}
        <Route element={<CheckAuth />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Summary />} />
            <Route path="orders" element={<Orders />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="positions" element={<Positions />} />
            <Route path="funds" element={<Funds />} />
            <Route path="chart/:symbol" element={<TradingViewWidget />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
