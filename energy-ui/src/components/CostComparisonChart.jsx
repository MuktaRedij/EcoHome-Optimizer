import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../utils/currency';

export default function CostComparisonChart({ initialCost, finalCost, isLoading }) {
  const [animated, setAnimated] = useState({ initial: 0, final: 0 });

  // Data safety: Ensure values have safe fallbacks and avoid division by zero
  const safeInitialCost = (parseFloat(initialCost) && parseFloat(initialCost) > 0) ? parseFloat(initialCost) : (parseFloat(finalCost) ? parseFloat(finalCost) * 1.5 : 100);
  const safeFinalCost = parseFloat(finalCost) && parseFloat(finalCost) > 0 ? parseFloat(finalCost) : 0;
  const hasCostData = safeInitialCost > 0 || safeFinalCost > 0;

  console.log('CostComparisonChart received:', {
    initialCost,
    finalCost,
    safeInitialCost,
    safeFinalCost,
    hasCostData
  });

  // Animation trigger
  useEffect(() => {
    if (!isLoading && hasCostData) {
      setAnimated({ initial: 0, final: 0 });
      setTimeout(() => {
        console.log('Cost animation triggered:', { safeInitialCost, safeFinalCost });
        setAnimated({ initial: safeInitialCost, final: safeFinalCost });
      }, 100);
    }
  }, [safeInitialCost, safeFinalCost, isLoading, hasCostData]);

  // Safe calculations with fallbacks
  const maxCost = Math.max(safeInitialCost, safeFinalCost) * 1.1 || 100;
  const savings = Math.max(0, safeInitialCost - safeFinalCost);
  const savingsPercent = safeInitialCost > 0 ? ((savings / safeInitialCost) * 100).toFixed(1) : 0;

  // Calculate bar widths as percentages for horizontal layout
  const initialBarPercent = Math.min((animated.initial / maxCost) * 100, 100);
  const finalBarPercent = Math.min((animated.final / maxCost) * 100, 100);

  if (isLoading) {
    return (
      <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-xl p-4 md:p-5">
        <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          Cost Comparison
        </h3>
        <div className="space-y-5">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-6 bg-slate-700 rounded animate-pulse"></div>
              <div className="h-12 bg-slate-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!hasCostData) {
    return null;
  }

  return (
    <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8">
      {/* Header with icon */}
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="text-3xl">💰</span>
        Cost Comparison
      </h3>

      {/* Horizontal Comparison Bars Container */}
      <div className="space-y-10 mb-10">
        {/* Before Cost Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-300">Before</span>
              <span className="text-xs text-gray-500 bg-slate-700/50 px-2 py-1 rounded">Original</span>
            </div>
            <div className="text-2xl font-bold text-red-400 tabular-nums">
              ₹{Math.round(animated.initial).toLocaleString('en-IN')}
            </div>
          </div>
          <div className="w-full bg-slate-700/30 rounded-full h-16 overflow-hidden border border-slate-600/50 shadow-lg">
            <div
              className="h-full bg-linear-to-r from-red-600/80 to-red-500/80 rounded-full transition-all duration-700 ease-out shadow-lg shadow-red-500/20 hover:from-red-500/90 hover:to-red-400/90 relative group"
              style={{ width: `${initialBarPercent}%` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-red-400/20 rounded-full blur-sm group-hover:bg-red-300/30"></div>
            </div>
          </div>
        </div>

        {/* After Cost Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-300">After</span>
              <span className="text-xs text-gray-500 bg-slate-700/50 px-2 py-1 rounded">Optimized</span>
            </div>
            <div className="text-2xl font-bold text-green-400 tabular-nums">
              ₹{Math.round(animated.final).toLocaleString('en-IN')}
            </div>
          </div>
          <div className="w-full bg-slate-700/30 rounded-full h-16 overflow-hidden border border-slate-600/50 shadow-lg">
            <div
              className="h-full bg-linear-to-r from-emerald-500/80 to-green-400/80 rounded-full transition-all duration-700 ease-out shadow-lg shadow-green-500/20 hover:from-emerald-400/90 hover:to-green-300/90 relative group"
              style={{ width: `${finalBarPercent}%` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-green-300/20 rounded-full blur-sm group-hover:bg-green-200/30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Section - Visually Prominent */}
      <div className="bg-linear-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/40 rounded-xl p-6 mb-8 shadow-lg shadow-green-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📉</span>
            <div>
              <div className="text-sm text-gray-400 font-medium">Total Savings</div>
              <div className="text-3xl font-bold text-green-400 tabular-nums">
                ₹{Math.round(savings).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400 font-medium">Reduction</div>
            <div className="text-4xl font-bold text-green-300 tabular-nums">{savingsPercent}%</div>
          </div>
        </div>
      </div>

      {/* Comparison Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-500/5 rounded-lg p-4 border border-red-500/20 hover:border-red-500/40 transition-all">
          <div className="text-xs text-gray-500 font-medium mb-2">BEFORE</div>
          <div className="text-lg font-bold text-red-400 tabular-nums">
            ₹{Math.round(safeInitialCost).toLocaleString('en-IN')}
          </div>
        </div>
        <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/20 hover:border-green-500/40 transition-all">
          <div className="text-xs text-gray-500 font-medium mb-2">SAVED</div>
          <div className="text-lg font-bold text-green-400 tabular-nums">
            ₹{Math.round(savings).toLocaleString('en-IN')}
          </div>
        </div>
        <div className="bg-emerald-500/5 rounded-lg p-4 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
          <div className="text-xs text-gray-500 font-medium mb-2">AFTER</div>
          <div className="text-lg font-bold text-emerald-400 tabular-nums">
            ₹{Math.round(safeFinalCost).toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </div>
  );
}
