import React from "react";
import { ArrowRight } from "lucide-react";

function Education() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          <img src="images/education.svg" alt="Education" className="w-4/5" />
        </div>

        {/* Right Content */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Free and open market education
          </h1>

          <p className="text-gray-600 text-lg">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 mt-3 text-blue-600 font-medium hover:gap-3 transition-all"
          >
            Varsity <ArrowRight size={18} />
          </a>

          <p className="text-gray-600 text-lg mt-10">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 mt-3 text-blue-600 font-medium hover:gap-3 transition-all"
          >
            Trading Q&amp;A <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
