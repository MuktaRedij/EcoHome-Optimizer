import React, { useEffect, useState } from 'react';

// Appliance icons mapping
const applianceIcons = {
  'Air Conditioner': '❄️',
  'Washing Machine': '🧺',
  'Dishwasher': '🍽️',
  'Refrigerator': '🧊',
  'Water Heater': '🚿',
  'Oven': '🔥',
  'Microwave': '⚡',
  'Lighting': '💡',
  'Television': '📺',
  'Computer': '💻'
};

export default function EnergyByApplianceChart({ data, isLoading }) {
  const [animatedPercentages, setAnimatedPercentages] = useState({});

  // Defensive checks for data safety - ensure all values are numbers
  const hasData = data && typeof data === 'object' && Object.keys(data).length > 0;
  
  // Parse all energy values as numbers
  const parsedData = hasData
    ? Object.entries(data).reduce((acc, [key, value]) => {
        const numValue = parseFloat(value) || 0;
        acc[key] = numValue > 0 ? numValue : 0;
        return acc;
      }, {})
    : {};

  // Fix scaling logic - calculate max energy with proper fallback
  const energyValues = Object.values(parsedData);
  const maxEnergy = energyValues.length > 0
    ? Math.max(...energyValues, 0.1) // Ensure at least 0.1 to avoid division by zero
    : 1;

  // Calculate percentages for each appliance
  const percentages = Object.entries(parsedData).reduce((acc, [key, value]) => {
    acc[key] = (value / maxEnergy) * 100;
    return acc;
  }, {});

  // Animation trigger
  useEffect(() => {
    if (hasData && !isLoading) {
      setAnimatedPercentages({});
      setTimeout(() => {
        setAnimatedPercentages(percentages);
      }, 100);
    }
  }, [hasData, isLoading, JSON.stringify(percentages)]);

  // Calculate total energy and contributions
  const totalEnergy = Object.values(parsedData).reduce((a, b) => a + b, 0);

  const getApplianceIcon = (name) => {
    return applianceIcons[name] || '⚙️';
  };

  if (isLoading) {
    return (
      <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-orange-500/20 rounded-xl p-4 md:p-5">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <span className="text-3xl">⚡</span>
          Energy Usage by Appliance
        </h3>
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-5 bg-slate-700 rounded animate-pulse w-1/4"></div>
              <div className="h-10 bg-slate-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!hasData) {
    return null;
  }

  return (
    <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-8">
      {/* Header */}
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="text-3xl">⚡</span>
        Energy Usage by Appliance
      </h3>

      {/* Horizontal Bars Container */}
      <div className="space-y-6 mb-10">
        {Object.entries(parsedData).map(([appliance, energy], index) => {
          const percentage = animatedPercentages[appliance] || 0;
          const contribution = totalEnergy > 0 ? ((energy / totalEnergy) * 100).toFixed(1) : 0;
          const icon = getApplianceIcon(appliance);

          return (
            <div key={index} className="space-y-2">
              {/* Label and Value Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm font-medium text-gray-300 truncate">
                    {appliance}
                  </span>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-400 tabular-nums">
                      {energy.toFixed(2)} kWh
                    </div>
                    <div className="text-xs text-gray-500">
                      {contribution}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Horizontal Bar */}
              <div className="w-full bg-slate-700/30 rounded-full h-8 overflow-hidden border border-slate-600/50 shadow-md group hover:shadow-lg hover:shadow-orange-500/20 transition-all">
                <div
                  className="h-full bg-linear-to-r from-orange-500/80 to-yellow-400/80 rounded-full transition-all duration-700 ease-out relative group-hover:from-orange-400/90 group-hover:to-yellow-300/90"
                  style={{ width: `${percentage}%` }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-yellow-200/20 rounded-full blur-sm group-hover:bg-yellow-100/30"></div>

                  {/* Value inside bar for larger bars */}
                  {percentage > 15 && (
                    <div className="h-full flex items-center justify-end pr-3 text-xs font-semibold text-gray-900">
                      {percentage.toFixed(0)}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      {totalEnergy > 0 && (
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-700/50">
          <div className="bg-orange-500/5 rounded-lg p-4 border border-orange-500/20">
            <div className="text-xs text-gray-500 font-medium mb-2">TOTAL ENERGY</div>
            <div className="text-2xl font-bold text-orange-400 tabular-nums">
              {totalEnergy.toFixed(2)} kWh
            </div>
          </div>
          <div className="bg-yellow-500/5 rounded-lg p-4 border border-yellow-500/20">
            <div className="text-xs text-gray-500 font-medium mb-2">APPLIANCES</div>
            <div className="text-2xl font-bold text-yellow-400">
              {Object.keys(parsedData).length}
            </div>
          </div>
        </div>
      )}

      {/* Top Consumer Highlight */}
      {totalEnergy > 0 && (
        <div className="mt-6 p-4 bg-linear-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-lg">
          <div className="text-xs text-gray-400 font-medium mb-2">TOP CONSUMER</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {getApplianceIcon(
                Object.entries(parsedData).reduce((a, b) => 
                  b[1] > a[1] ? b : a
                )[0]
              )}
            </span>
            <div>
              <div className="font-semibold text-white">
                {Object.entries(parsedData).reduce((a, b) => 
                  b[1] > a[1] ? b : a
                )[0]}
              </div>
              <div className="text-sm text-orange-400">
                {(Object.entries(parsedData).reduce((a, b) => 
                  b[1] > a[1] ? b : a
                )[1] / totalEnergy * 100).toFixed(1)}% of total
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
