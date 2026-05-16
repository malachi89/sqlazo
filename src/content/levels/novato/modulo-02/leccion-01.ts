import type { Leccion } from '../../../../types';
import { SETUP_CLIENTES_PEDIDOS } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'no-02-01',
  titulo: 'INNER JOIN — Unir tablas',
  descripcion: 'Aprende a combinar datos de dos tablas relacionadas con INNER JOIN.',
  duracionMinutos: 30,
  conceptosClave: ['JOIN', 'INNER JOIN', 'Relación', 'Clave foránea'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'En la vida real, los datos suelen estar distribuidos en múltiples tablas. Los pedidos están en una tabla, los clientes en otra, los productos en otra más. JOIN te permite combinarlas en un solo resultado.',
    },
    {
      tipo: 'analogia',
      icono: '🔗',
      texto: 'INNER JOIN es como un apretón de manos entre dos tablas. Solo participan los registros que tienen "pareja" en ambas tablas. Si un cliente no tiene pedidos, no aparece. Si un pedido no tiene cliente, tampoco aparece.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de INNER JOIN',
      texto: 'INNER JOIN conecta dos tablas a través de una columna en común:\n\nSELECT c.nombre, p.total\nFROM clientes c\nINNER JOIN pedidos p ON c.id = p.cliente_id\n\nDonde:\n• c y p son alias de tabla (opcionales pero recomendados)\n• ON especifica la condición de unión\n• La condición suele ser clave primaria = clave foránea',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Ejemplo: tablas pedidos y clientes',
      cabeceras: ['Tabla: pedidos', '', 'Tabla: clientes'],
      filas: [
        ['id=1, cliente_id=3, total=150', '⟵ cliente_id=id →', 'id=3, nombre=Carlos'],
        ['id=2, cliente_id=1, total=89', '⟵ cliente_id=id →', 'id=1, nombre=Ana'],
        ['id=3, cliente_id=3, total=220', '⟵ cliente_id=id →', 'id=3, nombre=Carlos'],
      ],
    },
    {
      tipo: 'ejemplo',
      titulo: 'Pedidos con nombre del cliente',
      descripcion: 'Combinamos pedidos con clientes para ver el nombre del cliente en cada pedido.',
      sql: 'SELECT p.id, c.nombre, p.total FROM pedidos p INNER JOIN clientes c ON p.cliente_id = c.id ORDER BY p.id;',
  setupSql: SETUP_CLIENTES_PEDIDOS,
      tablaResultado: {
        columnas: ['id', 'nombre', 'total'],
        filas: [
          [1, 'Carlos', 150],
          [2, 'Ana', 89],
          [3, 'Carlos', 220],
        ],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'INNER JOIN: solo los que tienen pareja',
      texto: 'INNER JOIN devuelve SOLO las filas que tienen coincidencia en AMBAS tablas.\n\nSi hay un pedido con cliente_id que no existe en la tabla clientes, ese pedido NO aparece.\nSi hay un cliente que no tiene pedidos, ese cliente NO aparece.\n\nPara los casos donde quieres incluir filas sin pareja, necesitas LEFT JOIN (próxima lección).',
    },
    {
      tipo: 'resumen',
      puntos: [
        'INNER JOIN combina filas de dos tablas que tienen coincidencia en ambas',
        'La condición ON especifica cómo se relacionan las tablas',
        'Normalmente se une por clave primaria = clave foránea',
        'Solo devuelve filas con "pareja" en ambas tablas',
        'Los alias de tabla (c, p) evitan ambigüedad cuando hay columnas con el mismo nombre',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'no-02-01-e1',
      titulo: 'Empleados con su departamento',
      descripcion: 'Muestra el nombre de cada empleado junto con el nombre de su departamento.',
      setupSql: `
        CREATE TABLE departamentos (id INTEGER PRIMARY KEY, nombre TEXT, ciudad TEXT);
        INSERT INTO departamentos VALUES (1,'Ventas','Madrid');
        INSERT INTO departamentos VALUES (2,'Tecnología','Barcelona');
        INSERT INTO departamentos VALUES (3,'RRHH','Madrid');
        CREATE TABLE empleados (id INTEGER, nombre TEXT, departamento_id INTEGER, salario REAL);
        INSERT INTO empleados VALUES (1,'María',1,45000);
        INSERT INTO empleados VALUES (2,'Carlos',2,65000);
        INSERT INTO empleados VALUES (3,'Ana',3,48000);
        INSERT INTO empleados VALUES (4,'Pedro',1,42000);
        INSERT INTO empleados VALUES (5,'Laura',2,70000);
      `,
      resultadoEsperado: {
        columnas: ['nombre_empleado', 'departamento', 'ciudad'],
        filas: [
          ['María', 'Ventas', 'Madrid'],
          ['Carlos', 'Tecnología', 'Barcelona'],
          ['Ana', 'RRHH', 'Madrid'],
          ['Pedro', 'Ventas', 'Madrid'],
          ['Laura', 'Tecnología', 'Barcelona'],
        ],
      },
      solucionOficial: 'SELECT e.nombre AS nombre_empleado, d.nombre AS departamento, d.ciudad FROM empleados e INNER JOIN departamentos d ON e.departamento_id = d.id;',
      pistas: [
        'Usa INNER JOIN para conectar empleados con departamentos',
        'La condición ON es e.departamento_id = d.id',
        'Necesitas aliases para columnas con mismo nombre (nombre)',
        'SELECT e.nombre AS nombre_empleado, d.nombre AS departamento, d.ciudad FROM empleados e INNER JOIN departamentos d ON e.departamento_id = d.id',
      ],
      explicacion: 'INNER JOIN con ON e.departamento_id = d.id conecta cada empleado con su departamento. Usamos aliases (e y d) para diferenciar columnas del mismo nombre de tablas diferentes.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: 'Si tienes 10 pedidos y 8 clientes, pero 2 pedidos tienen cliente_id que no existe, ¿cuántos registros devuelve un INNER JOIN?',
      opciones: [
        '18 (todos combinados)',
        '10 (todos los pedidos)',
        '8 (los 8 pedidos que tienen cliente existente)',
        'Depende del ORDER BY',
      ],
      correcta: 2,
      explicacion: 'INNER JOIN solo devuelve filas con coincidencia en AMBAS tablas. Los 2 pedidos sin cliente existente no tienen "pareja" y se excluyen. Resultado: 10 - 2 = 8 filas.',
    },
  ],
};
