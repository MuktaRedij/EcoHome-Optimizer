import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Input Parameters',
      description: 'Enter your family size, optimization generations, and select appliances you want to optimize.',
      icon: '⚙️'
    },
    {
      number: 2,
      title: 'Fuzzy Logic Energy Estimation',
      description: 'Our fuzzy logic system estimates energy usage patterns using rule-based reasoning.',
      icon: '⚡'
    },
    {
      number: 3,
      title: 'Genetic Algorithm Optimization',
      description: 'Advanced genetic algorithm evolves optimal energy schedules across multiple generations.',
      icon: '🔬'
    },
    {
      number: 4,
      title: 'Optimal Results',
      description: 'Get personalized recommendations with cost savings and CO₂ reduction metrics.',
      icon: '📊'
    }
  ];

  return (
    <section className="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-4 md:px-8 pt-32">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our intelligent system uses fuzzy logic and evolutionary algorithms to optimize your home's energy consumption
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-br from-green-500 to-teal-500 text-white font-bold text-xl">
                  {step.number}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-grow">
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="mt-20 pt-12 border-t border-slate-700/50">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Technologies Used</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'React', icon: '⚛️' },
              { name: 'Tailwind CSS', icon: '🎨' },
              { name: 'Fuzzy Logic', icon: '⚡' },
              { name: 'Genetic Algorithm', icon: '🔬' }
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-teal-500/20 rounded-xl p-6 text-center hover:border-teal-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{tech.icon}</div>
                <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
