import React from 'react';
import { formatCurrency } from '../utils/currency';

export default function ResultsPanel({ results, isLoading, hasRun }) {
  // Ensure all values are valid numbers
  const safeMinimumCost = parseFloat(results?.minimumCost) || 0;
  const safeEnergySaved = parseFloat(results?.energySaved) || 0;
  const safeCO2Reduction = parseFloat(results?.co2Reduction) || 0;
  const safeCO2Prevented = parseFloat(results?.co2Prevented) || 0;

  console.log('ResultsPanel received:', {
    minimumCost: safeMinimumCost,
    energySaved: safeEnergySaved,
    co2Reduction: safeCO2Reduction,
    co2Prevented: safeCO2Prevented,
    schedule: results?.schedule,
    hasRun
  });

  // Show placeholder if no optimization has been run
  if (!hasRun) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-5 md:p-8 text-center backdrop-blur-md shadow-lg">
          <p className="text-xl md:text-2xl text-gray-300">📊 Run optimization to see results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Eco Success Message - Hero Card */}
      {!isLoading && safeEnergySaved > 0 && (
        <div className="animate-slide-up bg-gradient-to-br from-emerald-500/25 via-emerald-500/15 to-teal-500/20 border border-emerald-400/40 rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:border-emerald-400/60 hover:-translate-y-1">
          <div className="flex flex-col items-center justify-center gap-3">
            <span className="text-4xl md:text-5xl">✨</span>
            <p className="text-lg md:text-2xl text-emerald-200 font-semibold">
              You reduced energy usage by
            </p>
            <p className="text-4xl md:text-5xl font-bold tracking-tight text-emerald-300">
              {safeEnergySaved?.toFixed(1) || '0'}%
            </p>
            <p className="text-lg text-emerald-300/80">🌿 Environmental impact achieved</p>
          </div>
        </div>
      )}

      {/* Stats Cards Grid - Premium Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Minimum Cost Card */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl p-4 md:p-5 group hover:from-white/8 hover:to-white/12 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-200 hover:scale-[1.01] animate-fade-in backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">💰 Minimum Cost</h3>
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-emerald-400 mb-2">
            {isLoading ? (
              <span className="inline-block h-10 w-32 bg-slate-700/50 rounded-lg animate-pulse"></span>
            ) : (
              formatCurrency(safeMinimumCost)
            )}
          </div>
          <p className="text-sm md:text-base text-gray-300">Monthly optimization potential</p>
        </div>

        {/* Energy Saved Card */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl p-4 md:p-5 group hover:from-white/8 hover:to-white/12 hover:border-teal-400/40 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-200 hover:scale-[1.01] animate-fade-in backdrop-blur-md" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">⚡ Energy Saved</h3>
          </div>
          <div className="text-3xl md:text-4xl font-bold tracking-tight text-teal-400 mb-2">
            {isLoading ? (
              <span className="inline-block h-10 w-32 bg-slate-700/50 rounded-lg animate-pulse"></span>
            ) : (
              `${safeEnergySaved?.toFixed(1) || '0'}%`
            )}
          </div>
          <p className="text-sm md:text-base text-gray-300">Consumption reduction</p>
        </div>

        {/* CO₂ Reduction Card */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl p-4 md:p-5 group hover:from-white/8 hover:to-white/12 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-200 hover:scale-[1.01] animate-fade-in backdrop-blur-md" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">🌍 CO₂ Prevented</h3>
          </div>
          <div className="text-3xl md:text-4xl font-bold tracking-tight text-cyan-400 mb-2">
            {isLoading ? (
              <span className="inline-block h-10 w-32 bg-slate-700/50 rounded-lg animate-pulse"></span>
            ) : (
              `${safeCO2Prevented?.toFixed(2) || '0.00'} kg`
            )}
          </div>
          <p className="text-sm md:text-base text-gray-300">Monthly CO₂ offset</p>
        </div>
      </div>

      {/* Optimal Schedule */}
      <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl p-4 md:p-5 animate-slide-up backdrop-blur-md shadow-lg">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-5 flex items-center gap-2">
          <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          📅 Optimal Schedule
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-24 bg-slate-700/50 rounded-xl animate-pulse"></div>
            ))
          ) : results?.schedule && Array.isArray(results.schedule) && results.schedule.length > 0 ? (
            results.schedule.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-lg p-3 md:p-4 text-left group hover:from-white/8 hover:to-white/12 hover:border-emerald-400/40 hover:shadow-md hover:shadow-emerald-500/10 transition-all duration-200 hover:scale-[1.01] animate-fade-in backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {item?.appliance || 'Unknown'}
                  </h4>
                  <span className="text-3xl">{getApplianceEmoji(item?.appliance || '')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-200">{item?.time || 'N/A'}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-8">
              <p className="text-sm">No schedule available. Try running optimization again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getApplianceEmoji(appliance) {
  const emojiMap = {
    'Washing Machine': '🌊',
    'Dishwasher': '🍽️',
    'Heater': '🔥',
    'EV Charger': '🔌',
    'Refrigerator': '❄️'
  };
  return emojiMap[appliance] || '⚙️';
}
