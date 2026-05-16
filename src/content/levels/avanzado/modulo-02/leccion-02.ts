import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'av-02-02',
  titulo: 'EXPLAIN QUERY PLAN — Analizar consultas',
  descripcion: 'Aprende a usar EXPLAIN QUERY PLAN para entender cómo ejecuta SQLite tus consultas y optimizarlas.',
  duracionMinutos: 25,
  conceptosClave: ['EXPLAIN', 'Query Plan', 'Full Scan', 'Optimización'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'EXPLAIN QUERY PLAN te muestra cómo SQLite planea ejecutar tu consulta antes de ejecutarla. Te dice si va a hacer un full scan o va a usar un índice.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Sin índice vs con índice',
      descripcion: 'Vemos el plan de ejecución con y sin índice.',
      sql: "EXPLAIN QUERY PLAN SELECT * FROM empleados WHERE email = 'carlos@empresa.com';",
      tablaResultado: {
        columnas: ['id', 'parent', 'notused', 'detail'],
        filas: [[2, 0, 0, 'SCAN empleados']],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'Interpretando el EXPLAIN',
      texto: '• "SCAN tabla" = Full table scan (lee todas las filas — lento en tablas grandes)\n• "SEARCH tabla USING INDEX idx_nombre" = Usa un índice (rápido)\n• "SEARCH tabla USING INTEGER PRIMARY KEY" = Usa la clave primaria (más rápido)\n\nSi ves SCAN en una consulta lenta, necesitas un índice.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'EXPLAIN QUERY PLAN muestra el plan de ejecución de una consulta',
        'SCAN = full table scan (sin índice, puede ser lento)',
        'SEARCH USING INDEX = usa un índice (mucho más rápido)',
        'Úsalo para identificar consultas lentas antes de crear índices',
        'Crea índices en columnas donde ves SCAN en consultas frecuentes',
      ],
    },
  ],
  ejercicios: [],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué significa ver "SCAN tabla" en EXPLAIN QUERY PLAN?',
      opciones: [
        'La consulta es muy rápida',
        'SQLite está usando un índice',
        'SQLite está revisando TODAS las filas de la tabla (puede ser lento)',
        'Hay un error en la consulta',
      ],
      correcta: 2,
      explicacion: '"SCAN tabla" significa que SQLite revisa cada fila de la tabla sin usar índice. En tablas con millones de filas, esto es muy lento. La solución es crear un índice en la columna usada en WHERE.',
    },
  ],
};
