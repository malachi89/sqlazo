import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { ProgresoUsuario, Nivel } from '../types';
import {
  getProgress,
  saveProgress,
  markLessonComplete,
  markExerciseComplete,
  markBankExerciseComplete,
  addXP,
  unlockInsignia,
  updateStreak,
  getCompletionPercentage,
} from '../utils/progressStorage';
import { checkInsignias } from '../utils/gamification';

interface ToastMsg {
  id: string;
  tipo: 'xp' | 'insignia' | 'nivel';
  mensaje: string;
  xp?: number;
}

interface AppContextType {
  progress: ProgresoUsuario;
  toasts: ToastMsg[];
  completarLeccion: (leccionId: string, xp: number, quizPuntuacion?: number) => string[];
  completarEjercicioLeccion: (leccionId: string, ejercicioId: string, xp: number, primerIntento?: boolean, sinPistas?: boolean) => void;
  completarEjercicioBanco: (ejercicioId: string, nivel: Nivel, xp: number, primerIntento?: boolean) => void;
  desbloquearInsignia: (id: string) => void;
  getPorcentajeNivel: (nivel: Nivel, totalLecciones: number, leccionIds: string[]) => number;
  dismissToast: (id: string) => void;
  estaDesbloqueado: (nivel: Nivel) => boolean;
}

export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgresoUsuario>(getProgress);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  useEffect(() => {
    const updated = updateStreak();
    setProgress(updated);
  }, []);

  const addToast = useCallback((toast: Omit<ToastMsg, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const completarLeccion = useCallback((leccionId: string, xp: number, quizPuntuacion = 0): string[] => {
    let p = markLessonComplete(leccionId, quizPuntuacion);
    p = addXP(xp);
    setProgress({ ...p });
    addToast({ tipo: 'xp', mensaje: `¡Lección completada!`, xp });
    const nuevasInsignias = checkInsignias(p);
    nuevasInsignias.forEach(id => {
      addToast({ tipo: 'insignia', mensaje: `¡Nueva insignia desbloqueada!` });
    });
    return nuevasInsignias;
  }, [addToast]);

  const completarEjercicioLeccion = useCallback((leccionId: string, ejercicioId: string, xp: number, primerIntento = false, sinPistas = false) => {
    let p = markExerciseComplete(leccionId, ejercicioId);
    if (primerIntento) p.estadisticas.ejerciciosPrimerIntento++;
    if (sinPistas) p.estadisticas.ejerciciosSinPistas++;
    p = addXP(xp);
    saveProgress(p);
    setProgress({ ...p });
    addToast({ tipo: 'xp', mensaje: `¡Ejercicio correcto!`, xp });
  }, [addToast]);

  const completarEjercicioBanco = useCallback((ejercicioId: string, _nivel: Nivel, xp: number, primerIntento = false) => {
    let p = markBankExerciseComplete(ejercicioId);
    if (primerIntento) { p.estadisticas.ejerciciosPrimerIntento++; saveProgress(p); }
    p = addXP(xp);
    setProgress({ ...p });
    addToast({ tipo: 'xp', mensaje: `¡Ejercicio del banco resuelto!`, xp });
    const nuevas = checkInsignias(p);
    nuevas.forEach(() => addToast({ tipo: 'insignia', mensaje: '¡Nueva insignia desbloqueada!' }));
  }, [addToast]);

  const desbloquearInsignia = useCallback((id: string) => {
    const p = unlockInsignia(id);
    setProgress({ ...p });
  }, []);

  const getPorcentajeNivel = useCallback((nivel: Nivel, totalLecciones: number, leccionIds: string[]): number => {
    return getCompletionPercentage(nivel, totalLecciones, leccionIds);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const estaDesbloqueado = useCallback((nivel: Nivel): boolean => {
    if (nivel === 'muy-novato') return true;
    // simple check based on xp milestones for demo
    const xp = progress.xpTotal;
    if (nivel === 'novato') return xp >= 100 || progress.estadisticas.leccionesCompletadas >= 5;
    if (nivel === 'intermedio') return xp >= 400 || progress.estadisticas.leccionesCompletadas >= 15;
    if (nivel === 'avanzado') return xp >= 1000 || progress.estadisticas.leccionesCompletadas >= 30;
    return false;
  }, [progress]);

  return (
    <AppContext.Provider value={{
      progress,
      toasts,
      completarLeccion,
      completarEjercicioLeccion,
      completarEjercicioBanco,
      desbloquearInsignia,
      getPorcentajeNivel,
      dismissToast,
      estaDesbloqueado,
    }}>
      {children}
    </AppContext.Provider>
  );
}
