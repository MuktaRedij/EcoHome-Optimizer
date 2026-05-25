import React from 'react';

export default function Contact() {
  return (
    <section className="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-4 md:px-8 pt-32 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-gray-400 text-lg">
            We'd love to hear from you. Here's how to reach us.
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 md:p-12 hover:border-green-500/50 transition-all duration-300">
          <div className="space-y-8">
            {/* Project Info */}
            <div className="flex items-start gap-4">
              <span className="text-3xl">📱</span>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Smart Home Energy Optimization System</h2>
                <p className="text-gray-300">
                  An intelligent platform for optimizing residential energy consumption using fuzzy logic and genetic algorithms.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-8">
              {/* Developer Info */}
              <div className="flex items-start gap-4 mb-8">
                <span className="text-3xl">👤</span>
                <div>
                  <p className="text-gray-400 mb-1">
                    <span className="text-white font-semibold">Project Lead: </span>Mukta
                  </p>
                  <p className="text-gray-400">
                    <span className="text-white font-semibold">Institution: </span>Vidyalankar Institute of Technology
                  </p>
                </div>
              </div>

              {/* Contact Links */}
              <div className="space-y-4">
                <p className="text-white font-semibold mb-4">Connect with us:</p>
                
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 bg-slate-700/30 border border-slate-600/50 rounded-lg hover:bg-slate-700/50 hover:border-green-500/50 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.814 1.102.814 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-white">GitHub</p>
                    <p className="text-sm text-gray-400">View our project repositories</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@ecohome.local"
                  className="flex items-center gap-3 p-3 bg-slate-700/30 border border-slate-600/50 rounded-lg hover:bg-slate-700/50 hover:border-green-500/50 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-sm text-gray-400">contact@ecohome.local</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Built with <span className="text-green-400">💚</span> for a sustainable future
          </p>
        </div>
      </div>
    </section>
  );
}
