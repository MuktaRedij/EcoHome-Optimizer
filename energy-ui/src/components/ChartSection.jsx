import React, { useEffect, useMemo, useState } from 'react';

const SVG_WIDTH = 640;
const SVG_HEIGHT = 320;
const PAD = { top: 22, right: 18, bottom: 36, left: 62 };

export default function ChartSection({ data, isLoading, initialCost, finalCost }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(0);

  const normalized = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data
      .map((item, idx) => {
        const generation = Number(item?.generation ?? idx + 1);
        const cost = Number(item?.cost);
        if (!Number.isFinite(cost)) return null;
        return { generation, cost };
      })
      .filter(Boolean);
  }, [data]);

  const notEnoughData = normalized.length <= 1;
  const noImprovement =
    normalized.length > 1 &&
    Number.isFinite(initialCost) &&
    Number.isFinite(finalCost) &&
    finalCost >= initialCost;

  const yDomain = useMemo(() => {
    if (!normalized.length) return { min: 0, max: 100 };
    const values = normalized.map((d) => d.cost);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const range = Math.max(rawMax - rawMin, rawMax * 0.05, 1);
    const pad = range * 0.2;
    return { min: Math.max(0, rawMin - pad), max: rawMax + pad };
  }, [normalized]);

  const points = useMemo(() => {
    if (!normalized.length) return [];
    const chartW = SVG_WIDTH - PAD.left - PAD.right;
    const chartH = SVG_HEIGHT - PAD.top - PAD.bottom;
    const yRange = Math.max(1, yDomain.max - yDomain.min);
    const denom = Math.max(1, normalized.length - 1);

    return normalized.map((d, idx) => {
      const x = PAD.left + (idx / denom) * chartW;
      const y = PAD.top + ((yDomain.max - d.cost) / yRange) * chartH;
      return { ...d, x, y };
    });
  }, [normalized, yDomain]);

  useEffect(() => {
    setVisibleCount(0);
    if (!points.length) return undefined;

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= points.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [points]);

  const effectivePoints = useMemo(
    () => points.slice(0, Math.max(0, visibleCount)),
    [points, visibleCount],
  );

  const pathD = useMemo(() => {
    if (effectivePoints.length < 2) return '';
    const commands = [];

    for (let i = 0; i < effectivePoints.length; i += 1) {
      const p = effectivePoints[i];
      if (i === 0) {
        commands.push(`M ${p.x} ${p.y}`);
        continue;
      }
      const prev = effectivePoints[i - 1];
      const cx = (prev.x + p.x) / 2;
      commands.push(`Q ${cx} ${prev.y}, ${p.x} ${p.y}`);
    }

    return commands.join(' ');
  }, [effectivePoints]);

  if (isLoading) {
    return (
      <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 md:p-5">
        <h3 className="text-2xl font-bold text-white mb-8">Cost Optimization Trend</h3>
        <div className="h-96 bg-slate-700/30 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Cost Optimization Trend</h3>

      {notEnoughData ? (
        <div className="h-96 rounded-xl border border-slate-600/60 bg-slate-700/20 flex items-center justify-center text-center px-6">
          <p className="text-gray-300">Not enough data to display trend</p>
        </div>
      ) : (
        <>
          {noImprovement && (
            <div className="mb-4 rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
              No optimization improvement detected
            </div>
          )}

          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full h-auto min-h-96">
              <defs>
                <linearGradient id="trendLine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>

              {[0, 1, 2, 3, 4].map((tick) => {
                const y = PAD.top + ((SVG_HEIGHT - PAD.top - PAD.bottom) * tick) / 4;
                const value = yDomain.max - ((yDomain.max - yDomain.min) * tick) / 4;
                return (
                  <g key={tick}>
                    <line
                      x1={PAD.left}
                      x2={SVG_WIDTH - PAD.right}
                      y1={y}
                      y2={y}
                      stroke="#64748b"
                      strokeDasharray="4,4"
                      opacity="0.35"
                    />
                    <text x={PAD.left - 8} y={y + 4} textAnchor="end" fill="#94a3b8" fontSize="11">
                      ₹{Math.round(value).toLocaleString('en-IN')}
                    </text>
                  </g>
                );
              })}

              <line
                x1={PAD.left}
                x2={SVG_WIDTH - PAD.right}
                y1={SVG_HEIGHT - PAD.bottom}
                y2={SVG_HEIGHT - PAD.bottom}
                stroke="#64748b"
              />

              <path
                d={pathD}
                fill="none"
                stroke="url(#trendLine)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {effectivePoints.map((p, idx) => (
                <g key={`${p.generation}-${idx}`}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="11"
                    fill="transparent"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredIndex === idx ? 4.5 : 3}
                    fill={hoveredIndex === idx ? '#34d399' : '#60a5fa'}
                  />
                  {(idx === 0 || idx === effectivePoints.length - 1 || idx % Math.ceil(effectivePoints.length / 6) === 0) && (
                    <text x={p.x} y={SVG_HEIGHT - 12} textAnchor="middle" fill="#94a3b8" fontSize="11">
                      G{p.generation}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>

          {hoveredIndex !== null && effectivePoints[hoveredIndex] && (
            <div className="mt-3 text-sm text-slate-300">
              Generation {effectivePoints[hoveredIndex].generation}: ₹
              {Math.round(effectivePoints[hoveredIndex].cost).toLocaleString('en-IN')}
            </div>
          )}
        </>
      )}
    </div>
  );
}
