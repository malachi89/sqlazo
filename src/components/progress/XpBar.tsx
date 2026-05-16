import React from 'react';
import { getNivelEstudiante } from '../../utils/gamification';
import { Zap } from 'lucide-react';

interface XpBarProps {
  xpTotal: number;
  compact?: boolean;
}

export function XpBar({ xpTotal, compact = false }: XpBarProps) {
  const nivel = getNivelEstudiante(xpTotal);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Zap size={14} className="text-yellow-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{xpTotal} XP</span>
        <span className="text-xs text-gray-400 dark:text-gray-500">· {nivel.titulo}</span>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-yellow-500 flex items-center gap-1">
          <Zap size={12} /> {xpTotal} XP
        </span>
        <span className="text-gray-400 dark:text-gray-500">{nivel.titulo}</span>
        <span className="text-gray-400 dark:text-gray-500">{nivel.xpSiguiente} XP</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${nivel.progreso}%`,
            background: 'linear-gradient(90deg, #eab308, #f97316)',
          }}
        />
      </div>
    </div>
  );
}
