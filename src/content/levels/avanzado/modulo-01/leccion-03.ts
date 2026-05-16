import type { Leccion } from '../../../../types';
import { SETUP_VENTAS_MENSUALES } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'av-01-03',
  titulo: 'LAG, LEAD y valores acumulados',
  descripcion: 'Accede a filas anteriores y siguientes con LAG y LEAD, y calcula sumas y promedios acumulados.',
  duracionMinutos: 30,
  conceptosClave: ['LAG', 'LEAD', 'FIRST_VALUE', 'LAST_VALUE', 'Acumulados'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'LAG y LEAD te permiten acceder al valor de una fila anterior o siguiente dentro de la ventana. Son perfectas para calcular variaciones, comparar períodos y detectar tendencias.',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Funciones de acceso a filas adyacentes',
      cabeceras: ['Función', 'Qué hace', 'Ejemplo'],
      filas: [
        ['LAG(col, n)', 'Valor de N filas atrás', 'LAG(ventas, 1) = ventas del mes anterior'],
        ['LEAD(col, n)', 'Valor de N filas adelante', 'LEAD(ventas, 1) = ventas del próximo mes'],
        ['FIRST_VALUE(col)', 'Primer valor de la ventana', 'Primer precio del año'],
        ['LAST_VALUE(col)', 'Último valor de la ventana', 'Último precio registrado'],
      ],
    },
    {
      tipo: 'ejemplo',
      titulo: 'Variación de ventas mes a mes',
      descripcion: 'Calculamos cuánto variaron las ventas respecto al mes anterior.',
      sql: "SELECT mes, ventas, LAG(ventas, 1) OVER (ORDER BY mes) AS ventas_mes_anterior,\n  ventas - LAG(ventas, 1) OVER (ORDER BY mes) AS variacion\nFROM ventas_mensuales ORDER BY mes;",
      setupSql: SETUP_VENTAS_MENSUALES,
      tablaResultado: {
        columnas: ['mes', 'ventas', 'ventas_mes_anterior', 'variacion'],
        filas: [
          ['2024-01', 15000, null, null],
          ['2024-02', 18000, 15000, 3000],
          ['2024-03', 16500, 18000, -1500],
          ['2024-04', 22000, 16500, 5500],
        ],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        'LAG(col, n) accede al valor de n filas antes de la actual',
        'LEAD(col, n) accede al valor de n filas después',
        'FIRST_VALUE/LAST_VALUE obtienen primer/último valor de la ventana',
        'Ideales para comparar períodos y calcular variaciones',
        'El primer registro con LAG y el último con LEAD devuelven NULL',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'av-01-03-e1',
      titulo: 'Comparar ventas con el mes anterior',
      descripcion: 'Muestra las ventas de cada mes, las del mes anterior, y si subieron o bajaron.',
      setupSql: `
        CREATE TABLE ventas_mes (mes TEXT, total REAL);
        INSERT INTO ventas_mes VALUES ('2024-01',12000);
        INSERT INTO ventas_mes VALUES ('2024-02',15000);
        INSERT INTO ventas_mes VALUES ('2024-03',13500);
        INSERT INTO ventas_mes VALUES ('2024-04',18000);
        INSERT INTO ventas_mes VALUES ('2024-05',16000);
      `,
      resultadoEsperado: {
        columnas: ['mes', 'total', 'mes_anterior', 'tendencia'],
        filas: [
          ['2024-01', 12000, null, null],
          ['2024-02', 15000, 12000, 'Subió'],
          ['2024-03', 13500, 15000, 'Bajó'],
          ['2024-04', 18000, 13500, 'Subió'],
          ['2024-05', 16000, 18000, 'Bajó'],
        ],
      },
      solucionOficial: "SELECT mes, total, LAG(total, 1) OVER (ORDER BY mes) AS mes_anterior,\n  CASE\n    WHEN total > LAG(total, 1) OVER (ORDER BY mes) THEN 'Subió'\n    WHEN total < LAG(total, 1) OVER (ORDER BY mes) THEN 'Bajó'\n    ELSE NULL\n  END AS tendencia\nFROM ventas_mes ORDER BY mes;",
      pistas: [
        'Usa LAG(total, 1) OVER (ORDER BY mes) para el mes anterior',
        'Usa CASE WHEN para determinar si subió o bajó',
        'El primer mes no tiene mes anterior (NULL)',
      ],
      explicacion: 'LAG(total, 1) OVER (ORDER BY mes) devuelve el total del mes anterior para cada fila. CASE compara el total actual con el anterior para determinar la tendencia.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué devuelve LAG(precio, 1) para la PRIMERA fila de la ventana?',
      opciones: [
        '0',
        'El mismo precio de esa fila',
        'NULL (no hay fila anterior)',
        'Error porque no hay fila anterior',
      ],
      correcta: 2,
      explicacion: 'LAG devuelve NULL para la primera fila porque no hay fila anterior. Puedes especificar un valor por defecto: LAG(precio, 1, 0) devuelve 0 si no hay fila anterior.',
    },
  ],
};
