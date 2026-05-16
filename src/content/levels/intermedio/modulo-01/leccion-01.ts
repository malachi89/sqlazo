import type { Leccion } from '../../../../types';
import { SETUP_CLIENTES_PEDIDOS, SETUP_EMPLEADOS_BASICO } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'in-01-01',
  titulo: 'Subconsultas',
  descripcion: 'Aprende a usar consultas dentro de consultas (subconsultas) para resolver problemas complejos.',
  duracionMinutos: 30,
  conceptosClave: ['Subconsulta', 'Subquery', 'Consulta anidada', 'IN', 'EXISTS'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Una subconsulta es una consulta SQL dentro de otra consulta. Permiten resolver preguntas que no pueden contestarse con una sola consulta simple, como "¿qué empleados ganan más que el promedio?"',
    },
    {
      tipo: 'analogia',
      icono: '🎁',
      texto: 'Una subconsulta es como una caja dentro de otra caja. Primero abres la caja interior (se ejecuta la subconsulta), obtienes su resultado, y luego usas ese resultado para la caja exterior (la consulta principal).',
    },
    {
      tipo: 'explicacion',
      titulo: 'Subconsultas en WHERE',
      texto: 'La forma más común: usar una subconsulta para generar un valor de comparación.\n\nEjemplo:\nSELECT nombre, salario\nFROM empleados\nWHERE salario > (SELECT AVG(salario) FROM empleados)\n\nLa subconsulta (SELECT AVG(salario) FROM empleados) devuelve un número (el promedio). La consulta exterior filtra empleados con salario mayor a ese número.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Empleados con salario sobre el promedio',
      descripcion: 'La subconsulta calcula el promedio; la consulta exterior filtra con ese valor.',
      sql: 'SELECT nombre, salario FROM empleados WHERE salario > (SELECT AVG(salario) FROM empleados) ORDER BY salario DESC;',
  setupSql: SETUP_EMPLEADOS_BASICO,
      tablaResultado: {
        columnas: ['nombre', 'salario'],
        filas: [
          ['Laura', 70000],
          ['Carlos', 65000],
          ['Miguel', 60000],
        ],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'Subconsultas con IN',
      texto: 'Una subconsulta puede devolver múltiples valores para usar con IN:\n\nSELECT nombre FROM clientes\nWHERE id IN (SELECT cliente_id FROM pedidos WHERE total > 500)\n\nEsto devuelve nombres de clientes que tienen al menos un pedido mayor a $500.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Clientes con pedidos grandes',
      descripcion: 'Subconsulta que devuelve IDs de clientes con pedidos > $200.',
      sql: 'SELECT nombre FROM clientes WHERE id IN (SELECT DISTINCT cliente_id FROM pedidos WHERE total > 200);',
  setupSql: SETUP_CLIENTES_PEDIDOS,
      tablaResultado: {
        columnas: ['nombre'],
        filas: [['Carlos'], ['Eva']],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'Subconsultas correlacionadas',
      texto: 'Una subconsulta correlacionada referencia la consulta exterior. Se ejecuta UNA VEZ POR CADA FILA de la consulta exterior:\n\nSELECT e.nombre, e.salario\nFROM empleados e\nWHERE e.salario = (\n  SELECT MAX(salario)\n  FROM empleados\n  WHERE departamento_id = e.departamento_id\n)\n\nEsto devuelve el empleado mejor pagado de CADA departamento.',
    },
    {
      tipo: 'advertencia',
      texto: 'Las subconsultas correlacionadas pueden ser muy lentas porque se ejecutan una vez por cada fila. En tablas grandes, considera alternativas con JOINs o CTEs (que veremos más adelante).',
    },
    {
      tipo: 'resumen',
      puntos: [
        'Una subconsulta es una consulta SQL dentro de otra',
        'Pueden estar en WHERE, FROM, SELECT, o HAVING',
        'Subconsulta escalar: devuelve un solo valor',
        'Subconsulta de lista: devuelve múltiples valores (usa con IN)',
        'Subconsulta correlacionada: referencia la consulta exterior (más lenta)',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'in-01-01-e1',
      titulo: 'Productos más caros que el promedio',
      descripcion: 'Muestra nombre y precio de los productos cuyo precio sea mayor al precio promedio de todos los productos.',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, precio REAL);
        INSERT INTO productos VALUES (1,'Laptop Pro',1299.99);
        INSERT INTO productos VALUES (2,'Mouse',29.99);
        INSERT INTO productos VALUES (3,'Teclado',89.99);
        INSERT INTO productos VALUES (4,'Monitor',499.99);
        INSERT INTO productos VALUES (5,'Webcam',79.99);
        INSERT INTO productos VALUES (6,'Tablet',349.99);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'precio'],
        filas: [
          ['Laptop Pro', 1299.99],
          ['Monitor', 499.99],
          ['Tablet', 349.99],
        ],
      },
      solucionOficial: 'SELECT nombre, precio FROM productos WHERE precio > (SELECT AVG(precio) FROM productos) ORDER BY precio DESC;',
      pistas: [
        'La subconsulta calcula el promedio: (SELECT AVG(precio) FROM productos)',
        'Usa esa subconsulta en WHERE: WHERE precio > (subconsulta)',
        'SELECT nombre, precio FROM productos WHERE precio > (SELECT AVG(precio) FROM productos) ORDER BY precio DESC',
      ],
      explicacion: 'La subconsulta (SELECT AVG(precio) FROM productos) devuelve el precio promedio (~391.6). La consulta exterior devuelve los productos con precio mayor a ese valor.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuándo es apropiado usar una subconsulta en lugar de un JOIN?',
      opciones: [
        'Las subconsultas siempre son preferibles a los JOINs',
        'Cuando necesitas comparar con un valor agregado (como el promedio) o cuando la lógica es más clara con subconsulta',
        'Solo cuando tienes menos de 1000 filas',
        'Nunca, los JOINs siempre son mejor',
      ],
      correcta: 1,
      explicacion: 'Las subconsultas son útiles cuando necesitas comparar con valores agregados (AVG, MAX, etc.) o cuando expresan la lógica de forma más natural. Los JOINs son generalmente más eficientes para combinar tablas.',
    },
    {
      id: 'q2',
      pregunta: '¿Qué es una subconsulta correlacionada?',
      opciones: [
        'Una subconsulta que devuelve más de una columna',
        'Una subconsulta que referencia columnas de la consulta exterior y se ejecuta una vez por fila',
        'Una subconsulta que usa JOIN internamente',
        'Una subconsulta que está en la cláusula FROM',
      ],
      correcta: 1,
      explicacion: 'Una subconsulta correlacionada referencia columnas de la consulta exterior. Esto significa que se ejecuta una vez por cada fila de la consulta exterior, lo que puede ser muy lento en tablas grandes.',
    },
    {
      id: 'q3',
      pregunta: '¿En qué cláusulas puedes colocar una subconsulta?',
      opciones: [
        'Solo en WHERE',
        'Solo en WHERE y FROM',
        'En WHERE, FROM, SELECT y HAVING',
        'Solo en SELECT',
      ],
      correcta: 2,
      explicacion: 'Las subconsultas pueden aparecer en múltiples cláusulas: WHERE (como valor de comparación), FROM (como tabla derivada), SELECT (como columna calculada), y HAVING (como valor de filtro de grupo).',
    },
  ],
};
