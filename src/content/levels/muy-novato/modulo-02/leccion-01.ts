import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'mn-02-01',
  titulo: 'SELECT * — Seleccionar todo',
  descripcion: 'Aprende a usar tu primera consulta SQL real: SELECT * FROM tabla para ver todos los datos de una tabla.',
  duracionMinutos: 15,
  conceptosClave: ['SELECT', 'FROM', 'Consulta', 'Asterisco'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: '¡Es hora de escribir tu primera consulta SQL real! El comando SELECT es el más usado en SQL. Te permite leer y recuperar datos de una tabla. Empezaremos con la forma más básica: ver TODOS los datos de una tabla.',
    },
    {
      tipo: 'explicacion',
      titulo: 'La anatomía de un SELECT básico',
      texto: 'Un SELECT básico tiene solo dos partes:\n\nSELECT [columnas] FROM [tabla]\n\nDonde:\n• SELECT = "dame/muéstrame"\n• [columnas] = qué columnas quieres ver (usa * para todas)\n• FROM = "de la tabla"\n• [tabla] = el nombre de la tabla\n\nEjemplo:\nSELECT * FROM productos\n\nEsto se lee como: "Muéstrame todas las columnas de la tabla productos"',
    },
    {
      tipo: 'analogia',
      icono: '🔍',
      texto: 'Imagina SELECT como una búsqueda en Google. "SELECT *" sería como buscar sin filtros: te muestra absolutamente todo. Más adelante aprenderás a filtrar los resultados, igual que añades palabras a una búsqueda de Google para ser más específico.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Ver todos los productos',
      descripcion: 'Esta consulta muestra todos los datos de la tabla productos. Haz clic en "Ejecutar" para verla en acción.',
      sql: 'SELECT * FROM productos;',
      tablaResultado: {
        columnas: ['id', 'nombre', 'precio', 'stock'],
        filas: [
          [1, 'Laptop Pro', 1299.99, 50],
          [2, 'Mouse Inalámbrico', 29.99, 200],
          [3, 'Teclado Mecánico', 89.99, 150],
        ],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'El asterisco (*)',
      texto: 'El símbolo * (asterisco) es un comodín que significa "todas las columnas". Cuando escribes SELECT *, estás pidiendo que se muestren TODAS las columnas de la tabla, en el orden en que fueron definidas.\n\nEsto es útil cuando:\n• Quieres explorar una tabla desconocida\n• Necesitas todos los datos de la tabla\n\nSin embargo, en código de producción es mejor especificar las columnas que necesitas (lo aprenderemos en la siguiente lección), ya que:\n• Es más eficiente\n• Hace el código más claro\n• Evita traer datos innecesarios',
    },
    {
      tipo: 'explicacion',
      titulo: 'El punto y coma (;)',
      texto: 'Notarás que al final de las consultas SQL se pone un punto y coma (;). Este símbolo indica el final de una instrucción SQL.\n\nEn la mayoría de los sistemas de bases de datos, el punto y coma es obligatorio cuando tienes múltiples consultas. En este curso es opcional para consultas individuales, pero es buena práctica incluirlo siempre.',
    },
    {
      tipo: 'error-comun',
      titulo: 'Olvidar el nombre de la tabla',
      codigoMal: 'SELECT *',
      problema: 'Sin la cláusula FROM y el nombre de la tabla, SQL no sabe de dónde obtener los datos. Dará un error.',
      codigoBien: 'SELECT * FROM empleados',
      solucion: 'Siempre incluye FROM seguido del nombre exacto de la tabla.',
    },
    {
      tipo: 'error-comun',
      titulo: 'Nombre de tabla incorrecto',
      codigoMal: 'SELECT * FROM Empleados',
      problema: 'En la mayoría de bases de datos, los nombres de tablas son sensibles a mayúsculas/minúsculas. Si la tabla se llama "empleados", escribir "Empleados" puede dar error.',
      codigoBien: 'SELECT * FROM empleados',
      solucion: 'Escribe el nombre de la tabla exactamente como fue creada. Por convención, se usa todo en minúsculas.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'SELECT * FROM tabla muestra TODAS las columnas de una tabla',
        'SELECT = qué quieres ver, FROM = de dónde',
        'El asterisco * significa "todas las columnas"',
        'El punto y coma ; marca el fin de una instrucción SQL',
        'El nombre de la tabla debe escribirse exactamente como está definido',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'mn-02-01-e1',
      titulo: 'Muestra todos los clientes',
      descripcion: 'Hay una tabla llamada "clientes". Escribe una consulta para ver TODOS sus datos.',
      setupSql: `
        CREATE TABLE clientes (id INTEGER PRIMARY KEY, nombre TEXT, ciudad TEXT, pais TEXT, email TEXT);
        INSERT INTO clientes VALUES (1,'Ana García','Madrid','España','ana@email.com');
        INSERT INTO clientes VALUES (2,'Bob Smith','Nueva York','USA','bob@email.com');
        INSERT INTO clientes VALUES (3,'Carlos Ruiz','México DF','México','carlos@email.com');
        INSERT INTO clientes VALUES (4,'Diana Lee','Tokio','Japón','diana@email.com');
      `,
      resultadoEsperado: {
        columnas: ['id', 'nombre', 'ciudad', 'pais', 'email'],
        filas: [
          [1, 'Ana García', 'Madrid', 'España', 'ana@email.com'],
          [2, 'Bob Smith', 'Nueva York', 'USA', 'bob@email.com'],
          [3, 'Carlos Ruiz', 'México DF', 'México', 'carlos@email.com'],
          [4, 'Diana Lee', 'Tokio', 'Japón', 'diana@email.com'],
        ],
      },
      solucionOficial: 'SELECT * FROM clientes;',
      pistas: [
        'Usa SELECT * para seleccionar todas las columnas',
        'Usa FROM clientes para indicar la tabla',
        'Combínalo: SELECT * FROM clientes',
      ],
      explicacion: 'SELECT * FROM clientes devuelve todas las filas y todas las columnas de la tabla clientes. El asterisco (*) significa "todas las columnas".',
    },
    {
      id: 'mn-02-01-e2',
      titulo: 'Muestra todos los productos',
      descripcion: 'Existe la tabla "productos". Escribe la consulta para ver todos sus registros.',
      setupSql: `
        CREATE TABLE productos (id INTEGER PRIMARY KEY, nombre TEXT, categoria TEXT, precio REAL, stock INTEGER);
        INSERT INTO productos VALUES (1,'Laptop Pro 15"','Electrónica',1299.99,50);
        INSERT INTO productos VALUES (2,'Mouse Inalámbrico','Periféricos',29.99,200);
        INSERT INTO productos VALUES (3,'Teclado Mecánico','Periféricos',89.99,150);
        INSERT INTO productos VALUES (4,'Monitor 27" 4K','Electrónica',499.99,30);
      `,
      resultadoEsperado: {
        columnas: ['id', 'nombre', 'categoria', 'precio', 'stock'],
        filas: [
          [1, 'Laptop Pro 15"', 'Electrónica', 1299.99, 50],
          [2, 'Mouse Inalámbrico', 'Periféricos', 29.99, 200],
          [3, 'Teclado Mecánico', 'Periféricos', 89.99, 150],
          [4, 'Monitor 27" 4K', 'Electrónica', 499.99, 30],
        ],
      },
      solucionOficial: 'SELECT * FROM productos;',
      pistas: [
        'Recuerda el patrón: SELECT * FROM nombre_tabla',
        'La tabla se llama "productos"',
      ],
      explicacion: 'SELECT * FROM productos muestra todas las columnas y filas de la tabla productos.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué hace la siguiente consulta: SELECT * FROM empleados?',
      opciones: [
        'Muestra solo la columna "id" de empleados',
        'Cuenta cuántos empleados hay',
        'Muestra todas las columnas y todas las filas de la tabla empleados',
        'Crea una nueva tabla llamada empleados',
      ],
      correcta: 2,
      explicacion: 'SELECT * FROM empleados selecciona TODAS las columnas (*) de la tabla empleados y devuelve TODAS las filas. Es la consulta más básica para ver todos los datos de una tabla.',
    },
    {
      id: 'q2',
      pregunta: '¿Qué representa el símbolo * en SELECT *?',
      opciones: [
        'Multiplicación',
        'Todas las columnas',
        'Todos los tipos de datos',
        'La clave primaria',
      ],
      correcta: 1,
      explicacion: 'En SQL, el asterisco (*) después de SELECT significa "todas las columnas". Es un atajo para no tener que escribir el nombre de cada columna individualmente.',
    },
    {
      id: 'q3',
      pregunta: '¿Cuál de estas consultas está correctamente escrita?',
      opciones: [
        'FROM productos SELECT *',
        'SELECT productos',
        'SELECT * FROM productos',
        'GET * FROM productos',
      ],
      correcta: 2,
      explicacion: 'La sintaxis correcta es: SELECT [columnas] FROM [tabla]. Siempre SELECT primero, luego FROM. No existe el comando GET en SQL estándar.',
    },
  ],
};
