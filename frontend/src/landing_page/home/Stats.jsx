import React from "react";
import { ArrowRight } from "lucide-react";

function Stats() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left Content */}
        <div>
          <h1 className="text-3xl font-bold mb-8">Trust with confidence</h1>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold">Customer-first always</h2>
              <p className="text-gray-600 mt-2">
                That's why 1.3+ crore customers trust TradeSim with ₹3.5+ lakh
                crores worth of equity investments.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">No spam or gimmicks</h2>
              <p className="text-gray-600 mt-2">
                No gimmicks, spam, "gamification", or annoying push
                notifications. High quality apps that you use at your pace, the
                way you like.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">The TradeSim universe</h2>
              <p className="text-gray-600 mt-2">
                Not just an app, but a whole ecosystem. Our investments in 30+
                fintech startups offer you tailored services specific to your
                needs.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Do better with money</h2>
              <p className="text-gray-600 mt-2">
                With initiatives like Nudge and Kill Switch, we don't just
                facilitate transactions, but actively help you do better with
                your money.
              </p>
            </div>
          </div>
        </div>

        {/* Right Image + Links */}
        <div className="flex flex-col items-center">
          <img src="images/ecosystem.png" alt="Ecosystem" className="w-11/12" />

          <div className="flex gap-10 mt-6">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
            >
              Explore our products <ArrowRight size={18} />
            </a>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
            >
              Try Kite <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
