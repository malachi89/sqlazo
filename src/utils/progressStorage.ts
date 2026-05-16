import type { ProgresoUsuario, ProgresoLeccion, Nivel } from '../types';

const STORAGE_KEY = 'sqlazo_progress';

const defaultProgress = (): ProgresoUsuario => ({
  lecciones: {},
  ejerciciosBanco: {},
  tema: 'oscuro',
  xpTotal: 0,
  insignias: [],
  racha: 0,
  ultimaActividad: '',
  estadisticas: {
    leccionesCompletadas: 0,
    ejerciciosResueltos: 0,
    ejerciciosPrimerIntento: 0,
    ejerciciosSinPistas: 0,
  },
});

export function getProgress(): ProgresoUsuario {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as ProgresoUsuario;
    return { ...defaultProgress(), ...parsed, estadisticas: { ...defaultProgress().estadisticas, ...parsed.estadisticas } };
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress: ProgresoUsuario): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getLeccionProgress(leccionId: string): ProgresoLeccion | undefined {
  return getProgress().lecciones[leccionId];
}

export function markLessonComplete(leccionId: string, quizPuntuacion = 0): ProgresoUsuario {
  const progress = getProgress();
  const wasComplete = progress.lecciones[leccionId]?.completada;
  progress.lecciones[leccionId] = {
    ...(progress.lecciones[leccionId] ?? { ejerciciosCompletados: [], quizCompletado: false }),
    completada: true,
    quizPuntuacion,
    quizCompletado: quizPuntuacion > 0,
    ultimaVez: new Date().toISOString(),
  };
  if (!wasComplete) {
    progress.estadisticas.leccionesCompletadas++;
  }
  progress.ultimaActividad = new Date().toISOString();
  saveProgress(progress);
  return progress;
}

export function markExerciseComplete(leccionId: string, ejercicioId: string): ProgresoUsuario {
  const progress = getProgress();
  if (!progress.lecciones[leccionId]) {
    progress.lecciones[leccionId] = {
      completada: false,
      ejerciciosCompletados: [],
      quizCompletado: false,
      quizPuntuacion: 0,
      ultimaVez: new Date().toISOString(),
    };
  }
  if (!progress.lecciones[leccionId].ejerciciosCompletados.includes(ejercicioId)) {
    progress.lecciones[leccionId].ejerciciosCompletados.push(ejercicioId);
    progress.estadisticas.ejerciciosResueltos++;
  }
  progress.ultimaActividad = new Date().toISOString();
  saveProgress(progress);
  return progress;
}

export function markBankExerciseComplete(ejercicioId: string): ProgresoUsuario {
  const progress = getProgress();
  if (!progress.ejerciciosBanco[ejercicioId]) {
    progress.ejerciciosBanco[ejercicioId] = true;
    progress.estadisticas.ejerciciosResueltos++;
  }
  progress.ultimaActividad = new Date().toISOString();
  saveProgress(progress);
  return progress;
}

export function addXP(xp: number): ProgresoUsuario {
  const progress = getProgress();
  progress.xpTotal += xp;
  saveProgress(progress);
  return progress;
}

export function unlockInsignia(insigniaId: string): ProgresoUsuario {
  const progress = getProgress();
  if (!progress.insignias.includes(insigniaId)) {
    progress.insignias.push(insigniaId);
    saveProgress(progress);
  }
  return progress;
}

export function updateStreak(): ProgresoUsuario {
  const progress = getProgress();
  const hoy = new Date().toDateString();
  const ultima = progress.ultimaActividad ? new Date(progress.ultimaActividad).toDateString() : '';
  const ayer = new Date(Date.now() - 86400000).toDateString();

  if (ultima === hoy) return progress;
  if (ultima === ayer) {
    progress.racha++;
  } else {
    progress.racha = 1;
  }
  progress.ultimaActividad = new Date().toISOString();
  saveProgress(progress);
  return progress;
}

export function getCompletionPercentage(nivel: Nivel, totalLecciones: number, leccionIds: string[]): number {
  if (totalLecciones === 0) return 0;
  const progress = getProgress();
  const completadas = leccionIds.filter(id => progress.lecciones[id]?.completada).length;
  return Math.round((completadas / totalLecciones) * 100);
}

export function setTheme(tema: 'oscuro' | 'claro'): void {
  const progress = getProgress();
  progress.tema = tema;
  saveProgress(progress);
}

export function resetProgress(): void {
  const progress = defaultProgress();
  saveProgress(progress);
}
