import React from "react";

function Team() {
  return (
    <div className="max-w-6xl mx-auto px-6 border-t">
      {/* Title */}
      <div className="py-16">
        <h1 className="text-4xl text-center font-medium">People</h1>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center text-gray-600">
        {/* Left Column */}
        <div className="text-center space-y-6">
          <img
            src="images/nithinKamath.jpg"
            alt="Nithin Kamath"
            className="w-3/4 mx-auto rounded-full"
          />
          <h4 className="text-2xl font-semibold mt-6">Nithin Kamath</h4>
          <p className="text-lg">Founder, CEO</p>
        </div>

        {/* Right Column */}
        <div className="space-y-6 text-[1.15rem] leading-[1.8]">
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>

          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>

          <p>Playing basketball is his zen.</p>

          <p>
            Connect on{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Homepage
            </a>{" "}
            /{" "}
            <a href="#" className="text-blue-600 hover:underline">
              TradingQnA
            </a>{" "}
            /{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
