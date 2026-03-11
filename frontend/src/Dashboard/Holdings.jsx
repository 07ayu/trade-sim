// import React, { useState, useEffect } from "react";

// import axios from "axios";
// import { VerticalGraph } from "./VerticalChart";
// import { axios_api } from "../network/axios_api";

// // import { holdings } from "../Data/data";

// const Holdings = () => {
//   const [allHoldings, setAllHoldings] = useState([]);

//   useEffect(() => {
//     axios_api.get("/ledger/u1").then((res) => {
//       console.log(res.data.holdings);
//       setAllHoldings(res.data.holdings);
//     });
//   }, []);

//   const data = {
//     labels: allHoldings.map((stock) => stock.name),
//     datasets: [
//       {
//         label: "Stock Name",
//         data: allHoldings.map((stock) => stock.price),
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//       },
//     ],
//   };

//   return (
//     <>
//       <h3 className="title">Holdings ({allHoldings.length})</h3>

//       <div className="order-table">
//         <table>
//           <tr>
//             <th>Instrument</th>
//             <th>Qty.</th>
//             <th>Avg. cost</th>
//             <th>LTP</th>
//             <th>Cur. val</th>
//             <th>P&L</th>
//             <th>Net chg.</th>
//             <th>Day chg.</th>
//           </tr>

//           {allHoldings.map((stock, index) => {
//             const curValue = stock.price * stock.qty;
//             const isProfit = curValue - stock.avg * stock.qty >= 0.0;
//             const profClass = isProfit ? "profit" : "loss";
//             const dayClass = stock.isLoss ? "loss" : "profit";
//             return (
//               <tr key={index}>
//                 <td>{stock.name} </td>
//                 <td>{stock.qty}</td>
//                 <td>{/* {stock.avg.toFixed(2)} */}0</td>
//                 <td>{/* {stock.price.toFixed(2)} */}0</td>
//                 <td>{/* {curValue.toFixed(2)} */}0</td>
//                 <td className={profClass}>
//                   {" "}
//                   {(curValue - stock.avg * stock.qty).toFixed(2)}
//                 </td>
//                 <td className={profClass}>{stock.net}</td>
//                 <td className={dayClass}>{stock.day}.</td>
//               </tr>
//             );
//           })}
//         </table>
//       </div>

//       <div className="row">
//         <div className="col">
//           <h5>
//             29,875.<span>55</span>{" "}
//           </h5>
//           <p>Total investment</p>
//         </div>
//         <div className="col">
//           <h5>
//             31,428.<span>95</span>{" "}
//           </h5>
//           <p>Current value</p>
//         </div>
//         <div className="col">
//           <h5>1,553.40 (+5.20%)</h5>
//           <p>P&L</p>
//         </div>
//       </div>

//       <VerticalGraph data={data} />
//     </>
//   );
// };

// export default Holdings;

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { axios_api } from "@/network/axios_api";

// ── Mock data for preview ──────────────────────────────────────────────────
const mockHoldings = [
  {
    name: "RELIANCE",
    qty: 10,
    avg: 2410.5,
    price: 2561.3,
    net: "+2.14%",
    day: "+0.83%",
    isLoss: false,
  },
  {
    name: "INFY",
    qty: 25,
    avg: 1380.0,
    price: 1295.6,
    net: "-6.11%",
    day: "-1.22%",
    isLoss: true,
  },
  {
    name: "TCS",
    qty: 8,
    avg: 3540.0,
    price: 3812.9,
    net: "+7.71%",
    day: "+0.44%",
    isLoss: false,
  },
  {
    name: "HDFC",
    qty: 15,
    avg: 1620.0,
    price: 1587.4,
    net: "-2.01%",
    day: "-0.37%",
    isLoss: true,
  },
  {
    name: "WIPRO",
    qty: 50,
    avg: 412.0,
    price: 451.8,
    net: "+9.66%",
    day: "+1.05%",
    isLoss: false,
  },
];

// ── Custom Tooltip for chart ───────────────────────────────────────────────
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 shadow-xl">
      <p className="text-xs text-slate-400">{payload[0].payload.name}</p>
      <p className="text-sm font-semibold text-white">
        ₹{payload[0].value.toFixed(2)}
      </p>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────
