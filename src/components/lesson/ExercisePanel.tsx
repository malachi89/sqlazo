import React, { useState, useMemo, useEffect } from 'react';
import type { EjercicioLeccion } from '../../types';
import { SqlEditor } from '../editor/SqlEditor';
import { ResultTable } from '../editor/ResultTable';
import { FeedbackPanel } from '../editor/FeedbackPanel';
import { useSql } from '../../hooks/useSql';
import { evaluateQuery } from '../../utils/sqlEvaluator';
import { extractSchema } from '../../utils/schemaParser';
import { useSchema } from '../../context/SchemaContext';
import { useProgress } from '../../hooks/useProgress';
import { ConfettiEffect } from '../ui/ConfettiEffect';
import { CheckCircle, Target } from 'lucide-react';

interface ExercisePanelProps {
  ejercicio: EjercicioLeccion;
  leccionId: string;
  yaCompletado: boolean;
}

export function ExercisePanel({ ejercicio, leccionId, yaCompletado }: ExercisePanelProps) {
  const { executeQuery } = useSql();
  const { completarEjercicioLeccion } = useProgress();
  const esquema = useMemo(() => extractSchema(ejercicio.setupSql), [ejercicio.setupSql]);
  const { setEsquema } = useSchema();

  useEffect(() => {
    setEsquema(esquema)
    return () => setEsquema(null)
  }, [esquema, setEsquema])
  const [resultado, setResultado] = useState<any>(null);
  const [evaluacion, setEvaluacion] = useState<any>(null);
  const [intentos, setIntentos] = useState(0);
  const [completado, setCompletado] = useState(yaCompletado);
  const [confeti, setConfeti] = useState(false);
  const [pistaUsada, setPistaUsada] = useState(false);

  const handleEjecutar = (query: string) => {
    const res = executeQuery(query, ejercicio.setupSql);
    setResultado(res);
    const eval_ = evaluateQuery(res, ejercicio.resultadoEsperado);
    setEvaluacion(eval_);
    const nuevosIntentos = intentos + 1;
    setIntentos(nuevosIntentos);

    if (eval_.correcto && !completado) {
      setCompletado(true);
      setConfeti(true);
      completarEjercicioLeccion(
        leccionId,
        ejercicio.id,
        15,
        nuevosIntentos === 1,
        !pistaUsada
      );
    }
  };

  if (completado && !resultado) {
    return (
      <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
        <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-green-800 dark:text-green-300">Ejercicio completado</p>
          <p className="text-xs text-green-600 dark:text-green-400">{ejercicio.titulo}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ConfettiEffect activo={confeti} onDone={() => setConfeti(false)} />
      <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <Target size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{ejercicio.titulo}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ejercicio.descripcion}</p>
        </div>
      </div>

      <SqlEditor
        valorInicial=""
        onEjecutar={handleEjecutar}
        altura="120px"
      />

      {resultado && <ResultTable resultado={resultado} esCorrecto={evaluacion?.correcto} />}
      {evaluacion && (
        <FeedbackPanel
          evaluacion={evaluacion}
          pistas={ejercicio.pistas}
          solucion={ejercicio.solucionOficial}
          explicacion={ejercicio.explicacion}
          intentos={intentos}
          onMostrarSolucion={() => {}}
        />
      )}
    </div>
  );
}
