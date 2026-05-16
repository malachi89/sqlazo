import React, { useState } from 'react';
import { CheckCircle, XCircle, Lightbulb, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import type { EvaluationResult } from '../../types';
import { SqlEditor } from './SqlEditor';

interface FeedbackPanelProps {
  evaluacion: EvaluationResult | null;
  pistas: string[];
  solucion: string;
  explicacion: string;
  intentos: number;
  onMostrarSolucion?: () => void;
}

export function FeedbackPanel({
  evaluacion,
  pistas,
  solucion,
  explicacion,
  intentos,
  onMostrarSolucion,
}: FeedbackPanelProps) {
  const [pistaActual, setPistaActual] = useState(0);
  const [mostrarPistas, setMostrarPistas] = useState(false);
  const [mostrarSolucion, setMostrarSolucion] = useState(false);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const mostrarBotonSolucion = intentos >= 3;

  if (!evaluacion) return null;

  return (
    <div className="space-y-3 animate-fade-in">
      {/* Resultado principal */}
      <div className={`flex items-start gap-3 p-4 rounded-xl border ${
        evaluacion.correcto
          ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700'
          : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'
      }`}>
        {evaluacion.correcto
          ? <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
          : <XCircle className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
        }
        <div className="flex-1">
          <p className={`text-sm font-medium ${evaluacion.correcto ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
            {evaluacion.mensaje}
          </p>
          {evaluacion.correcto && evaluacion.xpGanado && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              ¡+{evaluacion.xpGanado} XP ganados!
            </p>
          )}
        </div>
      </div>

      {/* Pistas */}
      {!evaluacion.correcto && pistas.length > 0 && (
        <div className="rounded-xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 overflow-hidden">
          <button
            onClick={() => setMostrarPistas(!mostrarPistas)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-yellow-800 dark:text-yellow-300"
          >
            <span className="flex items-center gap-2">
              <Lightbulb size={16} className="text-yellow-500" />
              Pistas disponibles ({pistas.length})
            </span>
            {mostrarPistas ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {mostrarPistas && (
            <div className="px-4 pb-4 space-y-2">
              {pistas.slice(0, pistaActual + 1).map((pista, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-yellow-800 dark:text-yellow-300">
                  <span className="font-mono text-xs bg-yellow-200 dark:bg-yellow-800 px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span>{pista}</span>
                </div>
              ))}
              {pistaActual < pistas.length - 1 && (
                <button
                  onClick={() => setPistaActual(p => p + 1)}
                  className="text-xs text-yellow-600 dark:text-yellow-400 hover:underline mt-1"
                >
                  Ver siguiente pista →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Solución */}
      {!evaluacion.correcto && mostrarBotonSolucion && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <button
            onClick={() => { setMostrarSolucion(!mostrarSolucion); onMostrarSolucion?.(); }}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
          >
            <span className="flex items-center gap-2">
              {mostrarSolucion ? <EyeOff size={16} /> : <Eye size={16} />}
              {mostrarSolucion ? 'Ocultar solución' : 'Ver solución oficial'}
            </span>
            {mostrarSolucion ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {mostrarSolucion && (
            <div className="p-4 space-y-3">
              <SqlEditor valorInicial={solucion} soloLectura onEjecutar={() => {}} altura="80px" />
              <button
                onClick={() => setMostrarExplicacion(!mostrarExplicacion)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                {mostrarExplicacion ? '▲ Ocultar explicación' : '▼ Ver explicación paso a paso'}
              </button>
              {mostrarExplicacion && (
                <p className="text-sm text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  {explicacion}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
