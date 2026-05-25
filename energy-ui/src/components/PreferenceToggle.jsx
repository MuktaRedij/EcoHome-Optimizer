import React, { useState, useEffect } from 'react';

export default function PreferenceToggle({ isEnabled, onToggle, description, dynamicHint }) {
  return (
    <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-green-500/30 rounded-2xl p-6 space-y-4 hover:border-green-500/50 transition-all duration-300 group">
      {/* Header with Label and Toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-2">🌱 Eco Mode</h3>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">{description}</p>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={onToggle}
          className={`
            relative flex-shrink-0 w-14 h-8 rounded-full 
            transition-all duration-300
            ${isEnabled 
              ? 'bg-gradient-to-r from-green-500 to-teal-500 shadow-lg shadow-green-500/30' 
              : 'bg-slate-600/60 hover:bg-slate-600'
            }
          `}
        >
          {/* Animated toggle knob */}
          <div
            className={`
              absolute top-1 w-6 h-6 bg-white rounded-full 
              transition-transform duration-300
              flex items-center justify-center
              ${isEnabled ? 'translate-x-7' : 'translate-x-1'}
              shadow-lg
            `}
          >
            {isEnabled ? (
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* Dynamic Hint (appears when enabled) */}
      {isEnabled && (
        <div className="mt-4 p-4 bg-green-500/10 border-l-2 border-green-500 rounded-lg animate-fade-in">
          <p className="text-sm text-green-300 font-semibold leading-relaxed">
            ⚡ {dynamicHint}
          </p>
        </div>
      )}

      {/* Static benefit list */}
      <div className="pt-3 border-t border-green-500/20 space-y-3">
        <div className="flex items-start gap-2">
          <span className="text-sm mt-0.5 flex-shrink-0 text-green-400">✓</span>
          <span className="text-sm text-gray-300">Lower carbon footprint</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-sm mt-0.5 flex-shrink-0 text-green-400">✓</span>
          <span className="text-sm text-gray-300">Shift load to off-peak hours</span>
        </div>
      </div>
    </div>
  );
}
