// import React, { useEffect, useState } from "react";
// import { axios_api, axios_demoServer } from "../network/axios_api";
// // import { positions } from "../Data/data";

// // import axios from "axios";

// const Positions = () => {
//   const [allPositions, setAllPosition] = useState([]);

//   useEffect(() => {
//     axios_api.get("/allPositions").then((res) => {
//       console.log(res.data);
//       setAllPosition(res.data);
//     });
//   }, []);
//   return (
//     <>
//       <h3 className="title">Positions ({allPositions.length})</h3>

//       <div className="order-table">
//         <table>
//           <tr>
//             <th>Product</th>
//             <th>Instrument</th>
//             <th>Qty.</th>
//             <th>Avg.</th>
//             <th>LTP</th>
//             <th>P&L</th>
//             <th>Chg.</th>
//           </tr>
//           {allPositions.map((stock, index) => {
//             const curValue = stock.price * stock.qty;
//             const isProfit = curValue - stock.avg * stock.qty >= 0.0;
//             const profClass = isProfit ? "profit" : "loss";
//             const dayClass = stock.isLoss ? "loss" : "profit";
//             return (
//               <tr key={index}>
//                 <td>{stock.product}</td>
//                 <td> {stock.name} </td>
//                 <td>{stock.qty}</td>
//                 <td>{stock.avg.toFixed(2)}</td>
//                 <td>{stock.price.toFixed(2)}</td>
//                 <td className={profClass}>
//                   {" "}
//                   {(curValue - stock.avg * stock.qty).toFixed(2)}
//                 </td>
//                 <td className={dayClass}>{stock.day}.</td>
//               </tr>
//             );
//           })}
//         </table>
//       </div>
//     </>
//   );
// };

// export default Positions;

import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Filter,
  Layers,
} from "lucide-react";

// ── Mock data ──────────────────────────────────────────────────────────────
const mockPositions = [
  {
    product: "MIS",
    name: "RELIANCE",
    qty: 10,
    avg: 2410.5,
    price: 2561.3,
    day: "+0.83%",
    isLoss: false,
  },
  {
    product: "CNC",
    name: "INFY",
    qty: -25,
    avg: 1380.0,
    price: 1295.6,
    day: "-1.22%",
    isLoss: true,
  },
  {
    product: "MIS",
    name: "TCS",
    qty: 8,
    avg: 3540.0,
    price: 3812.9,
    day: "+0.44%",
    isLoss: false,
  },
  {
    product: "CNC",
    name: "HDFC",
    qty: -15,
    avg: 1620.0,
    price: 1587.4,
    day: "-0.37%",
    isLoss: true,
  },
  {
    product: "MIS",
    name: "WIPRO",
    qty: 50,
    avg: 412.0,
    price: 451.8,
    day: "+1.05%",
    isLoss: false,
  },
  {
    product: "CNC",
    name: "BAJFINANCE",
    qty: 5,
    avg: 6800.0,
    price: 7120.5,
    day: "+0.62%",
    isLoss: false,
  },
];

const PRODUCT_STYLES = {
  MIS: "bg-violet-50 text-violet-600 ring-1 ring-violet-200",
  CNC: "bg-sky-50    text-sky-600    ring-1 ring-sky-200",
  NRML: "bg-amber-50  text-amber-600  ring-1 ring-amber-200",
};

