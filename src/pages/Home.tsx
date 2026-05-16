import React from 'react';
import { Link } from 'react-router-dom';
import { curriculum } from '../content/curriculum';
import { useProgress } from '../hooks/useProgress';
import { ProgressBar } from '../components/progress/ProgressBar';
import { XpBar } from '../components/progress/XpBar';
import { StreakBadge } from '../components/progress/StreakBadge';
import { getNivelEstudiante } from '../utils/gamification';
import { Database, BookOpen, Dumbbell, Lock, ChevronRight, Zap } from 'lucide-react';

const nivelColorBg: Record<string, string> = {
  'muy-novato': 'from-blue-500 to-blue-700',
  'novato': 'from-green-500 to-green-700',
  'intermedio': 'from-orange-500 to-orange-700',
  'avanzado': 'from-red-500 to-red-700',
};

export function Home() {
  const { progress, estaDesbloqueado } = useProgress();
  const nivelEst = getNivelEstudiante(progress.xpTotal);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero */}
      <div className="text-center py-10">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
            <Database size={32} className="text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Bienvenido a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">SQLazo</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Aprende SQL desde cero absoluto hasta nivel avanzado con lecciones interactivas, ejercicios reales y un motor SQLite directamente en tu navegador.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            100% offline
          </span>
          <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
            <BookOpen size={14} />
            58 lecciones
          </span>
          <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Dumbbell size={14} />
            400+ ejercicios
          </span>
          <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Zap size={14} />
            SQLite en el navegador
          </span>
        </div>
      </div>

      {/* Progreso del alumno */}
      {progress.xpTotal > 0 && (
        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-white">Tu progreso</h2>
            <StreakBadge racha={progress.racha} compact />
          </div>
          <XpBar xpTotal={progress.xpTotal} />
          <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs text-gray-500 dark:text-gray-400">
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{progress.estadisticas.leccionesCompletadas}</p>
              <p>Lecciones</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{progress.estadisticas.ejerciciosResueltos}</p>
              <p>Ejercicios</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{progress.insignias.length}</p>
              <p>Insignias</p>
            </div>
          </div>
        </div>
      )}

      {/* Niveles */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Elige tu nivel</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {curriculum.map(nivel => {
            const desbloqueado = estaDesbloqueado(nivel.id);
            const allLeccionIds = nivel.modulos.flatMap(m => m.lecciones.map(l => l.id));
            const completadas = allLeccionIds.filter(id => progress.lecciones[id]?.completada).length;
            const total = allLeccionIds.length;
            const pct = total > 0 ? Math.round((completadas / total) * 100) : 0;

            return (
              <Link
                key={nivel.id}
                to={desbloqueado ? `/curso/${nivel.id}` : '#'}
                className={`group relative overflow-hidden rounded-2xl border-2 p-6 transition-all ${
                  desbloqueado
                    ? `${nivel.borderClase} hover:shadow-lg hover:-translate-y-0.5`
                    : 'border-gray-200 dark:border-gray-700 opacity-60 cursor-not-allowed'
                } bg-white dark:bg-gray-900`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{nivel.emoji}</span>
                  {!desbloqueado && <Lock size={18} className="text-gray-400" />}
                  {desbloqueado && pct > 0 && (
                    <span className={`text-sm font-bold ${nivel.colorClase}`}>{pct}%</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{nivel.titulo}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{nivel.descripcion}</p>
                <div className="space-y-1.5">
                  <ProgressBar
                    valor={completadas}
                    max={total}
                    color={nivel.bgClase}
                    altura="sm"
                    mostrarPorcentaje
                  />
                  <p className="text-xs text-gray-400">{completadas}/{total} lecciones · {nivel.modulos.length} módulos</p>
                </div>
                {desbloqueado && (
                  <ChevronRight
                    size={18}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${nivel.colorClase} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                )}
                {!desbloqueado && (
                  <p className="text-xs text-gray-400 mt-2">
                    Completa el nivel anterior para desbloquear
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Banco de ejercicios */}
      <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Dumbbell size={20} className="text-purple-500" />
              Banco de ejercicios
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              400 ejercicios reales con validación automática. Practica a tu ritmo.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Completados: {Object.keys(progress.ejerciciosBanco).length} / 400
            </p>
          </div>
          <Link
            to="/ejercicios"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            Explorar <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
