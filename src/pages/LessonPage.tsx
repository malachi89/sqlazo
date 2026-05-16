import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { curriculum } from '../content/curriculum';
import { LessonView } from '../components/lesson/LessonView';
import { ChevronLeft } from 'lucide-react';

export function LessonPage() {
  const { nivel: nivelParam, moduloId, leccionId } = useParams<{
    nivel: string; moduloId: string; leccionId: string;
  }>();

  const nivel = curriculum.find(n => n.id === nivelParam);
  const modulo = nivel?.modulos.find(m => m.id === moduloId);
  const leccion = modulo?.lecciones.find(l => l.id === leccionId);

  if (!nivel || !modulo || !leccion) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 dark:text-gray-400">Lección no encontrada.</p>
        <Link to="/" className="text-blue-500 hover:underline mt-2 inline-block">Volver al inicio</Link>
      </div>
    );
  }

  const leccionIdx = modulo.lecciones.findIndex(l => l.id === leccionId);
  const prevLeccion = leccionIdx > 0 ? modulo.lecciones[leccionIdx - 1] : null;
  const nextLeccion = leccionIdx < modulo.lecciones.length - 1 ? modulo.lecciones[leccionIdx + 1] : null;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-200">Inicio</Link>
        <span>/</span>
        <Link to={`/curso/${nivel.id}`} className="hover:text-gray-700 dark:hover:text-gray-200">{nivel.titulo}</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-200 font-medium truncate max-w-xs">{leccion.titulo}</span>
      </div>

      <LessonView leccion={leccion} />

      {/* Navegación */}
      <div className="max-w-3xl mx-auto mt-8 flex items-center justify-between">
        {prevLeccion ? (
          <Link
            to={`/leccion/${nivel.id}/${moduloId}/${prevLeccion.id}`}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-sm transition-all"
          >
            <ChevronLeft size={16} /> {prevLeccion.titulo}
          </Link>
        ) : (
          <Link
            to={`/curso/${nivel.id}`}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-sm transition-all"
          >
            <ChevronLeft size={16} /> Módulo: {modulo.titulo}
          </Link>
        )}

        {nextLeccion && (
          <Link
            to={`/leccion/${nivel.id}/${moduloId}/${nextLeccion.id}`}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
          >
            {nextLeccion.titulo} <span>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
