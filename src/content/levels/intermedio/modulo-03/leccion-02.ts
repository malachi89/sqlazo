import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'in-03-02',
  titulo: 'CTEs múltiples y encadenadas',
  descripcion: 'Aprende a usar múltiples CTEs en una sola consulta para resolver problemas complejos paso a paso.',
  duracionMinutos: 20,
  conceptosClave: ['CTEs múltiples', 'CTE encadenada', 'WITH recursivo'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Puedes definir múltiples CTEs en una sola consulta. Cada CTE puede referenciar las anteriores, creando un flujo de transformación de datos muy claro.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Pipeline de análisis con múltiples CTEs',
      descripcion: 'CTE1 calcula ventas por producto. CTE2 calcula el ranking. La consulta final filtra el top 3.',
      sql: "WITH ventas_producto AS (\n  SELECT producto_id, SUM(cantidad * precio) AS total_ventas\n  FROM detalles_pedido\n  GROUP BY producto_id\n),\nranking AS (\n  SELECT p.nombre, v.total_ventas,\n    ROW_NUMBER() OVER (ORDER BY v.total_ventas DESC) AS posicion\n  FROM productos p\n  INNER JOIN ventas_producto v ON p.id = v.producto_id\n)\nSELECT posicion, nombre, total_ventas\nFROM ranking\nWHERE posicion <= 3;",
      tablaResultado: {
        columnas: ['posicion', 'nombre', 'total_ventas'],
        filas: [
          [1, 'Laptop Pro', 25999.80],
          [2, 'Monitor 4K', 14999.70],
          [3, 'Teclado Mecánico', 4499.50],
        ],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        'Múltiples CTEs se separan con comas dentro del WITH',
        'Cada CTE puede referenciar las CTEs definidas antes',
        'Permiten descomponer problemas complejos en pasos simples',
        'La consulta final puede usar cualquiera de las CTEs definidas',
        'Son más legibles que subconsultas anidadas profundas',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'in-03-02-e1',
      titulo: 'Análisis de rendimiento con dos CTEs',
      descripcion: 'Usa dos CTEs: la primera calcula el total vendido por empleado, la segunda calcula la media de ventas. Luego muestra qué empleados están por encima de la media.',
      setupSql: `
        CREATE TABLE empleados (id INTEGER, nombre TEXT);
        INSERT INTO empleados VALUES (1,'María');
        INSERT INTO empleados VALUES (2,'Carlos');
        INSERT INTO empleados VALUES (3,'Ana');
        INSERT INTO empleados VALUES (4,'Pedro');
        CREATE TABLE ventas (id INTEGER, empleado_id INTEGER, monto REAL);
        INSERT INTO ventas VALUES (1,1,5000);
        INSERT INTO ventas VALUES (2,1,3000);
        INSERT INTO ventas VALUES (3,2,8000);
        INSERT INTO ventas VALUES (4,3,2000);
        INSERT INTO ventas VALUES (5,3,1500);
        INSERT INTO ventas VALUES (6,4,6000);
        INSERT INTO ventas VALUES (7,4,4000);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'total_ventas'],
        filas: [
          ['Carlos', 8000],
          ['Pedro', 10000],
        ],
      },
      solucionOficial: "WITH totales AS (\n  SELECT e.nombre, SUM(v.monto) AS total_ventas\n  FROM empleados e\n  INNER JOIN ventas v ON e.id = v.empleado_id\n  GROUP BY e.id, e.nombre\n),\nmedia AS (\n  SELECT AVG(total_ventas) AS media_ventas FROM totales\n)\nSELECT t.nombre, t.total_ventas\nFROM totales t, media m\nWHERE t.total_ventas > m.media_ventas\nORDER BY t.total_ventas DESC;",
      pistas: [
        'CTE 1 (totales): suma las ventas por empleado con INNER JOIN',
        'CTE 2 (media): calcula el AVG de total_ventas desde la primera CTE',
        'Consulta final: filtra empleados cuyo total supera la media',
      ],
      explicacion: 'La primera CTE calcula totales por empleado. La segunda usa esos totales para calcular la media. La consulta final compara cada empleado con la media global.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Puede una CTE referenciar a otra CTE definida antes en el mismo WITH?',
      opciones: [
        'No, cada CTE es independiente',
        'Sí, una CTE puede usar los resultados de CTEs definidas antes en el mismo WITH',
        'Solo si son idénticas',
        'Solo en PostgreSQL, no en SQLite',
      ],
      correcta: 1,
      explicacion: 'Sí, en un WITH con múltiples CTEs, cada CTE puede referenciar a las CTEs que fueron definidas antes en la misma cláusula WITH. Esto permite crear cadenas de transformación de datos.',
    },
  ],
};
