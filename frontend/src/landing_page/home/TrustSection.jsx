import React, { useEffect, useRef } from "react";
import { SlotNumber } from "./utility/CountUp";

const tickers = [
  { sym: "AAPL", price: "189.42", change: "+1.24%", up: true },
  { sym: "TSLA", price: "248.91", change: "-0.87%", up: false },
  { sym: "BTC", price: "67,412", change: "+2.31%", up: true },
  { sym: "ETH", price: "3,841", change: "+1.09%", up: true },
  { sym: "NVDA", price: "875.20", change: "+3.42%", up: true },
  { sym: "AMZN", price: "182.15", change: "-0.33%", up: false },
  { sym: "MSFT", price: "415.60", change: "+0.78%", up: true },
  { sym: "SPY", price: "524.80", change: "+0.52%", up: true },
  { sym: "GOOG", price: "171.90", change: "-0.19%", up: false },
  { sym: "META", price: "508.44", change: "+1.87%", up: true },
];

const avatarColors = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#ef4444",
];
const avatarInitials = ["AK", "TR", "MJ", "SL", "RP", "DW", "CK"];

const initialFeed = [
  {
    ini: "AK",
    color: "#3b82f6",
    name: "Alex K.",
    action: "opened a LONG position on",
    asset: "NVDA",
    badge: "+$1,240",
    up: true,
    ago: "2s ago",
  },
  {
    ini: "SM",
    color: "#8b5cf6",
    name: "Sarah M.",
    action: "closed trade with profit on",
    asset: "BTC",
    badge: "+$3,820",
    up: true,
    ago: "14s ago",
  },
  {
    ini: "RP",
    color: "#f59e0b",
    name: "Raj P.",
    action: "set stop-loss on",
    asset: "TSLA",
    badge: "-$180",
    up: false,
    ago: "31s ago",
  },
  {
    ini: "DW",
    color: "#10b981",
    name: "Dana W.",
    action: "joined and received",
    asset: "$10,000",
    badge: "virtual",
    up: true,
    ago: "1m ago",
  },
  {
    ini: "CL",
    color: "#ec4899",
    name: "Chen L.",
    action: "hit win rate milestone on",
    asset: "ETH",
    badge: "75% WR",
    up: true,
    ago: "2m ago",
  },
];

const rotateFeed = [
  {
    ini: "OT",
    color: "#06b6d4",
    name: "Omar T.",
    action: "executed market order on",
    asset: "SPY",
    badge: "+$560",
    up: true,
  },
  {
    ini: "PS",
    color: "#ef4444",
    name: "Priya S.",
    action: "backtested strategy on",
    asset: "AAPL",
    badge: "+12.4%",
    up: true,
  },
];

