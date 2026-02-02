import React from "react";

function Universe() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold mb-4">The Zerodha Universe</h1>
        <p className="text-gray-600 text-lg">
          Extend your trading and investment experience further with our partner
          platforms
        </p>
      </div>

      {/* Logos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-center">
        <div>
          <img
            src="images/smallcaseLogo.png"
            alt=""
            className="w-2/5 mx-auto"
          />
          <p className="text-gray-500 mt-4">Thematic investment platform</p>
        </div>

        <div>
          <img src="images/streakLogo.png" alt="" className="w-1/3 mx-auto" />
          <p className="text-gray-500 mt-4">Algo & strategy platform</p>
        </div>

        <div>
          <img
            src="images/sensibullLogo.svg"
            alt=""
            className="w-2/5 mx-auto"
          />
          <p className="text-gray-500 mt-4">Options trading platform</p>
        </div>

        <div>
          <img
            src="images/zerodhaFundhouse.png"
            alt=""
            className="w-2/5 mx-auto"
          />
          <p className="text-gray-500 mt-4">Asset management</p>
        </div>

        <div>
          <img src="images/goldenpiLogo.png" alt="" className="w-1/3 mx-auto" />
          <p className="text-gray-500 mt-4">Bonds trading platform</p>
        </div>

        <div>
          <img src="images/dittoLogo.png" alt="" className="w-1/4 mx-auto" />
          <p className="text-gray-500 mt-4">Insurance</p>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-16">
        <button className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition">
          Sign up Now
        </button>
      </div>
    </div>
  );
}

export default Universe;
