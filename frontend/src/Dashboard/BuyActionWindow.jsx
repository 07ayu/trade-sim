import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralContext from "./GeneralContext";
import { axios_api } from "../network/axios_api";
import { toast } from "react-toastify";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(uid?.price || 0);
  const { closeBuyWindow } = useContext(GeneralContext);
  const [isLoading, setIsLoading] = useState(false);

  if (!uid || !uid.symbol) return null;

  const placeOrder = async (side) => {
    try {
      setIsLoading(true);
      await axios_api.post("/orders", {
        symbol: uid.symbol,
        side,
        quantity: Number(stockQuantity),
        price: Number(stockPrice),
        createdAt: new Date(),
      });
      setIsLoading;
      toast.success(`${side} order placed for ${uid.symbol}`, {
        position: "top-right",
        theme: "light",
      });
      closeBuyWindow();
    } catch (err) {
      console.error(`${side} order failed:`, err);
      setIsLoading(false);
      const errorMessage =
        err.response?.data?.message ||
        `Failed to place ${side.toLowerCase()} order`;
      toast.error(errorMessage, {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/40 dark:bg-black/60"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBuyWindow();
      }}
    >
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl w-[360px] overflow-hidden"
        style={{ animation: "popIn 0.18s ease-out" }}
      >
        {/* Header */}
        <div className="px-[18px] py-[14px] border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="m-0 text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-medium">
              Order
            </p>
            <p className="m-0 text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
              {uid.symbol}
            </p>
          </div>
          <div className="flex gap-1.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-100 dark:border-emerald-800/50">
              NSE
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              Limit
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-[18px]">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-[11px] text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider font-medium">
                Quantity
              </label>
              <input
                type="number"
                value={stockQuantity}
                min={1}
                onChange={(e) => setStockQuantity(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 text-base font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider font-medium">
                Price (₹)
              </label>
              <input
                type="number"
                value={stockPrice}
                step="0.05"
                onChange={(e) => setStockPrice(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 text-base font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-lg px-3.5 py-2.5 flex justify-between items-center mb-5 border border-slate-100 dark:border-slate-800/50">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Margin required
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
              ₹140.65
            </span>
          </div>

          <div className="grid grid-cols-[1fr_1fr_72px] gap-2">
            <button
              onClick={() => placeOrder("BUY")}
              disabled={isLoading}
              className={`h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm":"h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm
                ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed text-black"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
                }`}
            >
              Buy
            </button>
            <button
              onClick={() => placeOrder("SELL")}
              className={`h-10 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors shadow-sm"
             ${
               isLoading
                 ? "bg-gray-400 cursor-not-allowed text-black"
                 : "bg-red-600 hover:bg-red-700 hover:shadow-md"
             }`}
            >
              Sell
            </button>
            <button
              onClick={closeBuyWindow}
              className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Pop-in animation */}
      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>,
    document.body,
  );
};

export default BuyActionWindow;
