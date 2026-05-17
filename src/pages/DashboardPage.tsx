import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { XpBar } from '../components/progress/XpBar';
import { StreakBadge } from '../components/progress/StreakBadge';
import { InsigniaCard } from '../components/progress/InsigniaCard';
import { ProgressBar } from '../components/progress/ProgressBar';
import { INSIGNIAS } from '../content/insignias';
import { curriculum } from '../content/curriculum';
import { getNivelEstudiante } from '../utils/gamification';
import { resetProgress } from '../utils/progressStorage';
import { Link } from 'react-router-dom';
import { Trophy, Flame, Target, BookOpen, Dumbbell } from 'lucide-react';

export function DashboardPage() {
  const { progress } = useProgress();
  const nivelEst = getNivelEstudiante(progress.xpTotal);

  const handleReset = () => {
    if (window.confirm('¿Seguro que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
      resetProgress();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mi progreso</h1>

      {/* Perfil y XP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl">
              {nivelEst.titulo === 'Maestro SQL' ? '👑' : '🎓'}
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-lg">{nivelEst.titulo}</p>
              <p className="text-sm text-gray-600">{progress.xpTotal} XP acumulados</p>
            </div>
          </div>
          <XpBar xpTotal={progress.xpTotal} />
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Flame size={18} className="text-orange-500" />
            <span className="font-semibold text-gray-900 dark:text-white text-sm">Racha diaria</span>
          </div>
          <StreakBadge racha={progress.racha} />
          <p className="text-xs text-gray-500 mt-2">
            {progress.racha === 0 ? 'Estudia hoy para empezar tu racha' :
             progress.racha < 3 ? '¡Sigue así!' :
             progress.racha < 7 ? '¡Excelente racha!' :
             '¡Increíble constancia!'}
          </p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Lecciones completadas', value: progress.estadisticas.leccionesCompletadas, icono: <BookOpen size={18} className="text-blue-500" /> },
          { label: 'Ejercicios resueltos', value: progress.estadisticas.ejerciciosResueltos, icono: <Dumbbell size={18} className="text-green-500" /> },
          { label: 'Primer intento', value: progress.estadisticas.ejerciciosPrimerIntento, icono: <Target size={18} className="text-yellow-500" /> },
          { label: 'Sin pistas', value: progress.estadisticas.ejerciciosSinPistas, icono: <Trophy size={18} className="text-purple-500" /> },
        ].map(stat => (
          <div key={stat.label} className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
            <div className="flex justify-center mb-2">{stat.icono}</div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Progreso por nivel */}
      <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Progreso por nivel</h2>
        <div className="space-y-4">
          {curriculum.map(nivel => {
            const ids = nivel.modulos.flatMap(m => m.lecciones.map(l => l.id));
            const comp = ids.filter(id => progress.lecciones[id]?.completada).length;
            const pct = ids.length > 0 ? Math.round((comp / ids.length) * 100) : 0;
            return (
              <div key={nivel.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span>{nivel.emoji}</span>
                    <Link to={`/curso/${nivel.id}`} className={`text-sm font-medium ${nivel.colorClase} hover:underline`}>
                      {nivel.titulo}
                    </Link>
                  </div>
                  <span className="text-sm text-gray-500">{comp}/{ids.length}</span>
                </div>
                <ProgressBar valor={comp} max={ids.length} color={nivel.bgClase} mostrarPorcentaje />
              </div>
            );
          })}
        </div>
      </div>

      {/* Insignias */}
      <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
          Insignias ({progress.insignias.length}/{INSIGNIAS.length})
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3">
          {INSIGNIAS.map(insignia => (
            <InsigniaCard
              key={insignia.id}
              insignia={insignia}
              obtenida={progress.insignias.includes(insignia.id)}
            />
          ))}
        </div>
      </div>

      {/* Reset */}
      <div className="text-center pb-4">
        <button
          onClick={handleReset}
          className="text-xs text-gray-500 hover:text-red-500 transition-colors"
        >
          Reiniciar todo mi progreso
        </button>
      </div>
    </div>
  );
}
