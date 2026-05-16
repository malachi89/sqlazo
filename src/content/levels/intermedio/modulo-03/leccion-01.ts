import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'in-03-01',
  titulo: 'WITH — Common Table Expressions (CTE)',
  descripcion: 'Aprende a usar CTEs para hacer tus consultas más legibles y reutilizables.',
  duracionMinutos: 25,
  conceptosClave: ['CTE', 'WITH', 'Common Table Expression', 'Consulta temporal'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Las CTEs (Common Table Expressions) son consultas con nombre que defines al inicio y puedes usar en la consulta principal. Hacen el código más legible, como si fuera instrucciones paso a paso.',
    },
    {
      tipo: 'analogia',
      icono: '📝',
      texto: 'Una CTE es como una variable en programación: le das un nombre a un resultado intermedio para poder referenciarlo después. En lugar de tener subconsultas anidadas confusas, defines pasos nombrados.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de CTE',
      texto: 'WITH nombre_cte AS (\n  SELECT ...\n)\nSELECT ...\nFROM nombre_cte\n\nPuedes encadenar múltiples CTEs:\nWITH\n  cte1 AS (SELECT ...),\n  cte2 AS (SELECT ... FROM cte1)\nSELECT * FROM cte2',
    },
    {
      tipo: 'ejemplo',
      titulo: 'CTE para estadísticas por departamento',
      descripcion: 'Primero calculamos estadísticas por departamento en la CTE, luego filtramos los departamentos con salario promedio alto.',
      sql: "WITH stats_dept AS (\n  SELECT departamento, COUNT(*) AS total, AVG(salario) AS salario_prom\n  FROM empleados\n  GROUP BY departamento\n)\nSELECT departamento, total, ROUND(salario_prom, 0) AS salario_prom\nFROM stats_dept\nWHERE salario_prom > 50000\nORDER BY salario_prom DESC;",
      tablaResultado: {
        columnas: ['departamento', 'total', 'salario_prom'],
        filas: [
          ['Tecnología', 3, 65000],
          ['RRHH', 1, 52000],
        ],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        'CTE se define con WITH nombre AS (SELECT ...)',
        'Hace las consultas complejas más legibles y mantenibles',
        'Puedes definir múltiples CTEs separadas por comas',
        'Una CTE puede referenciar CTEs definidas antes',
        'Las CTEs son temporales: solo existen durante la ejecución de la consulta',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'in-03-01-e1',
      titulo: 'Clientes VIP con CTE',
      descripcion: 'Usa una CTE para identificar los clientes con total de compras mayor a $500, luego muestra su nombre y total.',
      setupSql: `
        CREATE TABLE clientes (id INTEGER, nombre TEXT);
        INSERT INTO clientes VALUES (1,'Ana');
        INSERT INTO clientes VALUES (2,'Bob');
        INSERT INTO clientes VALUES (3,'Carlos');
        INSERT INTO clientes VALUES (4,'Diana');
        CREATE TABLE pedidos (id INTEGER, cliente_id INTEGER, total REAL);
        INSERT INTO pedidos VALUES (1,1,200);
        INSERT INTO pedidos VALUES (2,1,350);
        INSERT INTO pedidos VALUES (3,2,100);
        INSERT INTO pedidos VALUES (4,3,800);
        INSERT INTO pedidos VALUES (5,4,150);
        INSERT INTO pedidos VALUES (6,4,400);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'total_compras'],
        filas: [
          ['Ana', 550],
          ['Carlos', 800],
          ['Diana', 550],
        ],
      },
      solucionOficial: "WITH totales AS (\n  SELECT cliente_id, SUM(total) AS total_compras\n  FROM pedidos\n  GROUP BY cliente_id\n  HAVING SUM(total) > 500\n)\nSELECT c.nombre, t.total_compras\nFROM clientes c\nINNER JOIN totales t ON c.id = t.cliente_id\nORDER BY c.nombre;",
      pistas: [
        'Define la CTE para calcular totales por cliente',
        'La CTE debe tener HAVING SUM(total) > 500 para filtrar',
        'Luego haz JOIN entre clientes y la CTE',
      ],
      explicacion: 'La CTE "totales" calcula el total de compras por cliente y filtra los que superan $500. Luego hacemos JOIN con clientes para obtener los nombres.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuál es la principal ventaja de usar CTEs?',
      opciones: [
        'Son más rápidas que las subconsultas siempre',
        'Hacen el código más legible al nombrar pasos intermedios y evitar subconsultas anidadas',
        'Guardan los resultados permanentemente en la base de datos',
        'Solo funcionan con GROUP BY',
      ],
      correcta: 1,
      explicacion: 'Las CTEs mejoran principalmente la legibilidad. En lugar de subconsultas anidadas confusas, defines pasos con nombres descriptivos. Son temporales (no se guardan) y el rendimiento es similar a las subconsultas.',
    },
  ],
};
