import React from "react";

function Hero() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Heading */}
      <div className="text-center border-b pb-16 mb-16">
        <h1 className="text-5xl font-bold mb-6">₹ Pricing</h1>

        <h3 className="text-gray-600 text-xl">
          Free equity investments and flat ₹20 intraday and F&amp;O trades
        </h3>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-12 text-center">
        <div className="px-6">
          <img src="images/pricing0.svg" alt="" className="mx-auto mb-6" />
          <h3 className="text-xl font-semibold mb-3">Free equity delivery</h3>
          <p className="text-gray-600">
            All equity delivery investments (NSE, BSE) are absolutely free — ₹0
            brokerage.
          </p>
        </div>

        <div className="px-6">
          <img
            src="images/intradayTrades.svg"
            alt=""
            className="mx-auto mb-6"
          />
          <h3 className="text-xl font-semibold mb-3">
            Intraday and F&amp;O trades
          </h3>
          <p className="text-gray-600">
            Flat ₹20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity.
          </p>
        </div>

        <div className="px-6">
          <img src="images/pricing0.svg" alt="" className="mx-auto mb-6" />
          <h3 className="text-xl font-semibold mb-3">Free direct MF</h3>
          <p className="text-gray-600">
            All direct mutual fund investments are absolutely free — ₹0
            commissions & DP charges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
