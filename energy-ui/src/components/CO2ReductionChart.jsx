import React, { useState, useEffect } from "react";

export default function CO2ReductionChart({
  co2Data,
  co2Prevented,
  co2Remaining,
}) {
  const resolvedCO2Data = co2Data ?? {
    prevented: parseFloat(co2Prevented) || 0,
    remaining: parseFloat(co2Remaining) || 0,
  };

  const [animatedCO2, setAnimatedCO2] = useState({
    prevented: 0,
    remaining: 0,
  });

  useEffect(() => {
    setAnimatedCO2(resolvedCO2Data);
  }, [resolvedCO2Data]);

  const total = resolvedCO2Data.prevented + resolvedCO2Data.remaining;
  const preventedPercent =
    total > 0 ? (resolvedCO2Data.prevented / total) * 100 : 0;

  // Circle config
  const radius = 85;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;

  const dashoffset =
    circumference - (preventedPercent / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/10 rounded-2xl shadow-xl backdrop-blur-lg h-full flex flex-col p-8">

      {/* Title */}
      <h3 className="text-2xl font-semibold text-white flex items-center gap-2 mb-6">
        🌍 CO₂ Reduction Impact
      </h3>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 gap-8">

        {/* BIG CIRCLE */}
        <div className="relative w-64 h-64">

          {/* Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-44 h-44 rounded-full bg-emerald-500/20 blur-3xl" />
          </div>

          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Background */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="rgb(51,65,85)"
              strokeWidth={strokeWidth}
              opacity="0.3"
            />

            {/* Progress */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              strokeLinecap="round"
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "100px 100px",
                transition: "stroke-dashoffset 1.4s ease-out",
                filter: "drop-shadow(0 0 10px rgba(34,197,94,0.5))",
              }}
            />

            <defs>
              <linearGradient id="gradient">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-400">
                {preventedPercent.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400 uppercase mt-1 tracking-wide">
                Reduced
              </div>
            </div>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="flex gap-6 w-full">

          {/* Prevented */}
          <div className="flex-1 min-h-[110px] rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-center transition hover:scale-[1.02]">
            <p className="text-sm text-emerald-300 mb-2">
              CO₂ Prevented
            </p>
            <p className="text-3xl font-semibold text-emerald-400">
              {animatedCO2.prevented.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              kg CO₂
            </p>
          </div>

          {/* Remaining */}
          <div className="flex-1 min-h-[110px] rounded-xl border border-white/20 bg-white/5 p-6 text-center transition hover:scale-[1.02]">
            <p className="text-sm text-gray-400 mb-2">
              CO₂ Remaining
            </p>
            <p className="text-3xl font-semibold text-white/80">
              {animatedCO2.remaining.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              kg CO₂
            </p>
          </div>
        </div>

        {/* MESSAGE */}
        <div className="w-full">
          <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-xl py-4 px-6 text-center">
            <p className="text-base text-emerald-300">
              ✨ You prevented{" "}
              <span className="font-semibold text-emerald-400">
                {animatedCO2.prevented.toFixed(2)} kg
              </span>{" "}
              of CO₂ emissions!
            </p>
            <p className="text-sm text-gray-400 mt-1">
              🌳 Equivalent to planting{" "}
              {Math.round(animatedCO2.prevented * 16)} trees
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}