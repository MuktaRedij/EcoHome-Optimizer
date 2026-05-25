import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    try {
      // Check localStorage for saved theme
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
        // Use saved theme
        setTheme(savedTheme);
        applyTheme(savedTheme);
      } else {
        // Auto-detect system theme
        try {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const systemTheme = prefersDark ? 'dark' : 'light';
          setTheme(systemTheme);
          applyTheme(systemTheme);
        } catch (e) {
          // Fallback if matchMedia fails
          applyTheme('dark');
        }
      }
    } catch (e) {
      console.warn('Theme initialization error:', e);
      applyTheme('dark');
    }
    
    setMounted(true);
  }, []);

  // Apply theme to document
  const applyTheme = (themeValue) => {
    try {
      const root = document.documentElement;
      
      if (themeValue === 'dark') {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    } catch (e) {
      console.warn('Theme apply error:', e);
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {
      console.warn('localStorage error:', e);
    }
    applyTheme(newTheme);
  };

  // Provide theme context value
  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
