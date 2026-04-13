// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";
import { useParams } from "react-router-dom";

function TradingViewWidget() {
  const container = useRef();
  const { symbol } = useParams();

  // Clean symbol to ensure it's in a format TradingView likes (e.g. NSE:RELIANCE)
  // If no symbol is provided, default to NIFTY
  const formattedSymbol = symbol ? (symbol.includes(":") ? symbol : `NSE:${symbol}`) : "NSE:NIFTY";

  useEffect(() => {
    // Detect theme
    const isDark = document.documentElement.classList.contains("dark");
    const theme = isDark ? "dark" : "light";
    const bgColor = isDark ? "#020617" : "#ffffff"; // Slate 950 for dark, white for light

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: formattedSymbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme: theme,
      style: "1",
      locale: "en",
      backgroundColor: bgColor,
      gridColor: isDark ? "rgba(30, 41, 59, 0.1)" : "rgba(46, 46, 46, 0.06)",
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: true,
      details: true,
      hotlist: true,
      calendar: false,
      show_popup_button: true,
      popup_width: "1000",
      popup_height: "650",
      support_host: "https://www.tradingview.com"
    });

    const currentContainer = container.current;
    if (currentContainer) {
      currentContainer.innerHTML = ""; // Clear previous widget
      currentContainer.appendChild(script);
    }

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = "";
      }
    };
  }, [formattedSymbol]);

  return (
    <div 
      className="a1 flex flex-col h-[calc(100vh-3.5rem)] w-full bg-slate-50 dark:bg-slate-950 p-2 sm:p-4"
      style={{ animation: "fadeUp 0.4s ease both" }}
    >
      <div
        className="tradingview-widget-container flex-1 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm"
        ref={container}
      />
    </div>
  );
}

export default memo(TradingViewWidget);
