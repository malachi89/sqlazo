import type { Leccion } from '../../../../types';
import { SETUP_VENDEDORES } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'av-01-02',
  titulo: 'ROW_NUMBER, RANK y DENSE_RANK',
  descripcion: 'Aprende las funciones de ranking para numerar y clasificar filas dentro de grupos.',
  duracionMinutos: 30,
  conceptosClave: ['ROW_NUMBER', 'RANK', 'DENSE_RANK', 'Ranking'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Las funciones de ranking asignan números a las filas según su posición en un conjunto ordenado. Son perfectas para encontrar el "top N" por categoría o rankear elementos.',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'ROW_NUMBER vs RANK vs DENSE_RANK',
      cabeceras: ['Función', 'Comportamiento con empates', 'Ejemplo (puntos: 100,100,90,80)'],
      filas: [
        ['ROW_NUMBER()', 'Números únicos siempre, sin empates', '1, 2, 3, 4'],
        ['RANK()', 'Misma posición en empates, salta números', '1, 1, 3, 4'],
        ['DENSE_RANK()', 'Misma posición en empates, NO salta números', '1, 1, 2, 3'],
      ],
    },
    {
      tipo: 'ejemplo',
      titulo: 'Top 2 vendedores por región',
      descripcion: 'Usamos ROW_NUMBER con PARTITION BY para obtener el top 2 en cada región.',
      sql: "WITH ranked AS (\n  SELECT nombre, region, ventas,\n    ROW_NUMBER() OVER (PARTITION BY region ORDER BY ventas DESC) AS rn\n  FROM vendedores\n)\nSELECT nombre, region, ventas\nFROM ranked\nWHERE rn <= 2\nORDER BY region, ventas DESC;",
  setupSql: SETUP_VENDEDORES,
      tablaResultado: {
        columnas: ['nombre', 'region', 'ventas'],
        filas: [
          ['Laura', 'Norte', 95000],
          ['Carlos', 'Norte', 88000],
          ['Ana', 'Sur', 72000],
          ['Pedro', 'Sur', 68000],
        ],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        'ROW_NUMBER(): siempre números únicos, no hay empates',
        'RANK(): mismo número en empate, salta el siguiente',
        'DENSE_RANK(): mismo número en empate, no salta',
        'PARTITION BY divide el ranking por grupos',
        'Patrón común: usar en CTE y filtrar por WHERE rn <= N',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'av-01-02-e1',
      titulo: 'El empleado mejor pagado por departamento',
      descripcion: 'Usa ROW_NUMBER para encontrar el empleado con mayor salario en cada departamento.',
      setupSql: `
        CREATE TABLE empleados (id INTEGER, nombre TEXT, departamento TEXT, salario REAL);
        INSERT INTO empleados VALUES (1,'María','Ventas',45000);
        INSERT INTO empleados VALUES (2,'Carlos','Tecnología',65000);
        INSERT INTO empleados VALUES (3,'Ana','RRHH',48000);
        INSERT INTO empleados VALUES (4,'Pedro','Ventas',42000);
        INSERT INTO empleados VALUES (5,'Laura','Tecnología',70000);
        INSERT INTO empleados VALUES (6,'Miguel','Tecnología',60000);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'departamento', 'salario'],
        filas: [
          ['Ana', 'RRHH', 48000],
          ['Laura', 'Tecnología', 70000],
          ['María', 'Ventas', 45000],
        ],
      },
      solucionOficial: "WITH ranked AS (SELECT nombre, departamento, salario, ROW_NUMBER() OVER (PARTITION BY departamento ORDER BY salario DESC) AS rn FROM empleados)\nSELECT nombre, departamento, salario FROM ranked WHERE rn = 1 ORDER BY departamento;",
      pistas: [
        'Usa ROW_NUMBER() OVER (PARTITION BY departamento ORDER BY salario DESC)',
        'Mete esto en una CTE',
        'Luego filtra WHERE rn = 1 para obtener el primero de cada departamento',
      ],
      explicacion: 'ROW_NUMBER() OVER (PARTITION BY departamento ORDER BY salario DESC) numera empleados dentro de cada departamento por salario descendente. El que tiene rn=1 es el mejor pagado de su departamento.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: 'Si tres empleados tienen el mismo salario y usas RANK(), ¿qué posiciones recibirán?',
      opciones: [
        '1, 2, 3 (siempre números consecutivos)',
        '1, 1, 1 y el siguiente sería 4',
        '1, 1, 1 y el siguiente sería 2',
        'Error porque hay empates',
      ],
      correcta: 1,
      explicacion: 'RANK() asigna la misma posición a los empates y SALTA los números siguientes. Si tres empleados están empatados en posición 1, los tres reciben RANK=1 y el siguiente recibe RANK=4 (no 2).',
    },
  ],
};
