import React from 'react';

interface ProgressBarProps {
  valor: number;
  max?: number;
  altura?: 'xs' | 'sm' | 'md';
  color?: string;
  mostrarPorcentaje?: boolean;
  animado?: boolean;
  className?: string;
}

const alturas = { xs: 'h-1', sm: 'h-2', md: 'h-3' };

export function ProgressBar({
  valor,
  max = 100,
  altura = 'sm',
  color = 'bg-blue-500',
  mostrarPorcentaje = false,
  animado = true,
  className = '',
}: ProgressBarProps) {
  const porcentaje = Math.min(100, Math.max(0, (valor / max) * 100));

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${alturas[altura]}`}>
        <div
          className={`${alturas[altura]} rounded-full ${color} ${animado ? 'transition-all duration-700 ease-out' : ''}`}
          style={{ width: `${porcentaje}%` }}
        />
      </div>
      {mostrarPorcentaje && (
        <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">{Math.round(porcentaje)}%</span>
      )}
    </div>
  );
}
