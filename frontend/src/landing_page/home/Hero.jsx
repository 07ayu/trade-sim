import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 mb-12">
      <div className="flex flex-col items-center text-center">
        <img src="images/homeHero.png" alt="HeroImg" className="mb-12" />

        <h1 className="mt-12 p-3 text-4xl font-bold">
          Enjoy Trading Without Risk
        </h1>

        <p className="p-3 text-lg text-gray-600">
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>

        <Link
          to="/signup"
          className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Sign up Now
        </Link>
      </div>
    </div>
  );
}

export default Hero;
