import React, { useState } from 'react';
import type { EjercicioBanco } from '../../types';
import { SqlEditor } from '../editor/SqlEditor';
import { ResultTable } from '../editor/ResultTable';
import { FeedbackPanel } from '../editor/FeedbackPanel';
import { useSql } from '../../hooks/useSql';
import { evaluateBankExercise } from '../../utils/sqlEvaluator';
import { useProgress } from '../../hooks/useProgress';
import { ConfettiEffect } from '../ui/ConfettiEffect';
import { Badge } from '../ui/Badge';
import { Target, CheckCircle } from 'lucide-react';

interface ExerciseViewProps {
  ejercicio: EjercicioBanco;
}

export function ExerciseView({ ejercicio }: ExerciseViewProps) {
  const { executeQuery } = useSql();
  const { progress, completarEjercicioBanco } = useProgress();
  const [resultado, setResultado] = useState<any>(null);
  const [evaluacion, setEvaluacion] = useState<any>(null);
  const [intentos, setIntentos] = useState(0);
  const [confeti, setConfeti] = useState(false);
  const yaCompletado = progress.ejerciciosBanco[ejercicio.id] ?? false;

  const handleEjecutar = (query: string) => {
    const res = executeQuery(query, ejercicio.setupSql);
    setResultado(res);
    const eval_ = evaluateBankExercise(res, ejercicio.resultadoEsperado, ejercicio.nivel);
    setEvaluacion(eval_);
    const nuevosIntentos = intentos + 1;
    setIntentos(nuevosIntentos);

    if (eval_.correcto && !yaCompletado) {
      setConfeti(true);
      completarEjercicioBanco(ejercicio.id, ejercicio.nivel, eval_.xpGanado ?? 20, nuevosIntentos === 1);
    }
  };

  return (
    <div className="space-y-5">
      <ConfettiEffect activo={confeti} onDone={() => setConfeti(false)} />

      {/* Header */}
      <div className="flex flex-wrap items-start gap-3 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge nivel={ejercicio.nivel}>{ejercicio.nivel.replace('-', ' ')}</Badge>
            <span className="text-xs text-gray-400 font-mono">{ejercicio.id}</span>
            {yaCompletado && (
              <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium ml-auto">
                <CheckCircle size={12} /> Completado
              </span>
            )}
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{ejercicio.titulo}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ejercicio.descripcion}</p>
        </div>
      </div>

      {/* Objetivo */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <Target size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-1">Objetivo</p>
          <p className="text-sm text-blue-800 dark:text-blue-200">{ejercicio.objetivo}</p>
        </div>
      </div>

      {/* Editor */}
      <SqlEditor valorInicial="" onEjecutar={handleEjecutar} altura="140px" />

      {/* Resultados */}
      {resultado && <ResultTable resultado={resultado} esCorrecto={evaluacion?.correcto} />}
      {evaluacion && (
        <FeedbackPanel
          evaluacion={evaluacion}
          pistas={ejercicio.pistas}
          solucion={ejercicio.solucionOficial}
          explicacion={ejercicio.explicacion}
          intentos={intentos}
        />
      )}
    </div>
  );
}
