import React from 'react';
import type { Nivel } from '../../types';

type Color = 'azul' | 'verde' | 'naranja' | 'rojo' | 'gris' | 'amarillo' | 'morado';

interface BadgeProps {
  children: React.ReactNode;
  color?: Color;
  nivel?: Nivel;
  className?: string;
}

const colores: Record<Color, string> = {
  azul: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  verde: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  naranja: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  rojo: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  gris: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  amarillo: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  morado: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
};

const nivelColor: Record<Nivel, Color> = {
  'muy-novato': 'azul',
  'novato': 'verde',
  'intermedio': 'naranja',
  'avanzado': 'rojo',
};

export function Badge({ children, color, nivel, className = '' }: BadgeProps) {
  const colorFinal = nivel ? nivelColor[nivel] : (color ?? 'gris');
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colores[colorFinal]} ${className}`}>
      {children}
    </span>
  );
}
