import React, { useState } from 'react';

export default function ConstraintCard({ appliance, constraint, onUpdate }) {
  const [tooltipShown, setTooltipShown] = useState(null);

  const formatTime = (hour) => {
    const h = hour % 24;
    const suffix = h >= 12 ? 'PM' : 'AM';
    const display = h % 12 === 0 ? 12 : h % 12;
    return `${String(display).padStart(2, '0')}:00 ${suffix}`;
  };

  const handleStartChange = (value) => {
    onUpdate(appliance, 'preferred_start', Number(value));
  };

  const handleEndChange = (value) => {
    onUpdate(appliance, 'preferred_end', Number(value));
  };

  const handleDurationChange = (value) => {
    onUpdate(appliance, 'duration_hours', Number(value));
  };

  const incrementDuration = () => {
    const newDuration = Math.min(constraint.duration_hours + 0.5, 8);
    handleDurationChange(newDuration);
  };

  const decrementDuration = () => {
    const newDuration = Math.max(constraint.duration_hours - 0.5, 0.5);
    handleDurationChange(newDuration);
  };

  return (
    <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/40 rounded-2xl p-6 space-y-5 hover:border-slate-500/60 transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-base md:text-lg font-semibold text-white">{appliance}</h4>
        <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors font-medium">
          {formatTime(constraint.preferred_start)} → {formatTime(constraint.preferred_end)}
        </span>
      </div>

      {/* Time Range Slider */}
      <div className="space-y-4">
        <div>
          <label className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-200">Preferred Start Time</span>
            <span className="text-sm text-green-400 font-mono font-semibold">{formatTime(constraint.preferred_start)}</span>
          </label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="23"
              value={constraint.preferred_start}
              onChange={(e) => handleStartChange(e.target.value)}
              onMouseEnter={() => setTooltipShown('start')}
              onMouseLeave={() => setTooltipShown(null)}
              className="w-full h-2 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition-all"
              style={{
                background: `linear-gradient(to right, rgb(34, 197, 94) 0%, rgb(34, 197, 94) ${(constraint.preferred_start / 23) * 100}%, rgb(71, 85, 105) ${(constraint.preferred_start / 23) * 100}%, rgb(71, 85, 105) 100%)`
              }}
            />
          </div>
        </div>

        <div>
          <label className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-200">Preferred End Time</span>
            <span className="text-sm text-teal-400 font-mono font-semibold">{formatTime(constraint.preferred_end)}</span>
          </label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="23"
              value={constraint.preferred_end}
              onChange={(e) => handleEndChange(e.target.value)}
              className="w-full h-2 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500 hover:accent-teal-400 transition-all"
              style={{
                background: `linear-gradient(to right, rgb(20, 184, 166) 0%, rgb(20, 184, 166) ${(constraint.preferred_end / 23) * 100}%, rgb(71, 85, 105) ${(constraint.preferred_end / 23) * 100}%, rgb(71, 85, 105) 100%)`
              }}
            />
          </div>
        </div>
      </div>

      {/* Duration Control */}
      <div className="space-y-4 pt-3 border-t border-slate-600/30">
        <label className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-200">Duration (hours)</span>
          <span className="text-sm text-blue-400 font-mono font-bold">{constraint.duration_hours.toFixed(1)}h</span>
        </label>

        <div className="flex items-center gap-3">
          {/* Minus Button */}
          <button
            onClick={decrementDuration}
            disabled={constraint.duration_hours <= 0.5}
            className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-600/50 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-gray-200 hover:text-white transition-all duration-200 flex items-center justify-center font-bold text-lg"
          >
            −
          </button>

          {/* Slider */}
          <input
            type="range"
            min="0.5"
            max="8"
            step="0.5"
            value={constraint.duration_hours}
            onChange={(e) => handleDurationChange(e.target.value)}
            className="flex-1 h-2 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
            style={{
              background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${((constraint.duration_hours - 0.5) / 7.5) * 100}%, rgb(71, 85, 105) ${((constraint.duration_hours - 0.5) / 7.5) * 100}%, rgb(71, 85, 105) 100%)`
            }}
          />

          {/* Plus Button */}
          <button
            onClick={incrementDuration}
            disabled={constraint.duration_hours >= 8}
            className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-600/50 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-gray-200 hover:text-white transition-all duration-200 flex items-center justify-center font-bold text-lg"
          >
            +
          </button>
        </div>

        {/* Helper text */}
        <p className="text-sm text-gray-400 leading-relaxed">
          💡 Select preferred usage window for optimal scheduling
        </p>
      </div>
    </div>
  );
}
