import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'no-04-01',
  titulo: 'Subconsultas básicas — Introducción',
  descripcion: 'Aprende a usar una consulta dentro de otra para resolver preguntas en dos pasos.',
  duracionMinutos: 25,
  conceptosClave: ['Subconsulta', 'Subquery', 'Consulta anidada', 'Paso a paso'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'A veces una pregunta necesita dos pasos para responderse. Por ejemplo: "¿qué empleados ganan más que el promedio?" Primero necesitas saber cuál es el promedio, y luego comparar cada salario con ese valor. Las subconsultas te permiten hacer ambos pasos en una sola consulta.',
    },
    {
      tipo: 'analogia',
      icono: '🎁',
      texto: 'Una subconsulta es como abrir una caja para encontrar una pista, y usar esa pista para abrir otra caja. Primero resuelves la consulta interior (la pista), y luego usas ese resultado para la consulta exterior.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Subconsulta escalar en WHERE',
      texto: 'El tipo más simple: una subconsulta que devuelve un solo valor (escalar). Se usa normalmente en WHERE para comparar.\n\nSintaxis:\nSELECT columnas\nFROM tabla\nWHERE columna = (SELECT columna FROM otra_tabla WHERE ...)\n\nLa subconsulta (entre paréntesis) se ejecuta primero y su resultado se usa en la consulta exterior.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Empleados que ganan más que el promedio',
      descripcion: 'Primero calculamos el promedio, luego filtramos los que ganan más.',
      sql: `SELECT nombre, salario
FROM empleados
WHERE salario > (SELECT AVG(salario) FROM empleados)
ORDER BY salario DESC;`,
      setupSql: `
        CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento TEXT, salario REAL);
        INSERT INTO empleados VALUES (1,'María','Ventas',45000);
        INSERT INTO empleados VALUES (2,'Carlos','Tecnología',65000);
        INSERT INTO empleados VALUES (3,'Ana','Ventas',48000);
        INSERT INTO empleados VALUES (4,'Pedro','RRHH',42000);
        INSERT INTO empleados VALUES (5,'Laura','Tecnología',70000);
        INSERT INTO empleados VALUES (6,'Miguel','Ventas',50000);
      `,
      tablaResultado: {
        columnas: ['nombre','salario'],
        filas: [
          ['Laura',70000],
          ['Carlos',65000],
        ],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'Subconsultas con IN',
      texto: 'Cuando la subconsulta devuelve múltiples valores, puedes usar IN:\n\nSELECT nombre FROM productos\nWHERE categoria IN (SELECT categoria FROM productos WHERE precio > 500)\n\nEsto devuelve productos cuya categoría tiene al menos un producto caro.\n\nLa subconsulta devuelve una lista de categorías, y la consulta exterior filtra productos que pertenecen a esas categorías.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Productos en categorías caras',
      descripcion: 'Encuentra todos los productos que pertenecen a categorías donde hay algún producto que cuesta más de $500.',
      sql: `SELECT nombre, precio, categoria
FROM productos
WHERE categoria IN (SELECT DISTINCT categoria FROM productos WHERE precio > 500)
ORDER BY precio DESC;`,
      setupSql: `
        CREATE TABLE productos (id INTEGER PRIMARY KEY, nombre TEXT, categoria TEXT, precio REAL);
        INSERT INTO productos VALUES (1,'Laptop','Electrónica',1299.99);
        INSERT INTO productos VALUES (2,'Mouse','Periféricos',29.99);
        INSERT INTO productos VALUES (3,'Monitor','Electrónica',499.99);
        INSERT INTO productos VALUES (4,'Teclado','Periféricos',89.99);
        INSERT INTO productos VALUES (5,'Tablet','Electrónica',399.99);
        INSERT INTO productos VALUES (6,'Silla','Mobiliario',349.99);
      `,
      tablaResultado: {
        columnas: ['nombre','precio','categoria'],
        filas: [
          ['Laptop',1299.99,'Electrónica'],
          ['Monitor',499.99,'Electrónica'],
          ['Tablet',399.99,'Electrónica'],
        ],
      },
    },
    {
      tipo: 'nota',
      texto: 'En el nivel Intermedio verás subconsultas más avanzadas: correlacionadas, en FROM, y con EXISTS. Esta lección cubre los fundamentos que necesitas para empezar.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'Una subconsulta es una consulta dentro de otra, entre paréntesis',
        'Se ejecuta primero la subconsulta interior',
        'Subconsulta escalar: devuelve un solo valor (usa con =, >, <)',
        'Subconsulta de lista: devuelve múltiples valores (usa con IN)',
        'Es una alternativa a los JOINs en muchos casos',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'no-04-01-e1',
      titulo: 'Productos más caros que el promedio',
      descripcion: 'Muestra nombre y precio de los productos cuyo precio es mayor al precio promedio de todos los productos.',
      objetivo: 'Subconsulta escalar con AVG en WHERE.',
      setupSql: `
        CREATE TABLE productos (id INTEGER PRIMARY KEY, nombre TEXT, precio REAL);
        INSERT INTO productos VALUES (1,'Laptop',1299.99);
        INSERT INTO productos VALUES (2,'Mouse',29.99);
        INSERT INTO productos VALUES (3,'Monitor',499.99);
        INSERT INTO productos VALUES (4,'Teclado',89.99);
        INSERT INTO productos VALUES (5,'Tablet',349.99);
        INSERT INTO productos VALUES (6,'Webcam',79.99);
      `,
      resultadoEsperado: {
        columnas: ['nombre','precio'],
        filas: [
          ['Laptop',1299.99],
          ['Monitor',499.99],
        ],
      },
      solucionOficial: `SELECT nombre, precio FROM productos WHERE precio > (SELECT AVG(precio) FROM productos) ORDER BY precio DESC;`,
      pistas: [
        'La subconsulta calcula el promedio: (SELECT AVG(precio) FROM productos)',
        'Usa esa subconsulta en WHERE: WHERE precio > (subconsulta)',
      ],
      explicacion: 'La subconsulta devuelve el precio promedio (~391.66). La consulta exterior filtra productos con precio mayor a ese valor.',
    },
    {
      id: 'no-04-01-e2',
      titulo: 'Empleados del departamento con mayor salario promedio',
      descripcion: 'Muestra los empleados que trabajan en el departamento con el salario promedio más alto.',
      objetivo: 'Subconsulta con GROUP BY y MAX.',
      setupSql: `
        CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento TEXT, salario REAL);
        INSERT INTO empleados VALUES (1,'María','Ventas',45000);
        INSERT INTO empleados VALUES (2,'Carlos','Tecnología',65000);
        INSERT INTO empleados VALUES (3,'Ana','Ventas',48000);
        INSERT INTO empleados VALUES (4,'Pedro','RRHH',42000);
        INSERT INTO empleados VALUES (5,'Laura','Tecnología',70000);
        INSERT INTO empleados VALUES (6,'Miguel','Ventas',50000);
      `,
      resultadoEsperado: {
        columnas: ['nombre','departamento','salario'],
        filas: [
          ['Carlos','Tecnología',65000],
          ['Laura','Tecnología',70000],
        ],
      },
      solucionOficial: `SELECT nombre, departamento, salario FROM empleados WHERE departamento = (SELECT departamento FROM empleados GROUP BY departamento ORDER BY AVG(salario) DESC LIMIT 1);`,
      pistas: [
        'Primero encuentra el departamento con mayor promedio: GROUP BY departamento ORDER BY AVG(salario) DESC LIMIT 1',
        'Usa ese resultado en WHERE departamento = (subconsulta)',
      ],
      explicacion: 'La subconsulta encuentra que Tecnología tiene el mayor salario promedio (67500). La consulta exterior devuelve todos los empleados de Tecnología.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué tipo de subconsulta necesitas para comparar con un solo valor (como el promedio)?',
      opciones: [
        'Subconsulta de lista (con IN)',
        'Subconsulta escalar (devuelve un solo valor)',
        'Subconsulta correlacionada',
        'Subconsulta en FROM',
      ],
      correcta: 1,
      explicacion: 'Una subconsulta escalar devuelve un solo valor y se usa con operadores de comparación como =, >, <, >=, <=.',
    },
    {
      id: 'q2',
      pregunta: '¿Cuándo se usa IN con una subconsulta?',
      opciones: [
        'Cuando la subconsulta devuelve un solo valor',
        'Cuando la subconsulta devuelve múltiples valores',
        'Cuando la subconsulta devuelve NULL',
        'IN nunca se usa con subconsultas',
      ],
      correcta: 1,
      explicacion: 'IN se usa cuando la subconsulta devuelve una lista de valores. La consulta exterior filtra filas cuyo valor está en esa lista.',
    },
    {
      id: 'q3',
      pregunta: '¿Las subconsultas siempre van entre paréntesis?',
      opciones: [
        'Solo las que están en SELECT',
        'Solo las que están en FROM',
        'Sí, siempre entre paréntesis',
        'Depende del tipo de subconsulta',
      ],
      correcta: 2,
      explicacion: 'Todas las subconsultas deben estar entre paréntesis. Esto le indica a SQL dónde empieza y termina la consulta interior.',
    },
  ],
};
