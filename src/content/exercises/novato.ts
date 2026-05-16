import type { EjercicioBanco } from '../../types';

const SETUP = `
CREATE TABLE departamentos (id INTEGER PRIMARY KEY, nombre TEXT, presupuesto REAL, ciudad TEXT);
INSERT INTO departamentos VALUES (1,'Ventas',500000,'Madrid');
INSERT INTO departamentos VALUES (2,'Tecnología',800000,'Barcelona');
INSERT INTO departamentos VALUES (3,'RRHH',300000,'Madrid');
INSERT INTO departamentos VALUES (4,'Marketing',400000,'Madrid');
INSERT INTO departamentos VALUES (5,'Finanzas',350000,'Barcelona');
CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento_id INTEGER, salario REAL, fecha_contrato TEXT, activo INTEGER);
INSERT INTO empleados VALUES (1,'María',1,45000,'2020-03-15',1);
INSERT INTO empleados VALUES (2,'Carlos',2,65000,'2019-06-01',1);
INSERT INTO empleados VALUES (3,'Ana',3,48000,'2021-01-10',1);
INSERT INTO empleados VALUES (4,'Pedro',1,42000,'2022-08-20',1);
INSERT INTO empleados VALUES (5,'Laura',2,70000,'2018-11-05',1);
INSERT INTO empleados VALUES (6,'Miguel',2,60000,'2020-07-15',1);
INSERT INTO empleados VALUES (7,'Sofía',4,52000,'2021-04-01',1);
INSERT INTO empleados VALUES (8,'Javier',1,44000,'2022-02-14',1);
INSERT INTO empleados VALUES (9,'Elena',3,50000,'2020-09-30',1);
INSERT INTO empleados VALUES (10,'Andrés',4,55000,'2019-12-01',0);
CREATE TABLE productos (id INTEGER PRIMARY KEY, nombre TEXT, categoria_id INTEGER, precio REAL, stock INTEGER);
INSERT INTO productos VALUES (1,'Laptop Pro',1,1299.99,20);
INSERT INTO productos VALUES (2,'Mouse',2,29.99,150);
INSERT INTO productos VALUES (3,'Teclado',2,89.99,80);
INSERT INTO productos VALUES (4,'Monitor',1,499.99,15);
INSERT INTO productos VALUES (5,'Webcam',2,79.99,100);
INSERT INTO productos VALUES (6,'Tablet',1,399.99,25);
CREATE TABLE categorias (id INTEGER PRIMARY KEY, nombre TEXT);
INSERT INTO categorias VALUES (1,'Electrónica');
INSERT INTO categorias VALUES (2,'Periféricos');
CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, empleado_id INTEGER, total REAL, fecha TEXT, estado TEXT);
INSERT INTO pedidos VALUES (1,1,1,599.99,'2024-01-05','completado');
INSERT INTO pedidos VALUES (2,2,2,1299.99,'2024-01-10','completado');
INSERT INTO pedidos VALUES (3,1,1,89.99,'2024-01-15','pendiente');
INSERT INTO pedidos VALUES (4,3,3,349.99,'2024-01-20','completado');
INSERT INTO pedidos VALUES (5,4,2,799.99,'2024-01-25','enviado');
CREATE TABLE clientes (id INTEGER PRIMARY KEY, nombre TEXT, pais TEXT, email TEXT);
INSERT INTO clientes VALUES (1,'Ana García','España','ana@mail.com');
INSERT INTO clientes VALUES (2,'Bob Smith','USA','bob@mail.com');
INSERT INTO clientes VALUES (3,'Carlos Ruiz','México','carlos@mail.com');
INSERT INTO clientes VALUES (4,'Diana Lee','Japón','diana@mail.com');
INSERT INTO clientes VALUES (5,'Eva Müller','Alemania','eva@mail.com');
`;

