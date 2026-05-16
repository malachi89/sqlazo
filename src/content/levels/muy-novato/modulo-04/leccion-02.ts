import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'mn-04-02',
  titulo: 'IS NULL y IS NOT NULL',
  descripcion: 'Aprende a filtrar registros que tienen valores nulos o que no los tienen.',
  duracionMinutos: 12,
  conceptosClave: ['IS NULL', 'IS NOT NULL', 'Filtrar nulos'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'En la lección anterior aprendiste que NULL no puede compararse con = o !=. Para filtrar valores NULL necesitas los operadores especiales IS NULL e IS NOT NULL.',
    },
    {
      tipo: 'explicacion',
      titulo: 'IS NULL y IS NOT NULL',
      texto: 'Para encontrar filas con NULL:\nWHERE columna IS NULL\n\nPara encontrar filas SIN NULL:\nWHERE columna IS NOT NULL\n\nEstos son los ÚNICOS operadores que funcionan correctamente con NULL.',
    },
    {
      tipo: 'error-comun',
      titulo: 'Comparar NULL con = (error muy común)',
      codigoMal: 'SELECT * FROM empleados WHERE telefono = NULL',
      problema: 'WHERE telefono = NULL NUNCA devuelve resultados, aunque haya filas con teléfono NULL. Esto es porque NULL = NULL es NULL (no TRUE).',
      codigoBien: 'SELECT * FROM empleados WHERE telefono IS NULL',
      solucion: 'Siempre usa IS NULL para buscar valores nulos, nunca = NULL.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Empleados sin teléfono registrado',
      descripcion: 'Buscamos empleados cuyo teléfono sea NULL (no lo han proporcionado).',
      sql: 'SELECT nombre, email, telefono FROM empleados WHERE telefono IS NULL;',
      tablaResultado: {
        columnas: ['nombre', 'email', 'telefono'],
        filas: [
          ['Ana Martínez', 'ana@empresa.com', null],
          ['Pedro Sánchez', 'pedro@empresa.com', null],
        ],
      },
    },
    {
      tipo: 'ejemplo',
      titulo: 'Empleados CON teléfono registrado',
      descripcion: 'Usamos IS NOT NULL para encontrar los que sí tienen teléfono.',
      sql: 'SELECT nombre, telefono FROM empleados WHERE telefono IS NOT NULL;',
      tablaResultado: {
        columnas: ['nombre', 'telefono'],
        filas: [
          ['María González', '555-1234'],
          ['Carlos López', '555-5678'],
          ['Laura Torres', '555-9012'],
        ],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        'IS NULL encuentra filas donde la columna no tiene valor',
        'IS NOT NULL encuentra filas donde la columna sí tiene valor',
        'Nunca uses = NULL o != NULL, no funcionan',
        'IS NULL / IS NOT NULL son los únicos operadores para comparar con NULL',
        'Puedes combinarlos con AND y OR como cualquier condición',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'mn-04-02-e1',
      titulo: 'Productos sin descripción',
      descripcion: 'Muestra el nombre de todos los productos que no tienen descripción (descripcion IS NULL).',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, precio REAL, descripcion TEXT);
        INSERT INTO productos VALUES (1,'Laptop Pro',1299.99,'Laptop de alta gama con procesador i9');
        INSERT INTO productos VALUES (2,'Mouse',29.99,NULL);
        INSERT INTO productos VALUES (3,'Teclado',89.99,'Teclado mecánico retroiluminado');
        INSERT INTO productos VALUES (4,'Monitor',499.99,NULL);
        INSERT INTO productos VALUES (5,'Webcam',79.99,NULL);
      `,
      resultadoEsperado: {
        columnas: ['nombre'],
        filas: [['Mouse'], ['Monitor'], ['Webcam']],
      },
      solucionOficial: 'SELECT nombre FROM productos WHERE descripcion IS NULL;',
      pistas: [
        'Usa IS NULL para encontrar valores nulos',
        'No uses = NULL, no funcionará',
        'SELECT nombre FROM productos WHERE descripcion IS NULL',
      ],
      explicacion: 'IS NULL encuentra todas las filas donde la columna descripcion no tiene ningún valor asignado. Con = NULL no encontraría nada.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Por qué WHERE email = NULL no devuelve resultados?',
      opciones: [
        'Porque en SQL no existe la palabra NULL',
        'Porque NULL no puede compararse con = ya que NULL = NULL es NULL, no TRUE',
        'Porque email nunca puede ser NULL',
        'Porque debes usar comillas: WHERE email = "NULL"',
      ],
      correcta: 1,
      explicacion: 'NULL no puede compararse con = porque NULL = NULL devuelve NULL (no TRUE ni FALSE). Para filtrar NULLs debes usar IS NULL que está diseñado específicamente para esto.',
    },
  ],
};
