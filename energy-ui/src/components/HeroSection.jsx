import React from 'react';

export default function HeroSection({ onStartClick }) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f172a] via-[#020617] to-[#020617] overflow-hidden px-6">
      {/* Glow effects */}
      <div className="absolute w-72 h-72 bg-green-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-teal-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse delay-700"></div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-6 drop-shadow-lg">
            Smart Energy <span className="bg-linear-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">Optimization</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto mb-4">
            Sustainable Living through Intelligent Energy Management
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-base md:text-lg">
            Harness the power of AI-driven algorithms to optimize your home's energy consumption, reduce bills, and help save the planet 🌿
          </p>
        </div>

        <button
          onClick={onStartClick}
          className="mt-8 px-8 py-4 text-lg font-semibold text-white bg-green-500 hover:bg-green-600 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 active:scale-95 flex items-center justify-center gap-2 mx-auto"
        >
          Start Optimization
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        <div className="mt-12 text-sm text-gray-400">
          ↓ Scroll to explore the dashboard ↓
        </div>
      </div>
    </section>
  );
}
