// import { Input } from "@/components/ui/input";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarProvider,
// } from "@/components/ui/sidebar";

// import { watchlist } from "../data/data";
// import WatchlistItem from "./WatchlistItem";
// import { DoughnutChart } from "../DoughnutChart";

// const WatchList = () => {
//   const data = {
//     labels: watchlist.map((stock) => stock.name),
//     datasets: [
//       {
//         label: "Price",
//         data: watchlist.map((stock) => stock.price),
//       },
//     ],
//   };

//   return (
//     <Sidebar>
//       <SidebarHeader>
//         <Input placeholder="Search symbol..." />
//         <p className="text-sm text-muted-foreground">
//           {watchlist.length} instruments
//         </p>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarContent>
//           <ul className="space-y-1">
//             {watchlist.map((stock) => (
//               <WatchlistItem key={stock.symbol} stock={stock} />
//             ))}
//           </ul>
//         </SidebarContent>

//         {/*
//         <div className="mt-6">
//           <DoughnutChart data={data} />
//         </div> */}
//       </SidebarContent>
//     </Sidebar>
//   );
// };

// export default WatchList;

import { memo, useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Plus,
  BarChart2,
  Bell,
  Star,
  SlidersHorizontal,
} from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { watchlist } from "../data/data";
import GeneralContext from "../GeneralContext";

// ── Mock data ──────────────────────────────────────────────────────────────
// const watchlist = [
//   {
//     symbol: "RELIANCE",
//     name: "Reliance Industries",
//     price: "2,561.30",
//     percent: "+0.83%",
//     isDown: false,
//   },
//   {
//     symbol: "INFY",
//     name: "Infosys Ltd",
//     price: "1,295.60",
//     percent: "-1.22%",
//     isDown: true,
//   },
//   {
//     symbol: "TCS",
//     name: "Tata Consultancy",
//     price: "3,812.90",
//     percent: "+0.44%",
//     isDown: false,
//   },
//   {
//     symbol: "HDFC",
//     name: "HDFC Bank",
//     price: "1,587.40",
//     percent: "-0.37%",
//     isDown: true,
//   },
//   {
//     symbol: "WIPRO",
//     name: "Wipro Ltd",
//     price: "451.80",
//     percent: "+1.05%",
//     isDown: false,
//   },
//   {
//     symbol: "BAJFIN",
//     name: "Bajaj Finance",
//     price: "7,120.50",
//     percent: "+0.62%",
//     isDown: false,
//   },
//   {
//     symbol: "AXISBANK",
//     name: "Axis Bank",
//     price: "1,045.20",
//     percent: "-0.91%",
//     isDown: true,
//   },
//   {
//     symbol: "ITC",
//     name: "ITC Limited",
//     price: "462.35",
//     percent: "+0.18%",
//     isDown: false,
//   },
// ];

