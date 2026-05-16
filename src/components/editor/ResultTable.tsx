import React from 'react';
import type { QueryResult } from '../../types';
import { CheckCircle, XCircle, Table } from 'lucide-react';

interface ResultTableProps {
  resultado: QueryResult | null;
  esCorrecto?: boolean | null;
  className?: string;
}

export function ResultTable({ resultado, esCorrecto, className = '' }: ResultTableProps) {
  if (!resultado) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-600 ${className}`}>
        <Table size={40} className="mb-3 opacity-30" />
        <p className="text-sm">Ejecuta una consulta para ver los resultados</p>
      </div>
    );
  }

  if (resultado.error) {
    return (
      <div className={`p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 ${className}`}>
        <div className="flex items-start gap-2">
          <XCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-700 dark:text-red-400">Error en la consulta</p>
            <p className="text-xs text-red-600 dark:text-red-300 mt-1 font-mono">{resultado.error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (resultado.filaAfectadas !== undefined && resultado.columnas.length === 0) {
    return (
      <div className={`p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 ${className}`}>
        <div className="flex items-center gap-2">
          <CheckCircle size={16} className="text-green-500" />
          <p className="text-sm text-green-700 dark:text-green-400">
            Operación completada. {resultado.filaAfectadas} fila(s) afectadas.
          </p>
        </div>
      </div>
    );
  }

  if (resultado.columnas.length === 0 && resultado.filas.length === 0) {
    return (
      <div className={`p-4 text-center text-gray-500 dark:text-gray-400 text-sm ${className}`}>
        La consulta no devolvió resultados.
      </div>
    );
  }

  const borderClass = esCorrecto === true
    ? 'border-green-400 dark:border-green-600'
    : esCorrecto === false
    ? 'border-red-400 dark:border-red-600'
    : 'border-gray-200 dark:border-gray-700';

  return (
    <div className={`${className}`}>
      <div className={`overflow-auto rounded-lg border ${borderClass} max-h-64`}>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 sticky top-0">
              {resultado.columnas.map((col, i) => (
                <th
                  key={i}
                  className="px-3 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resultado.filas.map((fila, ri) => (
              <tr
                key={ri}
                className={`${ri % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'} hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors`}
              >
                {fila.map((celda, ci) => (
                  <td
                    key={ci}
                    className="px-3 py-2 text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap font-mono text-xs"
                  >
                    {celda === null ? (
                      <span className="text-gray-400 dark:text-gray-600 italic">NULL</span>
                    ) : (
                      String(celda)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {resultado.filas.length} fila{resultado.filas.length !== 1 ? 's' : ''} devuelta{resultado.filas.length !== 1 ? 's' : ''}
        </p>
        {esCorrecto === true && (
          <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
            <CheckCircle size={12} /> Correcto
          </span>
        )}
        {esCorrecto === false && (
          <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-medium">
            <XCircle size={12} /> Incorrecto
          </span>
        )}
      </div>
    </div>
  );
}
