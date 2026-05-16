import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'mn-04-03',
  titulo: 'Alias con AS — Renombrar columnas',
  descripcion: 'Aprende a dar nombres más descriptivos a las columnas en tus resultados usando AS.',
  duracionMinutos: 12,
  conceptosClave: ['AS', 'Alias', 'Renombrar columnas'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'A veces los nombres de columnas en la base de datos son técnicos o poco descriptivos. Con AS puedes renombrarlos en el resultado de tu consulta para que sean más claros o para que coincidan con lo que necesita tu aplicación.',
    },
    {
      tipo: 'explicacion',
      titulo: '¿Qué es un alias?',
      texto: 'Un alias es un nombre temporal que le das a una columna (o tabla) en el resultado de tu consulta. El nombre original en la base de datos no cambia — es solo como se muestra en ese resultado específico.\n\nSintaxis:\nSELECT columna AS nuevo_nombre FROM tabla\n\nO equivalente sin la palabra AS (también válido):\nSELECT columna nuevo_nombre FROM tabla',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Renombrar columnas',
      descripcion: 'Las columnas "nombre" y "apellido" las renombramos a "Nombre completo" en el resultado.',
      sql: "SELECT nombre AS 'Nombre', apellido AS 'Apellido', salario AS 'Salario mensual' FROM empleados;",
      tablaResultado: {
        columnas: ['Nombre', 'Apellido', 'Salario mensual'],
        filas: [
          ['María', 'González', 45000],
          ['Carlos', 'López', 65000],
        ],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'Alias con espacios',
      texto: 'Si quieres que el alias tenga espacios, debes ponerlo entre comillas simples o dobles:\n\nSELECT precio AS \'Precio de venta\'\nSELECT precio AS "Precio de venta"\n\nSin espacios puedes omitir las comillas:\nSELECT precio AS precioVenta',
    },
    {
      tipo: 'nota',
      texto: 'Los alias son muy útiles con funciones de agregación como COUNT, SUM, AVG, etc., que veremos en el nivel Novato. Por ejemplo: SELECT COUNT(*) AS total_empleados FROM empleados.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'AS renombra una columna en el resultado (no en la tabla)',
        'Sintaxis: SELECT columna AS nuevo_nombre',
        'AS es opcional: SELECT columna nuevo_nombre también funciona',
        'Para aliases con espacios usa comillas: AS \'Mi columna\'',
        'Los aliases son temporales: solo existen en esa consulta',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'mn-04-03-e1',
      titulo: 'Consulta con alias descriptivos',
      descripcion: 'Muestra nombre, precio y stock de productos, pero renombra precio como "Precio (USD)" y stock como "Unidades disponibles".',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, precio REAL, stock INTEGER);
        INSERT INTO productos VALUES (1,'Laptop Pro',1299.99,20);
        INSERT INTO productos VALUES (2,'Mouse',29.99,150);
        INSERT INTO productos VALUES (3,'Teclado',89.99,80);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'Precio (USD)', 'Unidades disponibles'],
        filas: [
          ['Laptop Pro', 1299.99, 20],
          ['Mouse', 29.99, 150],
          ['Teclado', 89.99, 80],
        ],
      },
      solucionOficial: "SELECT nombre, precio AS 'Precio (USD)', stock AS 'Unidades disponibles' FROM productos;",
      pistas: [
        "Usa AS seguido del alias entre comillas para aliases con espacios o paréntesis",
        "precio AS 'Precio (USD)'",
        "stock AS 'Unidades disponibles'",
      ],
      explicacion: "AS 'Precio (USD)' y AS 'Unidades disponibles' renombran las columnas en el resultado. Los paréntesis y espacios en el alias requieren comillas.",
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué hace AS en una consulta SQL?',
      opciones: [
        'Crea una copia permanente de la columna con el nuevo nombre',
        'Da un nombre temporal (alias) a la columna solo en ese resultado',
        'Renombra permanentemente la columna en la tabla',
        'Convierte el tipo de dato de la columna',
      ],
      correcta: 1,
      explicacion: 'AS crea un alias temporal. Solo existe en el resultado de esa consulta específica. La tabla original y sus columnas no se modifican.',
    },
  ],
};
