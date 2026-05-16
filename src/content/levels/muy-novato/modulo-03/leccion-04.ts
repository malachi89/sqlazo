import type { Leccion } from '../../../../types';
import { SETUP_EMPLEADOS_CON_FECHA, SETUP_PRODUCTOS } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'mn-03-04',
  titulo: 'IN y BETWEEN — Rangos y listas',
  descripcion: 'Filtra filas que pertenezcan a una lista de valores (IN) o a un rango numérico o de fechas (BETWEEN).',
  duracionMinutos: 15,
  conceptosClave: ['IN', 'BETWEEN', 'Lista', 'Rango'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'A veces quieres filtrar por varios valores específicos, o por un rango. En lugar de escribir muchos OR, SQL tiene dos operadores muy útiles: IN para listas y BETWEEN para rangos.',
    },
    {
      tipo: 'explicacion',
      titulo: 'IN — Pertenece a una lista',
      texto: 'IN verifica si un valor está dentro de una lista de valores:\n\nWHERE columna IN (valor1, valor2, valor3)\n\nEsto es equivalente a:\nWHERE columna = valor1 OR columna = valor2 OR columna = valor3\n\nPero es mucho más legible y conciso.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Empleados de Ventas, RRHH o Tecnología',
      descripcion: 'Usamos IN en lugar de múltiples OR para filtrar varios departamentos.',
      sql: "SELECT nombre, departamento FROM empleados WHERE departamento IN ('Ventas', 'RRHH', 'Tecnología');",
  setupSql: SETUP_EMPLEADOS_CON_FECHA,
      tablaResultado: {
        columnas: ['nombre', 'departamento'],
        filas: [
          ['María', 'Ventas'],
          ['Carlos', 'Tecnología'],
          ['Ana', 'Ventas'],
          ['Pedro', 'RRHH'],
          ['Laura', 'Tecnología'],
          ['Miguel', 'Ventas'],
          ['Javier', 'RRHH'],
          ['Andrés', 'Tecnología'],
        ],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'NOT IN — No pertenece a la lista',
      texto: 'NOT IN es la negación de IN:\n\nWHERE departamento NOT IN (\'Ventas\', \'RRHH\')\n\nDevuelve filas donde el departamento NO es ninguno de los valores de la lista.',
    },
    {
      tipo: 'explicacion',
      titulo: 'BETWEEN — Dentro de un rango',
      texto: 'BETWEEN verifica si un valor está dentro de un rango INCLUSIVE (incluye los extremos):\n\nWHERE columna BETWEEN valor_minimo AND valor_maximo\n\nImportante: BETWEEN incluye tanto el valor mínimo como el máximo.\n\nEquivalente a:\nWHERE columna >= valor_minimo AND columna <= valor_maximo',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Productos con precio entre $50 y $200',
      descripcion: 'BETWEEN es inclusivo: incluye los productos con precio exactamente $50 y exactamente $200.',
      sql: 'SELECT nombre, precio FROM productos WHERE precio BETWEEN 50 AND 200;',
  setupSql: SETUP_PRODUCTOS,
      tablaResultado: {
        columnas: ['nombre', 'precio'],
        filas: [
          ['Webcam HD', 79.99],
          ['Teclado Mecánico', 89.99],
          ['Auriculares Bluetooth', 149.99],
        ],
      },
    },
    {
      tipo: 'nota',
      texto: 'BETWEEN también funciona con texto (orden alfabético) y fechas. Por ejemplo: WHERE fecha_contrato BETWEEN \'2023-01-01\' AND \'2023-12-31\' devuelve registros del año 2023.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'IN (v1, v2, v3) filtra filas donde la columna tiene alguno de esos valores',
        'NOT IN excluye las filas que estén en la lista',
        'BETWEEN mín AND máx filtra valores dentro de un rango (inclusivo)',
        'NOT BETWEEN excluye los valores del rango',
        'BETWEEN funciona con números, texto y fechas',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'mn-03-04-e1',
      titulo: 'Clientes de España, México o Argentina',
      descripcion: 'Muestra nombre y país de los clientes que sean de España, México o Argentina.',
      setupSql: `
        CREATE TABLE clientes (id INTEGER, nombre TEXT, pais TEXT);
        INSERT INTO clientes VALUES (1,'Ana García','España');
        INSERT INTO clientes VALUES (2,'Bob Smith','USA');
        INSERT INTO clientes VALUES (3,'Carlos Ruiz','México');
        INSERT INTO clientes VALUES (4,'Diana Lee','Japón');
        INSERT INTO clientes VALUES (5,'Eva López','Argentina');
        INSERT INTO clientes VALUES (6,'Frank Brown','UK');
        INSERT INTO clientes VALUES (7,'Gabi Martínez','España');
        INSERT INTO clientes VALUES (8,'Hugo Torres','México');
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'pais'],
        filas: [
          ['Ana García', 'España'],
          ['Carlos Ruiz', 'México'],
          ['Eva López', 'Argentina'],
          ['Gabi Martínez', 'España'],
          ['Hugo Torres', 'México'],
        ],
      },
      solucionOficial: "SELECT nombre, pais FROM clientes WHERE pais IN ('España', 'México', 'Argentina');",
      pistas: [
        "Usa IN para filtrar por múltiples valores",
        "Los países van entre comillas y separados por comas dentro de paréntesis",
        "WHERE pais IN ('España', 'México', 'Argentina')",
      ],
      explicacion: "IN ('España', 'México', 'Argentina') devuelve filas donde el país es cualquiera de esos tres valores. Es más limpio que escribir tres OR.",
    },
    {
      id: 'mn-03-04-e2',
      titulo: 'Productos en rango de precio',
      descripcion: 'Muestra nombre y precio de los productos con precio entre 20 y 100.',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, precio REAL);
        INSERT INTO productos VALUES (1,'Laptop Pro',1299.99);
        INSERT INTO productos VALUES (2,'Mouse Inalámbrico',29.99);
        INSERT INTO productos VALUES (3,'Teclado Mecánico',89.99);
        INSERT INTO productos VALUES (4,'Monitor 4K',499.99);
        INSERT INTO productos VALUES (5,'Alfombrilla',19.99);
        INSERT INTO productos VALUES (6,'Hub USB',39.99);
        INSERT INTO productos VALUES (7,'Auriculares',79.99);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'precio'],
        filas: [
          ['Mouse Inalámbrico', 29.99],
          ['Teclado Mecánico', 89.99],
          ['Hub USB', 39.99],
          ['Auriculares', 79.99],
        ],
      },
      solucionOficial: 'SELECT nombre, precio FROM productos WHERE precio BETWEEN 20 AND 100;',
      pistas: [
        'Usa BETWEEN para filtrar por rango',
        'El rango es de 20 a 100 (ambos inclusive)',
        'WHERE precio BETWEEN 20 AND 100',
      ],
      explicacion: 'BETWEEN 20 AND 100 incluye los valores 20 y 100 exactos, además de todo lo que esté entre ellos. La alfombrilla (19.99) queda fuera porque es menor que 20.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: "¿Cuál es la ventaja de usar IN ('Lunes', 'Martes', 'Miércoles') en lugar de OR?",
      opciones: [
        'IN es más rápido que OR en todos los casos',
        'IN solo funciona con números',
        'IN hace el código más corto y legible al evitar múltiples OR',
        'IN y OR no son equivalentes',
      ],
      correcta: 2,
      explicacion: 'IN hace el código más legible y conciso. En lugar de escribir tres condiciones con OR, usas una sola lista. Funcionalmente son equivalentes, pero IN es mucho más claro.',
    },
    {
      id: 'q2',
      pregunta: '¿BETWEEN 10 AND 20 incluye los valores 10 y 20?',
      opciones: [
        'No, BETWEEN es exclusivo en ambos extremos',
        'Solo incluye el valor mínimo (10)',
        'Solo incluye el valor máximo (20)',
        'Sí, BETWEEN es inclusivo: incluye ambos extremos',
      ],
      correcta: 3,
      explicacion: 'BETWEEN es INCLUSIVO. BETWEEN 10 AND 20 equivale a >= 10 AND <= 20, lo que incluye los valores exactos 10 y 20.',
    },
  ],
};
