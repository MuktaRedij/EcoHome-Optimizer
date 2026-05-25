import React from 'react';

export default function About({ onNavigate }) {
  return (
    <section className="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-4 md:px-6 lg:px-8 pt-32">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">About EcoHome Optimizer</h1>
          <p className="text-xl text-gray-400">
            Empowering sustainable living through intelligent energy management powered by AI & evolutionary algorithms
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-linear-to-br from-emerald-600/20 via-emerald-500/10 to-transparent border border-emerald-500/40 rounded-3xl p-10 md:p-16 lg:p-20">
          <div className="flex items-start gap-6 mb-6">
            <span className="text-5xl flex-shrink-0">🌍</span>
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                EcoHome Optimizer is dedicated to making sustainable living accessible to every household. We combine cutting-edge AI technology with intelligent scheduling algorithms to help you reduce energy consumption, lower electricity bills, and minimize your carbon footprint—all while maintaining your comfort and lifestyle.
              </p>
            </div>
          </div>
        </div>

        {/* The Problem */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 md:p-12 lg:p-14 hover:border-red-500/30 transition">
            <h3 className="text-3xl font-bold text-red-400 mb-6">⚠️ The Challenge</h3>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li>• Residential energy consumption accounts for 20-30% of total emissions</li>
              <li>• Most households pay peak rates during high-demand evening hours</li>
              <li>• Manual scheduling is time-consuming and inefficient</li>
              <li>• Lack of visibility into energy usage patterns</li>
              <li>• Difficulty balancing comfort with sustainability</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 md:p-12 lg:p-14 hover:border-emerald-500/30 transition">
            <h3 className="text-3xl font-bold text-emerald-400 mb-6">✨ Our Solution</h3>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li>• Intelligent appliance scheduling optimized for your household</li>
              <li>• Shift high-load usage to off-peak, cheaper electricity hours</li>
              <li>• Automated scheduling that adapts to your lifestyle</li>
              <li>• Real-time insights into energy savings and CO₂ reduction</li>
              <li>• Eco mode prioritizes environmental impact over cost</li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-10 md:p-16 lg:p-20">
          <h2 className="text-4xl font-bold text-white mb-10 flex items-center gap-4">
            <span className="text-5xl">⚙️</span> How It Works
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-semibold text-cyan-400 mb-4">1. Fuzzy Logic Analysis</h3>
              <p className="text-gray-300 mb-5 text-lg">
                Our system analyzes your household characteristics: family size, number of appliances, total power consumption, and flexibility preferences. Using fuzzy logic, we estimate your energy consumption patterns with remarkable accuracy.
              </p>
              <div className="text-sm bg-slate-700/40 border border-slate-600/50 rounded-lg p-5 text-gray-300">
                <strong className="text-cyan-300">Key Metrics:</strong> Family size (1-5+), appliance count, daily energy usage, flexibility score
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-cyan-400 mb-4">2. Genetic Algorithm Optimization</h3>
              <p className="text-gray-300 mb-5 text-lg">
                Our evolutionary algorithm generates hundreds of schedules and iteratively improves them through simulated evolution. It balances cost reduction, CO₂ prevention, and peak demand reduction across multiple generations.
              </p>
              <div className="text-sm bg-slate-700/40 border border-slate-600/50 rounded-lg p-5 text-gray-300">
                <strong className="text-cyan-300">Process:</strong> Population-based search, tournament selection, crossover, adaptive mutation
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-cyan-400 mb-4">3. Smart Scheduling</h3>
              <p className="text-gray-300 mb-5 text-lg">
                The algorithm shifts high-load appliances to off-peak hours when electricity rates are lowest and grid load is minimal. This reduces both your bill and strain on the electrical grid.
              </p>
              <div className="text-sm bg-slate-700/40 border border-slate-600/50 rounded-lg p-5 text-gray-300">
                <strong className="text-cyan-300">Optimization:</strong> Minimize peak hours usage, maximize off-peak utilization
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-cyan-400 mb-4">4. Results & Comparison</h3>
              <p className="text-gray-300 mb-5 text-lg">
                Get instant results showing your potential savings, CO₂ reduction, and peak load reduction. Compare eco-focused vs. cost-focused optimization to choose what matters most to you.
              </p>
              <div className="text-sm bg-slate-700/40 border border-slate-600/50 rounded-lg p-5 text-gray-300">
                <strong className="text-cyan-300">Outputs:</strong> Cost savings %, CO₂ reduced (kg), peak reduction %, detailed schedule
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-10 md:p-16 lg:p-20">
          <h2 className="text-4xl font-bold text-white mb-10 flex items-center gap-4">
            <span className="text-5xl">🚀</span> Technology Stack
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {[
              {
                name: 'Fuzzy Logic Engine',
                description: 'Deterministic rule-based system for estimating energy consumption with 40% family size weight, 30% appliance count, 30% total energy, adjusted by flexibility',
                emoji: '🧠'
              },
              {
                name: 'Genetic Algorithm',
                description: 'Population-based evolutionary optimization with tournament selection, crossover, and adaptive mutation rates for schedule optimization',
                emoji: '🔀'
              },
              {
                name: 'React 19 + Vite',
                description: 'Modern, fast frontend framework with hot module replacement for real-time development and production builds',
                emoji: '⚛️'
              },
              {
                name: 'FastAPI + Python',
                description: 'High-performance REST API backend running on Uvicorn with Pydantic validation for robust data handling',
                emoji: '🐍'
              },
              {
                name: 'Tailwind CSS 4',
                description: 'Utility-first CSS framework enabling responsive, accessible design with custom animations and glassmorphism effects',
                emoji: '🎨'
              },
              {
                name: 'Chart Libraries',
                description: 'Recharts for cost trends, heatmaps for schedule visualization, pie charts for energy by appliance breakdown',
                emoji: '📊'
              }
            ].map((tech, index) => (
              <div key={index} className="rounded-xl bg-slate-700/30 p-7 border border-slate-600/50 hover:border-blue-500/50 transition">
                <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-3 text-lg">
                  <span className="text-3xl">{tech.emoji}</span>
                  {tech.name}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics & Benefits */}
        <div>
          <h2 className="text-4xl font-bold text-white mb-10 text-center">Impact & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-linear-to-br from-green-500/20 to-green-600/20 border border-green-500/40 rounded-2xl p-10 text-center hover:border-green-400/60 transition">
              <div className="text-6xl mb-6">💰</div>
              <h3 className="text-2xl font-bold text-white mb-3">Cost Savings</h3>
              <p className="text-gray-300 font-semibold mb-3 text-lg">Up to 30% reduction</p>
              <p className="text-base text-gray-400">Shift usage to off-peak hours with lower electricity rates</p>
            </div>

            <div className="bg-linear-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/40 rounded-2xl p-10 text-center hover:border-emerald-400/60 transition">
              <div className="text-6xl mb-6">🌱</div>
              <h3 className="text-2xl font-bold text-white mb-3">CO₂ Reduction</h3>
              <p className="text-gray-300 font-semibold mb-3 text-lg">30-40% decrease</p>
              <p className="text-base text-gray-400">Reduce reliance on peak-hour carbon-heavy grid power</p>
            </div>

            <div className="bg-linear-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/40 rounded-2xl p-10 text-center hover:border-blue-400/60 transition">
              <div className="text-6xl mb-6">⚡</div>
              <h3 className="text-2xl font-bold text-white mb-3">Peak Reduction</h3>
              <p className="text-gray-300 font-semibold mb-3 text-lg">15-25% less load</p>
              <p className="text-base text-gray-400">Decrease strain on the electrical grid during peak hours</p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-10 md:p-16 lg:p-20">
          <h2 className="text-4xl font-bold text-white mb-10 flex items-center gap-4">
            <span className="text-5xl">✨</span> Key Features
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: 'Dual Optimization Modes',
                desc: 'Choose between cost-focused optimization or eco-focused (carbon reduction priority)'
              },
              {
                title: 'Flexible Scheduling',
                desc: 'Adjust appliance constraints and flexibility settings based on your lifestyle'
              },
              {
                title: 'Real-Time Insights',
                desc: 'View detailed breakdown of savings, CO₂ reduction, and peak load reduction'
              },
              {
                title: 'Visual Analytics',
                desc: 'Charts, heatmaps, and timelines showing your optimized schedule vs baseline'
              },
              {
                title: 'Scenario Comparison',
                desc: 'Compare eco mode ON vs OFF to see environmental vs financial trade-offs'
              },
              {
                title: 'Responsive Design',
                desc: 'Works seamlessly on desktop, tablet, and mobile devices'
              }
            ].map((feature, index) => (
              <div key={index} className="flex gap-5">
                <div className="text-3xl flex-shrink-0 text-emerald-400">✓</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-base">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Impact */}
        <div className="bg-linear-to-br from-teal-600/20 via-teal-500/10 to-transparent border border-teal-500/40 rounded-3xl p-10 md:p-16 lg:p-20 overflow-hidden relative">
          {/* Decorative background orb */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-10"></div>
          
          <h2 className="text-4xl font-bold text-white mb-12 flex items-center gap-4">
            <span className="text-5xl">♻️</span> Sustainability & Environment
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '🌍',
                title: 'Climate Impact',
                desc: 'Residential energy consumption contributes significantly to global greenhouse gas emissions. By optimizing household energy use, we help reduce carbon footprints and combat climate change.',
                color: 'from-emerald-500/20 to-emerald-600/20',
                border: 'border-emerald-500/40',
                accent: 'text-emerald-300'
              },
              {
                icon: '⚡',
                title: 'Grid Benefits',
                desc: 'Peak-hour electricity often comes from carbon-intensive sources. Shifting consumption to off-peak hours reduces strain on the grid and decreases reliance on high-emission power plants.',
                color: 'from-cyan-500/20 to-cyan-600/20',
                border: 'border-cyan-500/40',
                accent: 'text-cyan-300'
              },
              {
                icon: '📈',
                title: 'Collective Impact',
                desc: 'If just 10% of households used intelligent scheduling, it could prevent thousands of tons of CO₂ emissions annually while saving millions in energy costs.',
                color: 'from-green-500/20 to-green-600/20',
                border: 'border-green-500/40',
                accent: 'text-green-300'
              },
              {
                icon: '🚀',
                title: 'Long-term Vision',
                desc: 'We believe technology should empower sustainability. Our system makes eco-friendly choices convenient and financially rewarding for every household.',
                color: 'from-teal-500/20 to-teal-600/20',
                border: 'border-teal-500/40',
                accent: 'text-teal-300'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`bg-linear-to-br ${item.color} border ${item.border} rounded-2xl p-8 hover:border-opacity-60 transition transform hover:scale-105 hover:shadow-lg`}
              >
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-4xl">{item.icon}</span>
                  <h3 className={`text-xl font-bold text-white ${item.accent}`}>{item.title}</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative py-20 md:py-28 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 rounded-3xl overflow-hidden">
          {/* Background gradient layers */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-emerald-600/10 via-slate-900/50 to-cyan-600/10"></div>
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            {/* Badge */}
            
            
            {/* Main Heading */}
            <h2 className="text-5xl md:text-7xl gap-3 font-black text-white mb-6 leading-tight">
              Ready to Start <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 animate-pulse">Saving?</span>
            </h2>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-emerald-500/50 transition transform hover:scale-105">
                <div className="text-3xl mb-3 transform group-hover:scale-125 transition">⚡</div>
                <h3 className="font-bold text-white mb-1">Instant Results</h3>
                <p className="text-sm text-gray-400">In seconds</p>
              </div>
              
              <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-cyan-500/50 transition transform hover:scale-105">
                <div className="text-3xl mb-3 transform group-hover:scale-125 transition">💰</div>
                <h3 className="font-bold text-white mb-1">Save up to 30%</h3>
                <p className="text-sm text-gray-400">On bills</p>
              </div>
              
              <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-green-500/50 transition transform hover:scale-105">
                <div className="text-3xl mb-3 transform group-hover:scale-125 transition">🌍</div>
                <h3 className="font-bold text-white mb-1">Reduce CO₂</h3>
                <p className="text-sm text-gray-400">Help the planet</p>
              </div>
            </div>
            
            {/* CTA Button */}
            <button 
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl text-lg hover:from-emerald-400 hover:to-emerald-500 active:from-emerald-600 active:to-emerald-700 transition-all transform hover:scale-110 hover:shadow-2xl hover:shadow-emerald-500/50 group mb-6"
            >
              Go to Dashboard
              <span className="text-xl transform group-hover:translate-x-1 transition">→</span>
            </button>
            
            {/* Trust indicators */}
            <p className="text-gray-500 text-sm">
              ✓ No signup required  •  ✓ Free to use  •  ✓ 100% secure
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
