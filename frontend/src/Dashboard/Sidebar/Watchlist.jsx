import { memo, useContext, useState, useEffect } from "react";
import { socket } from "../../network/socket_api";
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
    generalContext.openBuyWindow(stock);
  };

  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (stock.lastUpdated) {
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 500);
      return () => clearTimeout(timer);
    }
  }, [stock.price]);

  return (
    <TooltipProvider delayDuration={200}>
      <li
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-250 border ${
          flash
            ? isUp
              ? "bg-emerald-100/50 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/30"
              : "bg-rose-100/50 dark:bg-rose-500/20 border-rose-200 dark:border-rose-500/30"
            : hovered
              ? isUp
                ? "bg-emerald-50/70 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20"
                : "bg-rose-50/70 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20"
              : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-900"
        }`}
      >
        {/* Left */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-1 h-7 rounded-full flex-shrink-0 transition-colors ${isUp ? "bg-emerald-400" : "bg-rose-400"}`}
          />
          <div className="min-w-0">
            <p
              className={`text-sm font-600 leading-none tracking-wide ${isUp ? "text-emerald-700 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
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
            <span className="text-sm font-500 text-slate-800 dark:text-slate-100 leading-none">
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
                    className={`h-7 w-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-slate-400 transition-all ${color}`}
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
  const [list, setList] = useState(watchlist);

  useEffect(() => {
    socket.on("price_update", (data) => {
      console.log("Price update received:", data);
      setList((currentList) =>
        currentList.map((item) => {
          if (item.symbol === data.symbol) {
            const isDown = data.price < item.price;
            const change = ((data.price - item.price) / item.price) * 100;
            const percent = (change >= 0 ? "+" : "") + change.toFixed(2) + "%";

            return {
              ...item,
              price: data.price,
              percent: percent,
              isDown: isDown,
              lastUpdated: Date.now(),
            };
          }
          return item;
        }),
      );
    });

    return () => {
      socket.off("price_update");
    };
  }, []);

  const [starred, setStarred] = useState(new Set());

  const filtered = list.filter(
    (s) =>
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase()),
  );

  const symbols = [
    "RELIANCE",
    "TCS",
    "INFY",
    "ZOMATO",
    "WIPRO",
    "HDFC BANK",
    "Symbol",
  ];

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("Search stocks...");

  useEffect(() => {
    if (subIndex === symbols[index].length + 1 && !reverse) {
      setTimeout(() => {
        setReverse(true);
      }, 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % symbols.length);
      return;
    }

    const timeOut = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 75 : 100
    );

    return () => clearTimeout(timeOut);
  }, [subIndex, index, reverse]);

  const ups = list.filter((s) => !s.isDown).length;
  const downs = list.filter((s) => s.isDown).length;

  useEffect(() => {
    setPlaceHolder(`Search ${symbols[index].substring(0, subIndex)}`);
  }, [subIndex, index]);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@600;700;800&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .item-in { animation: fadeUp 0.28s ease both; }
      `}</style>

      <SidebarHeader className="px-3 pt-4 pb-3 space-y-3 border-b border-slate-100 dark:border-slate-800">
        {/* Title row */}
        <div className="flex items-center justify-between px-1">
          <p
            className="text-sm font-700 text-slate-800 dark:text-slate-100"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Watchlist
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[10px] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 px-1.5 py-0.5 rounded-full font-500">
              ▲ {ups}
            </span>
            <span className="text-[10px] bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-100 dark:border-rose-500/20 px-1.5 py-0.5 rounded-full font-500">
              ▼ {downs}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500 pointer-events-none transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 group-focus-within:rotate-[5deg]" />
          <Input
            placeholder={placeHolder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8 pr-3 h-8 text-xs rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-1 focus:ring-blue-500/20 transition-all"
            style={{ fontFamily: "'DM Mono', monospace" }}
          />
        </div>

        {/* Market pulse strip */}
        <div className="grid grid-cols-3 gap-1">
          {pulseItems.map(({ label, val, chg, up }) => (
            <div
              key={label}
              className={`rounded-lg px-2 py-1.5 ${up ? "bg-emerald-50/70 dark:bg-emerald-500/10" : "bg-rose-50/70 dark:bg-rose-500/10"}`}
            >
              <p className="text-[9px] text-slate-400 dark:text-slate-500 leading-none mb-0.5 truncate">
                {label}
              </p>
              <p
                className="text-[11px] font-600 text-slate-700 dark:text-slate-200 leading-none"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {val}
              </p>
              <p
                className={`text-[9px] font-500 mt-0.5 ${up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}
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
          <p className="text-[10px] text-slate-300 dark:text-slate-600 text-center">
            {filtered.length} of {watchlist.length} instruments
          </p>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default WatchList;
