import React from 'react';
import type { Insignia } from '../../types';
import { Lock } from 'lucide-react';

interface InsigniaCardProps {
  insignia: Insignia;
  obtenida: boolean;
}

export function InsigniaCard({ insignia, obtenida }: InsigniaCardProps) {
  return (
    <div
      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
        obtenida
          ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-500'
          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-50'
      }`}
      title={obtenida ? insignia.descripcion : `Bloqueado: ${insignia.condicion}`}
    >
      {!obtenida && (
        <div className="absolute top-2 right-2">
          <Lock size={12} className="text-gray-400" />
        </div>
      )}
      <span className="text-3xl">{insignia.icono}</span>
      <div className="text-center">
        <p className={`text-xs font-semibold ${obtenida ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500'}`}>
          {insignia.nombre}
        </p>
        {obtenida && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{insignia.descripcion}</p>
        )}
      </div>
    </div>
  );
}
