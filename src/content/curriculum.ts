import type { NivelCurso } from '../types';

// ── Muy novato ───────────────────────────────────────────────────────
import { leccion as mn0101 } from './levels/muy-novato/modulo-01/leccion-01';
import { leccion as mn0102 } from './levels/muy-novato/modulo-01/leccion-02';
import { leccion as mn0103 } from './levels/muy-novato/modulo-01/leccion-03';
import { leccion as mn0201 } from './levels/muy-novato/modulo-02/leccion-01';
import { leccion as mn0202 } from './levels/muy-novato/modulo-02/leccion-02';
import { leccion as mn0203 } from './levels/muy-novato/modulo-02/leccion-03';
import { leccion as mn0204 } from './levels/muy-novato/modulo-02/leccion-04';
import { leccion as mn0301 } from './levels/muy-novato/modulo-03/leccion-01';
import { leccion as mn0302 } from './levels/muy-novato/modulo-03/leccion-02';
import { leccion as mn0303 } from './levels/muy-novato/modulo-03/leccion-03';
import { leccion as mn0304 } from './levels/muy-novato/modulo-03/leccion-04';
import { leccion as mn0401 } from './levels/muy-novato/modulo-04/leccion-01';
import { leccion as mn0402 } from './levels/muy-novato/modulo-04/leccion-02';
import { leccion as mn0403 } from './levels/muy-novato/modulo-04/leccion-03';

// ── Novato ───────────────────────────────────────────────────────────
import { leccion as no0101 } from './levels/novato/modulo-01/leccion-01';
import { leccion as no0102 } from './levels/novato/modulo-01/leccion-02';
import { leccion as no0103 } from './levels/novato/modulo-01/leccion-03';
import { leccion as no0104 } from './levels/novato/modulo-01/leccion-04';
import { leccion as no0105 } from './levels/novato/modulo-01/leccion-05';
import { leccion as no0201 } from './levels/novato/modulo-02/leccion-01';
import { leccion as no0202 } from './levels/novato/modulo-02/leccion-02';
import { leccion as no0301 } from './levels/novato/modulo-03/leccion-01';

// ── Intermedio ───────────────────────────────────────────────────────
import { leccion as in0101 } from './levels/intermedio/modulo-01/leccion-01';
import { leccion as in0102 } from './levels/intermedio/modulo-01/leccion-02';
import { leccion as in0103 } from './levels/intermedio/modulo-01/leccion-03';
import { leccion as in0201 } from './levels/intermedio/modulo-02/leccion-01';
import { leccion as in0202 } from './levels/intermedio/modulo-02/leccion-02';
import { leccion as in0203 } from './levels/intermedio/modulo-02/leccion-03';
import { leccion as in0301 } from './levels/intermedio/modulo-03/leccion-01';
import { leccion as in0302 } from './levels/intermedio/modulo-03/leccion-02';
import { leccion as in0401 } from './levels/intermedio/modulo-04/leccion-01';
import { leccion as in0402 } from './levels/intermedio/modulo-04/leccion-02';
import { leccion as in0403 } from './levels/intermedio/modulo-04/leccion-03';
import { leccion as in0501 } from './levels/intermedio/modulo-05/leccion-01';
import { leccion as in0502 } from './levels/intermedio/modulo-05/leccion-02';

// ── Avanzado ─────────────────────────────────────────────────────────
import { leccion as av0101 } from './levels/avanzado/modulo-01/leccion-01';
import { leccion as av0102 } from './levels/avanzado/modulo-01/leccion-02';
import { leccion as av0103 } from './levels/avanzado/modulo-01/leccion-03';
import { leccion as av0201 } from './levels/avanzado/modulo-02/leccion-01';
import { leccion as av0202 } from './levels/avanzado/modulo-02/leccion-02';
import { leccion as av0203 } from './levels/avanzado/modulo-02/leccion-03';
import { leccion as av0301 } from './levels/avanzado/modulo-03/leccion-01';
import { leccion as av0401 } from './levels/avanzado/modulo-04/leccion-01';
import { leccion as av0501 } from './levels/avanzado/modulo-05/leccion-01';
import { leccion as av0601 } from './levels/avanzado/modulo-06/leccion-01';

