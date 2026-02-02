import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import "./dashboard-style.css";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";
import CheckAuth from "../CheckAuth";

const Dashboard = () => {
  return (
    <GeneralContextProvider>
      <div className="dashboard-container">
        <WatchList />
        <div className="content">
          <CheckAuth>
            <Outlet />
          </CheckAuth>
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default Dashboard;
