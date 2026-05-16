import type { Leccion } from '../../../../types';
import { SETUP_EMPLEADOS_BASICO, SETUP_PRODUCTOS } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'mn-02-02',
  titulo: 'SELECT columnas específicas',
  descripcion: 'Aprende a elegir exactamente qué columnas quieres ver en tus consultas SQL.',
  duracionMinutos: 15,
  conceptosClave: ['SELECT', 'Columnas', 'Proyección'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'En la lección anterior usamos SELECT * para ver todas las columnas. Pero la mayoría de las veces solo necesitas ver algunas columnas específicas. Esto hace tus consultas más eficientes y los resultados más fáciles de leer.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Seleccionar columnas específicas',
      texto: 'En vez de usar *, puedes escribir los nombres de las columnas que quieres, separados por comas:\n\nSELECT columna1, columna2, columna3 FROM tabla\n\nEjemplo:\nSELECT nombre, salario FROM empleados\n\nEsto devuelve solo las columnas "nombre" y "salario" de la tabla empleados, ignorando el resto.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Solo nombre y precio',
      descripcion: 'En vez de ver todos los datos, solo nos interesa el nombre y precio de cada producto.',
      sql: 'SELECT nombre, precio FROM productos;',
  setupSql: SETUP_PRODUCTOS,
      tablaResultado: {
        columnas: ['nombre', 'precio'],
        filas: [
          ['Laptop Pro 15"', 1299.99],
          ['Mouse Inalámbrico', 29.99],
          ['Teclado Mecánico', 89.99],
          ['Monitor 27" 4K', 499.99],
        ],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'El orden de las columnas importa',
      texto: 'Puedes seleccionar las columnas en cualquier orden que quieras. No tienen que estar en el mismo orden que en la tabla.\n\nPor ejemplo:\nSELECT precio, nombre FROM productos\n\nDevuelve primero "precio" y luego "nombre", aunque en la tabla estén al revés.\n\nTambién puedes repetir una columna:\nSELECT nombre, precio, precio FROM productos\n\n(aunque esto rara vez tiene sentido práctico)',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Columnas en orden diferente',
      descripcion: 'Seleccionamos las columnas en un orden diferente al que están en la tabla.',
      sql: 'SELECT departamento, nombre, salario FROM empleados;',
  setupSql: SETUP_EMPLEADOS_BASICO,
      tablaResultado: {
        columnas: ['departamento', 'nombre', 'salario'],
        filas: [
          ['Ventas', 'María', 45000],
          ['Tecnología', 'Carlos', 65000],
          ['RRHH', 'Ana', 48000],
        ],
      },
    },
    {
      tipo: 'explicacion',
      titulo: '¿Por qué no usar siempre SELECT *?',
      texto: 'Aunque SELECT * es cómodo para explorar, hay buenas razones para especificar columnas:\n\n1. Rendimiento: Si una tabla tiene 50 columnas y solo necesitas 3, ¿para qué traer 47 innecesarias?\n\n2. Claridad: Quien lea tu código entiende exactamente qué datos necesitas\n\n3. Evitar sorpresas: Si alguien agrega columnas a la tabla, tu consulta no cambia de comportamiento\n\n4. Redes y memoria: Traer menos datos = menos consumo de red y memoria',
    },
    {
      tipo: 'error-comun',
      titulo: 'Error en el nombre de columna',
      codigoMal: 'SELECT nombre, Precio FROM productos',
      problema: 'Si el nombre de la columna en la tabla es "precio" (minúsculas) y escribes "Precio" (con mayúscula), puede dar error en algunos sistemas de bases de datos.',
      codigoBien: 'SELECT nombre, precio FROM productos',
      solucion: 'Escribe los nombres de columnas exactamente como están definidos en la tabla.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'Puedes especificar columnas por nombre: SELECT col1, col2 FROM tabla',
        'Separa los nombres de columnas con comas',
        'Puedes elegir el orden que quieras para las columnas',
        'Especificar columnas es más eficiente que usar SELECT *',
        'Los nombres de columnas deben escribirse exactamente como están en la tabla',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'mn-02-02-e1',
      titulo: 'Solo nombre y email de clientes',
      descripcion: 'De la tabla "clientes", muestra únicamente las columnas "nombre" y "email".',
      setupSql: `
        CREATE TABLE clientes (id INTEGER, nombre TEXT, ciudad TEXT, pais TEXT, email TEXT);
        INSERT INTO clientes VALUES (1,'Ana García','Madrid','España','ana@email.com');
        INSERT INTO clientes VALUES (2,'Bob Smith','Nueva York','USA','bob@email.com');
        INSERT INTO clientes VALUES (3,'Carlos Ruiz','México DF','México','carlos@email.com');
        INSERT INTO clientes VALUES (4,'Diana Lee','Tokio','Japón','diana@email.com');
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'email'],
        filas: [
          ['Ana García', 'ana@email.com'],
          ['Bob Smith', 'bob@email.com'],
          ['Carlos Ruiz', 'carlos@email.com'],
          ['Diana Lee', 'diana@email.com'],
        ],
      },
      solucionOficial: 'SELECT nombre, email FROM clientes;',
      pistas: [
        'Escribe SELECT seguido de los nombres de columnas separados por coma',
        'Las columnas que necesitas son: nombre, email',
        'Completa: SELECT nombre, email FROM clientes',
      ],
      explicacion: 'SELECT nombre, email FROM clientes selecciona solo esas dos columnas de la tabla clientes. El resto de columnas (id, ciudad, pais) no aparecen en el resultado.',
    },
    {
      id: 'mn-02-02-e2',
      titulo: 'Nombre, categoría y precio',
      descripcion: 'De la tabla "productos", muestra las columnas "nombre", "categoria" y "precio".',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, categoria TEXT, precio REAL, stock INTEGER);
        INSERT INTO productos VALUES (1,'Laptop Pro','Electrónica',1299.99,50);
        INSERT INTO productos VALUES (2,'Mouse Inalámbrico','Periféricos',29.99,200);
        INSERT INTO productos VALUES (3,'Teclado Mecánico','Periféricos',89.99,150);
        INSERT INTO productos VALUES (4,'Monitor 4K','Electrónica',499.99,30);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'categoria', 'precio'],
        filas: [
          ['Laptop Pro', 'Electrónica', 1299.99],
          ['Mouse Inalámbrico', 'Periféricos', 29.99],
          ['Teclado Mecánico', 'Periféricos', 89.99],
          ['Monitor 4K', 'Electrónica', 499.99],
        ],
      },
      solucionOficial: 'SELECT nombre, categoria, precio FROM productos;',
      pistas: [
        'Necesitas 3 columnas: nombre, categoria, precio',
        'Sepáralas con comas',
        'SELECT nombre, categoria, precio FROM productos',
      ],
      explicacion: 'Seleccionamos tres columnas específicas ignorando "id" y "stock". El resultado es más legible y enfocado en la información que necesitamos.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cómo seleccionas solo las columnas "nombre" y "apellido" de la tabla "empleados"?',
      opciones: [
        'SELECT empleados(nombre, apellido)',
        'SELECT nombre, apellido FROM empleados',
        'SELECT [nombre][apellido] FROM empleados',
        'FROM empleados SELECT nombre apellido',
      ],
      correcta: 1,
      explicacion: 'La sintaxis correcta es: SELECT nombre, apellido FROM empleados. Los nombres de columnas se separan con comas.',
    },
    {
      id: 'q2',
      pregunta: '¿En qué orden aparecerán las columnas si escribes SELECT ciudad, nombre FROM clientes?',
      opciones: [
        'En el orden en que están definidas en la tabla (nombre primero)',
        'En el orden que escribiste en SELECT (ciudad primero)',
        'En orden alfabético',
        'Depende del sistema de base de datos',
      ],
      correcta: 1,
      explicacion: 'Las columnas aparecen en el resultado exactamente en el orden en que las escribiste en SELECT. Si escribes SELECT ciudad, nombre, el resultado tendrá ciudad como primera columna y nombre como segunda.',
    },
  ],
};