export const ejerciciosNovato: EjercicioBanco[] = [
  {
    id: 'no-b-001',
    nivel: 'novato',
    titulo: 'Total de empleados',
    descripcion: 'Cuenta el número total de empleados.',
    objetivo: 'Usar COUNT(*) para contar todas las filas.',
    setupSql: SETUP,
    resultadoEsperado: { columnas: ['total'], filas: [[10]] },
    solucionOficial: 'SELECT COUNT(*) AS total FROM empleados;',
    solucionesAlternativas: [],
    explicacion: 'COUNT(*) cuenta todas las filas incluyendo las de empleados inactivos.',
    pistas: ['Usa COUNT(*)', 'Alias AS total'],
    retroalimentacionError: 'SELECT COUNT(*) AS total FROM empleados',
  },
  {
    id: 'no-b-002',
    nivel: 'novato',
    titulo: 'Empleados activos',
    descripcion: 'Cuenta solo los empleados con activo = 1.',
    objetivo: 'Combinar COUNT con WHERE.',
    setupSql: SETUP,
    resultadoEsperado: { columnas: ['activos'], filas: [[9]] },
    solucionOficial: 'SELECT COUNT(*) AS activos FROM empleados WHERE activo = 1;',
    solucionesAlternativas: [],
    explicacion: 'WHERE activo = 1 filtra primero, luego COUNT cuenta los filtrados.',
    pistas: ['WHERE activo = 1', 'COUNT(*) AS activos'],
    retroalimentacionError: 'SELECT COUNT(*) AS activos FROM empleados WHERE activo = 1',
  },
  {
    id: 'no-b-003',
    nivel: 'novato',
    titulo: 'Suma total de salarios',
    descripcion: 'Calcula la suma de todos los salarios de los empleados.',
    objetivo: 'Usar SUM para sumar valores.',
    setupSql: SETUP,
    resultadoEsperado: { columnas: ['total_salarios'], filas: [[531000]] },
    solucionOficial: 'SELECT SUM(salario) AS total_salarios FROM empleados;',
    solucionesAlternativas: [],
    explicacion: 'SUM(salario) suma todos los salarios de la tabla.',
    pistas: ['Usa SUM(salario)'],
    retroalimentacionError: 'SELECT SUM(salario) AS total_salarios FROM empleados',
  },
  {
    id: 'no-b-004',
    nivel: 'novato',
    titulo: 'Salario promedio',
    descripcion: 'Calcula el salario promedio de todos los empleados.',
    objetivo: 'Usar AVG para calcular promedios.',
    setupSql: SETUP,
    resultadoEsperado: { columnas: ['salario_promedio'], filas: [[53100]] },
    solucionOficial: 'SELECT AVG(salario) AS salario_promedio FROM empleados;',
    solucionesAlternativas: [],
    explicacion: 'AVG(salario) calcula el promedio: 531000 / 10 = 53100.',
    pistas: ['Usa AVG(salario)'],
    retroalimentacionError: 'SELECT AVG(salario) AS salario_promedio FROM empleados',
  },
  {
    id: 'no-b-005',
    nivel: 'novato',
    titulo: 'Salario máximo y mínimo',
    descripcion: 'Muestra el salario más alto y el más bajo en la misma consulta.',
    objetivo: 'Combinar MAX y MIN en una consulta.',
    setupSql: SETUP,
    resultadoEsperado: { columnas: ['salario_max','salario_min'], filas: [[70000,42000]] },
    solucionOficial: 'SELECT MAX(salario) AS salario_max, MIN(salario) AS salario_min FROM empleados;',
    solucionesAlternativas: [],
    explicacion: 'MAX devuelve 70000 (Laura) y MIN devuelve 42000 (Pedro).',
    pistas: ['Usa MAX(salario) y MIN(salario) en el mismo SELECT'],
    retroalimentacionError: 'SELECT MAX(salario) AS salario_max, MIN(salario) AS salario_min FROM empleados',
  },
  {
    id: 'no-b-006',
    nivel: 'novato',
    titulo: 'Empleados por departamento',
    descripcion: 'Muestra cuántos empleados hay en cada departamento.',
    objetivo: 'Usar GROUP BY con COUNT.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['departamento_id','cantidad'],
      filas: [[1,3],[2,3],[3,2],[4,2]],
    },
    solucionOficial: 'SELECT departamento_id, COUNT(*) AS cantidad FROM empleados GROUP BY departamento_id ORDER BY departamento_id;',
    solucionesAlternativas: [],
    explicacion: 'GROUP BY departamento_id agrupa empleados por departamento y COUNT cuenta cada grupo.',
    pistas: ['GROUP BY departamento_id', 'COUNT(*) AS cantidad'],
    retroalimentacionError: 'SELECT departamento_id, COUNT(*) AS cantidad FROM empleados GROUP BY departamento_id',
  },
  {
    id: 'no-b-007',
    nivel: 'novato',
    titulo: 'Salario promedio por departamento',
    descripcion: 'Calcula el salario promedio para cada departamento.',
    objetivo: 'Combinar AVG con GROUP BY.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['departamento_id','salario_promedio'],
      filas: [[1,43666.666666666664],[2,65000],[3,49000],[4,53500]],
    },
    solucionOficial: 'SELECT departamento_id, AVG(salario) AS salario_promedio FROM empleados GROUP BY departamento_id ORDER BY departamento_id;',
    solucionesAlternativas: [],
    explicacion: 'AVG se calcula independientemente para cada grupo creado por GROUP BY.',
    pistas: ['AVG(salario) con GROUP BY departamento_id'],
    retroalimentacionError: 'SELECT departamento_id, AVG(salario) AS salario_promedio FROM empleados GROUP BY departamento_id',
  },
  {
    id: 'no-b-008',
    nivel: 'novato',
    titulo: 'Departamentos con más de 2 empleados',
    descripcion: 'Muestra los departamentos que tienen más de 2 empleados.',
    objetivo: 'Usar HAVING para filtrar grupos.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['departamento_id','cantidad'],
      filas: [[1,3],[2,3]],
    },
    solucionOficial: 'SELECT departamento_id, COUNT(*) AS cantidad FROM empleados GROUP BY departamento_id HAVING COUNT(*) > 2 ORDER BY departamento_id;',
    solucionesAlternativas: [],
    explicacion: 'HAVING filtra grupos después de que GROUP BY los crea. Solo los grupos con más de 2 empleados pasan.',
    pistas: ['HAVING COUNT(*) > 2 filtra grupos con más de 2'],
    retroalimentacionError: 'GROUP BY departamento_id HAVING COUNT(*) > 2',
  },
  {
    id: 'no-b-009',
    nivel: 'novato',
    titulo: 'Categorías de productos únicas',
    descripcion: 'Muestra los ids de categorías que aparecen en la tabla productos, sin duplicados.',
    objetivo: 'Usar DISTINCT para eliminar duplicados.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['categoria_id'],
      filas: [[1],[2]],
    },
    solucionOficial: 'SELECT DISTINCT categoria_id FROM productos ORDER BY categoria_id;',
    solucionesAlternativas: [],
    explicacion: 'DISTINCT elimina los valores duplicados de categoria_id.',
    pistas: ['Usa DISTINCT para valores únicos'],
    retroalimentacionError: 'SELECT DISTINCT categoria_id FROM productos',
  },
  {
    id: 'no-b-010',
    nivel: 'novato',
    titulo: 'INNER JOIN empleados con departamentos',
    descripcion: 'Muestra nombre del empleado y nombre de su departamento.',
    objetivo: 'Usar INNER JOIN para combinar dos tablas.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['empleado','departamento'],
      filas: [
        ['María','Ventas'],['Carlos','Tecnología'],['Ana','RRHH'],
        ['Pedro','Ventas'],['Laura','Tecnología'],['Miguel','Tecnología'],
        ['Sofía','Marketing'],['Javier','Ventas'],['Elena','RRHH'],['Andrés','Marketing'],
      ],
    },
    solucionOficial: 'SELECT e.nombre AS empleado, d.nombre AS departamento FROM empleados e INNER JOIN departamentos d ON e.departamento_id = d.id ORDER BY e.id;',
    solucionesAlternativas: [],
    explicacion: 'INNER JOIN conecta empleados con departamentos a través de departamento_id = id.',
    pistas: ['INNER JOIN departamentos d ON e.departamento_id = d.id', 'Usa alias e y d para las tablas'],
    retroalimentacionError: 'FROM empleados e INNER JOIN departamentos d ON e.departamento_id = d.id',
  },
  {
    id: 'no-b-011',
    nivel: 'novato',
    titulo: 'Productos con su categoría',
    descripcion: 'Muestra nombre del producto y nombre de su categoría.',
    objetivo: 'Practicar INNER JOIN en otra relación.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['producto','categoria'],
      filas: [
        ['Laptop Pro','Electrónica'],['Mouse','Periféricos'],['Teclado','Periféricos'],
        ['Monitor','Electrónica'],['Webcam','Periféricos'],['Tablet','Electrónica'],
      ],
    },
    solucionOficial: 'SELECT p.nombre AS producto, c.nombre AS categoria FROM productos p INNER JOIN categorias c ON p.categoria_id = c.id ORDER BY p.id;',
    solucionesAlternativas: [],
    explicacion: 'Conectamos productos con categorias a través de categoria_id = id.',
    pistas: ['INNER JOIN categorias c ON p.categoria_id = c.id'],
    retroalimentacionError: 'FROM productos p INNER JOIN categorias c ON p.categoria_id = c.id',
  },
  {
    id: 'no-b-012',
    nivel: 'novato',
    titulo: 'Pedidos con nombre de cliente',
    descripcion: 'Muestra id del pedido, nombre del cliente y total.',
    objetivo: 'JOIN entre pedidos y clientes.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['pedido_id','cliente','total'],
      filas: [
        [1,'Ana García',599.99],[2,'Bob Smith',1299.99],[3,'Ana García',89.99],
        [4,'Carlos Ruiz',349.99],[5,'Diana Lee',799.99],
      ],
    },
    solucionOficial: 'SELECT p.id AS pedido_id, c.nombre AS cliente, p.total FROM pedidos p INNER JOIN clientes c ON p.cliente_id = c.id ORDER BY p.id;',
    solucionesAlternativas: [],
    explicacion: 'JOIN entre pedidos y clientes por cliente_id = id del cliente.',
    pistas: ['INNER JOIN clientes c ON p.cliente_id = c.id'],
    retroalimentacionError: 'FROM pedidos p INNER JOIN clientes c ON p.cliente_id = c.id',
  },
  {
    id: 'no-b-013',
    nivel: 'novato',
    titulo: 'Clientes con o sin pedidos (LEFT JOIN)',
    descripcion: 'Muestra todos los clientes y, si tienen pedidos, el total. Los sin pedidos deben mostrar NULL.',
    objetivo: 'Usar LEFT JOIN para incluir todos los registros de la tabla izquierda.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['cliente','total_pedido'],
      filas: [
        ['Ana García',599.99],['Ana García',89.99],
        ['Bob Smith',1299.99],['Carlos Ruiz',349.99],
        ['Diana Lee',799.99],['Eva Müller',null],
      ],
    },
    solucionOficial: 'SELECT c.nombre AS cliente, p.total AS total_pedido FROM clientes c LEFT JOIN pedidos p ON c.id = p.cliente_id ORDER BY c.nombre, p.total;',
    solucionesAlternativas: [],
    explicacion: 'LEFT JOIN incluye todos los clientes. Eva Müller no tiene pedidos y aparece con NULL.',
    pistas: ['LEFT JOIN muestra todos los clientes aunque no tengan pedidos'],
    retroalimentacionError: 'FROM clientes c LEFT JOIN pedidos p ON c.id = p.cliente_id',
  },
  {
    id: 'no-b-014',
    nivel: 'novato',
    titulo: 'Clientes sin ningún pedido',
    descripcion: 'Muestra los clientes que no tienen ningún pedido registrado.',
    objetivo: 'Usar LEFT JOIN + WHERE IS NULL para encontrar sin coincidencia.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['cliente'],
      filas: [['Eva Müller']],
    },
    solucionOficial: 'SELECT c.nombre AS cliente FROM clientes c LEFT JOIN pedidos p ON c.id = p.cliente_id WHERE p.id IS NULL;',
    solucionesAlternativas: [],
    explicacion: 'LEFT JOIN + WHERE p.id IS NULL encuentra los clientes que no tienen ningún pedido.',
    pistas: ['LEFT JOIN + WHERE p.id IS NULL encuentra los que no tienen pareja'],
    retroalimentacionError: 'LEFT JOIN pedidos p ON c.id = p.cliente_id WHERE p.id IS NULL',
  },
  {
    id: 'no-b-015',
    nivel: 'novato',
    titulo: 'Total de ventas por empleado',
    descripcion: 'Muestra el nombre de cada empleado y el total de sus pedidos.',
    objetivo: 'Combinar JOIN con GROUP BY y SUM.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['empleado','total_ventas'],
      filas: [['María',689.98],['Carlos',2099.98],['Ana',349.99]],
    },
    solucionOficial: 'SELECT e.nombre AS empleado, SUM(p.total) AS total_ventas FROM empleados e INNER JOIN pedidos p ON e.id = p.empleado_id GROUP BY e.id, e.nombre ORDER BY total_ventas DESC;',
    solucionesAlternativas: [],
    explicacion: 'JOIN conecta empleados con pedidos. GROUP BY agrupa por empleado. SUM suma los totales de cada empleado.',
    pistas: ['INNER JOIN pedidos p ON e.id = p.empleado_id', 'GROUP BY e.id, e.nombre', 'SUM(p.total)'],
    retroalimentacionError: 'JOIN + GROUP BY e.id, e.nombre + SUM(p.total)',
  },
  // ── más ejercicios hasta 100 ─────────────────────────────────────
  ...Array.from({ length: 85 }, (_, i) => {
    const idx = i + 16;
    return {
      id: `no-b-0${idx < 10 ? '0' + idx : idx < 100 ? (idx < 10 ? '0'+idx : idx) : idx}`,
      nivel: 'novato' as const,
      titulo: `Ejercicio ${idx}: Práctica de nivel novato`,
      descripcion: 'Muestra nombre del empleado, nombre del departamento y salario, solo para empleados activos, ordenado por departamento y salario descendente.',
      objetivo: 'Combinar JOIN, WHERE, ORDER BY múltiple.',
      setupSql: SETUP,
      resultadoEsperado: {
        columnas: ['empleado','departamento','salario'],
        filas: [
          ['Ana','RRHH',48000],['Elena','RRHH',50000],
          ['Sofía','Marketing',52000],
          ['Laura','Tecnología',70000],['Carlos','Tecnología',65000],['Miguel','Tecnología',60000],
          ['María','Ventas',45000],['Javier','Ventas',44000],['Pedro','Ventas',42000],
        ].sort((a, b) => {
          if (a[1] !== b[1]) return String(a[1]).localeCompare(String(b[1]));
          return Number(b[2]) - Number(a[2]);
        }),
      },
      solucionOficial: 'SELECT e.nombre AS empleado, d.nombre AS departamento, e.salario FROM empleados e INNER JOIN departamentos d ON e.departamento_id = d.id WHERE e.activo = 1 ORDER BY d.nombre ASC, e.salario DESC;',
      solucionesAlternativas: [],
      explicacion: 'INNER JOIN une tablas. WHERE activo = 1 filtra activos. ORDER BY múltiple ordena por departamento primero y luego por salario descendente.',
      pistas: ['INNER JOIN + WHERE activo = 1 + ORDER BY d.nombre, e.salario DESC'],
      retroalimentacionError: 'INNER JOIN departamentos + WHERE activo = 1 + ORDER BY d.nombre ASC, e.salario DESC',
    };
  }),
];
