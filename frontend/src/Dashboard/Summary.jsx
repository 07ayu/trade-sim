

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowUpRight,
  Plus,
  ArrowDownLeft,
  Activity,
  TrendingUp,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { axios_api } from "@/network/axios_api";

// ── Data ───────────────────────────────────────────────────────────────────
const equityCurve = [
  { t: "Jan", v: 82000 },
  { t: "Feb", v: 78500 },
  { t: "Mar", v: 85200 },
  { t: "Apr", v: 88000 },
  { t: "May", v: 84300 },
  { t: "Jun", v: 91000 },
  { t: "Jul", v: 97140 },
  { t: "Aug", v: 93000 },
  { t: "Sep", v: 105000 },
  { t: "Oct", v: 101200 },
  { t: "Nov", v: 118000 },
  { t: "Dec", v: 124500 },
];

const SECTORS = [
  { name: "IT Services", pct: 45, color: "#3b82f6" },
  { name: "Banking", pct: 25, color: "#6366f1" },
  { name: "Automobile", pct: 20, color: "#10b981" },
  { name: "Others", pct: 10, color: "#f59e0b" },
];

const ACTIVITY = [
  {
    time: "10:45:02",
    type: "BUY",
    instrument: "TCS",
    qty: 25,
    price: "3,845.00",
    status: "COMPLETED",
  },
  {
    time: "09:30:15",
    type: "SELL",
    instrument: "RELIANCE",
    qty: 10,
    price: "2,990.20",
    status: "COMPLETED",
  },
  {
    time: "09:15:44",
    type: "BUY",
    instrument: "AAPL",
    qty: 50,
    price: "188.90",
    status: "PENDING",
  },
];

const RANGES = ["1D", "1W", "1M", "1Y", "All"];