// ── Watchlist Item ─────────────────────────────────────────────────────────
const WatchlistItem = ({ stock }) => {
  const [hovered, setHovered] = useState(false);
  const isUp = !stock.isDown;

  const generalContext = useContext(GeneralContext);

  const HandleBuyClick = () => {
    generalContext.openBuyWindow(stock.symbol);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <li
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 border ${
          hovered
            ? isUp
              ? "bg-emerald-50/70 border-emerald-100"
              : "bg-rose-50/70 border-rose-100"
            : "border-transparent hover:bg-slate-50"
        }`}
      >
        {/* Left */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-1 h-7 rounded-full flex-shrink-0 transition-colors ${isUp ? "bg-emerald-400" : "bg-rose-400"}`}
          />
          <div className="min-w-0">
            <p
              className={`text-sm font-600 leading-none tracking-wide ${isUp ? "text-emerald-700" : "text-rose-600"}`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {stock.symbol}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">
              {stock.name}
            </p>
          </div>
        </div>

        {/* Right: price or actions */}
        <div className="relative flex items-center">
          {/* Price (fades out on hover) */}
          <div
            className={`flex flex-col items-end transition-all duration-150 ${hovered ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <span className="text-sm font-500 text-slate-800 leading-none">
              ₹{stock.price}
            </span>
            <span
              className={`text-[11px] font-500 mt-0.5 flex items-center gap-0.5 ${isUp ? "text-emerald-500" : "text-rose-500"}`}
            >
              {isUp ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              {stock.percent}
            </span>
          </div>

          {/* Actions (slide in on hover) */}
          <div
            className={`absolute right-0 flex items-center gap-1 transition-all duration-150 ${
              hovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-3 pointer-events-none"
            }`}
          >
            {[
              {
                icon: Plus,
                tip: "Add order",
                color:
                  "hover:border-blue-300 hover:bg-blue-50 hover:text-blue-500",
                onClick: HandleBuyClick,
              },
              {
                icon: BarChart2,
                tip: "View chart",
                color:
                  "hover:border-violet-300 hover:bg-violet-50 hover:text-violet-500",
              },
              {
                icon: Bell,
                tip: "Set alert",
                color:
                  "hover:border-amber-300 hover:bg-amber-50 hover:text-amber-500",
              },
            ].map(({ icon: Icon, tip, color, onClick }) => (
              <Tooltip key={tip}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 rounded-lg bg-white border border-slate-200 shadow-sm text-slate-400 transition-all ${color}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClick?.();
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  {tip}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </li>
    </TooltipProvider>
  );
};

// ── Mini Sparkline (pure CSS bars) ────────────────────────────────────────
const MiniBar = ({ up, h }) => (
  <div
    className={`w-1 rounded-sm ${up ? "bg-emerald-400" : "bg-rose-400"}`}
    style={{ height: `${h}px` }}
  />
);

// ── Market Pulse strip ────────────────────────────────────────────────────
const pulseItems = [
  { label: "NIFTY 50", val: "24,386", chg: "+0.62%", up: true },
  { label: "SENSEX", val: "80,116", chg: "+0.54%", up: true },
  { label: "BANK NIFTY", val: "52,210", chg: "-0.31%", up: false },
];

// ── Main Sidebar ──────────────────────────────────────────────────────────
const WatchList = () => {
  const [query, setQuery] = useState("");
  const [starred, setStarred] = useState(new Set());

  const filtered = watchlist.filter(
    (s) =>
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase()),
  );

  const ups = watchlist.filter((s) => !s.isDown).length;
  const downs = watchlist.filter((s) => s.isDown).length;

  return (
    <Sidebar className="border-r border-slate-200 bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@600;700;800&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .item-in { animation: fadeUp 0.28s ease both; }
      `}</style>

      <SidebarHeader className="px-3 pt-4 pb-3 space-y-3 border-b border-slate-100">
        {/* Title row */}
        <div className="flex items-center justify-between px-1">
          <p
            className="text-sm font-700 text-slate-800"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Watchlist
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-0.5 rounded-full font-500">
              ▲ {ups}
            </span>
            <span className="text-[10px] bg-rose-50 text-rose-500 border border-rose-100 px-1.5 py-0.5 rounded-full font-500">
              ▼ {downs}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <Input
            placeholder="Search symbol..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8 pr-3 h-8 text-xs rounded-xl border-slate-200 bg-slate-50 focus:bg-white placeholder:text-slate-400"
            style={{ fontFamily: "'DM Mono', monospace" }}
          />
        </div>

        {/* Market pulse strip */}
        <div className="grid grid-cols-3 gap-1">
          {pulseItems.map(({ label, val, chg, up }) => (
            <div
              key={label}
              className={`rounded-lg px-2 py-1.5 ${up ? "bg-emerald-50/70" : "bg-rose-50/70"}`}
            >
              <p className="text-[9px] text-slate-400 leading-none mb-0.5 truncate">
                {label}
              </p>
              <p
                className="text-[11px] font-600 text-slate-700 leading-none"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {val}
              </p>
              <p
                className={`text-[9px] font-500 mt-0.5 ${up ? "text-emerald-600" : "text-rose-500"}`}
              >
                {chg}
              </p>
            </div>
          ))}
        </div>
      </SidebarHeader>

      <SidebarContent
        className="px-2 py-2"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <Search className="w-8 h-8 text-slate-200" />
            <p className="text-xs text-slate-400">No results for "{query}"</p>
          </div>
        ) : (
          <ul className="space-y-0.5">
            {filtered.map((stock, i) => (
              <WatchlistItem
                key={stock.symbol}
                // className="item-in"
                stock={stock}
                style={{ animationDelay: `${i * 0.04}s` }}
              />
              // <WatchlistItem stock={stock} />
            ))}
          </ul>
        )}

        {/* Footer count */}
        <div className="mt-3 px-3">
          <p className="text-[10px] text-slate-300 text-center">
            {filtered.length} of {watchlist.length} instruments
          </p>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default WatchList;
