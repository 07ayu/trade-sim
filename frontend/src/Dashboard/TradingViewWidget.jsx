import React, { useEffect, useRef, memo } from "react";
import { useParams } from "react-router-dom";
import Orderbook from "./Orderbook/Orderbook";

function TradingViewWidget() {
  const { symbol } = useParams();
  const containerId = `tv-chart-${symbol || "default"}`;

  const getSymbol = () => {
    if (!symbol) return "NSE:NIFTY";
    if (symbol.includes(":")) return symbol;
    return `NASDAQ:${symbol.toUpperCase()}`;
  };

  useEffect(() => {
    // 1. Load the TradingView script if not present
    if (!window.TradingView) {
      const script = document.createElement("script");
      script.id = "tradingview-widget-loading-script";
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => createWidget();
      document.head.appendChild(script);
    } else {
      createWidget();
    }

    function createWidget() {
      if (document.getElementById(containerId) && window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: getSymbol(),
          interval: "D",
          timezone: "Etc/UTC",
          theme: document.documentElement.classList.contains("dark")
            ? "dark"
            : "light",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: containerId,
        });
      }
    }
  }, [symbol, containerId]);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] w-full bg-slate-50 dark:bg-slate-950 p-2 sm:p-4 gap-4 overflow-hidden">
      <div className="flex-[1.8] min-h-[400px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
        <div id={containerId} className="h-full w-full" />
      </div>

      <div className="flex-1 min-h-[280px]">
        <Orderbook symbol={symbol || "NIFTY"} />
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
