import React from 'react';

export default function SegmentedControl({ value, onChange, options, tooltip, description }) {
  return (
    <div className="bg-gradient-to-br from-indigo-500/10 to-sky-500/10 border border-indigo-500/30 rounded-2xl p-6 space-y-4 hover:border-indigo-500/50 transition-all duration-300 group">
      {/* Header */}
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">⚖️ Compare Scenarios</h3>
        <p className="text-sm md:text-base text-gray-300 leading-relaxed">{description}</p>
      </div>

      {/* Segmented Control */}
      <div className="relative flex gap-1 p-1 bg-slate-700/40 border border-slate-600/40 rounded-xl">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              flex-1 px-4 py-3 rounded-lg font-semibold text-sm md:text-base
              transition-all duration-300 relative z-10
              ${
                value === option.value
                  ? 'text-white'
                  : 'text-gray-300 hover:text-gray-200'
              }
            `}
            title={option.tooltip}
          >
            {option.label}
          </button>
        ))}

        {/* Animated background slider */}
        <div
          className="absolute inset-y-1 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/20 pointer-events-none"
          style={{
            width: `calc(${100 / options.length}% - 0.25rem)`,
            left: `${(options.findIndex(opt => opt.value === value) * 100) / options.length + 0.125}%`,
          }}
        />
      </div>

      {/* Tooltip / Helper Text */}
      {tooltip && (
        <div className="p-4 bg-indigo-500/10 border-l-2 border-indigo-500 rounded-lg">
          <p className="text-sm text-indigo-300 leading-relaxed">
            💡 {tooltip}
          </p>
        </div>
      )}

      {/* Dynamic explanation based on selection */}
      <div className="pt-3 border-t border-indigo-500/20">
        {value === false ? (
          <div className="space-y-2">
            <p className="text-base font-semibold text-gray-200">📊 Eco mode: OFF</p>
            <p className="text-sm text-gray-400">Optimizes purely for lowest cost</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-base font-semibold text-green-300">🌍 Eco mode: ON</p>
            <p className="text-sm text-gray-400">Balances cost with environmental impact</p>
          </div>
        )}
      </div>
    </div>
  );
}
