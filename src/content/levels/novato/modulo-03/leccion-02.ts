import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'no-03-02',
  titulo: 'WHERE + GROUP BY — Filtrar antes de agrupar',
  descripcion: 'Aprende a combinar WHERE con GROUP BY para filtrar filas antes de la agregación.',
  duracionMinutos: 20,
  conceptosClave: ['WHERE', 'GROUP BY', 'Filtrado previo', 'Agregación condicional'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Ya conoces WHERE y GROUP BY por separado. Pero la verdadera potencia está en combinarlos: primero filtras las filas que te interesan con WHERE, y luego agrupas con GROUP BY. Esto es fundamental en consultas del mundo real.',
    },
    {
      tipo: 'analogia',
      icono: '🎯',
      texto: 'Imagina que quieres saber el promedio de notas de los alumnos aprobados. Primero separas a los aprobados (WHERE nota >= 6), y luego calculas el promedio por materia (GROUP BY materia). No tiene sentido incluir a los reprobados en el cálculo.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Orden de ejecución',
      texto: 'SQL ejecuta las cláusulas en este orden:\n\n1. FROM — selecciona la tabla\n2. WHERE — filtra filas individuales\n3. GROUP BY — agrupa las filas filtradas\n4. HAVING — filtra los grupos\n5. SELECT — selecciona las columnas\n6. ORDER BY — ordena el resultado\n\nWHERE siempre se ejecuta ANTES de GROUP BY. Esto significa que solo las filas que pasan el WHERE se incluyen en los grupos.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Ventas por vendedor solo en 2024',
      descripcion: 'Calculamos el total de ventas por vendedor, pero solo para ventas del año 2024.',
      sql: `SELECT vendedor, SUM(monto) AS total_ventas
FROM ventas
WHERE fecha >= '2024-01-01'
GROUP BY vendedor
ORDER BY total_ventas DESC;`,
      setupSql: `
        CREATE TABLE ventas (id INTEGER PRIMARY KEY, vendedor TEXT, monto REAL, fecha TEXT);
        INSERT INTO ventas VALUES (1,'Ana',1500,'2023-12-15');
        INSERT INTO ventas VALUES (2,'Ana',2300,'2024-01-10');
        INSERT INTO ventas VALUES (3,'Carlos',1800,'2024-02-05');
        INSERT INTO ventas VALUES (4,'Ana',900,'2024-03-20');
        INSERT INTO ventas VALUES (5,'Carlos',2100,'2024-01-25');
        INSERT INTO ventas VALUES (6,'Eva',1200,'2023-11-30');
        INSERT INTO ventas VALUES (7,'Eva',3200,'2024-02-15');
      `,
      tablaResultado: {
        columnas: ['vendedor','total_ventas'],
        filas: [
          ['Carlos',3900],
          ['Ana',3200],
          ['Eva',3200],
        ],
      },
    },
    {
      tipo: 'ejemplo',
      titulo: 'Productos con stock por categoría',
      descripcion: 'Contamos cuántos productos tienen stock (mayor a 0) en cada categoría.',
      sql: `SELECT categoria, COUNT(*) AS productos_con_stock
FROM productos
WHERE stock > 0
GROUP BY categoria;`,
      setupSql: `
        CREATE TABLE productos (id INTEGER PRIMARY KEY, nombre TEXT, categoria TEXT, stock INTEGER);
        INSERT INTO productos VALUES (1,'Laptop','Electrónica',50);
        INSERT INTO productos VALUES (2,'Mouse','Periféricos',0);
        INSERT INTO productos VALUES (3,'Monitor','Electrónica',30);
        INSERT INTO productos VALUES (4,'Teclado','Periféricos',100);
        INSERT INTO productos VALUES (5,'Webcam','Periféricos',0);
        INSERT INTO productos VALUES (6,'Tablet','Electrónica',25);
      `,
      tablaResultado: {
        columnas: ['categoria','productos_con_stock'],
        filas: [
          ['Electrónica',3],
          ['Periféricos',1],
        ],
      },
    },
    {
      tipo: 'tabla-visual',
      titulo: 'WHERE vs HAVING con GROUP BY',
      cabeceras: ['Cláusula', 'Se ejecuta', 'Filtra', 'Ejemplo'],
      filas: [
        ['WHERE', 'Antes de GROUP BY', 'Filas individuales', 'WHERE stock > 0'],
        ['HAVING', 'Después de GROUP BY', 'Grupos completos', 'HAVING COUNT(*) > 2'],
        ['Ambas', 'WHERE primero, HAVING después', 'Filas + Grupos', 'WHERE stock > 0 GROUP BY cat HAVING COUNT(*) > 1'],
      ],
    },
    {
      tipo: 'resumen',
      puntos: [
        'WHERE filtra filas ANTES de que GROUP BY las agrupe',
        'HAVING filtra grupos DESPUÉS de que GROUP BY los crea',
        'Puedes usar WHERE y HAVING en la misma consulta',
        'El orden: WHERE → GROUP BY → HAVING → ORDER BY',
        'WHERE no puede usar funciones de agregación; HAVING sí',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'no-03-02-e1',
      titulo: 'Empleados activos por departamento',
      descripcion: 'Cuenta cuántos empleados activos (activo = 1) hay en cada departamento, mostrando solo departamentos con más de 1 empleado activo.',
      objetivo: 'Combinar WHERE + GROUP BY + HAVING.',
      setupSql: `
        CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento TEXT, activo INTEGER);
        INSERT INTO empleados VALUES (1,'María','Ventas',1);
        INSERT INTO empleados VALUES (2,'Carlos','Tecnología',1);
        INSERT INTO empleados VALUES (3,'Ana','Ventas',1);
        INSERT INTO empleados VALUES (4,'Pedro','RRHH',0);
        INSERT INTO empleados VALUES (5,'Laura','Tecnología',1);
        INSERT INTO empleados VALUES (6,'Miguel','Ventas',0);
        INSERT INTO empleados VALUES (7,'Sofía','Tecnología',1);
        INSERT INTO empleados VALUES (8,'Javier','RRHH',1);
      `,
      resultadoEsperado: {
        columnas: ['departamento','empleados_activos'],
        filas: [
          ['Tecnología',3],
          ['Ventas',2],
        ],
      },
      solucionOficial: `SELECT departamento, COUNT(*) AS empleados_activos
FROM empleados
WHERE activo = 1
GROUP BY departamento
HAVING COUNT(*) > 1
ORDER BY empleados_activos DESC;`,
      pistas: [
        'WHERE activo = 1 filtra solo empleados activos',
        'GROUP BY departamento agrupa por departamento',
        'HAVING COUNT(*) > 1 muestra solo departamentos con más de 1 activo',
      ],
      explicacion: 'WHERE activo = 1 elimina a Pedro y Miguel. GROUP BY crea grupos de Ventas (2 activos) y Tecnología (3 activos). HAVING COUNT(*) > 1 excluye RRHH (solo 1 activo).',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: 'En una consulta con WHERE, GROUP BY y HAVING, ¿en qué orden se ejecutan?',
      opciones: [
        'GROUP BY → WHERE → HAVING',
        'WHERE → GROUP BY → HAVING',
        'HAVING → WHERE → GROUP BY',
        'WHERE → HAVING → GROUP BY',
      ],
      correcta: 1,
      explicacion: 'El orden de ejecución es: WHERE (filtra filas) → GROUP BY (agrupa) → HAVING (filtra grupos). Este orden es fundamental para entender cómo funciona SQL.',
    },
    {
      id: 'q2',
      pregunta: '¿Puedes usar una función de agregación en WHERE?',
      opciones: [
        'Sí, siempre',
        'No, porque WHERE se ejecuta antes de que existan los grupos',
        'Solo COUNT(*)',
        'Solo si usas HAVING también',
      ],
      correcta: 1,
      explicacion: 'WHERE se ejecuta ANTES de GROUP BY, cuando aún no existen los grupos ni las agregaciones. Por eso no puedes usar COUNT, SUM, AVG, etc. en WHERE. Para eso necesitas HAVING.',
    },
  ],
};
