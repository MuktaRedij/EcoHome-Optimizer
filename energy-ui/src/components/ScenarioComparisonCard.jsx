import React from 'react';

export default function ScenarioComparisonCard({ comparison, hasRun }) {
  if (!hasRun || !comparison) return null;

  const ecoOn = Number(comparison.ecoOnCost) || 0;
  const ecoOff = Number(comparison.ecoOffCost) || 0;
  const co2On = Number(comparison.ecoOnCo2) || 0;
  const co2Off = Number(comparison.ecoOffCo2) || 0;

  const costDelta = ecoOff - ecoOn;
  const co2Delta = co2Off - co2On;

  return (
    // ✅ OUTER CARD ADDED (THIS WAS MISSING)
    <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/10 rounded-2xl p-6 md:p-7 backdrop-blur-lg shadow-xl animate-slide-up space-y-6">

      {/* HEADER */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 flex items-center gap-2">
          ⚖️ Scenario Comparison
        </h3>
        <p className="text-sm text-gray-400">
          Eco ON vs Eco OFF side-by-side
        </p>
      </div>

      {/* ================= MAIN CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Eco ON */}
        <div className="bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-white/5 border border-emerald-400/40 rounded-xl p-5 backdrop-blur-md shadow-md hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-200 hover:border-emerald-400/60 hover:scale-[1.01]">
          
          <div className="flex items-center gap-2 mb-5">
            <span className="text-2xl">🌱</span>
            <div>
              <h4 className="text-lg font-bold text-white">Eco ON</h4>
              <p className="text-xs text-emerald-300/70">Sustainability focused</p>
            </div>
          </div>

          <div className="mb-5 pb-5 border-b border-emerald-400/20">
            <p className="text-xs uppercase tracking-widest text-emerald-300/60 font-semibold mb-1">Optimized Cost</p>
            <p className="text-3xl font-bold text-emerald-300">₹{ecoOn.toFixed(2)}</p>
            <p className="text-xs text-emerald-300/70 mt-1">Monthly expense</p>
          </div>

          <div className="mb-4">
            <p className="text-xs uppercase tracking-widest text-emerald-300/60 font-semibold mb-1">Estimated CO₂</p>
            <p className="text-3xl font-bold text-emerald-400">{co2On.toFixed(2)} kg</p>
            <p className="text-xs text-emerald-300/70 mt-1">Monthly emissions</p>
          </div>

          <div className="bg-emerald-500/15 border border-emerald-400/30 rounded-lg px-3 py-2 text-center">
            <p className="text-xs font-semibold text-emerald-300">
              ✨ Prioritizes environmental impact
            </p>
          </div>
        </div>

        {/* Eco OFF */}
        <div className="bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-white/5 border border-amber-400/40 rounded-xl p-5 backdrop-blur-md shadow-md hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-200 hover:border-amber-400/60 hover:scale-[1.01]">
          
          <div className="flex items-center gap-2 mb-5">
            <span className="text-2xl">💰</span>
            <div>
              <h4 className="text-lg font-bold text-white">Eco OFF</h4>
              <p className="text-xs text-amber-300/70">Cost focused</p>
            </div>
          </div>

          <div className="mb-5 pb-5 border-b border-amber-400/20">
            <p className="text-xs uppercase tracking-widest text-amber-300/60 font-semibold mb-1">Optimized Cost</p>
            <p className="text-3xl font-bold text-amber-300">₹{ecoOff.toFixed(2)}</p>
            <p className="text-xs text-amber-300/70 mt-1">Monthly expense</p>
          </div>

          <div className="mb-4">
            <p className="text-xs uppercase tracking-widest text-amber-300/60 font-semibold mb-1">Estimated CO₂</p>
            <p className="text-3xl font-bold text-amber-400">{co2Off.toFixed(2)} kg</p>
            <p className="text-xs text-amber-300/70 mt-1">Monthly emissions</p>
          </div>

          <div className="bg-amber-500/15 border border-amber-400/30 rounded-lg px-3 py-2 text-center">
            <p className="text-xs font-semibold text-amber-300">
              💸 Prioritizes lowest costs
            </p>
          </div>
        </div>
      </div>

      {/* ================= DELTA SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-r from-slate-800/30 to-slate-900/30 border border-white/5 rounded-xl p-5">

        {/* Cost */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">
            Cost Comparison
          </p>

          <p className="text-2xl font-bold text-emerald-400 mb-2">
            ₹{Math.abs(costDelta).toFixed(2)}
          </p>

          <p className="text-xs text-gray-400 mb-3">
            Savings with Eco ON
          </p>

          <div className="inline-block bg-emerald-500/20 border border-emerald-400/40 rounded-lg px-3 py-1.5">
            <p className="text-xs font-semibold text-emerald-300">
              {costDelta >= 0 ? '🎯 Eco ON saves more' : '⚠️ Eco OFF saves more'}
            </p>
          </div>
        </div>

        {/* CO2 */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">
            CO₂ Comparison
          </p>

          <p className="text-2xl font-bold text-emerald-400 mb-2">
            {Math.abs(co2Delta).toFixed(2)} kg
          </p>

          <p className="text-xs text-gray-400 mb-3">
            Reduction with Eco ON
          </p>

          <div className="inline-block bg-emerald-500/20 border border-emerald-400/40 rounded-lg px-3 py-1.5">
            <p className="text-xs font-semibold text-emerald-300">
              {co2Delta >= 0 ? '🌿 Eco ON helps environment' : '⚠️ Eco OFF better for environment'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}