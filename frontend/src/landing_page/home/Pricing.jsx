import React from "react";
import { ArrowRight } from "lucide-react";

function Pricing() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Unbeatable pricing</h1>

          <p className="text-gray-600 text-lg mb-4">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
          >
            See pricing <ArrowRight size={18} />
          </a>
        </div>

        {/* Right Pricing Cards */}
        <div className="grid grid-cols-2 gap-6 text-center">
          <div className="border rounded-lg p-6">
            <h1 className="text-4xl font-bold mb-3">₹0</h1>
            <p className="text-gray-600">
              Free equity delivery and <br />
              direct mutual funds
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h1 className="text-4xl font-bold mb-3">₹20</h1>
            <p className="text-gray-600">Intraday and F&amp;O</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
