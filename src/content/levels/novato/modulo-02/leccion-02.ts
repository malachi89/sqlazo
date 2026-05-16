import type { Leccion } from '../../../../types';
import { SETUP_CLIENTES_PEDIDOS } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'no-02-02',
  titulo: 'LEFT JOIN — Incluir todos',
  descripcion: 'Aprende a usar LEFT JOIN para incluir todas las filas de la tabla izquierda aunque no tengan pareja.',
  duracionMinutos: 20,
  conceptosClave: ['LEFT JOIN', 'NULL en joins', 'Tabla izquierda'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'INNER JOIN excluye filas sin pareja. Pero a veces quieres ver TODOS los registros de una tabla, incluso si no tienen coincidencia en la otra. Para eso existe LEFT JOIN.',
    },
    {
      tipo: 'explicacion',
      titulo: '¿Qué hace LEFT JOIN?',
      texto: 'LEFT JOIN devuelve:\n• TODOS los registros de la tabla izquierda (la que escribes primero, antes de JOIN)\n• Solo los registros de la tabla derecha que tienen coincidencia\n• Si no hay coincidencia en la tabla derecha, pone NULL en esas columnas\n\nFROM tabla_izquierda LEFT JOIN tabla_derecha ON condicion',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'INNER JOIN vs LEFT JOIN',
      cabeceras: ['JOIN', 'Resultado'],
      filas: [
        ['INNER JOIN', 'Solo filas con coincidencia en AMBAS tablas'],
        ['LEFT JOIN', 'TODAS las filas de la tabla izquierda + coincidencias de la derecha (NULL si no hay)'],
        ['RIGHT JOIN', 'TODAS las filas de la tabla derecha + coincidencias de la izquierda'],
        ['FULL JOIN', 'TODAS las filas de ambas tablas (no disponible en SQLite)'],
      ],
    },
    {
      tipo: 'ejemplo',
      titulo: 'Clientes con o sin pedidos',
      descripcion: 'Con LEFT JOIN vemos TODOS los clientes, incluso los que no han hecho pedidos (aparecen con NULL en las columnas de pedidos).',
      sql: 'SELECT c.nombre, p.id AS pedido_id, p.total FROM clientes c LEFT JOIN pedidos p ON c.id = p.cliente_id ORDER BY c.nombre;',
  setupSql: SETUP_CLIENTES_PEDIDOS,
      tablaResultado: {
        columnas: ['nombre', 'pedido_id', 'total'],
        filas: [
          ['Ana', 2, 89],
          ['Carlos', 1, 150],
          ['Carlos', 3, 220],
          ['Diana', null, null],
          ['Eva', null, null],
        ],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'Truco: encontrar filas sin pareja',
      texto: 'Una técnica muy útil con LEFT JOIN: encontrar registros que NO tienen pareja.\n\nSELECT c.nombre FROM clientes c\nLEFT JOIN pedidos p ON c.id = p.cliente_id\nWHERE p.id IS NULL\n\nEsto devuelve clientes que nunca han hecho un pedido.\nTécnica: LEFT JOIN + WHERE columna_derecha IS NULL',
    },
    {
      tipo: 'resumen',
      puntos: [
        'LEFT JOIN incluye TODAS las filas de la tabla izquierda',
        'Si no hay coincidencia en la derecha, las columnas de la derecha son NULL',
        'La tabla izquierda es la que aparece antes de LEFT JOIN',
        'LEFT JOIN + WHERE col_derecha IS NULL = encontrar filas sin pareja',
        'Es el JOIN más usado después de INNER JOIN',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'no-02-02-e1',
      titulo: 'Empleados con o sin proyectos',
      descripcion: 'Muestra todos los empleados y, si tienen proyecto asignado, el nombre del proyecto. Los sin proyecto deben aparecer con NULL.',
      setupSql: `
        CREATE TABLE empleados (id INTEGER, nombre TEXT);
        INSERT INTO empleados VALUES (1,'María');
        INSERT INTO empleados VALUES (2,'Carlos');
        INSERT INTO empleados VALUES (3,'Ana');
        INSERT INTO empleados VALUES (4,'Pedro');
        CREATE TABLE proyectos (id INTEGER, nombre TEXT, empleado_id INTEGER);
        INSERT INTO proyectos VALUES (1,'Web App',1);
        INSERT INTO proyectos VALUES (2,'API REST',2);
        INSERT INTO proyectos VALUES (3,'Dashboard',1);
      `,
      resultadoEsperado: {
        columnas: ['empleado', 'proyecto'],
        filas: [
          ['Ana', null],
          ['Carlos', 'API REST'],
          ['María', 'Web App'],
          ['María', 'Dashboard'],
          ['Pedro', null],
        ],
      },
      solucionOficial: 'SELECT e.nombre AS empleado, p.nombre AS proyecto FROM empleados e LEFT JOIN proyectos p ON e.id = p.empleado_id ORDER BY e.nombre;',
      pistas: [
        'Usa LEFT JOIN para incluir todos los empleados',
        'La tabla izquierda es empleados',
        'ON e.id = p.empleado_id conecta las tablas',
        'Los empleados sin proyecto tendrán NULL en la columna proyecto',
      ],
      explicacion: 'LEFT JOIN incluye TODOS los empleados. Ana y Pedro no tienen proyectos asignados, por eso su columna proyecto aparece como NULL.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuál es la diferencia principal entre INNER JOIN y LEFT JOIN?',
      opciones: [
        'LEFT JOIN es más rápido que INNER JOIN',
        'INNER JOIN solo devuelve coincidencias en ambas tablas; LEFT JOIN devuelve todas las filas de la tabla izquierda aunque no tengan coincidencia',
        'LEFT JOIN no puede usarse con ON',
        'No hay diferencia, son sinónimos',
      ],
      correcta: 1,
      explicacion: 'INNER JOIN solo devuelve filas con coincidencia en ambas tablas. LEFT JOIN devuelve TODAS las filas de la tabla izquierda, poniendo NULL donde no hay coincidencia en la derecha.',
    },
  ],
};