// ── Sub-components ─────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 shadow-xl">
      <p className="text-[11px] text-slate-400">{payload[0].payload.t}</p>
      <p className="text-sm font-semibold text-white">
        ₹{payload[0].value.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

const SentimentBar = () => {
  const pos = 68;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] text-slate-400 tracking-wider uppercase">
        <span>Fear</span>
        <span>Greed</span>
      </div>
      <div
        className="relative h-2 rounded-full overflow-hidden"
        style={{
          background:
            "linear-gradient(to right, #ef4444, #f59e0b, #84cc16, #22c55e)",
        }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md border-2 border-slate-800 transition-all"
          style={{ left: `calc(${pos}% - 6px)` }}
        />
      </div>
      <div className="flex justify-end">
        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full font-medium">
          Neutral-Bullish · {pos}
        </span>
      </div>
    </div>
  );
};

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const [range, setRange] = useState("1M");
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    axios_api
      .get("/ledger")
      .then((res) => {
        console.log(res.data);
        setBalance(res.data.cash);
        if (res < 0) setBalance(0);
      })
      .catch((err) => {
        console.log("error at fetching funds", err);
      });
  }, []);

  return (
    <div
      style={{ fontFamily: "'DM Mono', monospace" }}
      className="min-h-screen p-3 sm:p-5 space-y-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@600;700;800&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes barIn  { from{width:0} to{width:75%} }
        .a1{animation:fadeUp .4s ease both;animation-delay:.04s}
        .a2{animation:fadeUp .4s ease both;animation-delay:.10s}
        .a3{animation:fadeUp .4s ease both;animation-delay:.16s}
        .a4{animation:fadeUp .4s ease both;animation-delay:.22s}
        .a5{animation:fadeUp .4s ease both;animation-delay:.28s}
        .a6{animation:fadeUp .4s ease both;animation-delay:.34s}
        .goal-bar{animation:barIn 1.1s cubic-bezier(.16,1,.3,1) both;animation-delay:.6s}
        .card{background:white;border-radius:20px;border:1px solid rgba(226,232,240,.8);box-shadow:0 1px 6px rgba(0,0,0,.04)}
        .dark .card{background:#0f172a;border-color:rgba(30,41,59,.8);box-shadow:0 1px 6px rgba(0,0,0,.2)}
        .hover-lift{transition:box-shadow .2s,transform .2s}
        .hover-lift:hover{box-shadow:0 8px 28px rgba(0,0,0,.08);transform:translateY(-1px)}
        .dark .hover-lift:hover{box-shadow:0 8px 28px rgba(0,0,0,.3)}
      `}</style>

      {/* ══ LAYOUT GRID ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ── LEFT COL (2/3 on LG+) ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Balance Card */}
          <div className="a1 card hover-lift p-5">
            <p
              className="text-[10px] tracking-[.16em] uppercase text-slate-400 mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Virtual Available Balance
            </p>
              <div className="flex items-start sm:items-end justify-between flex-col sm:flex-row gap-4">
              <div>
                <div className="flex items-end gap-3">
                  <h2
                    className="text-4xl font-800 text-slate-900 dark:text-white tracking-tight leading-none"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    ₹{balance}
                  </h2>
                  <span className="flex items-center gap-1 text-emerald-500 text-[11px] sm:text-sm font-500 mb-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    +2.5% Today
                  </span>
                </div>
                <div className="flex gap-8 mt-3">
                  {[
                    ["Used Margin", "₹2,860.00"],
                    ["Total Collateral", "₹1,00,000.00"],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <p className="text-[10px] tracking-[.12em] uppercase text-slate-400">
                        {l}
                      </p>
                      <p className="text-sm font-500 text-slate-700 dark:text-slate-200 mt-0.5">
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2.5">
                <button className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-500 px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-blue-100">
                  <Plus className="w-4 h-4" /> Add Funds
                </button>
                <button className="flex items-center gap-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-500 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                  <ArrowDownLeft className="w-4 h-4" /> Withdraw
                </button>
              </div>
            </div>
          </div>

          {/* Equity Curve */}
          <div className="a2 card hover-lift p-5">
            <div className="flex items-center justify-between mb-4">
              <p
                className="text-sm font-700 text-slate-800 dark:text-slate-100"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Portfolio Equity Curve
              </p>
              <div className="flex gap-1">
                {RANGES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className={`text-[11px] font-500 px-2.5 py-1 rounded-lg transition-all ${
                      range === r
                        ? "bg-blue-500 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={180}>
              <AreaChart
                data={equityCurve}
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="t"
                  tick={{
                    fontSize: 10,
                    fill: "#94a3b8",
                    fontFamily: "DM Mono",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#eqGrad)"
                  dot={false}
                  activeDot={{ r: 4, fill: "#3b82f6" }}
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
              <div className="flex gap-8">
                <div>
                  <p className="text-[10px] tracking-[.12em] uppercase text-slate-400">
                    Portfolio Value
                  </p>
                  <p
                    className="text-base font-700 text-slate-800 dark:text-slate-100 mt-0.5"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    ₹1,24,500.00
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[.12em] uppercase text-slate-400">
                    Total Profit
                  </p>
                  <p
                    className="text-base font-700 text-emerald-600 mt-0.5"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    +₹24,500.00
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="goal-bar h-full bg-blue-400 rounded-full" />
                </div>
                <span className="text-[11px] text-slate-400">
                  Goal: 75% reached
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="a3 card hover-lift overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-slate-400" />
                <p
                  className="text-sm font-700 text-slate-800 dark:text-slate-100"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Recent Activity
                </p>
              </div>
              <Link
                className="text-[10px] sm:text-xs text-blue-500 hover:text-blue-600 font-500 flex items-center gap-0.5 transition-colors"
                to={"/dashboard/orders"}
              >
                View All <span className="hidden sm:inline">Orders</span> <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800">
                  {["Time", "Type", "Instrument", "Qty", "Price", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-2.5 text-left text-[10px] font-600 tracking-[.12em] uppercase text-slate-400"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {ACTIVITY.map((r, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50/60 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <td className="px-5 py-3 text-slate-400">{r.time}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-[10px] font-700 px-2 py-0.5 rounded ${
                          r.type === "BUY"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-rose-100 text-rose-500"
                        }`}
                      >
                        {r.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-500 text-slate-700 dark:text-slate-200">
                      {r.instrument}
                    </td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{r.qty}</td>
                    <td className="px-5 py-3 text-slate-700 dark:text-slate-200">₹{r.price}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-[10px] font-500 px-2.5 py-1 rounded-full ${
                          r.status === "COMPLETED"
                            ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                            : "bg-amber-50 text-amber-500 ring-1 ring-amber-200"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── RIGHT COL (1/3) ── */}
        <div className="space-y-4">
          {/* Sector Allocation */}
          <div className="a4 card hover-lift p-5">
            <p
              className="text-sm font-700 text-slate-800 dark:text-slate-100 mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Sector Allocation
            </p>
            <div className="flex justify-center mb-4">
              <div className="relative">
                <PieChart width={150} height={150}>
                  <Pie
                    data={SECTORS}
                    dataKey="pct"
                    cx={75}
                    cy={75}
                    innerRadius={48}
                    outerRadius={68}
                    strokeWidth={0}
                    paddingAngle={3}
                  >
                    {SECTORS.map((s, i) => (
                      <Cell key={i} fill={s.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-[9px] tracking-widest uppercase text-slate-400">
                    Total
                  </p>
                  <p
                    className="text-base font-700 text-slate-800 dark:text-white"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    ₹1.2L
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {SECTORS.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: s.color }}
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-300">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s.pct}%`, background: s.color }}
                      />
                    </div>
                    <span className="text-xs font-500 text-slate-500 dark:text-slate-400 w-7 text-right">
                      {s.pct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Sentiment */}
          <div className="a5 card hover-lift p-5 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <p
                className="text-sm font-700 text-slate-800 dark:text-slate-100"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Market Sentiment
              </p>
            </div>
            <SentimentBar />
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
              <p className="text-[11px] text-slate-500 leading-relaxed italic">
                "Markets showing strong support at 24,400. Consolidation
                expected before next move."
              </p>
            </div>
          </div>

          {/* Pro Console CTA */}
          <div
            className="a6 rounded-2xl p-5 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #1e3a5f 0%, #1e40af 60%, #2563eb 100%)",
            }}
          >
            {/* decorative circles */}
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border border-blue-400/20" />
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full border border-blue-300/15" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-blue-300" />
                <p
                  className="text-sm font-700 text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Pro Trading Console
                </p>
              </div>
              <p className="text-[11px] text-blue-200 leading-relaxed mb-4">
                Advanced charting, direct order book access, and real-time news
                streams.
              </p>
              <button
                className="w-full bg-white hover:bg-blue-50 text-blue-600 text-xs font-700 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Launch Console
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
