import React from 'react';
import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  racha: number;
  compact?: boolean;
}

export function StreakBadge({ racha, compact = false }: StreakBadgeProps) {
  const color = racha >= 10 ? 'text-red-500' : racha >= 5 ? 'text-orange-500' : racha >= 3 ? 'text-yellow-500' : 'text-gray-400';

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <Flame size={14} className={color} />
        <span className={`text-sm font-medium ${color}`}>{racha}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
      <Flame size={18} className={color} />
      <div>
        <p className={`text-sm font-bold ${color}`}>{racha}</p>
        <p className="text-xs text-gray-400">días</p>
      </div>
    </div>
  );
}
