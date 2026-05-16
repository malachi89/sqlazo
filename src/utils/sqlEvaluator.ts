import type { QueryResult, EvaluationResult } from '../types';

function normalizeValue(val: string | number | null): string {
  if (val === null || val === undefined) return 'null';
  return String(val).trim().toLowerCase();
}

function normalizeRow(row: (string | number | null)[]): string {
  return row.map(normalizeValue).join('|');
}

function rowsEqual(
  a: (string | number | null)[][],
  b: (string | number | null)[][],
  ordenImporta: boolean
): boolean {
  if (a.length !== b.length) return false;
  if (ordenImporta) {
    return a.every((row, i) => normalizeRow(row) === normalizeRow(b[i]));
  }
  const setA = a.map(normalizeRow).sort();
  const setB = b.map(normalizeRow).sort();
  return setA.every((r, i) => r === setB[i]);
}

function columnsMatch(
  alumno: string[],
  esperado: string[]
): boolean {
  if (alumno.length !== esperado.length) return false;
  const normA = alumno.map(c => c.trim().toLowerCase());
  const normE = esperado.map(c => c.trim().toLowerCase());
  return normA.every((c, i) => c === normE[i]);
}

export function evaluateQuery(
  resultado: QueryResult,
  esperado: { columnas: string[]; filas: (string | number | null)[][] },
  solucionesAlternativas: string[] = [],
  ordenImporta = false
): EvaluationResult {
  if (resultado.error) {
    return {
      correcto: false,
      mensaje: `Error en tu consulta: ${resultado.error}`,
    };
  }

  if (!columnsMatch(resultado.columnas, esperado.columnas)) {
    return {
      correcto: false,
      mensaje: `Las columnas no coinciden. Se esperaba: ${esperado.columnas.join(', ')}. Obtuviste: ${resultado.columnas.join(', ')}.`,
    };
  }

  if (rowsEqual(resultado.filas, esperado.filas, ordenImporta)) {
    return {
      correcto: true,
      mensaje: '¡Correcto! Tu consulta devuelve exactamente el resultado esperado.',
      xpGanado: 15,
    };
  }

  if (resultado.filas.length !== esperado.filas.length) {
    return {
      correcto: false,
      mensaje: `El número de filas no coincide. Se esperaban ${esperado.filas.length} filas pero obtuviste ${resultado.filas.length}.`,
    };
  }

  return {
    correcto: false,
    mensaje: 'Los datos no coinciden con el resultado esperado. Revisa tus condiciones o los valores que estás seleccionando.',
  };
}

export function evaluateBankExercise(
  resultado: QueryResult,
  esperado: { columnas: string[]; filas: (string | number | null)[][] },
  nivel: string
): EvaluationResult {
  const xpPorNivel: Record<string, number> = {
    'muy-novato': 20,
    'novato': 25,
    'intermedio': 30,
    'avanzado': 40,
  };

  const base = evaluateQuery(resultado, esperado, [], false);
  if (base.correcto) {
    return { ...base, xpGanado: xpPorNivel[nivel] ?? 20 };
  }
  return base;
}
