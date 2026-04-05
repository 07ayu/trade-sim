import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";
import { axios_api } from "../network/axios_api";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(uid.price || 0);
  const { closeBuyWindow } = useContext(GeneralContext); // ✅ Get function from context

  // Validate uid has required properties
  if (!uid || !uid.symbol) {
    console.error("Invalid stock data received");
    return <div>Error: Invalid stock data</div>;
  }

  const handleBuyClick = async () => {
    try {
      const res = await axios_api.post("/orders", {
        // userId: "u1",
        symbol: uid.symbol,
        side: "BUY",
        quantity: Number(stockQuantity),
        price: Number(stockPrice),
        createdAt: new Date(),
      });

      console.log("Buy order successful:", res.data);
      closeBuyWindow(); // ✅ Use context function
    } catch (err) {
      console.error("Buy order failed:", err);
      alert("Failed to place buy order");
    }
  };

  const handleSellClick = async () => {
    try {
      const res = await axios_api.post("/orders", {
        // userId: "u1",
        symbol: uid.symbol,
        side: "SELL",
        quantity: Number(stockQuantity),
        price: Number(stockPrice),
        createdAt: new Date(),
      });

      console.log("Sell order successful:", res.data);
      closeBuyWindow(); // Use context function
    } catch (err) {
      console.error("Sell order failed:", err);
      alert("Failed to place sell order");
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow(); // Use context function
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <h3>Order for {uid.symbol}</h3>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => {
                setStockQuantity(e.target.value);
              }}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => {
                setStockPrice(e.target.value);
              }}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>
          <button className="btn btn-danger" onClick={handleSellClick}>
            Sell
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
