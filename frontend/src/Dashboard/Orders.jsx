import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDownRight,
  PackageOpen,
  RefreshCw,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { axios_api } from "@/network/axios_api";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "@/redux/slices/orderSlice";

// ── Mock data ──────────────────────────────────────────────────────────────
// const mockOrders = [
//   {
//     id: 1,
//     userId: "u1",
//     symbol: "RELIANCE",
//     side: "BUY",
//     quantity: 10,
//     remainingQuantity: 0,
//     price: 2561.3,
//     status: "FILLED",
//   },
//   {
//     id: 2,
//     userId: "u1",
//     symbol: "INFY",
//     side: "SELL",
//     quantity: 25,
//     remainingQuantity: 10,
//     price: 1295.6,
//     status: "PARTIALLY_FILLED",
//   },
//   {
//     id: 3,
//     userId: "u1",
//     symbol: "TCS",
//     side: "BUY",
//     quantity: 8,
//     remainingQuantity: 8,
//     price: 3812.9,
//     status: "PENDING",
//   },
//   {
//     id: 4,
//     userId: "u1",
//     symbol: "HDFC",
//     side: "SELL",
//     quantity: 15,
//     remainingQuantity: 0,
//     price: 1587.4,
//     status: "FILLED",
//   },
//   {
//     id: 5,
//     userId: "u1",
//     symbol: "WIPRO",
//     side: "BUY",
//     quantity: 50,
//     remainingQuantity: 50,
//     price: 451.8,
//     status: "CANCELLED",
//   },
// ];

const STATUS_CONFIG = {
  FILLED: {
    label: "Filled",
    classes: "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/25",
  },
  PARTIALLY_FILLED: {
    label: "Partial",
    classes: "bg-sky-500/10    text-sky-400    ring-1 ring-sky-500/25",
  },
  PENDING: {
    label: "Pending",
    classes: "bg-amber-500/10  text-amber-400  ring-1 ring-amber-500/25",
  },
  CANCELLED: {
    label: "Cancelled",
    classes: "bg-slate-500/10  text-slate-400  ring-1 ring-slate-500/25",
  },
};

const cols = [
  "Symbol",
  "Side",
  "Qty",
  "Remaining",
  "Price",
  "Status",
  "Fill %",
];

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4">
    <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
      <PackageOpen className="w-7 h-7 text-slate-400" />
    </div>
    <div className="text-center">
      <p
        className="text-sm font-semibold text-slate-700"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        No orders today
      </p>
      <p className="text-xs text-slate-400 mt-1">
        Your executed and open orders will appear here
      </p>
    </div>
    <Link to="/">
      <Button
        size="sm"
        className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-5 text-xs"
      >
        Start Trading
      </Button>
    </Link>
  </div>
);

const Orders = () => {
  const dispatch = useDispatch();
  const [allOrders, setAllOrders] = useState([]); // ✅ Start with empty array
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios_api.get("/orders");
      setAllOrders(res.data.orders);
      dispatch(setOrders(res.data.orders));
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  // Swap for real API:
  useEffect(() => {
    fetchOrders(); // This will set loading to true initially
  }, []);

  const statuses = [
    "ALL",
    "FILLED",
    "PARTIALLY_FILLED",
    "PENDING",
    "CANCELLED",
  ];
  const filtered =
    filter === "ALL" ? allOrders : allOrders.filter((o) => o.status === filter);
  const buys = allOrders.filter((o) => o.side === "BUY").length;
  const sells = allOrders.filter((o) => o.side === "SELL").length;
  const filled = allOrders.filter((o) => o.status === "FILLED").length;

  return (
    <div
      style={{ fontFamily: "'DM Mono', monospace" }}
      className="p-6 space-y-5 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@600;700;800&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .row-in { animation: fadeUp 0.3s ease both; }
        .fill-bar { transition: width 0.8s cubic-bezier(0.16,1,0.3,1); }
      `}</style>

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-2xl font-800 text-slate-900 dark:text-white tracking-tight"
          >
            Orders
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {allOrders.length} total · {buys} buys · {sells} sells
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            fetchOrders(); // ✅ Just call fetchOrders, don't toggle loading
          }}
          className="text-shadow-slate-50 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl gap-1.5 text-xs"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* ── Summary pills ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total Orders",
            value: allOrders.length,
            color: "text-slate-800",
          },
          { label: "Filled", value: filled, color: "text-emerald-600" },
          {
            label: "Open / Pending",
            value: allOrders.filter((o) => o.status === "PENDING").length,
            color: "text-amber-500",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm px-5 py-4"
          >
            <p
              className="text-[10px] tracking-[0.13em] uppercase text-slate-400 mb-1.5"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {label}
            </p>
            <p
              className={`text-2xl font-700 ${color} dark:text-white`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-3.5 h-3.5 text-slate-400" />
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-[11px] px-3 py-1.5 rounded-full font-500 transition-all border ${
              filter === s
                ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100"
                : "bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600"
            }`}
          >
            {s === "ALL" ? "All" : (STATUS_CONFIG[s]?.label ?? s)}
          </button>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
                  {cols.map((c) => (
                    <th
                      key={c}
                      className="px-5 py-3.5 text-left text-[10px] font-600 tracking-[0.12em] text-slate-400 uppercase whitespace-nowrap"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, i) => {
                  const isBuy = order.side === "BUY";
                  const cfg =
                    STATUS_CONFIG[order.status] ?? STATUS_CONFIG.PENDING;
                  const fillPct = Math.round(
                    ((order.quantity - order.remainingQuantity) /
                      order.quantity) *
                      100,
                  );

                  return (
                    <tr
                      key={order.id}
                      className="row-in border-b border-slate-50 hover:bg-slate-50/60 transition-colors"
                      style={{ animationDelay: `${i * 0.04}s` }}
                    >
                      {/* Symbol */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-1 h-6 rounded-full ${isBuy ? "bg-emerald-400" : "bg-rose-400"}`}
                          />
                          <span className="text-sm font-600 text-slate-800 dark:text-slate-100">
                            {order.symbol}
                          </span>
                        </div>
                      </td>

                      {/* Side */}
                      <td className="px-5 py-3.5">
                        <div
                          className={`inline-flex items-center gap-1 text-xs font-600 ${isBuy ? "text-emerald-600" : "text-rose-500"}`}
                        >
                          {isBuy ? (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowDownRight className="w-3.5 h-3.5" />
                          )}
                          {order.side}
                        </div>
                      </td>

                      {/* Qty */}
                      <td className="px-5 py-3.5 text-slate-700">
                        {order.quantity}
                      </td>

                      {/* Remaining */}
                      <td className="px-5 py-3.5">
                        <span
                          className={
                            order.remainingQuantity > 0
                              ? "text-amber-500 font-500"
                              : "text-slate-400"
                          }
                        >
                          {order.remainingQuantity}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-3.5 text-slate-800 dark:text-slate-100 font-500">
                        ₹{order.price.toFixed(2)}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-[11px] font-500 px-2.5 py-1 rounded-full ${cfg.classes}`}
                        >
                          {cfg.label}
                        </span>
                      </td>

                      {/* Fill % bar */}
                      <td className="px-5 py-3.5 min-w-[100px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`fill-bar h-full rounded-full ${fillPct === 100 ? "bg-emerald-400" : fillPct > 0 ? "bg-sky-400" : "bg-slate-300 dark:bg-slate-700"}`}
                              style={{ width: `${fillPct}%` }}
                            />
                          </div>
                          <span className="text-[11px] text-slate-400 w-8 text-right">
                            {fillPct}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
