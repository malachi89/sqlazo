import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'no-02-04',
  titulo: 'Self JOIN — Unir una tabla consigo misma',
  descripcion: 'Aprende a comparar filas dentro de la misma tabla usando Self JOIN.',
  duracionMinutos: 20,
  conceptosClave: ['Self JOIN', 'Alias de tabla', 'Comparación interna'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'A veces necesitas comparar filas dentro de la misma tabla. Por ejemplo: "¿qué empleados ganan más que su jefe?" o "¿qué empleados comparten el mismo departamento?". Para esto usamos Self JOIN: unimos una tabla consigo misma.',
    },
    {
      tipo: 'analogia',
      icono: '🪞',
      texto: 'Imagina un espejo frente a una fila de personas. Cada persona se compara con las demás. En SQL, creamos dos "copias" de la tabla usando aliases diferentes (como a y b) y las comparamos entre sí.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de Self JOIN',
      texto: 'La clave es usar dos aliases diferentes para la misma tabla:\n\nSELECT a.nombre, b.nombre\nFROM empleados a\nINNER JOIN empleados b ON a.departamento_id = b.departamento_id\nWHERE a.id != b.id\n\nDonde:\n• a y b son dos "vistas" de la misma tabla\n• ON conecta las filas relacionadas\n• WHERE a.id != b.id evita que una fila se compare consigo misma',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Empleados que ganan más que sus compañeros del mismo departamento',
      descripcion: 'Comparamos salarios dentro del mismo departamento.',
      sql: `SELECT a.nombre AS empleado, a.salario, b.nombre AS companero, b.salario AS salario_companero
FROM empleados a
INNER JOIN empleados b ON a.departamento = b.departamento
WHERE a.salario > b.salario
ORDER BY a.salario DESC;`,
      setupSql: `
        CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento TEXT, salario REAL);
        INSERT INTO empleados VALUES (1,'María','Ventas',45000);
        INSERT INTO empleados VALUES (2,'Carlos','Tecnología',65000);
        INSERT INTO empleados VALUES (3,'Ana','Ventas',48000);
        INSERT INTO empleados VALUES (4,'Pedro','RRHH',42000);
        INSERT INTO empleados VALUES (5,'Laura','Tecnología',70000);
        INSERT INTO empleados VALUES (6,'Miguel','Ventas',50000);
      `,
      tablaResultado: {
        columnas: ['empleado','salario','companero','salario_companero'],
        filas: [
          ['Laura',70000,'Carlos',65000],
          ['Miguel',50000,'Ana',48000],
          ['Miguel',50000,'María',45000],
          ['Ana',48000,'María',45000],
        ],
      },
    },
    {
      tipo: 'ejemplo',
      titulo: 'Empleados del mismo departamento',
      descripcion: 'Encuentra todos los pares de empleados que trabajan en el mismo departamento.',
      sql: `SELECT a.nombre AS emp1, b.nombre AS emp2, a.departamento
FROM empleados a
INNER JOIN empleados b ON a.departamento = b.departamento
WHERE a.id < b.id
ORDER BY a.departamento;`,
      setupSql: `
        CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento TEXT);
        INSERT INTO empleados VALUES (1,'María','Ventas');
        INSERT INTO empleados VALUES (2,'Carlos','Tecnología');
        INSERT INTO empleados VALUES (3,'Ana','Ventas');
        INSERT INTO empleados VALUES (4,'Pedro','RRHH');
        INSERT INTO empleados VALUES (5,'Laura','Tecnología');
        INSERT INTO empleados VALUES (6,'Miguel','Ventas');
      `,
      tablaResultado: {
        columnas: ['emp1','emp2','departamento'],
        filas: [
          ['Carlos','Laura','Tecnología'],
          ['María','Ana','Ventas'],
          ['María','Miguel','Ventas'],
          ['Ana','Miguel','Ventas'],
        ],
      },
    },
    {
      tipo: 'error-comun',
      titulo: 'Olvidar excluir la comparación consigo misma',
      codigoMal: 'SELECT a.nombre, b.nombre FROM empleados a JOIN empleados b ON a.departamento = b.departamento',
      problema: 'Sin WHERE a.id != b.id (o a.id < b.id), cada empleado aparece comparado consigo mismo, y además cada par aparece dos veces (A-B y B-A).',
      codigoBien: 'SELECT a.nombre, b.nombre FROM empleados a JOIN empleados b ON a.departamento = b.departamento WHERE a.id < b.id',
      solucion: 'Usa a.id < b.id para evitar duplicados y auto-comparaciones.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'Self JOIN une una tabla consigo misma usando dos aliases',
        'Es útil para comparar filas dentro de la misma tabla',
        'Usa WHERE a.id != b.id para evitar auto-comparaciones',
        'Usa WHERE a.id < b.id para evitar pares duplicados',
        'Común en jerarquías (empleado-jefe) y comparaciones internas',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'no-02-04-e1',
      titulo: 'Empleados que ganan más que otro del mismo departamento',
      descripcion: 'Muestra pares de empleados del mismo departamento donde el primero gana más que el segundo.',
      objetivo: 'Self JOIN con comparación de salarios.',
      setupSql: `
        CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento TEXT, salario REAL);
        INSERT INTO empleados VALUES (1,'Ana','Ventas',40000);
        INSERT INTO empleados VALUES (2,'Bob','Ventas',55000);
        INSERT INTO empleados VALUES (3,'Carlos','Tecnología',70000);
        INSERT INTO empleados VALUES (4,'Diana','Tecnología',60000);
        INSERT INTO empleados VALUES (5,'Eva','RRHH',45000);
        INSERT INTO empleados VALUES (6,'Frank','Ventas',50000);
      `,
      resultadoEsperado: {
        columnas: ['empleado_gana_mas','salario','empleado_gana_menos','salario_menor'],
        filas: [
          ['Bob',55000,'Frank',50000],
          ['Bob',55000,'Ana',40000],
          ['Frank',50000,'Ana',40000],
          ['Carlos',70000,'Diana',60000],
        ],
      },
      solucionOficial: `SELECT a.nombre AS empleado_gana_mas, a.salario, b.nombre AS empleado_gana_menos, b.salario AS salario_menor
FROM empleados a
INNER JOIN empleados b ON a.departamento = b.departamento
WHERE a.salario > b.salario
ORDER BY a.salario DESC;`,
      pistas: [
        'Usa dos aliases para la tabla empleados (a y b)',
        'Conecta por departamento: a.departamento = b.departamento',
        'Filtra donde a.salario > b.salario',
      ],
      explicacion: 'Self JOIN compara cada empleado con los demás del mismo departamento. WHERE a.salario > b.salario mantiene solo los pares donde el primero gana más.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Por qué usamos dos aliases diferentes en un Self JOIN?',
      opciones: [
        'Para que la consulta sea más corta',
        'Porque SQL necesita distinguir entre las dos "copias" de la misma tabla',
        'Para poder usar columnas diferentes',
        'Es opcional, se puede hacer sin aliases',
      ],
      correcta: 1,
      explicacion: 'Sin aliases, SQL no puede distinguir a qué "copia" de la tabla te refieres. Los aliases (a y b) crean dos referencias independientes a la misma tabla.',
    },
    {
      id: 'q2',
      pregunta: '¿Qué diferencia hay entre WHERE a.id != b.id y WHERE a.id < b.id?',
      opciones: [
        'No hay diferencia',
        '!= excluye auto-comparaciones; < además evita pares duplicados (A-B y B-A)',
        '< es más rápido que !=',
        '!= funciona solo con números',
      ],
      correcta: 1,
      explicacion: 'a.id != b.id solo evita que una fila se compare consigo misma. a.id < b.id además asegura que cada par aparezca una sola vez (solo A-B, no B-A).',
    },
  ],
};
