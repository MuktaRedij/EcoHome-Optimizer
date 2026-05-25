import React from "react";

export default function ScheduleTimelineChart({ schedule = [] }) {
  // Safety check
  if (!Array.isArray(schedule) || schedule.length === 0) return null;

  // Debug logging - DETAILED
  console.log('📅 ScheduleTimelineChart received:', schedule);
  schedule.forEach((item, idx) => {
    console.log(`   Item ${idx}:`, {
      appliance: item?.appliance,
      start_time: item?.start_time,
      end_time: item?.end_time,
      start_hour: item?.start_hour,
      duration_hours: item?.duration_hours,
      raw: item,
    });
  });

  const totalHours = 24;

  // SAFE time parser (fixes your crash)
  const getPosition = (time) => {
    if (!time || typeof time !== "string" || !time.includes(":")) {
      return 0;
    }

    const [hour, minute] = time.split(":").map(Number);
    return ((hour + minute / 60) / totalHours) * 100;
  };

  // Calculate width based on duration hours
  const getWidth = (startTime, endTime, durationHours) => {
    if (durationHours && typeof durationHours === 'number') {
      return Math.max((durationHours / totalHours) * 100, 3); // Min 3% for visibility
    }
    return 8; // Fallback width
  };

  // Color themes per appliance
  const getApplianceColor = (name = "") => {
    const colors = [
      {
        bg: "from-cyan-400 to-blue-500",
        light: "bg-cyan-500/10",
        border: "border-cyan-400/30",
        text: "text-cyan-300",
      },
      {
        bg: "from-emerald-400 to-green-500",
        light: "bg-emerald-500/10",
        border: "border-emerald-400/30",
        text: "text-emerald-300",
      },
      {
        bg: "from-purple-400 to-indigo-500",
        light: "bg-purple-500/10",
        border: "border-purple-400/30",
        text: "text-purple-300",
      },
    ];

    return colors[name.length % colors.length];
  };

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-lg space-y-6">

      {/* HEADER */}
      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
        📅 Appliance Schedule
      </h3>

      {/* TIMELINE */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 relative overflow-hidden">

        {/* TIME LABELS */}
        <div className="flex justify-between text-xs text-gray-400 mb-3">
          {["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        {/* TRACK */}
        <div className="relative h-10 bg-white/10 rounded-lg overflow-hidden">
          {schedule.map((item, idx) => {
            const startTimeStr = item?.start_time || "00:00";
            const endTimeStr = item?.end_time || "01:00";
            const durationHours = Number(item?.duration_hours) || 1;
            const left = getPosition(startTimeStr);
            const width = getWidth(startTimeStr, endTimeStr, durationHours);
            const colors = getApplianceColor(item?.appliance || "");

            return (
              <div
                key={idx}
                className={`absolute h-10 rounded-md bg-gradient-to-r ${colors.bg} shadow-md hover:shadow-lg transition-all`}
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  minWidth: '3%',
                }}
                title={`${item?.appliance}: ${startTimeStr} - ${endTimeStr} (${durationHours.toFixed(1)}h)`}
              />
            );
          })}
        </div>

        {/* LABEL */}
        <div className="mt-3 text-sm text-gray-300 space-y-2">
          {schedule.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <span className="font-medium text-white">{item?.appliance || "Appliance"}</span>
              <span className="text-emerald-400">{item?.start_time || "00:00"}</span>
              <span className="text-gray-500">→</span>
              <span className="text-cyan-400">{item?.end_time || "01:00"}</span>
              <span className="text-indigo-400">({Number(item?.duration_hours || 0).toFixed(1)}h)</span>
            </div>
          ))}
        </div>
      </div>

      {/* DETAILS + INSIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

        {/* LEFT: APPLIANCE DETAILS */}
        <div className="space-y-4">
          {schedule.map((item, index) => {
            const colors = getApplianceColor(item?.appliance || "");

            return (
              <div
                key={index}
                className={`${colors.light} border ${colors.border} rounded-xl p-5 flex flex-col justify-between min-h-[140px] hover:shadow-lg transition-all`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors.bg}`} />
                    <p className="text-sm font-semibold text-white truncate">
                      {item?.appliance || "Unknown Appliance"}
                    </p>
                  </div>

                  <p className={`text-2xl font-bold ${colors.text}`}>
                    {item?.start_time || "00:00"}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {item?.end_time || "01:00"} • {Number(item?.duration_hours || 0).toFixed(1)} hrs
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Optimized for efficiency
                </p>
              </div>
            );
          })}
        </div>

        {/* RIGHT: INSIGHT CARD */}
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-400/30 rounded-xl p-5 flex items-center">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>

            <div>
              <p className="text-sm font-semibold text-indigo-300 mb-1">
                Optimization Insight
              </p>

              <p className="text-sm text-indigo-200 leading-relaxed">
                These times are optimized for minimum energy costs during low-demand hours and maximum sustainability.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}