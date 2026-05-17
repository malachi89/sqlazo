import React, { useState, useMemo, useEffect } from 'react';
import type { EjercicioBanco } from '../../types';
import { SqlEditor } from '../editor/SqlEditor';
import { ResultTable } from '../editor/ResultTable';
import { FeedbackPanel } from '../editor/FeedbackPanel';
import { useSql } from '../../hooks/useSql';
import { evaluateBankExercise } from '../../utils/sqlEvaluator';
import { extractSchema } from '../../utils/schemaParser';
import { SchemaExplorer } from './SchemaExplorer';
import { useSchema } from '../../context/SchemaContext';
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
  const esquema = useMemo(() => extractSchema(ejercicio.setupSql), [ejercicio.setupSql]);
  const { setEsquema } = useSchema();

  useEffect(() => {
    setEsquema(esquema)
    return () => setEsquema(null)
  }, [esquema, setEsquema])

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
            <span className="text-xs text-gray-500 font-mono">{ejercicio.id}</span>
            {yaCompletado && (
              <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium ml-auto">
                <CheckCircle size={12} /> Completado
              </span>
            )}
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{ejercicio.titulo}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ejercicio.descripcion}</p>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <Target size={13} className="text-blue-500 flex-shrink-0" />
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Objetivo:</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">{ejercicio.objetivo}</span>
          </div>
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
