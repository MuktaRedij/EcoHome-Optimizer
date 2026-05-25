import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Dashboard from './components/Dashboard'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import FAQs from './components/FAQs'
import Contact from './components/Contact'
import './App.css'

// Error Boundary Component to catch rendering errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🔴 React Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold text-red-400 mb-4">⚠️ Render Error</h1>
            <p className="text-gray-300 mb-6">An error occurred. Check the console for details.</p>
            <pre className="bg-slate-800/50 border border-red-500/30 rounded-lg p-3 text-left text-xs text-gray-400 overflow-auto max-h-40">
              {this.state.error?.toString()}
            </pre>
            <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg">
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('✅ App mounted');
    setMounted(true);
  }, []);

  const handleNavigate = (page) => {
    console.log('📄 Navigate to:', page);
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  if (!mounted) {
    return (
      <div className="w-full min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin h-10 w-10 border-b-2 border-green-400 rounded-full"></div>
          <p className="text-gray-400 mt-3">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="w-full min-h-screen bg-slate-900 dark:bg-slate-950 flex flex-col transition-colors duration-300">
        {/* Navbar */}
        <Navbar currentPage={currentPage} setPage={handleNavigate} />

        {/* Pages */}
        <div className="grow w-full">
          {currentPage === 'home' && (
            <>
              <HeroSection onStartClick={() => handleNavigate('dashboard')} />
              <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800 dark:border-slate-800 py-8 px-4 w-full transition-colors duration-300">
                <div className="text-center text-gray-500 dark:text-gray-600 text-sm">
                  <p>Smart Home Energy Optimization System © 2026. Powered by Vite + React + Tailwind CSS</p>
                </div>
              </footer>
            </>
          )}

          {currentPage === 'dashboard' && (
            <>
              <Dashboard />
              <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800 dark:border-slate-800 py-8 px-4 w-full transition-colors duration-300">
                <div className="text-center text-gray-500 dark:text-gray-600 text-sm">
                  <p>Smart Home Energy Optimization System © 2026. Powered by Vite + React + Tailwind CSS</p>
                </div>
              </footer>
            </>
          )}

          {currentPage === 'how' && (
            <>
              <HowItWorks />
              <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800 dark:border-slate-800 py-8 px-4 w-full transition-colors duration-300">
                <div className="text-center text-gray-500 dark:text-gray-600 text-sm">
                  <p>Smart Home Energy Optimization System © 2026. Powered by Vite + React + Tailwind CSS</p>
                </div>
              </footer>
            </>
          )}

          {currentPage === 'about' && (
            <>
              <About onNavigate={handleNavigate} />
              <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800 dark:border-slate-800 py-8 px-4 w-full transition-colors duration-300">
                <div className="text-center text-gray-500 dark:text-gray-600 text-sm">
                  <p>Smart Home Energy Optimization System © 2026. Powered by Vite + React + Tailwind CSS</p>
                </div>
              </footer>
            </>
          )}

          {currentPage === 'faqs' && (
            <>
              <FAQs onNavigate={handleNavigate} />
              <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800 dark:border-slate-800 py-8 px-4 w-full transition-colors duration-300">
                <div className="text-center text-gray-500 dark:text-gray-600 text-sm">
                  <p>Smart Home Energy Optimization System © 2026. Powered by Vite + React + Tailwind CSS</p>
                </div>
              </footer>
            </>
          )}

          {currentPage === 'contact' && (
            <>
              <Contact />
              <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800 dark:border-slate-800 py-8 px-4 w-full transition-colors duration-300">
                <div className="text-center text-gray-500 dark:text-gray-600 text-sm">
                  <p>Smart Home Energy Optimization System © 2026. Powered by Vite + React + Tailwind CSS</p>
                </div>
              </footer>
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
