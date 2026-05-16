import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Database, LayoutDashboard, BookOpen, Dumbbell, TableProperties, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useProgress } from '../../hooks/useProgress';
import { useSchema } from '../../context/SchemaContext';
import { SchemaExplorer } from '../exercise/SchemaExplorer';
import { XpBar } from '../progress/XpBar';
import { StreakBadge } from '../progress/StreakBadge';
import { getNivelEstudiante } from '../../utils/gamification';

interface HeaderProps {
  sidebarAbierto: boolean;
  onToggleSidebar: () => void;
}

export function Header({ sidebarAbierto, onToggleSidebar }: HeaderProps) {
  const { tema, toggleTema } = useTheme();
  const { progress } = useProgress();
  const { esquema } = useSchema();
  const nivelEst = getNivelEstudiante(progress.xpTotal);
  const location = useLocation();
  const [schemaAbierto, setSchemaAbierto] = useState(false);

  const navLinks = [
    { to: '/', label: 'Inicio', icono: <Database size={16} /> },
    { to: '/dashboard', label: 'Mi progreso', icono: <LayoutDashboard size={16} /> },
    { to: '/curso/muy-novato', label: 'Curso', icono: <BookOpen size={16} /> },
    { to: '/ejercicios', label: 'Ejercicios', icono: <Dumbbell size={16} /> },
  ];

  const enEjercicio = location.pathname.startsWith('/ejercicios') || location.pathname.startsWith('/leccion');

  return (
    <header className="h-14 flex items-center gap-3 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-30">
      {/* Logo + toggle sidebar */}
      <button
        onClick={onToggleSidebar}
        className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
        title={sidebarAbierto ? 'Cerrar menú' : 'Abrir menú'}
      >
        {sidebarAbierto ? <X size={18} /> : <Menu size={18} />}
      </button>

      <Link to="/" className="flex items-center gap-2 mr-4">
        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Database size={14} className="text-white" />
        </div>
        <span className="font-bold text-gray-900 dark:text-white text-sm hidden sm:block">SQLazo</span>
      </Link>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-1 flex-1">
        {navLinks.map(link => {
          const activo = link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activo
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {link.icono}
              {link.label}
            </Link>
          );
        })}
        {esquema && enEjercicio && (
          <button
            onClick={() => setSchemaAbierto(!schemaAbierto)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              schemaAbierto
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            <TableProperties size={16} />
            Esquema
          </button>
        )}
      </nav>

      {/* XP y racha */}
      <div className="hidden lg:flex items-center gap-4 ml-auto">
        <div className="w-40">
          <XpBar xpTotal={progress.xpTotal} compact />
        </div>
        <StreakBadge racha={progress.racha} compact />
        <span className="text-xs text-gray-400 dark:text-gray-500 hidden xl:block">{nivelEst.titulo}</span>
      </div>

      {/* Toggle tema */}
      <button
        onClick={toggleTema}
        className="ml-auto md:ml-0 p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
        title={tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        {tema === 'oscuro' ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Schema panel */}
      {schemaAbierto && esquema && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSchemaAbierto(false)} />
          <div className="relative w-96 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <div className="flex items-center gap-2">
                <TableProperties size={16} className="text-indigo-500" />
                <span className="font-semibold text-sm text-gray-900 dark:text-white">Esquema de la BD</span>
              </div>
              <button
                onClick={() => setSchemaAbierto(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-4">
              <SchemaExplorer esquema={esquema} embedded />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
