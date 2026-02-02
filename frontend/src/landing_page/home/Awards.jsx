import React from "react";

function Awards() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="p-6">
          <img
            src="images/largestBroker.svg"
            alt="Largest Broker"
            className="w-full"
          />
        </div>

        {/* Right Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold">Largest Stock broker in India</h1>

          <p className="mt-4 mb-8 text-gray-600 text-lg">
            2+ million TradeSim clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>

          {/* Two column list */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              <li>Future and Options</li>
              <li>Commodity</li>
              <li>Currency derivatives</li>
            </ul>

            <ul className="space-y-3 list-disc list-inside text-gray-700">
              <li>Stocks & IPOs</li>
              <li>Direct mutual funds</li>
              <li>Bonds and Govt. Securities</li>
            </ul>
          </div>

          <img
            src="images/pressLogos.png"
            alt="Press Logos"
            className="w-[90%]"
          />
        </div>
      </div>
    </div>
  );
}

export default Awards;
