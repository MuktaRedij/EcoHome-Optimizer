import React, { useState, useEffect } from 'react';

export default function CO2Circle({ 
  percentage = 0, 
  label = "Reduced",
  size = 160, // 🔥 reduced for better balance
  progressColor = "#22c55e" // green-500 (better semantic)
}) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  const clampedPercentage = Math.max(0, Math.min(100, parseFloat(percentage) || 0));

  useEffect(() => {
    setAnimatedPercentage(clampedPercentage);
  }, [clampedPercentage]);

  const strokeWidth = 10;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center w-full">
      
      {/* 🔥 CENTER WRAPPER (important fix) */}
      <div className="relative flex items-center justify-center">

        {/* 🔥 SOFT GLOW BACKGROUND */}
        <div className="absolute w-40 h-40 rounded-full bg-green-500/10 blur-2xl" />

        <svg
          width={size}
          height={size}
          className="-rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1f2937" // darker gray for depth
            strokeWidth={strokeWidth}
          />

          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={progressColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 1.4s ease-out',
              filter: 'drop-shadow(0 0 6px rgba(34,197,94,0.6))'
            }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <div className="text-3xl font-bold text-green-400">
            {animatedPercentage.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400 tracking-wide">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}