import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'in-05-01',
  titulo: 'CREATE VIEW — Vistas',
  descripcion: 'Aprende a crear vistas: consultas guardadas que se comportan como tablas virtuales.',
  duracionMinutos: 20,
  conceptosClave: ['VIEW', 'Vista', 'Consulta guardada', 'Tabla virtual'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Una vista es una consulta SQL guardada con nombre que puedes usar como si fuera una tabla. Simplifica consultas complejas, mejora la seguridad y centraliza la lógica de negocio.',
    },
    {
      tipo: 'analogia',
      icono: '🪟',
      texto: 'Una vista es como una ventana a los datos. No almacena datos por sí misma, sino que muestra los datos de las tablas subyacentes a través de una consulta predefinida. Cada vez que consultas la vista, ejecuta la consulta internamente.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Crear y usar vistas',
      texto: 'Crear una vista:\nCREATE VIEW nombre_vista AS\n  SELECT ...\n\nUsar la vista:\nSELECT * FROM nombre_vista\nSELECT * FROM nombre_vista WHERE condicion\n\nEliminar la vista:\nDROP VIEW nombre_vista',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Vista de empleados activos con departamento',
      descripcion: 'Creamos una vista que simplifica el JOIN entre empleados y departamentos.',
      sql: "CREATE VIEW vista_empleados AS\n  SELECT e.nombre, e.salario, d.nombre AS departamento, d.ciudad\n  FROM empleados e\n  INNER JOIN departamentos d ON e.departamento_id = d.id\n  WHERE e.activo = 1;\n\nSELECT * FROM vista_empleados WHERE ciudad = 'Madrid';",
      tablaResultado: {
        columnas: ['nombre', 'salario', 'departamento', 'ciudad'],
        filas: [
          ['María', 45000, 'Ventas', 'Madrid'],
          ['Ana', 48000, 'RRHH', 'Madrid'],
        ],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        'Una vista es una consulta SQL guardada con nombre',
        'Se usa como una tabla normal en SELECT, WHERE, JOIN, etc.',
        'No almacena datos, los calcula en tiempo real al consultarla',
        'Simplifica consultas complejas y encapsula lógica de negocio',
        'DROP VIEW nombre elimina la vista',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'in-05-01-e1',
      titulo: 'Crear una vista de resumen',
      descripcion: 'Crea una vista "resumen_ventas" que muestre por cada empleado su nombre y total de ventas. Luego consulta la vista.',
      setupSql: `
        CREATE TABLE empleados (id INTEGER, nombre TEXT);
        INSERT INTO empleados VALUES (1,'María');
        INSERT INTO empleados VALUES (2,'Carlos');
        INSERT INTO empleados VALUES (3,'Ana');
        CREATE TABLE ventas (id INTEGER, empleado_id INTEGER, monto REAL);
        INSERT INTO ventas VALUES (1,1,5000);
        INSERT INTO ventas VALUES (2,1,3000);
        INSERT INTO ventas VALUES (3,2,8000);
        INSERT INTO ventas VALUES (4,3,2000);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'total_ventas'],
        filas: [
          ['Ana', 2000],
          ['Carlos', 8000],
          ['María', 8000],
        ],
      },
      solucionOficial: "CREATE VIEW resumen_ventas AS SELECT e.nombre, SUM(v.monto) AS total_ventas FROM empleados e INNER JOIN ventas v ON e.id = v.empleado_id GROUP BY e.id, e.nombre;\nSELECT * FROM resumen_ventas ORDER BY nombre;",
      pistas: [
        'CREATE VIEW resumen_ventas AS seguido de la consulta SELECT',
        'La consulta agrupa por empleado y suma los montos',
        'Después del CREATE VIEW, usa SELECT * FROM resumen_ventas',
      ],
      explicacion: 'CREATE VIEW define la consulta. Después, SELECT * FROM resumen_ventas ejecuta esa consulta y devuelve los resultados como si fuera una tabla.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Una vista almacena datos físicamente en la base de datos?',
      opciones: [
        'Sí, los datos se copian cuando creas la vista',
        'No, una vista es una consulta guardada que se ejecuta en tiempo real',
        'Sí, pero se actualiza automáticamente cada hora',
        'Depende del tipo de vista',
      ],
      correcta: 1,
      explicacion: 'Una vista regular no almacena datos. Cada vez que la consultas, ejecuta la consulta SQL subyacente y devuelve los resultados actuales de las tablas.',
    },
  ],
};
