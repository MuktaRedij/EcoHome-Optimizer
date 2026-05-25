import React from 'react';

export default function Navbar({ currentPage, setPage }) {
  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Dashboard', page: 'dashboard' },
    { label: 'How It Works', page: 'how' },
    { label: 'About', page: 'about' },
    { label: 'FAQs', page: 'faqs' },
    { label: 'Contact', page: 'contact' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-md z-50 border-b border-green-500/20 dark:bg-slate-900/50 dark:border-green-500/10 transition-colors duration-300">
      <div className="w-full px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setPage('home')}
          className="flex items-center gap-2 text-xl font-bold text-white dark:text-gray-100 hover:text-green-400 dark:hover:text-emerald-400 transition-colors duration-300"
        >
          <span className="text-2xl">🌿</span>
          EcoHome Optimizer
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => setPage(item.page)}
              className={`transition-all duration-300 font-medium ${
                currentPage === item.page
                  ? 'text-green-400 dark:text-emerald-400 border-b-2 border-green-400 dark:border-emerald-400 pb-1'
                  : 'text-gray-300 dark:text-gray-400 hover:text-green-400 dark:hover:text-emerald-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <button className="text-green-400 dark:text-emerald-400 hover:text-green-300 dark:hover:text-emerald-300 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-black/50 dark:bg-slate-900/50 border-t border-green-500/20 dark:border-green-500/10 transition-colors duration-300">
        <div className="flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => setPage(item.page)}
              className={`text-left px-4 py-2 rounded transition-all duration-300 ${
                currentPage === item.page
                  ? 'bg-green-500/20 dark:bg-emerald-500/20 text-green-400 dark:text-emerald-400'
                  : 'text-gray-300 dark:text-gray-400 hover:bg-slate-800/50 dark:hover:bg-slate-700/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
