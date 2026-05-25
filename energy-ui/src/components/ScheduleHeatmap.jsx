import React from 'react';

const HOURS = Array.from({ length: 24 }, (_, h) => h);

function intensityClass(value) {
  if (value >= 1) return 'bg-emerald-400/80';
  if (value >= 0.5) return 'bg-emerald-400/50';
  if (value > 0) return 'bg-emerald-400/25';
  return 'bg-slate-700/40';
}

export default function ScheduleHeatmap({ schedule = [], isLoading }) {
  const appliances = Array.from(new Set((schedule || []).map((item) => item.appliance)));

  const matrix = appliances.map((appliance) => {
    const row = Array(24).fill(0);
    const item = (schedule || []).find((s) => s.appliance === appliance);
    if (!item) return { appliance, row };

    let start = Number(item.startHour);
    if (!Number.isFinite(start)) {
      const t = String(item.time || '00:00 AM');
      const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (m) {
        let h = Number(m[1]);
        const period = (m[3] || '').toUpperCase();
        if (period === 'PM' && h !== 12) h += 12;
        if (period === 'AM' && h === 12) h = 0;
        start = h;
      } else {
        start = 0;
      }
    }

    let remaining = Number(item.durationHours) || 1;
    let slot = 0;
    while (remaining > 1e-9) {
      const hour = (start + slot) % 24;
      const slice = Math.min(1, remaining);
      row[hour] += slice;
      remaining -= slice;
      slot += 1;
    }

    return { appliance, row };
  });

  return (
    <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-teal-500/20 rounded-xl p-4 md:p-5">
      <h3 className="text-lg md:text-xl font-bold text-white mb-3">Schedule Heatmap</h3>

      {isLoading ? (
        <div className="h-32 rounded-lg bg-slate-700/30 animate-pulse" />
      ) : appliances.length === 0 ? (
        <div className="text-slate-400 text-xs md:text-sm">Run optimization to see appliance-time heatmap.</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid" style={{ gridTemplateColumns: '160px repeat(24, minmax(22px, 1fr))' }}>
              <div className="text-xs text-slate-400 mb-1">Appliance / Hour</div>
              {HOURS.map((hour) => (
                <div key={`h-${hour}`} className="text-[10px] text-slate-500 text-center mb-1">{hour}</div>
              ))}

              {matrix.map(({ appliance, row }) => (
                <React.Fragment key={appliance}>
                  <div className="text-xs text-slate-200 pr-2 py-0.5 truncate" title={appliance}>{appliance}</div>
                  {row.map((value, idx) => (
                    <div
                      key={`${appliance}-${idx}`}
                      className={`h-5 rounded-sm border border-slate-800/60 ${intensityClass(value)} transition-all duration-200 hover:scale-105`}
                      title={`${appliance} @ ${idx}:00 → load ${value.toFixed(1)}h`}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