export default function Positions() {
  const [allPositions, setAllPositions] = useState(mockPositions);
  const [filter, setFilter] = useState("ALL");
  const [spinning, setSpinning] = useState(false);

  // Swap for real API:
  // useEffect(() => {
  //   axios_api.get("/allPositions").then(res => setAllPositions(res.data));
  // }, []);

  const handleRefresh = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 900);
  };

  const products = ["ALL", ...new Set(mockPositions.map((p) => p.product))];
  const filtered =
    filter === "ALL"
      ? allPositions
      : allPositions.filter((p) => p.product === filter);

  // ── Aggregate stats ────────────────────────────────────────────────────
  const totalPnl = allPositions.reduce(
    (s, p) => s + (p.price * p.qty - p.avg * p.qty),
    0,
  );
  const winners = allPositions.filter(
    (p) => (p.price - p.avg) * Math.sign(p.qty) >= 0,
  ).length;
  const losers = allPositions.length - winners;

  return (
    <div
      style={{ fontFamily: "'DM Mono', monospace" }}
      className="p-3 sm:p-6 space-y-5 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@600;700;800&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .row-in { animation: fadeUp 0.32s ease both; }
        .spin { animation: spin 0.8s linear; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-xl sm:text-2xl font-800 text-slate-900 dark:text-white tracking-tight"
          >
            Positions
          </h1>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
            {allPositions.length} open · intraday &amp; delivery
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 px-3 py-2 rounded-xl transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${spinning ? "spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* ── Summary cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            label: "Total P&L",
            value: `${totalPnl >= 0 ? "+" : ""}₹${Math.abs(totalPnl).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
            sub: totalPnl >= 0 ? "Net profit today" : "Net loss today",
            profit: totalPnl >= 0,
            delay: "0.05s",
          },
          {
            label: "Winning Legs",
            value: winners,
            sub: `${((winners / allPositions.length) * 100).toFixed(0)}% win rate`,
            profit: true,
            delay: "0.12s",
          },
          {
            label: "Losing Legs",
            value: losers,
            sub: `${losers} position${losers !== 1 ? "s" : ""} underwater`,
            profit: false,
            delay: "0.19s",
          },
        ].map(({ label, value, sub, profit, delay }) => (
          <div
            key={label}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow"
            style={{ animation: `fadeUp 0.4s ease both ${delay}` }}
          >
            <p
              className="text-[10px] tracking-[.14em] uppercase text-slate-400 mb-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {label}
            </p>
            <p
              className={`text-2xl font-700 leading-none mb-1.5 ${
                profit ? "text-emerald-600 dark:text-emerald-500" : "text-rose-500 dark:text-rose-400"
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {value}
            </p>
            <p className="text-[11px] text-slate-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-slate-400" />
        {products.map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={`text-[11px] font-500 px-3 py-1.5 rounded-full transition-all border ${
              filter === p
                ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100"
                : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50">
                {[
                  "Product",
                  "Instrument",
                  "Qty",
                  "Avg Cost",
                  "LTP",
                  "P&L",
                  "Day Chg.",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-[10px] font-600 tracking-[.12em] uppercase text-slate-400 whitespace-nowrap"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((pos, i) => {
                const curVal = pos.price * pos.qty;
                const pnlVal = curVal - pos.avg * pos.qty;
                const isLong = pos.qty >= 0;
                const isProfit = pnlVal >= 0;
                const pnlAbs = Math.abs(pnlVal);

                return (
                  <tr
                    key={i}
                    className="row-in border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50/70 dark:hover:bg-slate-800/70 transition-colors group"
                    style={{ animationDelay: `${0.04 + i * 0.055}s` }}
                  >
                    {/* Product */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`text-[10px] font-600 px-2 py-0.5 rounded ${PRODUCT_STYLES[pos.product] ?? PRODUCT_STYLES.MIS}`}
                      >
                        {pos.product}
                      </span>
                    </td>

                    {/* Instrument */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-1 h-6 rounded-full ${isLong ? "bg-emerald-400" : "bg-rose-400"}`}
                        />
                        <div>
                          <p className="text-sm font-600 text-slate-800 dark:text-slate-100">
                            {pos.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {isLong ? "LONG" : "SHORT"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Qty */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`font-500 ${isLong ? "text-emerald-600" : "text-rose-500"}`}
                      >
                        {isLong ? "+" : ""}
                        {pos.qty}
                      </span>
                    </td>

                    {/* Avg Cost */}
                    <td className="px-5 py-3.5 text-slate-600">
                      ₹{pos.avg.toFixed(2)}
                    </td>

                    {/* LTP */}
                    <td className="px-5 py-3.5 font-500 text-slate-800 dark:text-slate-100">
                      ₹{pos.price.toFixed(2)}
                    </td>

                    {/* P&L */}
                    <td className="px-5 py-3.5">
                      <div
                        className={`flex items-center gap-1 font-500 ${isProfit ? "text-emerald-600" : "text-rose-500"}`}
                      >
                        {isProfit ? (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5" />
                        )}
                        {isProfit ? "+" : "-"}₹{pnlAbs.toFixed(2)}
                      </div>
                    </td>

                    {/* Day Chg */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`text-xs font-500 flex items-center gap-0.5 ${
                          pos.isLoss ? "text-rose-500" : "text-emerald-600"
                        }`}
                      >
                        {pos.isLoss ? (
                          <TrendingDown className="w-3 h-3" />
                        ) : (
                          <TrendingUp className="w-3 h-3" />
                        )}
                        {pos.day}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Table footer ── */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Showing {filtered.length} of {allPositions.length} positions
          </p>
          <div
            className={`flex items-center gap-1.5 text-xs font-600 ${totalPnl >= 0 ? "text-emerald-600" : "text-rose-500"}`}
          >
            <Layers className="w-3.5 h-3.5" />
            Net P&L: {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
