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
import TopBar from "./TopBar";

const Dashboard = () => {
  return (
    <GeneralContextProvider>
      <TopBar />
      <div className="dashboard-container">
        <WatchList />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default Dashboard;
