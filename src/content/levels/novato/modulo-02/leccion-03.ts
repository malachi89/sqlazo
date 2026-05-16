import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'no-02-03',
  titulo: 'Múltiples JOINs — 3 o más tablas',
  descripcion: 'Aprende a conectar tres o más tablas en una sola consulta.',
  duracionMinutos: 25,
  conceptosClave: ['Múltiples JOINs', 'JOIN encadenado', 'Tablas intermedias'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'En la vida real, los datos suelen estar distribuidos en muchas tablas. Un pedido tiene un cliente, y cada pedido tiene productos a través de una tabla intermedia. Para ver toda la información junta, necesitas encadenar varios JOINs.',
    },
    {
      tipo: 'analogia',
      icono: '🔗',
      texto: 'Imagina una cadena de eslabones. Cada JOIN es un eslabón que conecta dos tablas. Puedes agregar tantos eslabones como necesites: clientes → pedidos → detalles → productos.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de múltiples JOINs',
      texto: 'Cada JOIN adicional se agrega después del anterior:\n\nSELECT ...\nFROM tabla_a\nJOIN tabla_b ON a.id = b.a_id\nJOIN tabla_c ON b.id = c.b_id\nJOIN tabla_d ON c.id = d.c_id\n\nCada JOIN usa la tabla anterior como referencia para la condición ON.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Pedidos con cliente y productos',
      descripcion: 'Conectamos clientes → pedidos → detalles_pedido → productos para ver toda la información.',
      sql: `SELECT c.nombre AS cliente, p.fecha, pr.nombre AS producto, dp.cantidad, dp.precio
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
INNER JOIN detalles_pedido dp ON p.id = dp.pedido_id
INNER JOIN productos pr ON dp.producto_id = pr.id
ORDER BY c.nombre, p.fecha;`,
      setupSql: `
        CREATE TABLE clientes (id INTEGER PRIMARY KEY, nombre TEXT);
        INSERT INTO clientes VALUES (1,'Ana');
        INSERT INTO clientes VALUES (2,'Carlos');
        CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, fecha TEXT);
        INSERT INTO pedidos VALUES (1,1,'2024-01-15');
        INSERT INTO pedidos VALUES (2,2,'2024-01-20');
        INSERT INTO pedidos VALUES (3,1,'2024-02-01');
        CREATE TABLE productos (id INTEGER PRIMARY KEY, nombre TEXT, precio REAL);
        INSERT INTO productos VALUES (1,'Laptop',1299.99);
        INSERT INTO productos VALUES (2,'Mouse',29.99);
        INSERT INTO productos VALUES (3,'Teclado',89.99);
        CREATE TABLE detalles_pedido (pedido_id INTEGER, producto_id INTEGER, cantidad INTEGER, precio REAL);
        INSERT INTO detalles_pedido VALUES (1,1,1,1299.99);
        INSERT INTO detalles_pedido VALUES (1,2,2,29.99);
        INSERT INTO detalles_pedido VALUES (2,3,1,89.99);
        INSERT INTO detalles_pedido VALUES (3,1,1,1299.99);
      `,
      tablaResultado: {
        columnas: ['cliente','fecha','producto','cantidad','precio'],
        filas: [
          ['Ana','2024-01-15','Laptop',1,1299.99],
          ['Ana','2024-01-15','Mouse',2,29.99],
          ['Ana','2024-02-01','Laptop',1,1299.99],
          ['Carlos','2024-01-20','Teclado',1,89.99],
        ],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'Orden de los JOINs',
      texto: 'El orden de los JOINs importa para la legibilidad, aunque el resultado es el mismo.\n\nBuen orden: sigue la cadena de relaciones\nclientes → pedidos → detalles → productos\n\nMal orden: saltar entre tablas sin lógica\npedidos → productos → clientes → detalles\n\nSiempre empieza por la tabla principal y sigue las relaciones de forma lógica.',
    },
    {
      tipo: 'error-comun',
      titulo: 'Olvidar la condición ON de un JOIN',
      codigoMal: 'SELECT * FROM clientes c JOIN pedidos p JOIN detalles d ON c.id = p.cliente_id',
      problema: 'El primer JOIN (pedidos) no tiene condición ON. Esto genera un producto cartesiano: cada cliente se combina con cada pedido.',
      codigoBien: 'SELECT * FROM clientes c JOIN pedidos p ON c.id = p.cliente_id JOIN detalles d ON p.id = d.pedido_id',
      solucion: 'Cada JOIN debe tener su propia condición ON inmediatamente después.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'Puedes encadenar tantos JOINs como necesites',
        'Cada JOIN necesita su propia condición ON',
        'Sigue la cadena de relaciones de forma lógica',
        'Usa aliases de tabla para evitar ambigüedad',
        'El orden de JOINs no afecta el resultado pero sí la legibilidad',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'no-02-03-e1',
      titulo: 'Ventas completas con cliente y producto',
      descripcion: 'Muestra nombre del cliente, fecha del pedido, nombre del producto, cantidad y precio de cada detalle de pedido.',
      objetivo: 'Encadenar 4 tablas con JOINs.',
      setupSql: `
        CREATE TABLE clientes (id INTEGER PRIMARY KEY, nombre TEXT);
        INSERT INTO clientes VALUES (1,'María');
        INSERT INTO clientes VALUES (2,'Carlos');
        INSERT INTO clientes VALUES (3,'Ana');
        CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, fecha TEXT);
        INSERT INTO pedidos VALUES (1,1,'2024-03-01');
        INSERT INTO pedidos VALUES (2,2,'2024-03-05');
        INSERT INTO pedidos VALUES (3,3,'2024-03-10');
        CREATE TABLE productos (id INTEGER PRIMARY KEY, nombre TEXT, categoria TEXT);
        INSERT INTO productos VALUES (1,'Laptop','Electrónica');
        INSERT INTO productos VALUES (2,'Mouse','Periféricos');
        INSERT INTO productos VALUES (3,'Monitor','Electrónica');
        CREATE TABLE detalles_pedido (pedido_id INTEGER, producto_id INTEGER, cantidad INTEGER, precio REAL);
        INSERT INTO detalles_pedido VALUES (1,1,1,1299.99);
        INSERT INTO detalles_pedido VALUES (1,2,3,29.99);
        INSERT INTO detalles_pedido VALUES (2,3,1,499.99);
        INSERT INTO detalles_pedido VALUES (3,1,1,1299.99);
        INSERT INTO detalles_pedido VALUES (3,2,2,29.99);
      `,
      resultadoEsperado: {
        columnas: ['cliente','fecha','producto','categoria','cantidad','precio'],
        filas: [
          ['María','2024-03-01','Laptop','Electrónica',1,1299.99],
          ['María','2024-03-01','Mouse','Periféricos',3,29.99],
          ['Carlos','2024-03-05','Monitor','Electrónica',1,499.99],
          ['Ana','2024-03-10','Laptop','Electrónica',1,1299.99],
          ['Ana','2024-03-10','Mouse','Periféricos',2,29.99],
        ],
      },
      solucionOficial: `SELECT c.nombre AS cliente, p.fecha, pr.nombre AS producto, pr.categoria, dp.cantidad, dp.precio
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
INNER JOIN detalles_pedido dp ON p.id = dp.pedido_id
INNER JOIN productos pr ON dp.producto_id = pr.id
ORDER BY c.nombre, p.fecha;`,
      pistas: [
        'Empieza con clientes y une con pedidos',
        'Luego une pedidos con detalles_pedido',
        'Finalmente une detalles_pedido con productos',
        'Cada JOIN necesita su condición ON',
      ],
      explicacion: 'Encadenamos 4 tablas: clientes → pedidos → detalles_pedido → productos. Cada JOIN conecta dos tablas adyacentes en la cadena.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuántas condiciones ON necesitas si haces 3 JOINs?',
      opciones: [
        '1 (solo la primera)',
        '2 (una por cada par de tablas)',
        '3 (una por cada JOIN)',
        'Depende del número de columnas',
      ],
      correcta: 2,
      explicacion: 'Cada JOIN necesita su propia condición ON. Si haces 3 JOINs, necesitas 3 condiciones ON, una inmediatamente después de cada JOIN.',
    },
    {
      id: 'q2',
      pregunta: '¿Qué pasa si olvidas la condición ON de un JOIN?',
      opciones: [
        'Da un error de sintaxis',
        'Genera un producto cartesiano (combinación de todas las filas)',
        'Devuelve resultados vacíos',
        'SQLite lo corrige automáticamente',
      ],
      correcta: 1,
      explicacion: 'Sin condición ON, el JOIN se convierte en un CROSS JOIN implícito: cada fila de la primera tabla se combina con cada fila de la segunda. Esto puede generar millones de filas accidentalmente.',
    },
  ],
};
