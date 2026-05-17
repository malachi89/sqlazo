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

      {/* Cabecera compacta */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {leccion.conceptosClave.map(c => (
            <span key={c} className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
              <Tag size={10} /> {c}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate">{leccion.titulo}</h1>
          <div className="flex items-center gap-3 shrink-0 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Clock size={12} /> {leccion.duracionMinutos} min
            </span>
            <span className="whitespace-nowrap">Ej: {ejerciciosOk}/{totalEjercicios}</span>
            <span className="whitespace-nowrap">Quiz: {leccion.cuestionario.length > 0 ? (quizCompletado ? progresoLeccion?.quizPuntuacion + '%' : '—') : 'N/A'}</span>
            <span className={`font-bold ${leccionCompletada ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'}`}>
              {leccionCompletada ? '✓' : '○'}
            </span>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{leccion.descripcion}</p>
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
            <LessonContent
              secciones={leccion.contenido}
              onTerminar={
                leccionCompletada
                  ? undefined
                  : totalEjercicios > 0
                  ? () => setPestana('ejercicios')
                  : leccion.cuestionario.length > 0
                  ? () => setPestana('cuestionario')
                  : puedeCompletarLeccion
                  ? handleCompletar
                  : undefined
              }
            />
            {leccionCompletada && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700 text-center">
                <p className="text-green-700 dark:text-green-300 font-medium">✓ Lección completada</p>
              </div>
            )}
          </div>
        )}

        {pestana === 'ejercicios' && (
          <div className="space-y-8">
            {leccion.ejercicios.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Esta lección no tiene ejercicios prácticos. ¡Pasa al cuestionario!</p>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progreso: {ejerciciosOk}/{totalEjercicios}</span>
                  <ProgressBar valor={ejerciciosOk} max={totalEjercicios} mostrarPorcentaje className="w-32" />
                </div>
                {leccion.ejercicios.map((ej, i) => (
                  <div key={ej.id}>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
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
                {ejerciciosOk >= totalEjercicios && leccion.cuestionario.length > 0 && (
                  <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setPestana('cuestionario')}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                    >
                      Siguiente: Quiz <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {pestana === 'cuestionario' && (
          <div>
            {leccion.cuestionario.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Esta lección no tiene cuestionario.</p>
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
