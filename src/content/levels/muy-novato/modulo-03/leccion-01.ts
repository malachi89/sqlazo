import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'mn-03-01',
  titulo: 'ORDER BY — Ordenar resultados',
  descripcion: 'Aprende a ordenar los resultados de tus consultas de mayor a menor, menor a mayor, o alfabéticamente.',
  duracionMinutos: 15,
  conceptosClave: ['ORDER BY', 'ASC', 'DESC', 'Ordenamiento'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Por defecto, SQL no garantiza el orden de los resultados. Para ordenarlos necesitas ORDER BY. Puedes ordenar de menor a mayor (ASC), de mayor a menor (DESC), o alfabéticamente.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de ORDER BY',
      texto: 'ORDER BY se coloca al final de la consulta:\n\nSELECT [columnas] FROM [tabla] WHERE [condición] ORDER BY [columna] [ASC|DESC]\n\nDonde:\n• ASC = Ascendente (de menor a mayor, A a Z) — es el predeterminado\n• DESC = Descendente (de mayor a menor, Z a A)',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Productos ordenados por precio (de menor a mayor)',
      descripcion: 'Ordenamos los productos por precio ascendente (el más barato primero).',
      sql: 'SELECT nombre, precio FROM productos ORDER BY precio ASC;',
      tablaResultado: {
        columnas: ['nombre', 'precio'],
        filas: [
          ['Alfombrilla Gaming', 19.99],
          ['Mouse Inalámbrico', 29.99],
          ['Hub USB', 39.99],
          ['Teclado Mecánico', 89.99],
          ['Monitor 4K', 499.99],
          ['Laptop Pro', 1299.99],
        ],
      },
    },
    {
      tipo: 'ejemplo',
      titulo: 'Empleados ordenados por salario (de mayor a menor)',
      descripcion: 'Ordenamos los empleados por salario descendente (el mejor pagado primero).',
      sql: 'SELECT nombre, salario FROM empleados ORDER BY salario DESC;',
      tablaResultado: {
        columnas: ['nombre', 'salario'],
        filas: [
          ['Laura', 70000],
          ['Carlos', 65000],
          ['Ana', 48000],
          ['María', 45000],
          ['Pedro', 42000],
        ],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'Ordenar por múltiples columnas',
      texto: 'Puedes ordenar por más de una columna. Si hay empates en la primera, se usa la segunda:\n\nORDER BY departamento ASC, salario DESC\n\nEsto ordena primero por departamento (A a Z), y si dos empleados están en el mismo departamento, pone primero al de mayor salario.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Orden múltiple: departamento y salario',
      descripcion: 'Primero por departamento (A-Z), luego por salario (mayor a menor) dentro de cada departamento.',
      sql: 'SELECT nombre, departamento, salario FROM empleados ORDER BY departamento ASC, salario DESC;',
      tablaResultado: {
        columnas: ['nombre', 'departamento', 'salario'],
        filas: [
          ['Ana', 'RRHH', 48000],
          ['Laura', 'Tecnología', 70000],
          ['Carlos', 'Tecnología', 65000],
          ['María', 'Ventas', 45000],
          ['Pedro', 'Ventas', 42000],
        ],
      },
    },
    {
      tipo: 'nota',
      texto: 'Si no escribes ASC ni DESC, SQL usa ASC por defecto. Sin embargo, es buena práctica especificarlo siempre para que el código sea más legible.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'ORDER BY ordena los resultados de una consulta',
        'ASC = Ascendente (menor a mayor, A-Z) — predeterminado',
        'DESC = Descendente (mayor a menor, Z-A)',
        'Puedes ordenar por múltiples columnas separándolas con comas',
        'ORDER BY va siempre al final de la consulta',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'mn-03-01-e1',
      titulo: 'Clientes en orden alfabético',
      descripcion: 'Muestra nombre y ciudad de todos los clientes, ordenados por nombre de la A a la Z.',
      setupSql: `
        CREATE TABLE clientes (id INTEGER, nombre TEXT, ciudad TEXT, pais TEXT);
        INSERT INTO clientes VALUES (1,'Zoe Williams','Londres','UK');
        INSERT INTO clientes VALUES (2,'Ana García','Madrid','España');
        INSERT INTO clientes VALUES (3,'Carlos Ruiz','México','México');
        INSERT INTO clientes VALUES (4,'Beatriz Lima','Lisboa','Portugal');
        INSERT INTO clientes VALUES (5,'Marco Rossi','Roma','Italia');
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'ciudad'],
        filas: [
          ['Ana García', 'Madrid'],
          ['Beatriz Lima', 'Lisboa'],
          ['Carlos Ruiz', 'México'],
          ['Marco Rossi', 'Roma'],
          ['Zoe Williams', 'Londres'],
        ],
      },
      solucionOficial: 'SELECT nombre, ciudad FROM clientes ORDER BY nombre ASC;',
      pistas: [
        'Usa ORDER BY al final de la consulta',
        'Ordena por la columna "nombre"',
        'ASC es ascendente (A-Z)',
        'SELECT nombre, ciudad FROM clientes ORDER BY nombre ASC',
      ],
      explicacion: 'ORDER BY nombre ASC ordena los resultados alfabéticamente por nombre. ASC (ascendente) es el orden predeterminado de la A a la Z.',
    },
    {
      id: 'mn-03-01-e2',
      titulo: 'Top 3 empleados mejor pagados',
      descripcion: 'Muestra nombre y salario de los 3 empleados con mayor salario. Usa ORDER BY con DESC.',
      setupSql: `
        CREATE TABLE empleados (id INTEGER, nombre TEXT, departamento TEXT, salario REAL);
        INSERT INTO empleados VALUES (1,'María','Ventas',45000);
        INSERT INTO empleados VALUES (2,'Carlos','Tecnología',65000);
        INSERT INTO empleados VALUES (3,'Ana','RRHH',48000);
        INSERT INTO empleados VALUES (4,'Pedro','Ventas',42000);
        INSERT INTO empleados VALUES (5,'Laura','Tecnología',70000);
        INSERT INTO empleados VALUES (6,'Miguel','Tecnología',60000);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'salario'],
        filas: [
          ['Laura', 70000],
          ['Carlos', 65000],
          ['Miguel', 60000],
        ],
      },
      solucionOficial: 'SELECT nombre, salario FROM empleados ORDER BY salario DESC LIMIT 3;',
      pistas: [
        'Ordena por salario de mayor a menor: ORDER BY salario DESC',
        'Para quedarte con los 3 primeros usa LIMIT 3',
        'SELECT nombre, salario FROM empleados ORDER BY salario DESC LIMIT 3',
      ],
      explicacion: 'ORDER BY salario DESC ordena de mayor a menor. LIMIT 3 limita el resultado a las 3 primeras filas. Juntos dan los 3 empleados mejor pagados.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuál de estas consultas ordena los productos de más caro a más barato?',
      opciones: [
        'SELECT * FROM productos ORDER BY precio ASC',
        'SELECT * FROM productos ORDER BY precio DESC',
        'SELECT * FROM productos SORT BY precio DESC',
        'SELECT * FROM productos ORDER precio DESC',
      ],
      correcta: 1,
      explicacion: 'ORDER BY precio DESC ordena de mayor a menor (más caro primero). ASC ordenaría de menor a mayor (más barato primero). SORT BY no existe en SQL estándar.',
    },
    {
      id: 'q2',
      pregunta: '¿Dónde se coloca ORDER BY en una consulta SELECT?',
      opciones: [
        'Antes de SELECT',
        'Entre SELECT y FROM',
        'Después de WHERE',
        'Al principio de la consulta',
      ],
      correcta: 2,
      explicacion: 'ORDER BY va siempre al final de la consulta, después de FROM y WHERE: SELECT ... FROM tabla WHERE condición ORDER BY columna.',
    },
  ],
};
