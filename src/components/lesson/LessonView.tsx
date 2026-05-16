import React, { useState } from 'react';
import type { Leccion } from '../../types';
import { LessonContent } from './LessonContent';
import { ExercisePanel } from './ExercisePanel';
import { Quiz } from './Quiz';
import { useProgress } from '../../hooks/useProgress';
import { ConfettiEffect } from '../ui/ConfettiEffect';
import { ProgressBar } from '../progress/ProgressBar';
import { Clock, Tag, BookOpen, Code, HelpCircle, ChevronRight } from 'lucide-react';

type Pestana = 'contenido' | 'ejercicios' | 'cuestionario';

interface LessonViewProps {
  leccion: Leccion;
}

export function LessonView({ leccion }: LessonViewProps) {
  const [pestana, setPestana] = useState<Pestana>('contenido');
  const [confeti, setConfeti] = useState(false);
  const { progress, completarLeccion } = useProgress();
  const progresoLeccion = progress.lecciones[leccion.id];

  const ejerciciosCompletados = progresoLeccion?.ejerciciosCompletados ?? [];
  const totalEjercicios = leccion.ejercicios.length;
  const ejerciciosOk = ejerciciosCompletados.length;
  const quizCompletado = progresoLeccion?.quizCompletado ?? false;
  const leccionCompletada = progresoLeccion?.completada ?? false;

  const puedeCompletarLeccion =
    !leccionCompletada &&
    (totalEjercicios === 0 || ejerciciosOk >= totalEjercicios) &&
    (leccion.cuestionario.length === 0 || quizCompletado);

  const handleCompletar = () => {
    if (!leccionCompletada) {
      completarLeccion(leccion.id, 50, progresoLeccion?.quizPuntuacion ?? 0);
      setConfeti(true);
    }
  };

  const handleQuizCompletar = (puntuacion: number) => {
    const xpBonus = puntuacion === 100 ? 30 : 0;
    completarLeccion(leccion.id, 50 + xpBonus, puntuacion);
    setConfeti(true);
  };

  const tabs: Array<{ id: Pestana; label: string; icono: React.ReactNode; count?: number }> = [
    { id: 'contenido', label: 'Contenido', icono: <BookOpen size={15} /> },
    { id: 'ejercicios', label: 'Ejercicios', icono: <Code size={15} />, count: totalEjercicios },
    { id: 'cuestionario', label: 'Quiz', icono: <HelpCircle size={15} />, count: leccion.cuestionario.length },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <ConfettiEffect activo={confeti} onDone={() => setConfeti(false)} />

      {/* Cabecera de la lección */}
      <div className="mb-6 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {leccion.conceptosClave.map(c => (
            <span key={c} className="flex items-center gap-1 px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
              <Tag size={10} /> {c}
            </span>
          ))}
          <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs text-gray-500 dark:text-gray-400 ml-auto">
            <Clock size={12} /> {leccion.duracionMinutos} min
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{leccion.titulo}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{leccion.descripcion}</p>

        {/* Progreso de la lección */}
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-lg font-bold text-gray-900 dark:text-white">{ejerciciosOk}/{totalEjercicios}</p>
            <p className="text-xs text-gray-500">Ejercicios</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-lg font-bold text-gray-900 dark:text-white">{leccion.cuestionario.length > 0 ? (quizCompletado ? progresoLeccion?.quizPuntuacion + '%' : '—') : 'N/A'}</p>
            <p className="text-xs text-gray-500">Quiz</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className={`text-lg font-bold ${leccionCompletada ? 'text-green-500' : 'text-gray-400'}`}>
              {leccionCompletada ? '✓' : '○'}
            </p>
            <p className="text-xs text-gray-500">Estado</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setPestana(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
              pestana === tab.id
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {tab.icono}
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className="ml-0.5 text-xs bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Contenido de tabs */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        {pestana === 'contenido' && (
          <div>
            <LessonContent secciones={leccion.contenido} />
            {puedeCompletarLeccion && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleCompletar}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg transition-all"
                >
                  Marcar lección como completada <ChevronRight size={16} />
                </button>
              </div>
            )}
            {leccionCompletada && (
              <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700 text-center">
                <p className="text-green-700 dark:text-green-300 font-medium">✓ Lección completada</p>
              </div>
            )}
            {totalEjercicios > 0 && !leccionCompletada && (
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700 text-center">
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Completa los <strong>{totalEjercicios} ejercicios</strong> y el cuestionario para finalizar la lección.
                </p>
                <button
                  onClick={() => setPestana('ejercicios')}
                  className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-1 mx-auto"
                >
                  Ir a ejercicios <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}

        {pestana === 'ejercicios' && (
          <div className="space-y-8">
            {leccion.ejercicios.length === 0 ? (
              <p className="text-center text-gray-400 py-8">Esta lección no tiene ejercicios prácticos. ¡Pasa al cuestionario!</p>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progreso: {ejerciciosOk}/{totalEjercicios}</span>
                  <ProgressBar valor={ejerciciosOk} max={totalEjercicios} mostrarPorcentaje className="w-32" />
                </div>
                {leccion.ejercicios.map((ej, i) => (
                  <div key={ej.id}>
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                      Ejercicio {i + 1}
                    </p>
                    <ExercisePanel
                      ejercicio={ej}
                      leccionId={leccion.id}
                      yaCompletado={ejerciciosCompletados.includes(ej.id)}
                    />
                    {i < leccion.ejercicios.length - 1 && <hr className="mt-8 border-gray-200 dark:border-gray-700" />}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {pestana === 'cuestionario' && (
          <div>
            {leccion.cuestionario.length === 0 ? (
              <p className="text-center text-gray-400 py-8">Esta lección no tiene cuestionario.</p>
            ) : (
              <Quiz
                preguntas={leccion.cuestionario}
                onCompletar={handleQuizCompletar}
                yaCompletado={quizCompletado}
                puntuacionPrevia={progresoLeccion?.quizPuntuacion}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
