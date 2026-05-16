import type { Leccion } from '../../../../types';
import { SETUP_EMPLEADOS_BASICO } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'no-01-01',
  titulo: 'COUNT — Contar registros',
  descripcion: 'Aprende a contar filas y valores con la función de agregación COUNT.',
  duracionMinutos: 15,
  conceptosClave: ['COUNT', 'Función de agregación', 'Contar'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Las funciones de agregación calculan un único resultado a partir de múltiples filas. COUNT es la más usada: te dice cuántas filas hay en un resultado.',
    },
    {
      tipo: 'explicacion',
      titulo: 'COUNT(*) vs COUNT(columna)',
      texto: 'Hay dos formas principales de usar COUNT:\n\n1. COUNT(*): Cuenta TODAS las filas, incluyendo las que tienen NULL\n2. COUNT(columna): Cuenta solo las filas donde esa columna NO es NULL\n\nEjemplo:\nSELECT COUNT(*) FROM empleados\nDevuelve: el total de empleados\n\nSELECT COUNT(telefono) FROM empleados\nDevuelve: cuántos empleados tienen teléfono registrado (excluye NULLs)',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Contar todos los empleados',
      descripcion: 'COUNT(*) cuenta todas las filas sin importar NULLs.',
      sql: 'SELECT COUNT(*) AS total_empleados FROM empleados;',
  setupSql: SETUP_EMPLEADOS_BASICO,
      tablaResultado: {
        columnas: ['total_empleados'],
        filas: [[5]],
      },
    },
    {
      tipo: 'ejemplo',
      titulo: 'Contar empleados por departamento',
      descripcion: 'Con GROUP BY podemos contar empleados en cada departamento (lo veremos en detalle más adelante).',
      sql: 'SELECT departamento, COUNT(*) AS cantidad FROM empleados GROUP BY departamento;',
  setupSql: SETUP_EMPLEADOS_BASICO,
      tablaResultado: {
        columnas: ['departamento', 'cantidad'],
        filas: [
          ['RRHH', 1],
          ['Tecnología', 2],
          ['Ventas', 2],
        ],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        'COUNT(*) cuenta todas las filas incluyendo NULLs',
        'COUNT(columna) cuenta solo filas donde esa columna no es NULL',
        'COUNT devuelve un único número como resultado',
        'Se puede usar con WHERE para contar filas que cumplen una condición',
        'Es buena práctica usar AS para darle nombre al resultado',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'no-01-01-e1',
      titulo: 'Cuenta los productos',
      descripcion: 'Cuenta cuántos productos hay en total en la tabla productos. Llama al resultado "total".',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, categoria TEXT, precio REAL);
        INSERT INTO productos VALUES (1,'Laptop Pro','Electrónica',1299.99);
        INSERT INTO productos VALUES (2,'Mouse','Periféricos',29.99);
        INSERT INTO productos VALUES (3,'Teclado','Periféricos',89.99);
        INSERT INTO productos VALUES (4,'Monitor','Electrónica',499.99);
        INSERT INTO productos VALUES (5,'Webcam','Periféricos',79.99);
      `,
      resultadoEsperado: {
        columnas: ['total'],
        filas: [[5]],
      },
      solucionOficial: 'SELECT COUNT(*) AS total FROM productos;',
      pistas: [
        'Usa COUNT(*) para contar todas las filas',
        'Usa AS total para nombrar el resultado',
        'SELECT COUNT(*) AS total FROM productos',
      ],
      explicacion: 'COUNT(*) cuenta todas las filas de la tabla sin importar si hay valores NULL. El alias "total" hace el resultado más legible.',
    },
    {
      id: 'no-01-01-e2',
      titulo: 'Cuenta clientes de España',
      descripcion: 'Cuenta cuántos clientes son de España. El resultado debe llamarse "clientes_espana".',
      setupSql: `
        CREATE TABLE clientes (id INTEGER, nombre TEXT, pais TEXT);
        INSERT INTO clientes VALUES (1,'Ana García','España');
        INSERT INTO clientes VALUES (2,'Bob Smith','USA');
        INSERT INTO clientes VALUES (3,'Carlos','México');
        INSERT INTO clientes VALUES (4,'Diana','España');
        INSERT INTO clientes VALUES (5,'Eva','España');
        INSERT INTO clientes VALUES (6,'Frank','UK');
      `,
      resultadoEsperado: {
        columnas: ['clientes_espana'],
        filas: [[3]],
      },
      solucionOficial: "SELECT COUNT(*) AS clientes_espana FROM clientes WHERE pais = 'España';",
      pistas: [
        "Combina COUNT(*) con WHERE para contar con condición",
        "Filtra por pais = 'España'",
        "SELECT COUNT(*) AS clientes_espana FROM clientes WHERE pais = 'España'",
      ],
      explicacion: "COUNT(*) con WHERE filtra primero las filas que cumplen la condición (pais = 'España') y luego las cuenta. Devuelve 3 porque hay 3 clientes de España.",
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuál es la diferencia entre COUNT(*) y COUNT(columna)?',
      opciones: [
        'No hay diferencia, ambos dan el mismo resultado',
        'COUNT(*) cuenta todas las filas; COUNT(columna) cuenta solo las filas donde esa columna no es NULL',
        'COUNT(*) es más lento',
        'COUNT(columna) cuenta todas las filas incluyendo NULLs',
      ],
      correcta: 1,
      explicacion: 'COUNT(*) cuenta todas las filas independientemente de si hay NULLs. COUNT(columna) ignora los NULLs en esa columna y solo cuenta los valores no nulos.',
    },
  ],
};
