import React, { useState } from 'react';
import type { PreguntaQuiz } from '../../types';
import { CheckCircle, XCircle, ChevronRight, Trophy } from 'lucide-react';
import { Button } from '../ui/Button';

interface QuizProps {
  preguntas: PreguntaQuiz[];
  onCompletar: (puntuacion: number) => void;
  yaCompletado: boolean;
  puntuacionPrevia?: number;
}

export function Quiz({ preguntas, onCompletar, yaCompletado, puntuacionPrevia = 0 }: QuizProps) {
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [terminado, setTerminado] = useState(yaCompletado);

  const pregunta = preguntas[indice];
  const respuestaActual = respuestas[pregunta?.id];
  const correcto = respuestaActual === pregunta?.correcta;

  const handleResponder = (opcion: number) => {
    if (respuestas[pregunta.id] !== undefined) return;
    setRespuestas(prev => ({ ...prev, [pregunta.id]: opcion }));
    setMostrarResultado(true);
  };

  const handleSiguiente = () => {
    setMostrarResultado(false);
    if (indice < preguntas.length - 1) {
      setIndice(i => i + 1);
    } else {
      const correctas = preguntas.filter(p => respuestas[p.id] === p.correcta).length;
      const puntuacion = Math.round((correctas / preguntas.length) * 100);
      setTerminado(true);
      onCompletar(puntuacion);
    }
  };

  if (terminado) {
    const pct = yaCompletado ? puntuacionPrevia : Math.round(
      (preguntas.filter(p => respuestas[p.id] === p.correcta).length / preguntas.length) * 100
    );
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <Trophy size={48} className={pct >= 70 ? 'text-yellow-400' : 'text-gray-400'} />
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{pct}%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {pct >= 70 ? '¡Excelente! Lección dominada.' : 'Puedes mejorar repasando el contenido.'}
          </p>
        </div>
        {pct < 70 && !yaCompletado && (
          <Button
            variante="secundario"
            onClick={() => { setIndice(0); setRespuestas({}); setTerminado(false); setMostrarResultado(false); }}
          >
            Reintentar cuestionario
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Pregunta {indice + 1} de {preguntas.length}
        </span>
        <div className="flex gap-1">
          {preguntas.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-6 rounded-full transition-all ${
                i < indice ? 'bg-blue-500' :
                i === indice ? 'bg-blue-500 w-8' :
                'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-base font-medium text-gray-900 dark:text-white leading-relaxed">
          {pregunta.pregunta}
        </p>

        <div className="space-y-2.5">
          {pregunta.opciones.map((opcion, oi) => {
            const seleccionada = respuestaActual === oi;
            const esCorrecta = oi === pregunta.correcta;
            let estilo = 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20';

            if (mostrarResultado) {
              if (seleccionada && correcto) estilo = 'border-green-500 bg-green-50 dark:bg-green-900/30';
              else if (seleccionada && !correcto) estilo = 'border-red-500 bg-red-50 dark:bg-red-900/30';
              else if (esCorrecta) estilo = 'border-green-400 bg-green-50/50 dark:bg-green-900/20';
              else estilo = 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 opacity-50';
            }

            return (
              <button
                key={oi}
                onClick={() => handleResponder(oi)}
                disabled={mostrarResultado}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${estilo}`}
              >
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  mostrarResultado && seleccionada && correcto ? 'border-green-500 bg-green-500 text-white' :
                  mostrarResultado && seleccionada && !correcto ? 'border-red-500 bg-red-500 text-white' :
                  mostrarResultado && esCorrecta ? 'border-green-400 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' :
                  'border-gray-300 dark:border-gray-600 text-gray-400'
                }`}>
                  {String.fromCharCode(65 + oi)}
                </span>
                <span className={`text-sm ${
                  mostrarResultado && seleccionada ? (correcto ? 'text-green-700 dark:text-green-300 font-medium' : 'text-red-700 dark:text-red-300') : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {opcion}
                </span>
                {mostrarResultado && seleccionada && (
                  correcto
                    ? <CheckCircle size={16} className="text-green-500 ml-auto flex-shrink-0" />
                    : <XCircle size={16} className="text-red-500 ml-auto flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {mostrarResultado && (
        <div className={`p-4 rounded-xl ${correcto ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
          <p className={`text-sm ${correcto ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {pregunta.explicacion}
          </p>
          <div className="mt-3 flex justify-end">
            <Button variante="primario" tamano="sm" icono={<ChevronRight size={14} />} onClick={handleSiguiente}>
              {indice < preguntas.length - 1 ? 'Siguiente' : 'Ver resultado'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
