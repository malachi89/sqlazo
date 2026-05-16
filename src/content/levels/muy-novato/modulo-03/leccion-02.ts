import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'mn-03-02',
  titulo: 'LIMIT — Limitar resultados',
  descripcion: 'Aprende a limitar cuántas filas devuelve tu consulta con LIMIT y a paginar con OFFSET.',
  duracionMinutos: 12,
  conceptosClave: ['LIMIT', 'OFFSET', 'Paginación'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Imagina que tienes una tabla con un millón de clientes. Si haces SELECT *, tu pantalla intentaría mostrar un millón de filas. LIMIT te permite controlar exactamente cuántas filas quieres ver.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de LIMIT',
      texto: 'LIMIT va al final de la consulta, después de ORDER BY:\n\nSELECT [columnas] FROM [tabla] ORDER BY [columna] LIMIT [número]\n\nDonde [número] es la cantidad máxima de filas que quieres ver.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Los 3 productos más caros',
      descripcion: 'Queremos ver solo los 3 productos con mayor precio.',
      sql: 'SELECT nombre, precio FROM productos ORDER BY precio DESC LIMIT 3;',
      tablaResultado: {
        columnas: ['nombre', 'precio'],
        filas: [
          ['Laptop Pro', 1299.99],
          ['Monitor 4K', 499.99],
          ['Tablet Pro', 399.99],
        ],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'OFFSET — Saltar filas',
      texto: 'OFFSET te permite saltar un número de filas antes de empezar a devolver resultados. Combinado con LIMIT, sirve para paginar resultados.\n\nSELECT * FROM tabla LIMIT 10 OFFSET 20\n\nEsto salta las primeras 20 filas y devuelve las siguientes 10 (filas 21 a 30).\n\nUso típico para paginación:\n• Página 1: LIMIT 10 OFFSET 0 (filas 1-10)\n• Página 2: LIMIT 10 OFFSET 10 (filas 11-20)\n• Página 3: LIMIT 10 OFFSET 20 (filas 21-30)',
    },
    {
      tipo: 'nota',
      texto: 'LIMIT sin ORDER BY no es predecible. La base de datos puede devolver cualquier 5 filas. Para resultados consistentes, SIEMPRE usa ORDER BY antes de LIMIT.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'LIMIT N limita el resultado a las primeras N filas',
        'OFFSET N salta las primeras N filas antes de empezar',
        'Combina ORDER BY + LIMIT para resultados predecibles',
        'LIMIT y OFFSET juntos sirven para paginar resultados',
        'LIMIT va al final de la consulta',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'mn-03-02-e1',
      titulo: 'Los 5 clientes registrados primero',
      descripcion: 'Muestra los primeros 5 clientes (los que tienen el id más bajo).',
      setupSql: `
        CREATE TABLE clientes (id INTEGER, nombre TEXT, pais TEXT);
        INSERT INTO clientes VALUES (1,'Ana García','España');
        INSERT INTO clientes VALUES (2,'Bob Smith','USA');
        INSERT INTO clientes VALUES (3,'Carlos Ruiz','México');
        INSERT INTO clientes VALUES (4,'Diana Lee','Japón');
        INSERT INTO clientes VALUES (5,'Eva Müller','Alemania');
        INSERT INTO clientes VALUES (6,'Frank Brown','UK');
        INSERT INTO clientes VALUES (7,'Grace Kim','Corea');
      `,
      resultadoEsperado: {
        columnas: ['id', 'nombre', 'pais'],
        filas: [
          [1, 'Ana García', 'España'],
          [2, 'Bob Smith', 'USA'],
          [3, 'Carlos Ruiz', 'México'],
          [4, 'Diana Lee', 'Japón'],
          [5, 'Eva Müller', 'Alemania'],
        ],
      },
      solucionOficial: 'SELECT * FROM clientes ORDER BY id ASC LIMIT 5;',
      pistas: [
        'Ordena por id ascendente para obtener los primeros',
        'Usa LIMIT 5 para quedarte con solo 5 filas',
        'SELECT * FROM clientes ORDER BY id ASC LIMIT 5',
      ],
      explicacion: 'ORDER BY id ASC ordena de menor a mayor. LIMIT 5 devuelve solo las primeras 5 filas. Juntos dan los 5 primeros clientes registrados.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué hace LIMIT 10 OFFSET 30?',
      opciones: [
        'Devuelve las 10 primeras filas y salta las 30 últimas',
        'Salta las primeras 30 filas y devuelve las siguientes 10 (filas 31-40)',
        'Devuelve 30 filas a partir de la fila 10',
        'Limita el resultado a un máximo de 40 filas',
      ],
      correcta: 1,
      explicacion: 'OFFSET 30 salta las primeras 30 filas. Luego LIMIT 10 devuelve las siguientes 10. Esto es ideal para la paginación: si estás en la página 4 con 10 resultados por página, usarías LIMIT 10 OFFSET 30.',
    },
  ],
};
