/**
 * Debug utilities for React app
 * Add logging, error tracking, and performance monitoring
 * 
 * Usage: Import and call functions as needed
 */

import React from 'react';

// Colored console logging
export const log = {
  info: (label, data) => {
    console.log(`%c✅ ${label}`, 'color: #10b981; font-weight: bold;', data);
  },
  warn: (label, data) => {
    console.log(`%c⚠️  ${label}`, 'color: #f59e0b; font-weight: bold;', data);
  },
  error: (label, data) => {
    console.log(`%c❌ ${label}`, 'color: #ef4444; font-weight: bold;', data);
  },
  debug: (label, data) => {
    console.log(`%c🐛 ${label}`, 'color: #8b5cf6; font-weight: bold;', data);
  },
};

// Render performance logger
export const logRenderTime = (componentName) => {
  const startTime = performance.now();
  return () => {
    const endTime = performance.now();
    log.debug(`${componentName} rendered in ${(endTime - startTime).toFixed(2)}ms`);
  };
};

// Component lifecycle logger (use in useEffect)
export const useLogMount = (componentName) => {
  React.useEffect(() => {
    log.info(`${componentName} mounted`);
    return () => {
      log.warn(`${componentName} unmounted`);
    };
  }, []);
};

// Local storage logger
export const logStorageChange = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    log.info(`localStorage updated: ${key}`, value);
  } catch (e) {
    log.error(`localStorage error for ${key}`, e.message);
  }
};

// API call logger
export const logApiCall = async (url, options = {}) => {
  const method = options.method || 'GET';
  log.debug(`API ${method}`, url);
  
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      log.info(`API Success ${method}`, `${url} - ${response.status}`);
    } else {
      log.warn(`API Warning ${method}`, `${url} - ${response.status}`);
    }
    return response;
  } catch (error) {
    log.error(`API Error ${method}`, `${url} - ${error.message}`);
    throw error;
  }
};

// Error reporter (send to error tracking service)
export const reportError = (error, context = {}) => {
  log.error('Error Report', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });
  
  // In production, you could send this to:
  // - Sentry
  // - LogRocket
  // - Custom error tracking service
};

// Performance mark/measure
export const markPerformance = (name) => {
  try {
    performance.mark(name);
    log.debug('Performance Mark', name);
  } catch (e) {
    // Mark already exists
  }
};

export const measurePerformance = (name, startMark, endMark) => {
  try {
    performance.measure(name, startMark, endMark);
    const measure = performance.getEntriesByName(name)[0];
    log.info('Performance Measure', `${name}: ${measure.duration.toFixed(2)}ms`);
  } catch (e) {
    log.error('Performance Measure Error', e.message);
  }
};

// Check browser capabilities
export const checkBrowserCapabilities = () => {
  return {
    localStorage: typeof Storage !== 'undefined',
    fetch: typeof fetch !== 'undefined',
    localStorage: typeof localStorage !== 'undefined',
    matchMedia: typeof window.matchMedia === 'function',
    requestAnimationFrame: typeof requestAnimationFrame === 'function',
  };
};

// Safe theme detection
export const safeGetTheme = () => {
  try {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  } catch (e) {
    log.warn('Theme detection failed', e.message);
    return 'dark'; // fallback
  }
};

// Export all for easy import
export default {
  log,
  logRenderTime,
  useLogMount,
  logStorageChange,
  logApiCall,
  reportError,
  markPerformance,
  measurePerformance,
  checkBrowserCapabilities,
  safeGetTheme,
};
