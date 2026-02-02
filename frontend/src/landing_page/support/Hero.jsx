import React from "react";

function Hero() {
  return (
    <section className="w-full bg-blue-500 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-12">
          <h4 className="text-xl font-semibold">Support Portal</h4>
          <a href="#" className="text-gray-400 font-medium hover:underline">
            Track Tickets
          </a>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Side */}
          <div>
            <h1 className="text-2xl font-bold mb-6">
              Search for an answer or browse help topics to create a ticket
            </h1>

            <input
              type="text"
              placeholder="Eg. how do I activate F&O"
              className="w-full border rounded-md px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex flex-wrap gap-4 text-blue-600">
              <a href="#" className="text-gray-400 hover:underline">
                Track account opening
              </a>
              <a href="#" className=" text-gray-400 hover:underline">
                Track segment activation
              </a>
              <a href="#" className="text-gray-400 hover:underline">
                Intraday margins
              </a>
              <a href="#" className="text-gray-400 hover:underline">
                Kite user manual
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div>
            <h1 className="text-2xl font-bold mb-6">Featured</h1>

            <ol className="space-y-4 list-decimal list-inside text-gray-400">
              <li>
                <a href="#" className="text-gray-400 hover:underline">
                  Current Takeovers and Delisting - January 2024
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:underline">
                  Latest Intraday leverages - MIS & CO
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
