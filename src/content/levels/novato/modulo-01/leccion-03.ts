import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'no-01-03',
  titulo: 'GROUP BY — Agrupar datos',
  descripcion: 'Aprende a agrupar filas y calcular agregaciones por cada grupo con GROUP BY.',
  duracionMinutos: 25,
  conceptosClave: ['GROUP BY', 'Agrupación', 'Agregar por grupo'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'GROUP BY es una de las herramientas más poderosas del nivel Novato. Permite agrupar las filas de una tabla por el valor de una columna y calcular agregaciones (COUNT, SUM, AVG, etc.) para cada grupo por separado.',
    },
    {
      tipo: 'analogia',
      icono: '📦',
      texto: 'Imagina que tienes una caja de monedas mezcladas. GROUP BY es como separar las monedas por valor (todas las de 1€ juntas, todas las de 50 cents juntas, etc.). Luego puedes contar cuántas hay de cada tipo o sumar el total de cada tipo.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de GROUP BY',
      texto: 'GROUP BY va después de WHERE y antes de ORDER BY:\n\nSELECT columna, FUNCION(otra_columna)\nFROM tabla\nWHERE condición\nGROUP BY columna\nORDER BY columna\n\nRegla importante: En SELECT, solo puedes incluir:\n1. Las columnas que están en GROUP BY\n2. Funciones de agregación (COUNT, SUM, AVG, MIN, MAX)',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Contar empleados por departamento',
      descripcion: 'Agrupamos empleados por departamento y contamos cuántos hay en cada uno.',
      sql: 'SELECT departamento, COUNT(*) AS cantidad FROM empleados GROUP BY departamento ORDER BY cantidad DESC;',
      tablaResultado: {
        columnas: ['departamento', 'cantidad'],
        filas: [
          ['Tecnología', 3],
          ['Ventas', 2],
          ['RRHH', 1],
        ],
      },
    },
    {
      tipo: 'ejemplo',
      titulo: 'Salario promedio por departamento',
      descripcion: 'Calculamos el salario promedio de cada departamento.',
      sql: 'SELECT departamento, AVG(salario) AS salario_promedio, MAX(salario) AS salario_max FROM empleados GROUP BY departamento;',
      tablaResultado: {
        columnas: ['departamento', 'salario_promedio', 'salario_max'],
        filas: [
          ['RRHH', 48000, 48000],
          ['Tecnología', 65000, 70000],
          ['Ventas', 43500, 45000],
        ],
      },
    },
    {
      tipo: 'error-comun',
      titulo: 'Columna no en GROUP BY ni en agregación',
      codigoMal: 'SELECT departamento, nombre, COUNT(*) FROM empleados GROUP BY departamento',
      problema: '"nombre" no está en GROUP BY ni es una función de agregación. SQL no sabe qué valor de "nombre" mostrar para el grupo de "Ventas" (hay varios empleados).',
      codigoBien: 'SELECT departamento, COUNT(*) AS cantidad FROM empleados GROUP BY departamento',
      solucion: 'En SELECT, con GROUP BY, solo puedes poner columnas que estén en GROUP BY o funciones de agregación.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'GROUP BY agrupa filas por los valores de una o más columnas',
        'Combina con COUNT, SUM, AVG, MIN, MAX para calcular por grupo',
        'En SELECT solo puedes incluir columnas de GROUP BY o funciones de agregación',
        'Puedes agrupar por múltiples columnas: GROUP BY col1, col2',
        'ORDER BY puede ordenar los grupos resultantes',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'no-01-03-e1',
      titulo: 'Ventas por categoría',
      descripcion: 'Muestra la cantidad de productos y el precio promedio para cada categoría.',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, categoria TEXT, precio REAL);
        INSERT INTO productos VALUES (1,'Laptop Pro','Electrónica',1299.99);
        INSERT INTO productos VALUES (2,'Mouse','Periféricos',29.99);
        INSERT INTO productos VALUES (3,'Teclado','Periféricos',89.99);
        INSERT INTO productos VALUES (4,'Monitor','Electrónica',499.99);
        INSERT INTO productos VALUES (5,'Webcam','Periféricos',79.99);
        INSERT INTO productos VALUES (6,'Tablet','Electrónica',399.99);
      `,
      resultadoEsperado: {
        columnas: ['categoria', 'cantidad', 'precio_promedio'],
        filas: [
          ['Electrónica', 3, 733.3233333333334],
          ['Periféricos', 3, 66.65666666666667],
        ],
      },
      solucionOficial: 'SELECT categoria, COUNT(*) AS cantidad, AVG(precio) AS precio_promedio FROM productos GROUP BY categoria;',
      pistas: [
        'Agrupa por la columna categoria',
        'Usa COUNT(*) para cantidad y AVG(precio) para precio_promedio',
        'SELECT categoria, COUNT(*) AS cantidad, AVG(precio) AS precio_promedio FROM productos GROUP BY categoria',
      ],
      explicacion: 'GROUP BY categoria crea un grupo para cada valor distinto de categoria. COUNT(*) y AVG(precio) se calculan para cada grupo por separado.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: 'En una consulta con GROUP BY departamento, ¿puedes incluir la columna "nombre" en SELECT sin agregarla?',
      opciones: [
        'Sí, siempre puedes incluir cualquier columna',
        'No, solo puedes incluir columnas que estén en GROUP BY o funciones de agregación',
        'Sí, pero solo si es la clave primaria',
        'Depende del sistema de base de datos',
      ],
      correcta: 1,
      explicacion: 'Con GROUP BY, en el SELECT solo puedes poner columnas que estén en la cláusula GROUP BY o funciones de agregación. Incluir "nombre" sin agregarla causaría un error porque SQL no sabe qué valor de nombre mostrar para cada grupo.',
    },
  ],
};
