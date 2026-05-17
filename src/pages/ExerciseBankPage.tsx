import React, { useState } from 'react';
import { ExerciseBrowser } from '../components/exercise/ExerciseBrowser';
import { ExerciseView } from '../components/exercise/ExerciseView';
import type { EjercicioBanco } from '../types';
import { useSql } from '../hooks/useSql';
import { Loader2 } from 'lucide-react';
import { ejerciciosMuyNovato } from '../content/exercises/muy-novato';
import { ejerciciosNovato } from '../content/exercises/novato';
import { ejerciciosIntermedio } from '../content/exercises/intermedio';
import { ejerciciosAvanzado } from '../content/exercises/avanzado';

const todosLosEjercicios: EjercicioBanco[] = [
  ...ejerciciosMuyNovato,
  ...ejerciciosNovato,
  ...ejerciciosIntermedio,
  ...ejerciciosAvanzado,
];

export function ExerciseBankPage() {
  const [seleccionado, setSeleccionado] = useState<EjercicioBanco | null>(null);
  const { ready, error } = useSql();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <span className="text-6xl">⚠️</span>
        <p className="text-red-500 dark:text-red-400 text-sm font-medium">Error al inicializar el motor SQL</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs max-w-md text-center">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 size={36} className="animate-spin text-blue-500" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">Inicializando motor SQL...</p>
      </div>
    );
  }

  return (
    <div className="flex gap-0 h-[calc(100vh-56px)] -mx-4 -my-6">
      <div className="w-80 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
        <ExerciseBrowser
          ejercicios={todosLosEjercicios}
          onSeleccionar={setSeleccionado}
          ejercicioActivo={seleccionado?.id}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {seleccionado ? (
          <ExerciseView key={seleccionado.id} ejercicio={seleccionado} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <span className="text-6xl mb-4">💪</span>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Banco de ejercicios</h2>
            <p className="text-sm max-w-sm">
              {todosLosEjercicios.length} ejercicios en 4 niveles. Selecciona uno de la lista para empezar a practicar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
