import React, { useEffect, useState } from "react";
import { SlotNumber } from "./utility/CountUp.jsx";
import { useAnimatedBars } from "./utility/animationBar.js";

const Hero = () => {
  const [randomNumber, setRandomNumber] = useState(Math.random().toFixed(2));

  useEffect(() => {
    setInterval(() => {
      setRandomNumber(Math.random().toFixed(2));
    }, 5000);
  }, []);

  const { bars, ref } = useAnimatedBars({
    finalBars: [35, 55, 45, 70, 60, 85, 100],
    scrambleDuration: 1500,
    easeDuration: 600,
    loopEvery: 4000,
    interval: 100,
  });

  return (
    <main className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-[#f7f9fb] text-gray-900">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-green-100 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE */}
        <div className="z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium mb-8 border">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Real-time Market Data Simulation
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Master the Markets <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Without the Risk
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-xl mb-10">
            Experience high-fidelity trading simulation with real-time data and
            professional-grade tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:scale-105 transition">
              Start Simulation
            </button>
            <button className="px-10 py-4 rounded-xl text-lg font-bold text-blue-600 hover:bg-gray-100 transition">
              Learn More →
            </button>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            Trusted by 50,000+ active traders
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative h-[500px] flex items-center justify-center">
          {/* Portfolio Card — slides up, then floats */}
          <div className="absolute animate-slide-up">
            <div className="w-[320px] bg-white rounded-xl p-6 shadow-xl border animate-float">
              <p className="text-xs text-gray-400 mb-1">Portfolio Balance</p>
              <h3 className="text-2xl font-bold text-gray-900">
                <SlotNumber
                  target={randomNumber * 10000}
                  magnitude="hundreds-thousands"
                  scrambleDuration={1500} // flipping chaos
                  easeDuration={600} // deceleration to target
                  loopEvery={4000} // full cycle length
                  interval={80} // flip speed
                  prefix="$"
                />
              </h3>

              {/* Mini bar chart */}
              <div ref={ref} className="flex items-end gap-1 h-14 my-4">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-[height] duration-100"
                    style={{
                      height: `${h}%`,
                      background: `hsl(${217 - i * 4}, ${70 + i * 3}%, ${75 - i * 6}%)`,
                    }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-400">Trades</p>
                  <p className="font-bold text-gray-900">
                    <SlotNumber
                      target={Math.floor(randomNumber * 100)}
                      magnitude="hundreds"
                      scrambleDuration={1500} // flipping chaos
                      easeDuration={600} // deceleration to target
                      loopEvery={4000} // full cycle length
                      interval={80} // flip speed
                      prefix=""
                    />
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-400">Win Rate</p>
                  <p className="font-bold text-green-600">
                    {/* {randomNumber} */}
                    <SlotNumber
                      target={randomNumber}
                      magnitude="hundreds"
                      scrambleDuration={1500} // flipping chaos
                      easeDuration={600} // deceleration to target
                      loopEvery={4000} // full cycle length
                      interval={80} // flip speed
                      prefix=""
                    />
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Orders Card — delayed slide up, tilting float */}
          <div className="absolute top-4 right-0 animate-slide-up-delay">
            <div className="w-[175px] bg-white rounded-xl p-4 shadow-md border animate-float-alt">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-gray-900">Live Orders</p>
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-gray-400">ASK</span>
                <span className="text-sm font-semibold text-red-500">
                  {/* 68,241.50 */}
                  <SlotNumber
                    target={randomNumber * 1000}
                    magnitude="hundreds-thousands"
                    scrambleDuration={1500} // flipping chaos
                    easeDuration={600} // deceleration to target
                    loopEvery={4000} // full cycle length
                    interval={80} // flip speed
                    prefix=""
                  />
                </span>
              </div>
              <div className="h-px bg-gray-100 mb-2" />
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] text-gray-400">BID</span>
                <span className="text-sm font-semibold text-green-600">
                  {/* 68,238.10 */}
                  <SlotNumber
                    target={randomNumber * 1000}
                    magnitude="hundreds-thousands"
                    scrambleDuration={1500} // flipping chaos
                    easeDuration={600} // deceleration to target
                    loopEvery={4000} // full cycle length
                    interval={80} // flip speed
                    prefix=""
                  />
                </span>
              </div>
              <div className="text-[10px] text-center text-gray-400">
                Spread: 3.40
              </div>
            </div>
          </div>

          {/* P&L Stat Card — fades in, counter-rotating float */}
          <div className="absolute bottom-10 right-2 animate-fade-in">
            <div className="w-[140px] bg-white rounded-xl p-3 shadow-md border animate-float-stat">
              <p className="text-[10px] text-gray-400 mb-1">Today's P&L</p>
              <p className="text-xl font-extrabold text-green-600">
                {/* +$2,341 */}
                <SlotNumber
                  target={randomNumber * 1000}
                  magnitude="hundreds-thousands"
                  scrambleDuration={1500} // flipping chaos
                  easeDuration={600} // deceleration to target
                  loopEvery={4000} // full cycle length
                  interval={80} // flip speed
                  prefix=""
                />{" "}
              </p>
              <p className="text-[10px] text-green-500 mt-0.5">
                ▲{" "}
                <SlotNumber
                  target={randomNumber * 100}
                  magnitude="hundreds"
                  scrambleDuration={1500} // flipping chaos
                  easeDuration={700} // deceleration to target
                  loopEvery={5000} // full cycle length
                  interval={80} // flip speed
                  prefix=""
                />
                %
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
