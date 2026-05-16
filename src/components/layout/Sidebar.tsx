import React, { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, CheckCircle, Circle, Lock, BookOpen } from 'lucide-react';
import type { NivelCurso } from '../../types';
import { useProgress } from '../../hooks/useProgress';
import { ProgressBar } from '../progress/ProgressBar';

interface SidebarProps {
  curriculum: NivelCurso[];
  abierto: boolean;
}

const nivelColor: Record<string, string> = {
  'muy-novato': 'text-blue-500',
  'novato': 'text-green-500',
  'intermedio': 'text-orange-500',
  'avanzado': 'text-red-500',
};
const nivelBg: Record<string, string> = {
  'muy-novato': 'bg-blue-500',
  'novato': 'bg-green-500',
  'intermedio': 'bg-orange-500',
  'avanzado': 'bg-red-500',
};

export function Sidebar({ curriculum, abierto }: SidebarProps) {
  const { progress, estaDesbloqueado } = useProgress();
  const params = useParams();
  const location = useLocation();
  const [modulosAbiertos, setModulosAbiertos] = useState<Record<string, boolean>>({});

  const toggleModulo = (id: string) => {
    setModulosAbiertos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!abierto) return null;

  return (
    <aside className="w-72 flex-shrink-0 flex flex-col h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-blue-500" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Contenido del curso</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {curriculum.map(nivel => {
          const desbloqueado = estaDesbloqueado(nivel.id);
          const allLeccionIds = nivel.modulos.flatMap(m => m.lecciones.map(l => l.id));
          const completadas = allLeccionIds.filter(id => progress.lecciones[id]?.completada).length;
          const total = allLeccionIds.length;
          const pct = total > 0 ? Math.round((completadas / total) * 100) : 0;

          return (
            <div key={nivel.id} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Cabecera del nivel */}
              <Link
                to={desbloqueado ? `/curso/${nivel.id}` : '#'}
                className={`flex items-center gap-3 px-4 py-3 ${desbloqueado ? 'hover:bg-gray-50 dark:hover:bg-gray-800' : 'opacity-60 cursor-not-allowed'} transition-colors`}
              >
                <span className="text-xl">{nivel.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">{nivel.titulo}</span>
                    {!desbloqueado && <Lock size={12} className="text-gray-400 flex-shrink-0 ml-1" />}
                    {desbloqueado && <span className="text-xs text-gray-400">{pct}%</span>}
                  </div>
                  {desbloqueado && (
                    <ProgressBar
                      valor={completadas}
                      max={total}
                      altura="xs"
                      color={nivelBg[nivel.id]}
                      className="mt-1.5"
                    />
                  )}
                </div>
              </Link>

              {/* Módulos y lecciones */}
              {desbloqueado && nivel.modulos.map(modulo => {
                const abierto = modulosAbiertos[modulo.id] ?? location.pathname.includes(modulo.id);
                return (
                  <div key={modulo.id} className="border-t border-gray-100 dark:border-gray-800">
                    <button
                      onClick={() => toggleModulo(modulo.id)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      {abierto ? <ChevronDown size={14} className="text-gray-400 flex-shrink-0" /> : <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />}
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate flex-1">
                        {modulo.titulo}
                      </span>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {modulo.lecciones.filter(l => progress.lecciones[l.id]?.completada).length}/{modulo.lecciones.length}
                      </span>
                    </button>

                    {abierto && (
                      <div className="pb-1">
                        {modulo.lecciones.map(leccion => {
                          const completada = progress.lecciones[leccion.id]?.completada;
                          const ruta = `/leccion/${nivel.id}/${modulo.id}/${leccion.id}`;
                          const activa = location.pathname === ruta;
                          return (
                            <Link
                              key={leccion.id}
                              to={ruta}
                              className={`flex items-center gap-2.5 pl-8 pr-4 py-2 text-sm transition-colors ${
                                activa
                                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100'
                              }`}
                            >
                              {completada
                                ? <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                                : <Circle size={14} className={`${nivelColor[nivel.id]} flex-shrink-0 opacity-50`} />
                              }
                              <span className="truncate text-xs">{leccion.titulo}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
