import React from 'react';

export default function InsightsPanel({
  insights = [],
  peakUsageReduction = 0,
  energySaved = 0,
  hasRun = false,
}) {
  if (!hasRun) return null;

  const safePeak = Number(peakUsageReduction) || 0;
  const safeEnergySaved = Number(energySaved) || 0;

  return (
    <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/10 rounded-2xl p-6 md:p-7 backdrop-blur-lg shadow-xl">

      {/* HEADER */}
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 flex items-center gap-2">
        💡 Insights
      </h3>

      {/* ================= METRICS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

        <div className="flex flex-col items-center justify-center text-center rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-5 hover:scale-[1.02] transition">
          <p className="text-xs uppercase tracking-widest text-emerald-300/70 mb-2">
            Cost Reduced
          </p>
          <p className="text-3xl md:text-4xl font-bold text-emerald-400">
            {safeEnergySaved.toFixed(1)}%
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center rounded-xl border border-indigo-400/30 bg-indigo-500/10 p-5 hover:scale-[1.02] transition">
          <p className="text-xs uppercase tracking-widest text-indigo-300/70 mb-2">
            Peak Reduction
          </p>
          <p className="text-3xl md:text-4xl font-bold text-indigo-400">
            {safePeak.toFixed(1)}%
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-5 hover:scale-[1.02] transition">
          <p className="text-xs uppercase tracking-widest text-cyan-300/70 mb-2">
            Strategy
          </p>
          <p className="text-base md:text-lg font-semibold text-cyan-300">
            Off-Peak Optimized
          </p>
        </div>
      </div>

      {/* ================= KEY FINDINGS ================= */}
      <div className="max-w-3xl mt-6">

  {/* HEADING */}
  <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">
    Key Findings
  </p>

  {/* 🔥 subtle separator for visual breathing */}
  <div className="h-px bg-white/10 opacity-60"></div>

  {/* 🔥 REAL SPACING */}
  <div className="mt-5 flex flex-col gap-4">

    {(Array.isArray(insights) ? insights : []).map((item, idx) => (
      <div
        key={`${item}-${idx}`}
        className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-all duration-200 hover:scale-[1.01] hover:shadow-md"
      >
        <div className="text-emerald-400 text-lg mt-0.5">
          ✨
        </div>

        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
          {item}
        </p>
      </div>
    ))}

  </div>
</div>
    </div>
  );
}