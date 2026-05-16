import type { Leccion } from '../../../../types';
import { SETUP_EMPLEADOS_BASICO, SETUP_PRODUCTOS } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'no-01-04',
  titulo: 'HAVING — Filtrar grupos',
  descripcion: 'Aprende a filtrar los resultados de GROUP BY con HAVING.',
  duracionMinutos: 18,
  conceptosClave: ['HAVING', 'Filtrar grupos', 'WHERE vs HAVING'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'HAVING es al GROUP BY lo que WHERE es al SELECT. Con WHERE filtras filas individuales antes de agrupar. Con HAVING filtras grupos después de agrupar.',
    },
    {
      tipo: 'analogia',
      icono: '🗂️',
      texto: 'Volviendo a la analogía de las monedas: WHERE sería "no incluyas las monedas dañadas" (filtras antes de agrupar). HAVING sería "muéstrame solo los grupos de monedas donde tengo más de 10" (filtras después de agrupar).',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'WHERE vs HAVING',
      cabeceras: ['Cláusula', '¿Cuándo filtra?', '¿Qué filtra?', '¿Con agregaciones?'],
      filas: [
        ['WHERE', 'Antes de agrupar', 'Filas individuales', 'No puede usar COUNT, SUM, etc.'],
        ['HAVING', 'Después de agrupar', 'Grupos completos', 'Sí, diseñado para esto'],
      ],
    },
    {
      tipo: 'ejemplo',
      titulo: 'Departamentos con más de 2 empleados',
      descripcion: 'Primero agrupamos, luego filtramos grupos con más de 2 empleados.',
      sql: 'SELECT departamento, COUNT(*) AS cantidad FROM empleados GROUP BY departamento HAVING COUNT(*) > 2;',
  setupSql: SETUP_EMPLEADOS_BASICO,
      tablaResultado: {
        columnas: ['departamento', 'cantidad'],
        filas: [
          ['Ventas', 3],
          ['Tecnología', 3],
        ],
      },
    },
    {
      tipo: 'ejemplo',
      titulo: 'Categorías con precio promedio mayor a $100',
      descripcion: 'Filtramos categorías donde el precio promedio supera los $100.',
      sql: 'SELECT categoria, AVG(precio) AS precio_prom FROM productos GROUP BY categoria HAVING AVG(precio) > 100;',
  setupSql: SETUP_PRODUCTOS,
      tablaResultado: {
        columnas: ['categoria', 'precio_prom'],
        filas: [
          ['Electrónica', 899.99],
          ['Mobiliario', 349.99],
        ],
      },
    },
    {
      tipo: 'error-comun',
      titulo: 'Usar WHERE en lugar de HAVING para filtrar agregaciones',
      codigoMal: 'SELECT departamento, COUNT(*) FROM empleados WHERE COUNT(*) > 2 GROUP BY departamento',
      problema: 'WHERE no puede usar funciones de agregación como COUNT(*). Esto dará un error porque WHERE se evalúa ANTES de que existan los grupos.',
      codigoBien: 'SELECT departamento, COUNT(*) AS cantidad FROM empleados GROUP BY departamento HAVING COUNT(*) > 2',
      solucion: 'Usa HAVING (no WHERE) para filtrar con funciones de agregación.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'HAVING filtra grupos después de que GROUP BY los crea',
        'WHERE filtra filas antes de que GROUP BY las agrupe',
        'HAVING puede usar funciones de agregación (COUNT, SUM, AVG, etc.)',
        'WHERE NO puede usar funciones de agregación',
        'Puedes usar ambos en la misma consulta: WHERE filtra filas, HAVING filtra grupos',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'no-01-04-e1',
      titulo: 'Países con más de 2 clientes',
      descripcion: 'Muestra los países que tengan más de 2 clientes registrados.',
      setupSql: `
        CREATE TABLE clientes (id INTEGER, nombre TEXT, pais TEXT);
        INSERT INTO clientes VALUES (1,'Ana','España');
        INSERT INTO clientes VALUES (2,'Bob','USA');
        INSERT INTO clientes VALUES (3,'Carlos','México');
        INSERT INTO clientes VALUES (4,'Diana','España');
        INSERT INTO clientes VALUES (5,'Eva','España');
        INSERT INTO clientes VALUES (6,'Frank','USA');
        INSERT INTO clientes VALUES (7,'Grace','México');
        INSERT INTO clientes VALUES (8,'Hector','México');
        INSERT INTO clientes VALUES (9,'Ivan','Japón');
      `,
      resultadoEsperado: {
        columnas: ['pais', 'cantidad'],
        filas: [
          ['España', 3],
          ['México', 3],
        ],
      },
      solucionOficial: 'SELECT pais, COUNT(*) AS cantidad FROM clientes GROUP BY pais HAVING COUNT(*) > 2;',
      pistas: [
        'Agrupa por pais con GROUP BY',
        'Usa HAVING COUNT(*) > 2 para filtrar grupos',
        'SELECT pais, COUNT(*) AS cantidad FROM clientes GROUP BY pais HAVING COUNT(*) > 2',
      ],
      explicacion: 'GROUP BY pais crea un grupo por cada país. HAVING COUNT(*) > 2 mantiene solo los grupos que tienen más de 2 clientes. Japón (1) y USA (2) se excluyen.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Por qué no puedes usar WHERE COUNT(*) > 5?',
      opciones: [
        'Porque WHERE no entiende el operador >',
        'Porque WHERE se evalúa antes de los grupos, cuando COUNT(*) aún no existe',
        'Porque COUNT solo funciona con HAVING',
        'Porque la sintaxis correcta es WHERE COUNT > 5 (sin paréntesis)',
      ],
      correcta: 1,
      explicacion: 'WHERE se ejecuta ANTES de GROUP BY, en la fase de filtrado de filas individuales. Las funciones de agregación como COUNT(*) no existen aún en esa fase. Por eso necesitas HAVING que se ejecuta DESPUÉS de GROUP BY.',
    },
    {
      id: 'q2',
      pregunta: '¿Puedes usar WHERE y HAVING en la misma consulta?',
      opciones: [
        'No, debes elegir uno u otro',
        'Sí, WHERE filtra filas y HAVING filtra grupos',
        'Solo si usas el mismo tipo de condición',
        'Solo en subconsultas',
      ],
      correcta: 1,
      explicacion: 'Puedes y a menudo debes usar ambos. WHERE filtra filas individuales antes de agrupar, y HAVING filtra grupos después de agrupar. Por ejemplo: WHERE activo = 1 GROUP BY dept HAVING COUNT(*) > 5.',
    },
    {
      id: 'q3',
      pregunta: '¿Puedes usar un alias de columna definido en SELECT dentro de HAVING?',
      opciones: [
        'Sí, siempre',
        'Depende del sistema de base de datos; en SQLite generalmente sí',
        'No, nunca',
        'Solo con COUNT',
      ],
      correcta: 1,
      explicacion: 'En SQLite y muchos otros sistemas, puedes usar alias de SELECT en HAVING. Por ejemplo: SELECT COUNT(*) AS c FROM t GROUP BY x HAVING c > 5. Pero no todos los sistemas de BD lo permiten.',
    },
  ],
};
