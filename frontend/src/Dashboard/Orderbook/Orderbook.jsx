import React, { useEffect, useState } from "react";
import { socket } from "@/network/socket_api";
import { axios_api } from "@/network/axios_api";

const Orderbook = ({ symbol }) => {
  const [data, setData] = useState({ bids: [], asks: [] });

  useEffect(() => {
    // Initial fetch
    axios_api
      .get(`/matching/orderbook/${symbol}`)
      .then((res) => setData(res.data));

    const handleUpdate = (update) => {
      if (update.symbol === symbol) setData(update.depth);
    };

    socket.on("orderbook_update", handleUpdate);
    return () => socket.off("orderbook_update", handleUpdate);
  }, [symbol]);

  const maxQty = Math.max(
    ...data.bids.map((b) => b.quantity),
    ...data.asks.map((a) => a.quantity),
    1,
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-full font-mono text-[11px]">
      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
        <span className="font-bold text-slate-500 uppercase tracking-wider">
          Order Book
        </span>
        <span className="text-slate-400">{symbol}</span>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-px bg-slate-100 dark:bg-slate-800">
        {/* Bids (Buyers) */}
        <div className="bg-white dark:bg-slate-900 flex flex-col">
          <div className="grid grid-cols-2 px-3 py-1 text-slate-400 border-b border-slate-100 dark:border-slate-800">
            <span>Price</span>
            <span className="text-right">Qty</span>
          </div>
          {data.bids.map((bid, i) => (
            <div
              key={i}
              className="relative group hover:bg-emerald-50/30 dark:hover:bg-emerald-500/5 transition-colors"
            >
              <div
                className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 dark:bg-emerald-500/20 transition-all duration-500"
                style={{ width: `${(bid.quantity / maxQty) * 100}%` }}
              />
              <div className="grid grid-cols-2 px-3 py-1.5 relative z-10">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  ₹{bid.price.toFixed(2)}
                </span>
                <span className="text-right text-slate-600 dark:text-slate-300">
                  {bid.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Asks (Sellers) */}
        <div className="bg-white dark:bg-slate-900 flex flex-col">
          <div className="grid grid-cols-2 px-3 py-1 text-slate-400 border-b border-slate-100 dark:border-slate-800">
            <span>Price</span>
            <span className="text-right">Qty</span>
          </div>
          {data.asks.map((ask, i) => (
            <div
              key={i}
              className="relative group hover:bg-rose-50/30 dark:hover:bg-rose-500/5 transition-colors"
            >
              <div
                className="absolute left-0 top-0 bottom-0 bg-rose-500/10 dark:bg-rose-500/20 transition-all duration-500"
                style={{ width: `${(ask.quantity / maxQty) * 100}%` }}
              />
              <div className="grid grid-cols-2 px-3 py-1.5 relative z-10">
                <span className="text-rose-600 dark:text-rose-400 font-bold">
                  ₹{ask.price.toFixed(2)}
                </span>
                <span className="text-right text-slate-600 dark:text-slate-300">
                  {ask.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orderbook;