const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState(mockHoldings);
  const [sortKey, setSortKey] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  // Replace with real API call:
  // useEffect(() => {
  //   axios_api
  //     .get("/ledger/u1")
  //     .then((res) => setAllHoldings(res.data.holdings));
  // }, []);

  const totalInvestment = allHoldings.reduce((s, h) => s + h.avg * h.qty, 0);
  const currentValue = allHoldings.reduce((s, h) => s + h.price * h.qty, 0);
  const pnl = currentValue - totalInvestment;
  const pnlPct = ((pnl / totalInvestment) * 100).toFixed(2);
  const isOverallProfit = pnl >= 0;

  const chartData = allHoldings.map((h) => ({
    name: h.name,
    value: +(h.price * h.qty).toFixed(2),
    profit: h.price >= h.avg,
  }));

  const cols = [
    { key: "name", label: "Instrument" },
    { key: "qty", label: "Qty" },
    { key: "avg", label: "Avg Cost" },
    { key: "price", label: "LTP" },
    { key: "cur", label: "Cur. Val" },
    { key: "pnl", label: "P&L" },
    { key: "net", label: "Net Chg." },
    { key: "day", label: "Day Chg." },
  ];

  return (
    <div
      style={{ fontFamily: "'DM Mono', monospace" }}
      className="p-6 space-y-5 bg-slate-50 min-h-screen"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@600;700;800&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .row-fade { animation: fadeUp 0.35s ease both; }
        .summary-card { animation: fadeUp 0.4s ease both; }
      `}</style>

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-2xl font-800 text-slate-900 tracking-tight"
          >
            Holdings
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {allHoldings.length} positions · Live prices
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Market Open
        </span>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Investment",
            value: `₹${totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
            sub: "Cost basis",
            delay: "0.05s",
            accent: "slate",
          },
          {
            label: "Current Value",
            value: `₹${currentValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
            sub: "Mark-to-market",
            delay: "0.12s",
            accent: "blue",
          },
          {
            label: "Overall P&L",
            value: `${isOverallProfit ? "+" : ""}₹${Math.abs(pnl).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
            sub: `${isOverallProfit ? "+" : ""}${pnlPct}% all time`,
            delay: "0.19s",
            accent: isOverallProfit ? "emerald" : "rose",
            profit: isOverallProfit,
          },
        ].map(({ label, value, sub, delay, accent, profit }) => (
          <div
            key={label}
            className="summary-card bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
            style={{ animationDelay: delay }}
          >
            <p
              className="text-[10px] tracking-[0.14em] uppercase text-slate-400 mb-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {label}
            </p>
            <p
              className={`text-xl font-semibold leading-none mb-1.5 ${
                profit === true
                  ? "text-emerald-600"
                  : profit === false
                    ? "text-rose-500"
                    : "text-slate-900"
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {value}
            </p>
            <p className="text-[11px] text-slate-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                {cols.map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => setSortKey(key)}
                    className="px-5 py-3.5 text-left text-[10px] font-600 tracking-[0.12em] text-slate-400 uppercase cursor-pointer hover:text-slate-600 select-none whitespace-nowrap transition-colors"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allHoldings.map((stock, i) => {
                const curVal = stock.price * stock.qty;
                const pnlVal = curVal - stock.avg * stock.qty || 0;
                const isProfit = pnlVal >= 0 || true;

                return (
                  <tr
                    key={i}
                    className="row-fade border-b border-slate-50 hover:bg-slate-50/70 transition-colors group"
                    style={{ animationDelay: `${0.05 + i * 0.06}s` }}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {/* Instrument */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-1 h-7 rounded-full ${isProfit ? "bg-emerald-400" : "bg-rose-400"}`}
                        />
                        <div>
                          <p className="font-600 text-slate-800 text-sm">
                            {stock.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            NSE · Equity
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{stock.qty}</td>
                    <td className="px-5 py-3.5 text-slate-600">
                      ₹{stock.avg.toFixed(2)}
                    </td>
                    <td className="px-5 py-3.5 text-slate-800 font-500">
                      ₹{stock.price.toFixed(2)}
                    </td>
                    <td className="px-5 py-3.5 text-slate-700">
                      ₹{curVal.toFixed(2)}
                    </td>
                    <td
                      className={`px-5 py-3.5 font-500 ${isProfit ? "text-emerald-600" : "text-rose-500"}`}
                    >
                      <div className="flex items-center gap-1">
                        {isProfit ? (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5" />
                        )}
                        {isProfit ? "+" : ""}₹{pnlVal.toFixed(2)}
                      </div>
                    </td>
                    <td
                      className={`px-5 py-3.5 font-500 ${isProfit ? "text-emerald-600" : "text-rose-500"}`}
                    >
                      {stock.net}
                    </td>
                    <td
                      className={`px-5 py-3.5 font-500 ${stock.isLoss ? "text-rose-500" : "text-emerald-600"}`}
                    >
                      {stock.day}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Chart ── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p
              style={{ fontFamily: "'Syne', sans-serif" }}
              className="text-sm font-700 text-slate-800"
            >
              Portfolio Breakdown
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Current value by holding
            </p>
          </div>
          <BarChart2 className="w-4 h-4 text-slate-300" />
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={chartData}
            barSize={32}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Mono" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.profit ? "#34d399" : "#f87171"}
                  opacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Holdings;
