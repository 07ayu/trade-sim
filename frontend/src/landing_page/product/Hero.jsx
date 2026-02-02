import { ArrowRight } from "lucide-react";
import React from "react";

function Hero() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16  border-b mb-12">
      <div className=" text-center">
        <h1 className=" text-4xl font-bold">Technology</h1>
        <h3 className="text-gray-600 text-xl mt-4">
          Sleek, modern and intuitive trading platforms
        </h3>
        <p className="mt-4 text-lg">
          Check out our{" "}
          <a
            href="#"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
          >
            investment offerings <ArrowRight size={18} />
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;
