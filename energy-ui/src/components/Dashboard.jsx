import React, { useMemo, useRef, useState } from 'react';
import InputPanel from './InputPanel';
import ResultsPanel from './ResultsPanel';
import ChartSection from './ChartSection';
import EnergyByApplianceChart from './EnergyByApplianceChart';
import CostComparisonChart from './CostComparisonChart';
import CO2ReductionChart from './CO2ReductionChart';
import ScheduleTimelineChart from './ScheduleTimelineChart';
import InsightsPanel from './InsightsPanel';
import ScheduleHeatmap from './ScheduleHeatmap';
import ScenarioComparisonCard from './ScenarioComparisonCard';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export default function Dashboard() {
  const dashboardRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasRun, setHasRun] = useState(false);

  const [results, setResults] = useState({
    minimumCost: 0,
    initialCost: 0,
    energySaved: 0,
    co2Reduction: 0,
    co2Prevented: 0,
    co2Remaining: 0,
    co2ReductionPercent: 0,
    schedule: [],
    applianceEnergy: {},
    energyUsage: {},
    peakUsageReduction: 0,
    insights: [],
    generations: 0,
  });
  const [comparison, setComparison] = useState(null);

  const [chartData, setChartData] = useState([]);
  const [formData, setFormData] = useState({
    population: 50,
    generations: 30,
    appliances: ['Washing Machine'],
    ecoMode: true,
    compareScenarios: true,
    applianceConstraints: {
      'Washing Machine': { preferred_start: 7, preferred_end: 22, duration_hours: 1.5 },
    },
  });

  const parseTrend = (payload) => {
    const trend = Array.isArray(payload?.cost_trend)
      ? payload.cost_trend
      : Array.isArray(payload?.trend)
        ? payload.trend.map((item) => item?.cost)
        : [];

    return trend
      .map((cost, index) => {
        const parsed = Number(typeof cost === 'object' ? cost?.cost : cost);
        if (!Number.isFinite(parsed)) return null;
        return { generation: (index + 1).toString(), cost: Number(parsed.toFixed(2)) };
      })
      .filter(Boolean);
  };

  const parseSchedule = (payload) => {
    if (Array.isArray(payload?.schedule)) {
      return payload.schedule.map((row) => ({
        // Backend properties - keep as is
        appliance: row?.appliance ?? 'Unknown',
        start_hour: Number(row?.start_hour ?? 0),
        start_time: row?.start_time ?? '00:00',
        end_time: row?.end_time ?? '01:00',
        duration_hours: Number(row?.duration_hours ?? 1),
        // Legacy properties for backward compatibility
        startHour: Number(row?.start_hour ?? 0),
        durationHours: Number(row?.duration_hours ?? 1),
      }));
    }

    if (payload?.schedule && typeof payload.schedule === 'object') {
      return Object.entries(payload.schedule).map(([appliance, time]) => ({
        appliance,
        start_time: time,
        time,
      }));
    }

    return [];
  };

  const handleOptimize = async () => {
    setIsLoading(true);
    setError(null);
    setHasRun(false);
    setComparison(null);

    try {
      if (!formData.appliances.length) {
        throw new Error('Please select at least one appliance');
      }

      const payload = {
        population: Math.max(20, Math.min(200, formData.population)),
        generations: Math.max(30, Math.min(50, formData.generations)),
        appliances: formData.appliances,
        eco_mode: formData.ecoMode,
        appliance_constraints: formData.applianceConstraints || {},
      };

      const runOptimization = async (requestPayload) => {
        const response = await fetch(`${API_BASE_URL}/optimize`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestPayload),
        });

        if (!response.ok) {
          let details = '';
          try {
            const errorPayload = await response.json();
            details = errorPayload?.detail ? ` - ${errorPayload.detail}` : '';
          } catch {
            // ignore non-JSON error body
          }
          throw new Error(`API error: ${response.status}${details}`);
        }

        return response.json();
      };

      const data = await runOptimization(payload);
      const initialCost = Number(data?.initial_cost ?? 0);
      const finalCost = Number(data?.final_cost ?? data?.cost ?? 0);
      const generations = Number(data?.generations ?? payload.generations);
      const trend = parseTrend(data);
      const schedule = parseSchedule(data);

      // Debug logging for schedule parsing
      console.log('📅 Raw schedule from backend:', data?.schedule);
      console.log('📅 Parsed schedule for display:', schedule);
      schedule.forEach((item, idx) => {
        console.log(`   Appliance ${idx}:`, {
          appliance: item?.appliance,
          start_time: item?.start_time,
          end_time: item?.end_time,
          start_hour: item?.start_hour,
          duration_hours: item?.duration_hours,
        });
      });

      const applianceEnergy = {};
      if (data?.appliance_energy && typeof data.appliance_energy === 'object') {
        Object.entries(data.appliance_energy).forEach(([name, value]) => {
          applianceEnergy[name] = Number(value) || 0;
        });
      }

      const safeInitial = Number.isFinite(initialCost) ? initialCost : 0;
      const safeFinal = Number.isFinite(finalCost) ? finalCost : 0;
      const energySaved =
        safeInitial > 0
          ? Math.max(0, ((safeInitial - safeFinal) / safeInitial) * 100)
          : Number(data?.energy_saved ?? 0);
      const co2Prevented = Number(data?.co2_reduction ?? data?.co2_prevented ?? 0);
      const co2Total = Number(data?.co2 ?? 0);
      const peakUsageReduction = Number(data?.peak_usage_reduction ?? 0);
      const insights = Array.isArray(data?.insights) ? data.insights : [];

      // Debug logging
      console.log('📊 Response Data Analysis:');
      console.log('   Raw peak_usage_reduction:', data?.peak_usage_reduction);
      console.log('   Converted peakUsageReduction:', peakUsageReduction);
      console.log('   Energy Saved:', energySaved);
      console.log('   Initial Cost:', safeInitial);
      console.log('   Final Cost:', safeFinal);
      console.log('   Insights:', insights);
      console.log('   Full data object:', data);

      const energyUsage = {};
      if (data?.energy_usage && typeof data.energy_usage === 'object') {
        Object.entries(data.energy_usage).forEach(([name, value]) => {
          energyUsage[name] = Number(value) || 0;
        });
      }

      setChartData(trend);
      setResults({
        minimumCost: safeFinal,
        initialCost: safeInitial,
        energySaved: Number.isFinite(energySaved) ? energySaved : 0,
        co2Reduction: co2Total,
        co2Prevented: Math.max(0, co2Prevented),
        co2Remaining: Math.max(0, co2Total - Math.max(0, co2Prevented)),
        co2ReductionPercent: Number(data?.co2_reduction_percent ?? 0),
        schedule,
        applianceEnergy,
        energyUsage,
        peakUsageReduction,
        insights,
        generations,
      });

      if (formData.compareScenarios) {
        const altData = await runOptimization({ ...payload, eco_mode: !payload.eco_mode });
        const altFinal = Number(altData?.final_cost ?? altData?.cost ?? 0);
        const altCo2Prevented = Number(altData?.co2_reduction ?? altData?.co2_prevented ?? 0);

        setComparison({
          ecoOnCost: payload.eco_mode ? safeFinal : altFinal,
          ecoOffCost: payload.eco_mode ? altFinal : safeFinal,
          ecoOnCo2: payload.eco_mode ? co2Prevented : altCo2Prevented,
          ecoOffCo2: payload.eco_mode ? altCo2Prevented : co2Prevented,
        });
      }

      setHasRun(true);
    } catch (err) {
      console.error('API ERROR:', err);
      setError(err?.message || 'Optimization failed');
      setHasRun(false);
      setChartData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const summaryMessage = useMemo(() => {
    if (!hasRun) return '';
    const before = results.initialCost;
    const after = results.minimumCost;
    if (!Number.isFinite(before) || !Number.isFinite(after)) return '';
    if (after >= before) return 'No optimization improvement detected';
    return `Cost reduced from ₹${Math.round(before).toLocaleString('en-IN')} to ₹${Math.round(after).toLocaleString('en-IN')}`;
  }, [hasRun, results.initialCost, results.minimumCost]);

  return (
    <section
      ref={dashboardRef}
      className="w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4 sm:px-6 lg:px-8 pt-32"
    >
      <div className="w-full">
        <div className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Dashboard</h2>
          <p className="text-gray-400 text-lg">
            Configure GA parameters and optimize appliance schedules
          </p>
        </div>

        {error && (
          <div className="mb-8 bg-red-500/20 border border-red-500/50 rounded-2xl p-4 text-center">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="mb-8 bg-blue-500/15 border border-blue-400/40 rounded-2xl p-4 text-center text-blue-200 flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-blue-200/40 border-t-blue-200 rounded-full animate-spin" />
            Optimizing across generations...
          </div>
        )}

        {!hasRun && !isLoading && (
          <div className="mb-8 bg-slate-700/30 border border-slate-600/50 rounded-2xl p-4 text-center text-gray-300">
            Run optimization to see data
          </div>
        )}

        {hasRun && summaryMessage && (
          <div className="mb-6 bg-emerald-500/10 border border-emerald-500/40 rounded-lg p-3 text-center text-emerald-200 text-sm">
            {summaryMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 mb-5 md:mb-6">
          <div className="lg:col-span-1">
            <InputPanel
              formData={formData}
              setFormData={setFormData}
              onOptimize={handleOptimize}
              isLoading={isLoading}
            />
          </div>

          <div className="lg:col-span-2">
            <ResultsPanel results={results} isLoading={isLoading} hasRun={hasRun} />
          </div>
        </div>

        {hasRun && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mb-5 md:mb-6">
              <ChartSection
                data={chartData}
                isLoading={isLoading}
                initialCost={results.initialCost}
                finalCost={results.minimumCost}
              />
              <EnergyByApplianceChart data={results.applianceEnergy} isLoading={isLoading} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5 md:mb-6">
              <CostComparisonChart
                initialCost={results.initialCost}
                finalCost={results.minimumCost}
                isLoading={isLoading}
              />
              <CO2ReductionChart
                co2Prevented={results.co2Prevented}
                co2Remaining={results.co2Remaining}
                isLoading={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mb-5 md:mb-6">
              <InsightsPanel
                insights={results.insights}
                peakUsageReduction={results.peakUsageReduction}
                energySaved={results.energySaved}
                hasRun={hasRun}
              />
              <ScenarioComparisonCard comparison={comparison} hasRun={hasRun} />
            </div>

            <div className="grid grid-cols-1 gap-5 md:gap-6 mb-5 md:mb-6">
              <ScheduleTimelineChart schedule={results.schedule} isLoading={isLoading} />
            </div>

            <div className="grid grid-cols-1 gap-5 md:gap-6 mb-5 md:mb-6">
              <ScheduleHeatmap schedule={results.schedule} isLoading={isLoading} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
