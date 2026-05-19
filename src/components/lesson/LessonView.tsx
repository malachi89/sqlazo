import React, { useState, useEffect } from 'react';
import type { Leccion } from '../../types';
import { LessonContent } from './LessonContent';
import { ExercisePanel } from './ExercisePanel';
import { Quiz } from './Quiz';
import { useProgress } from '../../hooks/useProgress';
import { ConfettiEffect } from '../ui/ConfettiEffect';
import { ProgressBar } from '../progress/ProgressBar';
import { Clock, Tag, BookOpen, Code, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';

type Pestana = 'contenido' | 'ejercicios' | 'cuestionario';

interface LessonViewProps {
  leccion: Leccion;
}

export function LessonView({ leccion }: LessonViewProps) {
  const [pestana, setPestana] = useState<Pestana>('contenido');
  const [confeti, setConfeti] = useState(false);
  const [ejercicioSlide, setEjercicioSlide] = useState(0);

  useEffect(() => {
    setEjercicioSlide(0);
  }, [pestana]);

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
          <div>
            {leccion.ejercicios.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Esta lección no tiene ejercicios prácticos. ¡Pasa al cuestionario!</p>
            ) : (
              <>
                {totalEjercicios > 1 && (
                  <div className="flex items-center gap-3 pb-5">
                    <div className="flex-1 flex gap-1">
                      {leccion.ejercicios.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setEjercicioSlide(i)}
                          className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                            i < ejercicioSlide
                              ? 'bg-blue-500'
                              : i === ejercicioSlide
                              ? 'bg-blue-400'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                          aria-label={`Ir a ejercicio ${i + 1}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium tabular-nums whitespace-nowrap">
                      {ejercicioSlide + 1} / {totalEjercicios}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progreso: {ejerciciosOk}/{totalEjercicios}</span>
                  <ProgressBar valor={ejerciciosOk} max={totalEjercicios} mostrarPorcentaje className="w-32" />
                </div>

                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Ejercicio {ejercicioSlide + 1}
                </p>
                <ExercisePanel
                  key={leccion.ejercicios[ejercicioSlide].id}
                  ejercicio={leccion.ejercicios[ejercicioSlide]}
                  leccionId={leccion.id}
                  yaCompletado={ejerciciosCompletados.includes(leccion.ejercicios[ejercicioSlide].id)}
                />

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => setEjercicioSlide(s => s - 1)}
                    disabled={ejercicioSlide === 0}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all disabled:opacity-0 disabled:pointer-events-none"
                  >
                    <ChevronLeft size={16} /> Anterior
                  </button>

                  {ejercicioSlide === totalEjercicios - 1 ? (
                    ejerciciosOk >= totalEjercicios && leccion.cuestionario.length > 0 ? (
                      <button
                        onClick={() => setPestana('cuestionario')}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-xl shadow-md transition-all"
                      >
                        Siguiente: Quiz <ChevronRight size={16} />
                      </button>
                    ) : (
                      <span />
                    )
                  ) : (
                    <button
                      onClick={() => setEjercicioSlide(s => s + 1)}
                      className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm"
                    >
                      Siguiente <ChevronRight size={16} />
                    </button>
                  )}
                </div>
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
