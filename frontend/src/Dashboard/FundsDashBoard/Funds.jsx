import { axios_api } from "@/network/axios_api";
import { useEffect, useState } from "react";

const capitalLogs = [
  {
    date: "Oct 24, 2023",
    type: "Allocation",
    status: "Success",
    amount: "+$2,500.00",
    positive: true,
    icon: "↙",
  },
  {
    date: "Oct 21, 2023",
    type: "Market Order",
    status: "Pending",
    amount: "-$850.00",
    positive: false,
    icon: "↗",
  },
  {
    date: "Oct 18, 2023",
    type: "Profit Realized",
    status: "Success",
    amount: "+$1,200.00",
    positive: true,
    icon: "↙",
  },
  {
    date: "Oct 15, 2023",
    type: "Stop Loss",
    status: "Failed",
    amount: "-$3,000.00",
    positive: false,
    icon: "↗",
  },
];

const statusStyles = {
  Success: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
  Pending: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30",
  Failed: "bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30",
};

export default function FundsDashboard() {
  const buyingPower = 10000;
  const usedPercent = 75;

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios_api
      .get("/ledger")
      .then((res) => {
        setBalance(res.data.cash || 0);
        setTransactions(res.data.transactions || []);
      })
      .catch((err) => {
        console.error("error at fetching funds", err);
      });
  }, []);

  const handleRefill = () => {
    axios_api
      .post("/ledger/refill")
      .then((res) => {
        setBalance(res.data.user.cash);
        // Refresh transactions after refill
        axios_api
          .get("/ledger")
          .then((r) => setTransactions(r.data.transactions || []));
      })
      .catch((err) => {
        console.error("error at refilling funds", err);
      });
  };
  const handleReset = () => {
    axios_api
      .post("/ledger/reset")
      .then((res) => {
        setBalance(res.data.user.cash);
        setTransactions([]);
      })
      .catch((err) => {
        console.error("error at resetting funds", err);
      });
  };

  const getTransactionIcon = (type, amount) => {
    if (type === "refill" || type === "deposit") return "↙";
    if (type === "reset") return "↺";
    return amount > 0 ? "↙" : "↗";
  };

  const getStatusDisplay = (status) => {
    if (status === "completed") return "Success";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div
      style={{ fontFamily: "'DM Mono', 'Courier New', monospace" }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 p-3 sm:p-6"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes barFill {
          from { width: 0%; }
          to { width: 75%; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .card-hover { transition: box-shadow 0.2s, transform 0.2s; }
        .card-hover:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.09); transform: translateY(-1px); }
        .anim-1 { animation: fadeUp 0.5s ease both; animation-delay: 0.05s; }
        .anim-2 { animation: fadeUp 0.5s ease both; animation-delay: 0.15s; }
        .anim-3 { animation: fadeUp 0.5s ease both; animation-delay: 0.25s; }
        .anim-4 { animation: fadeUp 0.5s ease both; animation-delay: 0.35s; }
        .anim-count { animation: countUp 0.6s cubic-bezier(0.16,1,0.3,1) both; animation-delay: 0.1s; }
        .bar-fill { animation: barFill 1s cubic-bezier(0.16,1,0.3,1) both; animation-delay: 0.5s; }
      `}</style>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ── Virtual Capital Card ── */}
        <div className="md:col-span-2 anim-1">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm card-hover">
            <p
              style={{ fontFamily: "'Syne', sans-serif" }}
              className="text-[10px] font-700 tracking-[0.18em] text-slate-400 uppercase mb-2"
            >
              Virtual Capital
            </p>
            <div className="flex items-end justify-between">
              <div>
                <p
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  className="anim-count text-5xl font-800 text-slate-900 dark:text-white tracking-tight leading-none"
                >
                  $
                  {balance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="text-emerald-500 text-[11px] sm:text-sm">
                    ↑
                  </span>
                  <span className="text-emerald-500 text-[11px] sm:text-sm font-500">
                    +2.4% from last month
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 mt-4 sm:mt-0">
                <button
                  className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-[11px] sm:text-sm font-500 px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-blue-200"
                  onClick={handleRefill}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M1 4v6h6" />
                    <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
                  </svg>
                  Refill Capital
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] sm:text-sm font-500 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                  Reset Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Simulation Stats ── */}
        <div className="row-span-2 flex flex-col gap-4">
          <div className="anim-2 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-sm card-hover">
            <p
              style={{ fontFamily: "'Syne', sans-serif" }}
              className="text-sm font-700 text-slate-800 dark:text-white mb-4"
            >
              Simulation Stats
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
                <div>
                  <p
                    style={{ fontFamily: "'Syne', sans-serif" }}
                    className="text-sm font-600 text-slate-800 dark:text-slate-100"
                  >
                    Total Trades
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    142 positions closed
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div>
                  <p
                    style={{ fontFamily: "'Syne', sans-serif" }}
                    className="text-sm font-600 text-slate-800 dark:text-slate-100"
                  >
                    Win Rate
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    64.2% accuracy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Buying Power ── */}
          <div className="anim-3 bg-slate-900 rounded-2xl p-5 border border-slate-700 shadow-sm card-hover relative overflow-hidden">
            {/* decorative circle */}
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full border-4 border-slate-700/50 opacity-50" />
            <div className="absolute -right-2 -bottom-2 w-16 h-16 rounded-full border-4 border-slate-600/40 opacity-40" />

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-slate-400 tracking-wide">
                  Buying Power Usage
                </p>
                <span className="text-xs text-slate-400">
                  {usedPercent}% used
                </span>
              </div>
              <p
                style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-2xl font-700 text-white mb-3"
              >
                $
                {buyingPower.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <div className="w-full h-1.5 bg-slate-700 rounded-full mb-3 overflow-hidden">
                <div
                  className="bar-fill h-full bg-blue-500 rounded-full"
                  style={{ width: `${usedPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mb-4">
                Your buying power resets daily at market open.
              </p>
              <button className="w-full bg-white/10 hover:bg-white/15 text-white text-sm font-500 py-2.5 rounded-xl border border-white/10 transition-colors">
                Manage Leverage
              </button>
            </div>
          </div>
        </div>

        {/* ── Capital Logs ── */}
        <div className="col-span-1 md:col-span-2 anim-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm card-hover overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <p
                style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-sm font-700 text-slate-800 dark:text-white"
              >
                Capital Logs
              </p>
              <button className="text-sm text-blue-500 hover:text-blue-600 font-500 transition-colors">
                View All
              </button>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    {["Date", "Type", "Status", "Amount"].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-[10px] font-600 tracking-[0.12em] text-slate-400 uppercase"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((row, i) => {
                    const isPositive = row.amount > 0;
                    const statusDisplay = getStatusDisplay(row.status);

                    return (
                      <tr
                        key={row._id || i}
                        className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50/60 dark:hover:bg-slate-800/60 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                          {new Date(row.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm ${isPositive ? "text-emerald-500" : "text-rose-400"}`}
                            >
                              {getTransactionIcon(row.type, row.amount)}
                            </span>
                            <span className="text-sm text-slate-700 dark:text-slate-200 font-400 capitalize">
                              {row.description || row.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-500 px-2.5 py-1 rounded-full ${statusStyles[statusDisplay] || statusStyles.Success}`}
                          >
                            {statusDisplay}
                          </span>
                        </td>
                        <td
                          className={`px-6 py-4 text-sm font-500 text-right whitespace-nowrap ${isPositive ? "text-emerald-500" : "text-rose-400"}`}
                        >
                          {isPositive ? "+" : "-"}$
                          {Math.abs(row.amount).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    );
                  })}
                  {transactions.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-10 text-center text-slate-500 text-sm italic"
                      >
                        No transaction logs found for this account.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