export const curriculum: NivelCurso[] = [
  {
    id: 'muy-novato',
    titulo: 'Muy Novato',
    descripcion: 'Aprende los fundamentos: qué es SQL, tablas, SELECT, WHERE, ORDER BY, LIMIT, LIKE, IN, BETWEEN y NULL.',
    colorClase: 'text-blue-600 dark:text-blue-400',
    bgClase: 'bg-blue-500',
    borderClase: 'border-blue-500',
    emoji: '🌱',
    modulos: [
      {
        id: 'modulo-01',
        titulo: 'Fundamentos de bases de datos',
        descripcion: 'Comprende qué son las bases de datos, SQL y la estructura de tablas.',
        lecciones: [mn0101, mn0102, mn0103],
      },
      {
        id: 'modulo-02',
        titulo: 'Tu primera consulta SELECT',
        descripcion: 'Aprende SELECT *, columnas específicas, WHERE y operadores lógicos.',
        lecciones: [mn0201, mn0202, mn0203, mn0204],
      },
      {
        id: 'modulo-03',
        titulo: 'Filtros y ordenamiento',
        descripcion: 'Domina ORDER BY, LIMIT, LIKE, IN y BETWEEN.',
        lecciones: [mn0301, mn0302, mn0303, mn0304],
      },
      {
        id: 'modulo-04',
        titulo: 'Valores especiales y alias',
        descripcion: 'Entiende NULL, IS NULL y los alias con AS.',
        lecciones: [mn0401, mn0402, mn0403],
      },
    ],
  },
  {
    id: 'novato',
    titulo: 'Novato',
    descripcion: 'Domina las funciones de agregación, GROUP BY, HAVING, DISTINCT y los JOINs básicos.',
    colorClase: 'text-green-600 dark:text-green-400',
    bgClase: 'bg-green-500',
    borderClase: 'border-green-500',
    emoji: '⭐',
    modulos: [
      {
        id: 'modulo-01',
        titulo: 'Funciones de agregación',
        descripcion: 'COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING y DISTINCT.',
        lecciones: [no0101, no0102, no0103, no0104, no0105],
      },
      {
        id: 'modulo-02',
        titulo: 'Uniendo tablas',
        descripcion: 'INNER JOIN y LEFT JOIN para combinar datos de múltiples tablas.',
        lecciones: [no0201, no0202],
      },
      {
        id: 'modulo-03',
        titulo: 'Relaciones entre tablas',
        descripcion: 'Claves primarias, foráneas y tipos de relaciones.',
        lecciones: [no0301],
      },
    ],
  },
  {
    id: 'intermedio',
    titulo: 'Intermedio',
    descripcion: 'Subconsultas, CASE WHEN, UNION, funciones de texto/número/fecha, CTEs, DML y normalización.',
    colorClase: 'text-orange-600 dark:text-orange-400',
    bgClase: 'bg-orange-500',
    borderClase: 'border-orange-500',
    emoji: '🚀',
    modulos: [
      {
        id: 'modulo-01',
        titulo: 'Consultas avanzadas',
        descripcion: 'Subconsultas, CASE WHEN y UNION/UNION ALL.',
        lecciones: [in0101, in0102, in0103],
      },
      {
        id: 'modulo-02',
        titulo: 'Funciones integradas',
        descripcion: 'Funciones de texto, numéricas y de fecha.',
        lecciones: [in0201, in0202, in0203],
      },
      {
        id: 'modulo-03',
        titulo: 'CTEs',
        descripcion: 'Common Table Expressions simples y encadenadas.',
        lecciones: [in0301, in0302],
      },
      {
        id: 'modulo-04',
        titulo: 'Modificación de datos',
        descripcion: 'INSERT, UPDATE y DELETE con precaución.',
        lecciones: [in0401, in0402, in0403],
      },
      {
        id: 'modulo-05',
        titulo: 'Diseño de bases de datos',
        descripcion: 'Vistas y normalización (1FN, 2FN, 3FN).',
        lecciones: [in0501, in0502],
      },
    ],
  },
  {
    id: 'avanzado',
    titulo: 'Avanzado',
    descripcion: 'Window Functions, índices, optimización, transacciones ACID, triggers y seguridad.',
    colorClase: 'text-red-600 dark:text-red-400',
    bgClase: 'bg-red-500',
    borderClase: 'border-red-500',
    emoji: '👑',
    modulos: [
      {
        id: 'modulo-01',
        titulo: 'Window Functions',
        descripcion: 'OVER, PARTITION BY, ROW_NUMBER, RANK, DENSE_RANK, LAG y LEAD.',
        lecciones: [av0101, av0102, av0103],
      },
      {
        id: 'modulo-02',
        titulo: 'Índices y rendimiento',
        descripcion: 'Índices, EXPLAIN QUERY PLAN y optimización de consultas.',
        lecciones: [av0201, av0202, av0203],
      },
      {
        id: 'modulo-03',
        titulo: 'Transacciones',
        descripcion: 'BEGIN, COMMIT, ROLLBACK y propiedades ACID.',
        lecciones: [av0301],
      },
      {
        id: 'modulo-04',
        titulo: 'Triggers',
        descripcion: 'Automatización con triggers y disparadores.',
        lecciones: [av0401],
      },
      {
        id: 'modulo-05',
        titulo: 'Modelado avanzado',
        descripcion: 'Modelado Entidad-Relación y diseño profesional.',
        lecciones: [av0501],
      },
      {
        id: 'modulo-06',
        titulo: 'Seguridad',
        descripcion: 'SQL Injection y cómo prevenirlo.',
        lecciones: [av0601],
      },
    ],
  },
];

export const todosBancoEjercicios = async () => {
  const [mn, no, int, av] = await Promise.all([
    import('./exercises/muy-novato').then(m => m.ejerciciosMuyNovato),
    import('./exercises/novato').then(m => m.ejerciciosNovato),
    import('./exercises/intermedio').then(m => m.ejerciciosIntermedio),
    import('./exercises/avanzado').then(m => m.ejerciciosAvanzado),
  ]);
  return [...mn, ...no, ...int, ...av];
};
