import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'in-02-03',
  titulo: 'Funciones de fecha',
  descripcion: 'Aprende a trabajar con fechas en SQLite usando DATE, STRFTIME y DATETIME.',
  duracionMinutos: 25,
  conceptosClave: ['DATE', 'DATETIME', 'STRFTIME', 'Fechas en SQLite'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Las fechas son uno de los tipos de datos más usados en bases de datos. SQLite tiene funciones especiales para trabajar con ellas: obtener la fecha actual, formatear fechas, calcular diferencias y más.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Fechas en SQLite',
      texto: 'SQLite almacena fechas como texto en formato ISO 8601 (YYYY-MM-DD) o como números. Las funciones de fecha entienden estos formatos:\n\n• DATE("now") → fecha actual: "2024-01-15"\n• DATETIME("now") → fecha y hora: "2024-01-15 10:30:00"\n• TIME("now") → hora actual: "10:30:00"',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Funciones de fecha en SQLite',
      cabeceras: ['Función', 'Resultado', 'Ejemplo'],
      filas: [
        ["DATE('now')", 'Fecha de hoy', "'2024-01-15'"],
        ["DATE('now', '-30 days')", 'Hace 30 días', "'2023-12-16'"],
        ["DATE('now', '+1 year')", 'En un año', "'2025-01-15'"],
        ["STRFTIME('%Y', fecha)", 'Año (4 dígitos)', "'2024'"],
        ["STRFTIME('%m', fecha)", 'Mes (01-12)', "'01'"],
        ["STRFTIME('%d', fecha)", 'Día del mes', "'15'"],
        ["STRFTIME('%Y-%m', fecha)", 'Año-Mes', "'2024-01'"],
        ["julianday(fecha2) - julianday(fecha1)", 'Diferencia en días', '365'],
      ],
    },
    {
      tipo: 'ejemplo',
      titulo: 'Empleados contratados en 2023',
      descripcion: 'Filtramos empleados cuya fecha de contrato sea del año 2023.',
      sql: "SELECT nombre, fecha_contrato FROM empleados WHERE STRFTIME('%Y', fecha_contrato) = '2023' ORDER BY fecha_contrato;",
      tablaResultado: {
        columnas: ['nombre', 'fecha_contrato'],
        filas: [
          ['Carlos', '2023-03-15'],
          ['Ana', '2023-07-01'],
        ],
      },
    },
    {
      tipo: 'ejemplo',
      titulo: 'Pedidos del último mes',
      descripcion: 'Filtramos pedidos realizados en los últimos 30 días.',
      sql: "SELECT id, fecha, total FROM pedidos WHERE fecha >= DATE('now', '-30 days') ORDER BY fecha DESC;",
      tablaResultado: {
        columnas: ['id', 'fecha', 'total'],
        filas: [[5, '2024-01-12', 250], [6, '2024-01-14', 89]],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        "DATE('now') devuelve la fecha actual",
        "STRFTIME('%Y', fecha) extrae el año; '%m' el mes; '%d' el día",
        "DATE('now', '-N days/months/years') calcula fechas relativas",
        'julianday() convierte fechas a números para calcular diferencias',
        'Las fechas en SQLite se almacenan como texto YYYY-MM-DD',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'in-02-03-e1',
      titulo: 'Ventas por año',
      descripcion: 'Muestra el año y el total de ventas para cada año, ordenado de más reciente a más antiguo.',
      setupSql: `
        CREATE TABLE ventas (id INTEGER, fecha TEXT, monto REAL);
        INSERT INTO ventas VALUES (1,'2022-03-15',1500);
        INSERT INTO ventas VALUES (2,'2022-07-20',2300);
        INSERT INTO ventas VALUES (3,'2023-01-10',1800);
        INSERT INTO ventas VALUES (4,'2023-06-05',3200);
        INSERT INTO ventas VALUES (5,'2023-11-30',2700);
        INSERT INTO ventas VALUES (6,'2024-02-14',1200);
      `,
      resultadoEsperado: {
        columnas: ['anio', 'total_ventas'],
        filas: [
          ['2024', 1200],
          ['2023', 7700],
          ['2022', 3800],
        ],
      },
      solucionOficial: "SELECT STRFTIME('%Y', fecha) AS anio, SUM(monto) AS total_ventas FROM ventas GROUP BY STRFTIME('%Y', fecha) ORDER BY anio DESC;",
      pistas: [
        "Usa STRFTIME('%Y', fecha) para extraer el año",
        'Agrupa por año con GROUP BY',
        'Suma los montos con SUM(monto)',
      ],
      explicacion: "STRFTIME('%Y', fecha) extrae el año de cada fecha. GROUP BY agrupa por año y SUM suma todos los montos de ese año.",
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: "¿Cómo obtienes el mes de una fecha en SQLite?",
      opciones: [
        "MONTH(fecha)",
        "STRFTIME('%m', fecha)",
        "EXTRACT(MONTH FROM fecha)",
        "DATE_PART('month', fecha)",
      ],
      correcta: 1,
      explicacion: "En SQLite, la función para extraer partes de una fecha es STRFTIME. '%m' extrae el mes (01-12). MONTH(), EXTRACT() y DATE_PART() son de otros sistemas (PostgreSQL, MySQL) y no funcionan en SQLite.",
    },
  ],
};
