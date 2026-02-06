import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Landing_page from "./landing_page/Landing_Layout";

import axios_api from "./network/axios_api";

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
import Funds from "./Dashboard/Funds";
import Apps from "./Dashboard/Apps";

import CheckAuth from "./CheckAuth";
import Login from "./signup/login";
import Aigen from "./signup/Signup";
import { useDispatch } from "react-redux";

import { logout, setAuth, setLoading } from "./redux/slices/authReducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        dispatch(setLoading())
        const res = await axios_api("/me");

        if (res.data.Authenticated) {
          dispatch(setAuth(res.data));
        }
      } catch (err) {
        dispatch(logout)
        console.log(err);
      }
    };

    restoreAuth();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing_page />}>
        <Route index element={<HomePage />} />
        <Route path="signup" element={<Aigen />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="support" element={<Support />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<CheckAuth />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Summary />} />
          <Route path="orders" element={<Orders />} />
          <Route path="holdings" element={<Holdings />} />
          <Route path="positions" element={<Positions />} />
          <Route path="funds" element={<Funds />} />
          <Route path="apps" element={<Apps />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
