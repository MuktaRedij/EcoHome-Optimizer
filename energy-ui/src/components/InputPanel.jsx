import React, { useState } from 'react';
import ApplianceCard from './ApplianceCard';
import ConstraintCard from './ConstraintCard';
import PreferenceToggle from './PreferenceToggle';
import SegmentedControl from './SegmentedControl';

export default function InputPanel({ formData, setFormData, onOptimize, isLoading }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const applianceOptions = [
    { name: 'Washing Machine' },
    { name: 'Dishwasher' },
    { name: 'Heater' },
    { name: 'EV Charger' },
  ];

  const defaultConstraints = {
    'Washing Machine': { preferred_start: 7, preferred_end: 22, duration_hours: 1.5 },
    Dishwasher: { preferred_start: 8, preferred_end: 23, duration_hours: 2 },
    Heater: { preferred_start: 5, preferred_end: 1, duration_hours: 3 },
    'EV Charger': { preferred_start: 20, preferred_end: 6, duration_hours: 4 },
  };

  const toggleAppliance = (name) => {
    setFormData((prev) => ({
      ...prev,
      appliances: prev.appliances.includes(name)
        ? prev.appliances.filter((a) => a !== name)
        : [...prev.appliances, name],
      applianceConstraints: {
        ...prev.applianceConstraints,
        [name]: prev.applianceConstraints?.[name] || defaultConstraints[name],
      },
    }));
  };

  const updateConstraint = (appliance, key, value) => {
    setFormData((prev) => ({
      ...prev,
      applianceConstraints: {
        ...(prev.applianceConstraints || {}),
        [appliance]: {
          ...(prev.applianceConstraints?.[appliance] || defaultConstraints[appliance]),
          [key]: value,
        },
      },
    }));
  };

  const isValidConfiguration = formData.appliances.length > 0;
  const comparisonOptions = [
    { value: false, label: 'Eco OFF', tooltip: 'Cost-focused optimization' },
    { value: true, label: 'Eco ON', tooltip: 'Sustainability-focused optimization' },
  ];

  return (
    <div className="card spacing-card sticky top-20 h-fit space-y-4 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-white mb-1">⚙️ Control Panel</h2>
        <p className="text-xs md:text-sm text-gray-400">Configure your optimization preferences</p>
      </div>

      {/* SECTION 1: Optimization Parameters */}
      <div className="spacing-section border-b border-slate-700/50">
        <h3 className="text-sm md:text-base font-semibold text-cyan-400 mb-4 tracking-tight">Optimization Parameters</h3>

        {/* Population Slider */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <label className="text-base md:text-lg font-medium text-gray-200">Population Size</label>
            <span className="text-sm font-mono bg-cyan-500/20 text-cyan-300 px-3 py-1.5 rounded-lg font-semibold">
              {formData.population}
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="200"
            value={formData.population}
            onChange={(e) => setFormData((prev) => ({ ...prev, population: Number(e.target.value) }))}
            className="w-full h-2.5 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 transition-all"
            title="Number of candidate schedules explored per generation"
          />
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">More candidates = better solutions, slower computation</p>
        </div>

        {/* Generations Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-base md:text-lg font-medium text-gray-200">Generations</label>
            <span className="text-sm font-mono bg-teal-500/20 text-teal-300 px-3 py-1.5 rounded-lg font-semibold">
              {formData.generations}
            </span>
          </div>
          <input
            type="range"
            min="30"
            max="50"
            value={formData.generations}
            onChange={(e) => setFormData((prev) => ({ ...prev, generations: Number(e.target.value) }))}
            className="w-full h-2.5 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500 transition-all"
            title="Number of optimization iterations (higher = better results)"
          />
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">More iterations = refined solutions</p>
        </div>
      </div>

      {/* SECTION 2: Appliance Selection */}
      <div className="spacing-section border-b border-slate-700/50">
        <h3 className="text-lg md:text-xl font-semibold text-emerald-400 mb-5 tracking-tight">Select Appliances</h3>
        <p className="text-sm md:text-base text-gray-300 mb-4">Choose which devices to optimize</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 spacing-gap mb-4">
          {applianceOptions.map((appliance) => (
            <ApplianceCard
              key={appliance.name}
              name={appliance.name}
              isSelected={formData.appliances.includes(appliance.name)}
              onToggle={() => toggleAppliance(appliance.name)}
            />
          ))}
        </div>

        {/* Selection counter */}
        <div className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
          <span className="text-sm font-semibold text-gray-300">Selected:</span>
          <span className="text-lg font-bold text-emerald-400">
            {formData.appliances.length}
          </span>
          {formData.appliances.length > 0 && (
            <span className="text-sm text-gray-400">
              ({formData.appliances.join(', ')})
            </span>
          )}
        </div>
      </div>

      {/* SECTION 3: Preferences */}
      <div className="spacing-section border-b border-slate-700/50">
        <h3 className="text-lg md:text-xl font-semibold text-emerald-400 mb-5 tracking-tight">Preferences</h3>
        
        <PreferenceToggle
          isEnabled={formData.ecoMode}
          onToggle={() => setFormData((prev) => ({ ...prev, ecoMode: !prev.ecoMode }))}
          description="Prioritize sustainability over cost"
          dynamicHint="Optimization will favor lower CO2 emissions and greener time slots"
        />
      </div>

      {/* SECTION 4: Appliance Constraints */}
      {formData.appliances.length > 0 && (
        <div className="spacing-section border-b border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-blue-400 tracking-tight">Constraints</h3>
              <p className="text-sm text-gray-300 leading-relaxed">Set preferred usage windows for each appliance</p>
            </div>
            <button
              onClick={() => setExpandedSection(expandedSection === 'constraints' ? null : 'constraints')}
              className="button-secondary px-2 py-1 text-xs"
            >
              {expandedSection === 'constraints' ? '−' : '+'}
            </button>
          </div>

          {expandedSection === 'constraints' && (
            <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
              {formData.appliances.map((appliance) => (
                <ConstraintCard
                  key={appliance}
                  appliance={appliance}
                  constraint={
                    formData.applianceConstraints?.[appliance] || defaultConstraints[appliance]
                  }
                  onUpdate={updateConstraint}
                />
              ))}
            </div>
          )}

          {expandedSection !== 'constraints' && (
            <div className="text-sm text-gray-300 p-4 bg-slate-700/20 rounded-xl border border-slate-600/20 leading-relaxed">
              {formData.appliances.length} appliance{formData.appliances.length !== 1 ? 's' : ''} ready for configuration
            </div>
          )}
        </div>
      )}

      {/* SECTION 5: Comparison Mode */}
      <div className="spacing-section border-b border-slate-700/50">
        <SegmentedControl
          value={formData.compareScenarios}
          onChange={(value) => setFormData((prev) => ({ ...prev, compareScenarios: value }))}
          options={comparisonOptions}
          description="Run a second optimization to compare different strategies"
          tooltip="See side-by-side comparison of eco-focused vs cost-focused solutions"
        />
      </div>

      {/* SECTION 6: Validation Messages */}
      {!isValidConfiguration && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl spacing-card space-y-2 animate-fade-in">
          <p className="text-base font-semibold text-amber-300">⚠️ Configuration Incomplete</p>
          <p className="text-sm text-amber-200 leading-relaxed">Select at least one appliance to run optimization</p>
        </div>
      )}

      {isValidConfiguration && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl animate-fade-in">
          <p className="text-sm text-emerald-300 leading-relaxed">
            ✓ Ready to optimize {formData.appliances.length} appliance{formData.appliances.length !== 1 ? 's' : ''} with {formData.generations} generations
          </p>
        </div>
      )}

      {/* SECTION 7: Action Button */}
      <button
        onClick={onOptimize}
        disabled={isLoading || !isValidConfiguration}
        className={`
          ${isLoading || !isValidConfiguration ? 'opacity-60 cursor-not-allowed' : 'button-primary animate-pulse-subtle'}
          w-full flex items-center justify-center gap-2
        `}
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            <span>Running Optimization...</span>
          </>
        ) : (
          <>
            <span className="text-lg">⚡</span>
            <span>Run Optimization</span>
          </>
        )}
      </button>

      {/* Footer hint */}
      <p className="text-sm text-center text-gray-400 leading-relaxed">
        💡 Optimization takes 10-30 seconds. You can adjust parameters and run multiple times to compare results.
      </p>
    </div>
  );
}
