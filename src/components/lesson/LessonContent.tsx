import React, { useState } from 'react';
import type { SeccionContenido } from '../../types';
import { SqlEditor } from '../editor/SqlEditor';
import { ResultTable } from '../editor/ResultTable';
import { useSql } from '../../hooks/useSql';
import { AlertCircle, Info, BookOpen, Zap, Play } from 'lucide-react';

interface LessonContentProps {
  secciones: SeccionContenido[];
}

function EjemploInteractivo({ titulo, descripcion, sql, tablaResultado }: Extract<SeccionContenido, { tipo: 'ejemplo' }>) {
  const { executeQuery } = useSql();
  const [resultado, setResultado] = useState<any>(null);
  const [ejecutado, setEjecutado] = useState(false);

  const handleEjecutar = (query: string) => {
    const res = executeQuery(query);
    setResultado(res);
    setEjecutado(true);
  };

  return (
    <div className="my-4 rounded-xl border border-blue-200 dark:border-blue-800 overflow-hidden">
      <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <Play size={14} />
          <span className="text-sm font-semibold">{titulo}</span>
        </div>
        {descripcion && <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{descripcion}</p>}
      </div>
      <div className="p-4 space-y-3">
        <SqlEditor valorInicial={sql} onEjecutar={handleEjecutar} altura="80px" />
        {ejecutado && resultado ? (
          <ResultTable resultado={resultado} />
        ) : (
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <p className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              Resultado esperado:
            </p>
            <table className="min-w-full text-xs">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  {tablaResultado.columnas.map((col, i) => (
                    <th key={i} className="px-3 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tablaResultado.filas.map((fila, ri) => (
                  <tr key={ri} className="border-t border-gray-100 dark:border-gray-800">
                    {fila.map((celda, ci) => (
                      <td key={ci} className="px-3 py-1.5 text-gray-700 dark:text-gray-300 font-mono">
                        {celda === null ? <span className="text-gray-400 italic">NULL</span> : String(celda)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export function LessonContent({ secciones }: LessonContentProps) {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      {secciones.map((seccion, i) => {
        switch (seccion.tipo) {
          case 'introduccion':
            return (
              <div key={i} className="mb-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-900">
                <p>{seccion.texto}</p>
              </div>
            );

          case 'explicacion':
            return (
              <div key={i} className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-500" />
                  {seccion.titulo}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{seccion.texto}</p>
              </div>
            );

          case 'analogia':
            return (
              <div key={i} className="mb-6 flex gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                <span className="text-3xl flex-shrink-0 mt-1">{seccion.icono}</span>
                <div>
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Analogía</p>
                  <p className="text-amber-700 dark:text-amber-300 leading-relaxed">{seccion.texto}</p>
                </div>
              </div>
            );

          case 'ejemplo':
            return <EjemploInteractivo key={i} {...seccion} />;

          case 'tabla-visual':
            return (
              <div key={i} className="mb-6">
                {seccion.titulo && <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{seccion.titulo}</p>}
                <div className="overflow-auto rounded-xl border border-gray-200 dark:border-gray-700">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        {seccion.cabeceras.map((h, ci) => (
                          <th key={ci} className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {seccion.filas.map((fila, ri) => (
                        <tr key={ri} className={`border-t border-gray-100 dark:border-gray-800 ${ri % 2 === 0 ? '' : 'bg-gray-50/50 dark:bg-gray-800/30'}`}>
                          {fila.map((celda, ci) => (
                            <td key={ci} className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                              {celda === null ? <span className="text-gray-400 italic text-xs">NULL</span> : String(celda)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );

          case 'error-comun':
            return (
              <div key={i} className="mb-6 rounded-xl border border-red-200 dark:border-red-800 overflow-hidden">
                <div className="px-4 py-2.5 bg-red-50 dark:bg-red-900/30 border-b border-red-200 dark:border-red-800">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
                    <AlertCircle size={16} /> Error común: {seccion.titulo}
                  </p>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2">❌ Incorrecto</p>
                    <pre className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-xs font-mono text-red-700 dark:text-red-300 overflow-auto border border-red-200 dark:border-red-800 whitespace-pre-wrap">{seccion.codigoMal}</pre>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2">{seccion.problema}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-2">✅ Correcto</p>
                    <pre className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-xs font-mono text-green-700 dark:text-green-300 overflow-auto border border-green-200 dark:border-green-800 whitespace-pre-wrap">{seccion.codigoBien}</pre>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">{seccion.solucion}</p>
                  </div>
                </div>
              </div>
            );

          case 'resumen':
            return (
              <div key={i} className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-5 rounded-xl border border-green-200 dark:border-green-800">
                <p className="text-sm font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                  <Zap size={16} className="text-green-500" /> Resumen clave
                </p>
                <ul className="space-y-2">
                  {seccion.puntos.map((punto, pi) => (
                    <li key={pi} className="flex items-start gap-2 text-sm text-green-800 dark:text-green-300">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                      <span>{punto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );

          case 'nota':
            return (
              <div key={i} className="mb-4 flex gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <Info size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700 dark:text-blue-300">{seccion.texto}</p>
              </div>
            );

          case 'advertencia':
            return (
              <div key={i} className="mb-4 flex gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                <AlertCircle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-orange-700 dark:text-orange-300">{seccion.texto}</p>
              </div>
            );

          case 'codigo':
            return (
              <pre key={i} className="mb-4 bg-gray-900 text-green-400 rounded-xl p-4 text-xs font-mono overflow-auto border border-gray-700 whitespace-pre-wrap">
                {seccion.codigo}
              </pre>
            );

          case 'separador':
            return <hr key={i} className="my-8 border-gray-200 dark:border-gray-700" />;

          default:
            return null;
        }
      })}
    </div>
  );
}
