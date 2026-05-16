import React, { useState, useEffect } from 'react';
import type { SeccionContenido } from '../../types';
import { SqlEditor } from '../editor/SqlEditor';
import { ResultTable } from '../editor/ResultTable';
import { useSql } from '../../hooks/useSql';
import { AlertCircle, Info, BookOpen, Zap, Play, ChevronLeft, ChevronRight, Code } from 'lucide-react';

interface LessonContentProps {
  secciones: SeccionContenido[];
  onTerminar?: () => void;
}

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${color}`}>
      {children}
    </span>
  );
}

function EjemploEditor({ sql, setupSql, tablaResultado }: Pick<Extract<SeccionContenido, { tipo: 'ejemplo' }>, 'sql' | 'setupSql' | 'tablaResultado'>) {
  const { executeQuery } = useSql();
  const [resultado, setResultado] = useState<any>(null);
  const [ejecutado, setEjecutado] = useState(false);

  const handleEjecutar = (query: string) => {
    const res = executeQuery(query, setupSql);
    setResultado(res);
    setEjecutado(true);
  };

  return (
    <div className="space-y-3">
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
  );
}

function renderSeccion(seccion: SeccionContenido) {
  switch (seccion.tipo) {
    case 'introduccion':
      return (
        <div className="space-y-4">
          <Badge color="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            <BookOpen size={12} /> Introducción
          </Badge>
          <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">{seccion.texto}</p>
        </div>
      );

    case 'explicacion':
      return (
        <div className="space-y-4">
          <Badge color="bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
            <BookOpen size={12} /> Explicación
          </Badge>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{seccion.titulo}</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{seccion.texto}</p>
        </div>
      );

    case 'analogia':
      return (
        <div className="space-y-4">
          <Badge color="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
            <Zap size={12} /> Analogía
          </Badge>
          <div className="flex gap-4 pl-4 border-l-4 border-amber-400 dark:border-amber-600">
            <span className="text-4xl flex-shrink-0">{seccion.icono}</span>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{seccion.texto}</p>
          </div>
        </div>
      );

    case 'ejemplo':
      return (
        <div className="space-y-3">
          <Badge color="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
            <Play size={12} /> Ejemplo interactivo
          </Badge>
          {seccion.titulo && <p className="font-semibold text-gray-900 dark:text-white">{seccion.titulo}</p>}
          {seccion.descripcion && <p className="text-sm text-gray-500 dark:text-gray-400">{seccion.descripcion}</p>}
          <EjemploEditor sql={seccion.sql} setupSql={seccion.setupSql} tablaResultado={seccion.tablaResultado} />
        </div>
      );

    case 'nota':
      return (
        <div className="space-y-4">
          <Badge color="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            <Info size={12} /> Nota
          </Badge>
          <div className="pl-4 border-l-4 border-blue-400 dark:border-blue-600">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{seccion.texto}</p>
          </div>
        </div>
      );

    case 'advertencia':
      return (
        <div className="space-y-4">
          <Badge color="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
            <AlertCircle size={12} /> Advertencia
          </Badge>
          <div className="pl-4 border-l-4 border-orange-400 dark:border-orange-600">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{seccion.texto}</p>
          </div>
        </div>
      );

    case 'resumen':
      return (
        <div className="space-y-4">
          <Badge color="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            <Zap size={12} /> Resumen
          </Badge>
          <ul className="space-y-3">
            {seccion.puntos.map((punto, pi) => (
              <li key={pi} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                <span className="leading-relaxed">{punto}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'error-comun':
      return (
        <div className="space-y-4">
          <Badge color="bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
            <AlertCircle size={12} /> Error común: {seccion.titulo}
          </Badge>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

    case 'tabla-visual':
      return (
        <div className="space-y-3">
          {seccion.titulo && <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{seccion.titulo}</p>}
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

    case 'codigo':
      return (
        <div className="space-y-3">
          <Badge color="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            <Code size={12} /> Código SQL
          </Badge>
          <pre className="bg-gray-900 text-green-400 rounded-xl p-4 text-sm font-mono overflow-auto border border-gray-700 whitespace-pre-wrap">
            {seccion.codigo}
          </pre>
        </div>
      );

    case 'separador':
      return <hr className="border-gray-200 dark:border-gray-700" />;

    default:
      return null;
  }
}

export function LessonContent({ secciones, onTerminar }: LessonContentProps) {
  const [slide, setSlide] = useState(0);
  const [visible, setVisible] = useState(true);
  const total = secciones.length;
  const esUltimo = slide === total - 1;

  const irA = (idx: number) => {
    setVisible(false);
    setTimeout(() => {
      setSlide(idx);
      setVisible(true);
    }, 150);
  };

  const siguiente = () => { if (!esUltimo) irA(slide + 1); };
  const anterior = () => { if (slide > 0) irA(slide - 1); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') siguiente();
      if (e.key === 'ArrowLeft') anterior();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slide, esUltimo]);

  return (
    <div className="flex flex-col h-[460px]">
      {/* Barra de progreso */}
      <div className="flex items-center gap-3 flex-shrink-0 pb-5">
        <div className="flex-1 flex gap-1">
          {secciones.map((_, i) => (
            <button
              key={i}
              onClick={() => irA(i)}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                i < slide
                  ? 'bg-blue-500'
                  : i === slide
                  ? 'bg-blue-400'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              aria-label={`Ir a paso ${i + 1}`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium tabular-nums whitespace-nowrap">
          {slide + 1} / {total}
        </span>
      </div>

      {/* Contenido del slide — scroll interno, nunca desplaza los botones */}
      <div
        className="flex-1 min-h-0 overflow-y-auto transition-opacity duration-150"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {renderSeccion(secciones[slide])}
      </div>

      {/* Navegación — siempre al fondo */}
      <div className="flex-shrink-0 flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={anterior}
          disabled={slide === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronLeft size={16} /> Anterior
        </button>

        {esUltimo ? (
          onTerminar ? (
            <button
              onClick={onTerminar}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-xl shadow-md transition-all"
            >
              Continuar <ChevronRight size={16} />
            </button>
          ) : (
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              ✓ Contenido completado
            </span>
          )
        ) : (
          <button
            onClick={siguiente}
            className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm"
          >
            Siguiente <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
