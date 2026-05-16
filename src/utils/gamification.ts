import type { ProgresoUsuario, NivelEstudiante, TituloEstudiante } from '../types';
import { INSIGNIAS } from '../content/insignias';
import { getProgress, saveProgress, unlockInsignia } from './progressStorage';

const NIVELES: Array<{ titulo: TituloEstudiante; xpMin: number; xpMax: number }> = [
  { titulo: 'Explorador', xpMin: 0, xpMax: 199 },
  { titulo: 'Aprendiz', xpMin: 200, xpMax: 499 },
  { titulo: 'Consultor Junior', xpMin: 500, xpMax: 999 },
  { titulo: 'Desarrollador SQL', xpMin: 1000, xpMax: 1999 },
  { titulo: 'Analista de Datos', xpMin: 2000, xpMax: 3499 },
  { titulo: 'Arquitecto de BD', xpMin: 3500, xpMax: 5999 },
  { titulo: 'Maestro SQL', xpMin: 6000, xpMax: Infinity },
];

export function getNivelEstudiante(xp: number): NivelEstudiante {
  const nivel = NIVELES.find(n => xp >= n.xpMin && xp <= n.xpMax) ?? NIVELES[0];
  const siguiente = NIVELES.find(n => n.xpMin > nivel.xpMin);
  const xpSiguiente = siguiente?.xpMin ?? nivel.xpMax + 1;
  const xpEnNivel = xp - nivel.xpMin;
  const xpRango = xpSiguiente - nivel.xpMin;
  const progreso = xpRango > 0 ? Math.min(100, Math.round((xpEnNivel / xpRango) * 100)) : 100;
  return { titulo: nivel.titulo, xpMin: nivel.xpMin, xpMax: nivel.xpMax, xpSiguiente, progreso };
}

export function checkInsignias(progress: ProgresoUsuario): string[] {
  const nuevas: string[] = [];

  const check = (id: string, condicion: boolean) => {
    if (condicion && !progress.insignias.includes(id)) {
      unlockInsignia(id);
      nuevas.push(id);
    }
  };

  check('primer-paso', progress.estadisticas.leccionesCompletadas >= 1);
  check('en-racha', progress.racha >= 3);
  check('relampago', progress.racha >= 5);
  check('constancia', progress.racha >= 10);
  check('punteria', progress.estadisticas.ejerciciosPrimerIntento >= 10);
  check('perseverante', false); // lógica especial
  check('sin-pistas', progress.estadisticas.ejerciciosSinPistas >= 20);
  check('estudioso', Object.keys(progress.ejerciciosBanco).length >= 50);
  check('coleccionista', Object.keys(progress.ejerciciosBanco).length >= 200);

  return nuevas;
}

export function getInsigniaById(id: string) {
  return INSIGNIAS.find(i => i.id === id);
}

export { NIVELES };
