import React, { useState } from "react";
import { Link } from "react-router-dom";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";
import { axios_api } from "../network/axios_api";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(uid.price);

  const handleBuyClick = () => {
    try {
      axios_api
        .post("/orders", {
          userId: "u1",
          symbol: uid.symbol,
          side: "BUY",
          quantity: Number(stockQuantity),
          price: Number(stockPrice),
        })
        .then((res) => {
          console.log(res.message);
        });
    } catch (err) {
      console.log(err);
    }

    GeneralContext.closeBuyWindow();
  };

  const handleSellClick = () => {
    try {
      axios_api.post("/orders", {
        userId: "u1",
        symbol: uid.symbol,
        side: "BUY",
        quantity: Number(stockQuantity),
        price: Number(stockPrice),
      });
    } catch (err) {
      console.log(err);
    }

    GeneralContext.closeBuyWindow();
  };

  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
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
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>

          <Link className="btn btn-danger"> Sell</Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
