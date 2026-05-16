import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getProgress, setTheme as saveTheme } from '../utils/progressStorage';

interface ThemeContextType {
  tema: 'oscuro' | 'claro';
  toggleTema: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ tema: 'oscuro', toggleTema: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState<'oscuro' | 'claro'>(() => getProgress().tema);

  useEffect(() => {
    const root = document.documentElement;
    if (tema === 'oscuro') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    saveTheme(tema);
  }, [tema]);

  const toggleTema = useCallback(() => {
    setTema(prev => prev === 'oscuro' ? 'claro' : 'oscuro');
  }, []);

  return (
    <ThemeContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
