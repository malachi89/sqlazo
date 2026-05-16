import React from 'react';
import { Zap, Award, TrendingUp, X } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';

export function ToastContainer() {
  const { toasts, dismissToast } = useProgress();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl animate-slide-up max-w-xs"
          style={{
            background: toast.tipo === 'xp' ? 'linear-gradient(135deg, #1d4ed8, #3b82f6)' :
                        toast.tipo === 'insignia' ? 'linear-gradient(135deg, #7c3aed, #a855f7)' :
                        'linear-gradient(135deg, #15803d, #22c55e)',
            color: 'white',
          }}
        >
          <div className="flex-shrink-0">
            {toast.tipo === 'xp' && <Zap size={20} className="text-yellow-300" />}
            {toast.tipo === 'insignia' && <Award size={20} className="text-yellow-300" />}
            {toast.tipo === 'nivel' && <TrendingUp size={20} className="text-yellow-300" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{toast.mensaje}</p>
            {toast.xp && (
              <p className="text-xs opacity-80">+{toast.xp} XP</p>
            )}
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
