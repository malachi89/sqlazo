import React, { useState, useMemo } from 'react';
import type { EjercicioBanco, Nivel } from '../../types';
import { Badge } from '../ui/Badge';
import { useProgress } from '../../hooks/useProgress';
import { CheckCircle, Search, Lock } from 'lucide-react';

interface ExerciseBrowserProps {
  ejercicios: EjercicioBanco[];
  nivelSeleccionado?: Nivel | 'todos';
  onSeleccionar: (ejercicio: EjercicioBanco) => void;
  ejercicioActivo?: string;
}

const NIVELES_ORDEN: Nivel[] = ['muy-novato', 'novato', 'intermedio', 'avanzado'];
const LABEL_NIVEL: Record<Nivel, string> = {
  'muy-novato': 'Muy novato',
  'novato': 'Novato',
  'intermedio': 'Intermedio',
  'avanzado': 'Avanzado',
};

export function ExerciseBrowser({
  ejercicios,
  nivelSeleccionado = 'todos',
  onSeleccionar,
  ejercicioActivo,
}: ExerciseBrowserProps) {
  const [filtroNivel, setFiltroNivel] = useState<Nivel | 'todos'>(nivelSeleccionado);
  const [busqueda, setBusqueda] = useState('');
  const [soloIncompletos, setSoloIncompletos] = useState(false);
  const { progress, estaDesbloqueado } = useProgress();

  const filtrados = useMemo(() => {
    return ejercicios.filter(ej => {
      if (filtroNivel !== 'todos' && ej.nivel !== filtroNivel) return false;
      if (soloIncompletos && progress.ejerciciosBanco[ej.id]) return false;
      if (busqueda) {
        const q = busqueda.toLowerCase();
        return ej.titulo.toLowerCase().includes(q) || ej.descripcion.toLowerCase().includes(q) || ej.id.toLowerCase().includes(q);
      }
      return true;
    });
  }, [ejercicios, filtroNivel, soloIncompletos, busqueda, progress.ejerciciosBanco]);

  const conteos = useMemo(() => {
    const c: Record<string, { total: number; completados: number }> = { todos: { total: 0, completados: 0 } };
    NIVELES_ORDEN.forEach(n => { c[n] = { total: 0, completados: 0 }; });
    ejercicios.forEach(ej => {
      c[ej.nivel].total++;
      c['todos'].total++;
      if (progress.ejerciciosBanco[ej.id]) {
        c[ej.nivel].completados++;
        c['todos'].completados++;
      }
    });
    return c;
  }, [ejercicios, progress.ejerciciosBanco]);

  return (
    <div className="flex flex-col h-full">
      {/* Filtros */}
      <div className="p-4 space-y-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar ejercicios..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(['todos', ...NIVELES_ORDEN] as const).map(n => {
            const isLocked = n !== 'todos' && !estaDesbloqueado(n);
            const cnt = conteos[n];
            return (
              <button
                key={n}
                onClick={() => !isLocked && setFiltroNivel(n)}
                disabled={isLocked}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg transition-all ${
                  filtroNivel === n
                    ? 'bg-blue-600 text-white'
                    : isLocked
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {isLocked ? <Lock size={10} /> : null}
                {n === 'todos' ? 'Todos' : LABEL_NIVEL[n]}
                <span className="opacity-70">({cnt.completados}/{cnt.total})</span>
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={soloIncompletos}
            onChange={e => setSoloIncompletos(e.target.checked)}
            className="rounded"
          />
          Solo incompletos
        </label>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          <p className="text-xs text-gray-400 px-2 py-1">{filtrados.length} ejercicio{filtrados.length !== 1 ? 's' : ''}</p>
          {filtrados.map(ej => {
            const completado = progress.ejerciciosBanco[ej.id];
            const activo = ejercicioActivo === ej.id;
            return (
              <button
                key={ej.id}
                onClick={() => onSeleccionar(ej)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                  activo
                    ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent'
                }`}
              >
                <div className={`mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  completado ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {completado && <CheckCircle size={10} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge nivel={ej.nivel} className="text-xs">{ej.nivel.replace('-', ' ')}</Badge>
                    <span className="text-xs text-gray-400 font-mono truncate">{ej.id}</span>
                  </div>
                  <p className={`text-sm font-medium truncate ${activo ? 'text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200'}`}>
                    {ej.titulo}
                  </p>
                </div>
              </button>
            );
          })}
          {filtrados.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              No se encontraron ejercicios
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
