import React, { useContext, useState } from "react";

import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import GeneralContext from "./GeneralContext";

import { watchlist } from "./data/data";

import { DoughnutChart } from "./DoughnutChart";
// const labels = watchlist.map((subArray) => (subArray = ["name"]));

const WatchList = () => {
  const data = {
    labels: watchlist.map((stock) => stock.name),
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(75, 192, 192, 0.3)",
          "rgba(153, 102, 255,0.3)",
          "rgba(255, 159, 64, 0.3)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length}</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return <WatchlistItem stock={stock} key={index} />;
        })}
      </ul>
      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchlistItem = ({ stock }) => {
  const [showWatchListActions, setShowWatchListActions] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchListActions(true);
  };
  const handleMouseLeave = (e) => {
    setShowWatchListActions(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>

        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchListActions && <WatchlistActions uid={stock.name} />}
    </li>
  );
};

const WatchlistActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const HandleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={HandleBuyClick}
        >
          <button className="buy"> Buy</button>
        </Tooltip>

        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell ac"> Sell</button>
        </Tooltip>

        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            {" "}
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip
          title="More (M)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className=" action">
            {" "}
            <MoreHoriz className="icon" />{" "}
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
