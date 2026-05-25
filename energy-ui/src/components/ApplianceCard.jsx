import React from 'react';

const applianceIcons = {
  'Washing Machine': (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" opacity="0.3" />
      <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Dishwasher: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <rect x="6" y="3" width="12" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="9" y1="6" x2="9" y2="16" stroke="currentColor" strokeWidth="1" />
      <line x1="15" y1="6" x2="15" y2="16" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="20" r="1.5" fill="currentColor" />
    </svg>
  ),
  Heater: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 12c0-3 2-6 6-6s6 3 6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 14c0-2 1-4 4-4s4 2 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 16c0-1 0.5-2 2-2s2 1 2 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  'EV Charger': (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <rect x="5" y="8" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 10v6M10 12h4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8" y="4" width="8" height="2" fill="currentColor" opacity="0.5" />
    </svg>
  ),
};

const applianceDescriptions = {
  'Washing Machine': 'High energy usage, flexible scheduling',
  Dishwasher: 'Moderate energy, manual control',
  Heater: 'Peak consumption in winter',
  'EV Charger': 'Highest load, overnight preferred',
};

export default function ApplianceCard({ name, isSelected, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative p-4 rounded-2xl transition-all duration-300 
        group overflow-hidden
        ${
          isSelected
            ? 'bg-gradient-to-br from-green-500/20 to-teal-500/20 border-2 border-green-400/60 shadow-lg shadow-green-500/20'
            : 'bg-slate-700/40 border-2 border-slate-600/60 hover:border-slate-500/80 hover:bg-slate-700/60'
        }
      `}
    >
      {/* Animated background glow on hover (for selected state) */}
      {isSelected && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-green-400 to-teal-400 blur-xl" />
      )}

      <div className="relative z-10">
        {/* Header with Icon and Name */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`
              p-2 rounded-lg transition-all duration-300
              ${isSelected ? 'bg-green-500/30 text-green-300' : 'bg-slate-600/50 text-slate-400 group-hover:bg-slate-600 group-hover:text-slate-300'}
            `}
          >
            {applianceIcons[name] || <span className="text-base font-bold">⚙️</span>}
          </div>
          <div className="flex-1 text-left">
            <h3 className={`text-base md:text-lg font-semibold transition-colors duration-200 ${isSelected ? 'text-green-300' : 'text-gray-200 group-hover:text-white'}`}>
              {name}
            </h3>
          </div>
          {isSelected && (
            <div className="flex-shrink-0 pt-1">
              <svg className="w-5 h-5 text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Description */}
        <p className={`text-sm leading-relaxed transition-colors duration-200 ${isSelected ? 'text-green-200/90' : 'text-gray-400 group-hover:text-gray-300'}`}>
          {applianceDescriptions[name]}
        </p>
      </div>

      {/* Subtle hover lift effect */}
      {!isSelected && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
        }} />
      )}
    </button>
  );
}
