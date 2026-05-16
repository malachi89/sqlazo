import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'no-01-02',
  titulo: 'SUM, AVG, MIN y MAX',
  descripcion: 'Aprende las funciones de agregación matemáticas: suma, promedio, mínimo y máximo.',
  duracionMinutos: 18,
  conceptosClave: ['SUM', 'AVG', 'MIN', 'MAX', 'Agregación'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Además de COUNT, SQL tiene otras funciones de agregación muy útiles: SUM para sumar, AVG para el promedio, MIN para el valor mínimo y MAX para el valor máximo. Todas operan sobre columnas numéricas.',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Funciones de agregación matemáticas',
      cabeceras: ['Función', 'Qué hace', 'Ejemplo', 'Resultado'],
      filas: [
        ['SUM(col)', 'Suma todos los valores', 'SUM(salario)', 'Total de salarios'],
        ['AVG(col)', 'Calcula el promedio', 'AVG(precio)', 'Precio promedio'],
        ['MIN(col)', 'Encuentra el valor mínimo', 'MIN(precio)', 'Producto más barato'],
        ['MAX(col)', 'Encuentra el valor máximo', 'MAX(salario)', 'Salario más alto'],
      ],
    },
    {
      tipo: 'ejemplo',
      titulo: 'Estadísticas de salarios',
      descripcion: 'En una sola consulta obtenemos suma, promedio, mínimo y máximo de salarios.',
      sql: 'SELECT SUM(salario) AS total_nomina, AVG(salario) AS salario_promedio, MIN(salario) AS salario_minimo, MAX(salario) AS salario_maximo FROM empleados;',
      tablaResultado: {
        columnas: ['total_nomina', 'salario_promedio', 'salario_minimo', 'salario_maximo'],
        filas: [[270000, 54000, 42000, 70000]],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'Todas ignoran NULL',
      texto: 'Importante: SUM, AVG, MIN y MAX ignoran los valores NULL automáticamente.\n\nSi tienes 5 empleados y 2 tienen salario NULL, AVG calcula el promedio de los 3 que sí tienen valor. No considera los NULLs como cero.\n\nEsto puede dar resultados sorprendentes si no lo sabes. Siempre ten en cuenta cuántos NULLs hay en la columna que estás agregando.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'SUM suma todos los valores de una columna numérica',
        'AVG calcula el promedio (ignorando NULLs)',
        'MIN devuelve el valor más pequeño',
        'MAX devuelve el valor más grande',
        'Todas las funciones de agregación ignoran los NULLs',
        'Puedes combinar varias en una sola consulta',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'no-01-02-e1',
      titulo: 'Estadísticas de precios',
      descripcion: 'Calcula el precio total (SUM), promedio (AVG), mínimo (MIN) y máximo (MAX) de los productos. Usa aliases descriptivos.',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, precio REAL);
        INSERT INTO productos VALUES (1,'Laptop Pro',1299.99);
        INSERT INTO productos VALUES (2,'Mouse',29.99);
        INSERT INTO productos VALUES (3,'Teclado',89.99);
        INSERT INTO productos VALUES (4,'Monitor',499.99);
        INSERT INTO productos VALUES (5,'Webcam',79.99);
      `,
      resultadoEsperado: {
        columnas: ['precio_total', 'precio_promedio', 'precio_minimo', 'precio_maximo'],
        filas: [[1999.95, 399.99, 29.99, 1299.99]],
      },
      solucionOficial: 'SELECT SUM(precio) AS precio_total, AVG(precio) AS precio_promedio, MIN(precio) AS precio_minimo, MAX(precio) AS precio_maximo FROM productos;',
      pistas: [
        'Usa SUM(precio), AVG(precio), MIN(precio), MAX(precio)',
        'Ponlas todas en una sola consulta SELECT separadas por comas',
        'Usa AS para nombrar cada columna del resultado',
      ],
      explicacion: 'Puedes usar varias funciones de agregación en una sola consulta SELECT. Cada una devuelve un único valor calculado sobre toda la tabla.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: 'Si tienes 5 empleados con salarios [1000, 2000, NULL, 3000, NULL], ¿qué devuelve AVG(salario)?',
      opciones: [
        '1200 (suma total dividida entre 5)',
        '2000 (promedio de los 3 valores no nulos)',
        '0 (porque hay NULLs)',
        'Error',
      ],
      correcta: 1,
      explicacion: 'AVG ignora los NULLs. Calcula (1000 + 2000 + 3000) / 3 = 2000. No divide entre 5 porque los NULLs no cuentan.',
    },
  ],
};
