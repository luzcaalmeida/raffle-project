import React from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <div className="antialiased text-gray-100 bg-gray-900 min-h-screen">
      {children}
    </div>
  );
}