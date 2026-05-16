import React, { useState, useEffect } from 'react';
import { ExerciseBrowser } from '../components/exercise/ExerciseBrowser';
import { ExerciseView } from '../components/exercise/ExerciseView';
import type { EjercicioBanco } from '../types';
import { useSql } from '../hooks/useSql';
import { Loader2 } from 'lucide-react';

export function ExerciseBankPage() {
  const [ejercicios, setEjercicios] = useState<EjercicioBanco[]>([]);
  const [seleccionado, setSeleccionado] = useState<EjercicioBanco | null>(null);
  const [cargando, setCargando] = useState(true);
  const { ready } = useSql();

  useEffect(() => {
    async function cargar() {
      const [mn, no, int, av] = await Promise.all([
        import('../content/exercises/muy-novato').then(m => m.ejerciciosMuyNovato),
        import('../content/exercises/novato').then(m => m.ejerciciosNovato),
        import('../content/exercises/intermedio').then(m => m.ejerciciosIntermedio),
        import('../content/exercises/avanzado').then(m => m.ejerciciosAvanzado),
      ]);
      setEjercicios([...mn, ...no, ...int, ...av]);
      setCargando(false);
    }
    cargar();
  }, []);

  if (cargando || !ready) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 size={36} className="animate-spin text-blue-500" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {!ready ? 'Inicializando motor SQL...' : 'Cargando ejercicios...'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-0 h-[calc(100vh-56px)] -mx-4 -my-6">
      {/* Panel izquierdo: lista */}
      <div className="w-80 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
        <ExerciseBrowser
          ejercicios={ejercicios}
          onSeleccionar={setSeleccionado}
          ejercicioActivo={seleccionado?.id}
        />
      </div>

      {/* Panel derecho: ejercicio */}
      <div className="flex-1 overflow-y-auto p-6">
        {seleccionado ? (
          <ExerciseView key={seleccionado.id} ejercicio={seleccionado} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <span className="text-6xl mb-4">💪</span>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Banco de ejercicios</h2>
            <p className="text-sm max-w-sm">
              {ejercicios.length} ejercicios en 4 niveles. Selecciona uno de la lista para empezar a practicar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