function FeedItem({ item, isNew }) {
  return (
    <div
      className={`flex items-center gap-3 px-5 py-3 border-b border-gray-50 last:border-0 ${isNew ? "animate-slide-up" : ""}`}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
        style={{ background: item.color }}
      >
        {item.ini}
      </div>
      <p className="flex-1 text-xs text-gray-500 leading-snug">
        <span className="font-semibold text-gray-800">{item.name}</span>{" "}
        {item.action}{" "}
        <span className="font-semibold text-gray-800">{item.asset}</span>
      </p>
      <span
        className={`text-[10px] px-2 py-0.5 rounded font-medium ${item.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}
      >
        {item.badge}
      </span>
      {item.ago && (
        <span className="text-[10px] text-gray-300 font-mono shrink-0">
          {item.ago}
        </span>
      )}
    </div>
  );
}

const TrustSection = () => {
  const [feed, setFeed] = React.useState(initialFeed);
  const feedIndexRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      const item = {
        ...rotateFeed[feedIndexRef.current % rotateFeed.length],
        ago: "just now",
      };
      setFeed((prev) => [item, ...prev.slice(0, 4)]);
      feedIndexRef.current++;
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-[#f7f9fb] py-20 overflow-hidden">
      {/* Divider label */}
      <div className="flex items-center justify-center gap-4 mb-14 px-6">
        <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-transparent to-gray-200" />
        <span className="text-[11px] font-mono tracking-widest text-gray-400 uppercase whitespace-nowrap">
          Trusted by traders worldwide
        </span>
        <div className="flex-1 max-w-[120px] h-px bg-gradient-to-l from-transparent to-gray-200" />
      </div>

      {/* Stats grid */}
      <div className="mx-6 lg:mx-auto lg:max-w-5xl grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden mb-14">
        {[
          { label: "Simulated Volume", to: 2400, prefix: "$", suffix: "B+" },
          { label: "Active Traders", to: 50, prefix: "", suffix: "K+" },
          { label: "Trades Executed", to: 3.2, prefix: "", suffix: "M+" },
          { label: "Uptime", to: 99, prefix: "", suffix: ".9%" },
        ].map((s, i) => (
          <div key={i} className="bg-white py-7 px-6 text-center">
            <div className="text-3xl font-semibold text-gray-900 font-mono tracking-tight mb-1.5">
              <SlotNumber
                target={s.to}
                magnitude="hundreds"
                scrambleDuration={1200}
                easeDuration={500}
                loopEvery={5000}
                interval={60}
                prefix={s.prefix}
                suffix={s.suffix}
                delay={i * 120}
              />
            </div>
            <div className="text-xs text-gray-400 tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Ticker */}
      <div className="relative overflow-hidden border-y border-gray-100 bg-white py-3.5 mb-14">
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex w-max animate-[ticker_28s_linear_infinite]">
          {[...tickers, ...tickers].map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-8 border-r border-gray-100 last:border-0 whitespace-nowrap"
            >
              <span className="font-mono text-xs font-medium text-gray-800">
                {t.sym}
              </span>
              <span className="font-mono text-xs text-gray-400">{t.price}</span>
              <span
                className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${t.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}
              >
                {t.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Avatars + rating */}
      <div className="flex flex-col items-center gap-5 mb-14 px-6">
        <div className="flex items-center gap-4">
          <div className="flex">
            {avatarInitials.map((ini, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold -ml-2.5 first:ml-0"
                style={{ background: avatarColors[i] }}
              >
                {ini}
              </div>
            ))}
            <div className="w-9 h-9 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-gray-400 text-[10px] font-semibold -ml-2.5">
              +49K
            </div>
          </div>
          <div>
            <div className="text-amber-400 text-sm tracking-wide">★★★★★</div>
            <div className="text-xs text-gray-400 mt-0.5">
              4.9 / 5 from 2,400+ reviews
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center leading-relaxed max-w-md">
          Join{" "}
          <span className="font-semibold text-gray-800">50,000+ traders</span>{" "}
          who practice risk-free with real market data.
          <br />
          No credit card. No real money. Just pure simulation.
        </p>
      </div>

      {/* As seen in */}
      <div className="text-center mb-5">
        <p className="text-[11px] font-mono tracking-widest text-gray-300 uppercase mb-5">
          As seen in
        </p>
        <div className="flex items-center justify-center gap-10 flex-wrap px-6">
          {["Bloomberg", "TechCrunch", "Forbes", "CoinDesk", "Reuters"].map(
            (name) => (
              <span
                key={name}
                className="font-mono text-sm font-medium text-gray-300 hover:text-gray-400 transition-colors cursor-default"
              >
                {name}
              </span>
            ),
          )}
        </div>
      </div>

      {/* Live feed */}
      <div className="mx-6 lg:mx-auto lg:max-w-2xl mt-14 border border-gray-100 rounded-2xl bg-white overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold text-gray-800">
            Live Activity
          </span>
        </div>
        {feed.map((item, i) => (
          <FeedItem key={`${item.name}-${i}`} item={item} isNew={i === 0} />
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
