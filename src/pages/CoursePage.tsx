import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { curriculum } from '../content/curriculum';
import { useProgress } from '../hooks/useProgress';
import { ProgressBar } from '../components/progress/ProgressBar';
import type { Nivel } from '../types';
import { CheckCircle, Circle, Clock, Lock, ChevronRight } from 'lucide-react';

export function CoursePage() {
  const { nivel: nivelParam } = useParams<{ nivel: string }>();
  const nivel = curriculum.find(n => n.id === nivelParam);
  const { progress, estaDesbloqueado } = useProgress();

  if (!nivel) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 dark:text-gray-400">Nivel no encontrado.</p>
        <Link to="/" className="text-blue-500 hover:underline mt-2 inline-block">Volver al inicio</Link>
      </div>
    );
  }

  if (!estaDesbloqueado(nivel.id as Nivel)) {
    return (
      <div className="text-center py-16">
        <Lock size={48} className="text-gray-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nivel bloqueado</h2>
        <p className="text-gray-500 dark:text-gray-400">Completa el nivel anterior para desbloquear este.</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Volver al inicio</Link>
      </div>
    );
  }

  const allLeccionIds = nivel.modulos.flatMap(m => m.lecciones.map(l => l.id));
  const completadas = allLeccionIds.filter(id => progress.lecciones[id]?.completada).length;
  const total = allLeccionIds.length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header del nivel */}
      <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{nivel.emoji}</span>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{nivel.titulo}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{nivel.descripcion}</p>
          </div>
        </div>
        <ProgressBar valor={completadas} max={total} color={nivel.bgClase} mostrarPorcentaje altura="md" />
        <p className="text-xs text-gray-500 mt-2">{completadas} de {total} lecciones completadas</p>
      </div>

      {/* Módulos */}
      <div className="space-y-4">
        {nivel.modulos.map((modulo, mi) => {
          const leccionesModulo = modulo.lecciones;
          const completadasModulo = leccionesModulo.filter(l => progress.lecciones[l.id]?.completada).length;

          return (
            <div key={modulo.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
              {/* Cabecera módulo */}
              <div className="flex items-center gap-4 p-5 border-b border-gray-100 dark:border-gray-800">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${nivel.bgClase}`}>
                  {mi + 1}
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-900 dark:text-white">{modulo.titulo}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{modulo.descripcion}</p>
                </div>
                <span className="text-sm text-gray-500">{completadasModulo}/{leccionesModulo.length}</span>
              </div>

              {/* Lecciones */}
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {leccionesModulo.map((leccion, li) => {
                  const completada = progress.lecciones[leccion.id]?.completada;
                  const ruta = `/leccion/${nivel.id}/${modulo.id}/${leccion.id}`;

                  return (
                    <Link
                      key={leccion.id}
                      to={ruta}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="flex-shrink-0">
                        {completada
                          ? <CheckCircle size={20} className="text-green-500" />
                          : <Circle size={20} className="text-gray-300 dark:text-gray-600" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          <span className="text-gray-500 mr-2">{mi + 1}.{li + 1}</span>
                          {leccion.titulo}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{leccion.descripcion}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock size={12} /> {leccion.duracionMinutos} min
                        </span>
                        {leccion.ejercicios.length > 0 && (
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                            {leccion.ejercicios.length} ejs.
                          </span>
                        )}
                        <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
