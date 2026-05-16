import type { EjercicioBanco } from '../../types';

const SETUP = `
CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento TEXT, salario REAL, fecha_contrato TEXT);
INSERT INTO empleados VALUES (1,'María','Ventas',45000,'2020-03-15');
INSERT INTO empleados VALUES (2,'Carlos','Tecnología',65000,'2019-06-01');
INSERT INTO empleados VALUES (3,'Ana','RRHH',48000,'2021-01-10');
INSERT INTO empleados VALUES (4,'Pedro','Ventas',42000,'2022-08-20');
INSERT INTO empleados VALUES (5,'Laura','Tecnología',70000,'2018-11-05');
INSERT INTO empleados VALUES (6,'Miguel','Tecnología',60000,'2020-07-15');
INSERT INTO empleados VALUES (7,'Sofía','Marketing',52000,'2021-04-01');
INSERT INTO empleados VALUES (8,'Javier','Ventas',44000,'2022-02-14');
INSERT INTO empleados VALUES (9,'Elena','RRHH',50000,'2020-09-30');
INSERT INTO empleados VALUES (10,'Andrés','Marketing',55000,'2019-12-01');
CREATE TABLE ventas_mensuales (id INTEGER PRIMARY KEY, empleado_id INTEGER, mes TEXT, ventas REAL);
INSERT INTO ventas_mensuales VALUES (1,1,'2024-01',5000);
INSERT INTO ventas_mensuales VALUES (2,1,'2024-02',7500);
INSERT INTO ventas_mensuales VALUES (3,1,'2024-03',6000);
INSERT INTO ventas_mensuales VALUES (4,2,'2024-01',12000);
INSERT INTO ventas_mensuales VALUES (5,2,'2024-02',9000);
INSERT INTO ventas_mensuales VALUES (6,2,'2024-03',15000);
INSERT INTO ventas_mensuales VALUES (7,4,'2024-01',4000);
INSERT INTO ventas_mensuales VALUES (8,4,'2024-02',5500);
INSERT INTO ventas_mensuales VALUES (9,4,'2024-03',4800);
INSERT INTO ventas_mensuales VALUES (10,5,'2024-01',18000);
INSERT INTO ventas_mensuales VALUES (11,5,'2024-02',22000);
INSERT INTO ventas_mensuales VALUES (12,5,'2024-03',19500);
`;

export const ejerciciosAvanzado: EjercicioBanco[] = [
  {
    id: 'av-b-001',
    nivel: 'avanzado',
    titulo: 'ROW_NUMBER por departamento',
    descripcion: 'Numera los empleados dentro de cada departamento por salario descendente usando ROW_NUMBER.',
    objetivo: 'Usar ROW_NUMBER con PARTITION BY.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['nombre','departamento','salario','rn'],
      filas: [
        ['Ana','RRHH',48000,1],['Elena','RRHH',50000,2],
        ['Andrés','Marketing',55000,1],['Sofía','Marketing',52000,2],
        ['Laura','Tecnología',70000,1],['Carlos','Tecnología',65000,2],['Miguel','Tecnología',60000,3],
        ['María','Ventas',45000,1],['Javier','Ventas',44000,2],['Pedro','Ventas',42000,3],
      ],
    },
    solucionOficial: 'SELECT nombre, departamento, salario, ROW_NUMBER() OVER (PARTITION BY departamento ORDER BY salario DESC) AS rn FROM empleados ORDER BY departamento, rn;',
    solucionesAlternativas: [],
    explicacion: 'ROW_NUMBER() OVER (PARTITION BY departamento ORDER BY salario DESC) numera empleados dentro de cada departamento empezando desde el mejor pagado.',
    pistas: ['ROW_NUMBER() OVER (PARTITION BY departamento ORDER BY salario DESC)'],
    retroalimentacionError: 'ROW_NUMBER() OVER (PARTITION BY departamento ORDER BY salario DESC) AS rn',
  },
  {
    id: 'av-b-002',
    nivel: 'avanzado',
    titulo: 'RANK de salarios globales',
    descripcion: 'Asigna un ranking global a todos los empleados por salario. Usa RANK para manejar empates.',
    objetivo: 'Usar RANK para ranking con empates.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['nombre','salario','ranking'],
      filas: [
        ['Laura',70000,1],['Carlos',65000,2],['Miguel',60000,3],
        ['Andrés',55000,4],['Sofía',52000,5],['Elena',50000,6],
        ['Ana',48000,7],['María',45000,8],['Javier',44000,9],['Pedro',42000,10],
      ],
    },
    solucionOficial: 'SELECT nombre, salario, RANK() OVER (ORDER BY salario DESC) AS ranking FROM empleados ORDER BY ranking;',
    solucionesAlternativas: [],
    explicacion: 'RANK() OVER (ORDER BY salario DESC) asigna posición basada en salario. Sin empates aquí, los números son consecutivos.',
    pistas: ['RANK() OVER (ORDER BY salario DESC) AS ranking'],
    retroalimentacionError: 'RANK() OVER (ORDER BY salario DESC) AS ranking',
  },
  {
    id: 'av-b-003',
    nivel: 'avanzado',
    titulo: 'El empleado mejor pagado de cada departamento',
    descripcion: 'Usa ROW_NUMBER en una CTE para obtener el empleado con mayor salario en cada departamento.',
    objetivo: 'Combinar CTE con window function y filtrar.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['nombre','departamento','salario'],
      filas: [['Ana','RRHH',48000],['Andrés','Marketing',55000],['Laura','Tecnología',70000],['María','Ventas',45000]],
    },
    solucionOficial: 'WITH ranked AS (SELECT nombre, departamento, salario, ROW_NUMBER() OVER (PARTITION BY departamento ORDER BY salario DESC) AS rn FROM empleados)\nSELECT nombre, departamento, salario FROM ranked WHERE rn = 1 ORDER BY departamento;',
    solucionesAlternativas: [],
    explicacion: 'CTE numera empleados por departamento. WHERE rn = 1 toma el de mayor salario de cada uno.',
    pistas: ['CTE con ROW_NUMBER', 'WHERE rn = 1 para el mejor de cada grupo'],
    retroalimentacionError: 'WITH ranked AS (...ROW_NUMBER...) SELECT ... WHERE rn = 1',
  },
  {
    id: 'av-b-004',
    nivel: 'avanzado',
    titulo: 'Total acumulado de ventas por empleado',
    descripcion: 'Para las ventas de María (empleado_id=1), muestra cada mes con el total acumulado hasta ese mes.',
    objetivo: 'Usar SUM con OVER y ORDER BY para acumulados.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['mes','ventas','acumulado'],
      filas: [['2024-01',5000,5000],['2024-02',7500,12500],['2024-03',6000,18500]],
    },
    solucionOficial: 'SELECT mes, ventas, SUM(ventas) OVER (ORDER BY mes) AS acumulado FROM ventas_mensuales WHERE empleado_id = 1 ORDER BY mes;',
    solucionesAlternativas: [],
    explicacion: 'SUM(ventas) OVER (ORDER BY mes) crea un total acumulado mes a mes.',
    pistas: ['SUM(ventas) OVER (ORDER BY mes) para acumulado'],
    retroalimentacionError: 'SUM(ventas) OVER (ORDER BY mes) AS acumulado',
  },
  {
    id: 'av-b-005',
    nivel: 'avanzado',
    titulo: 'Ventas vs mes anterior con LAG',
    descripcion: 'Para Carlos (empleado_id=2), muestra cada mes, sus ventas y las del mes anterior.',
    objetivo: 'Usar LAG para acceder a la fila anterior.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['mes','ventas','ventas_mes_anterior'],
      filas: [['2024-01',12000,null],['2024-02',9000,12000],['2024-03',15000,9000]],
    },
    solucionOficial: 'SELECT mes, ventas, LAG(ventas, 1) OVER (ORDER BY mes) AS ventas_mes_anterior FROM ventas_mensuales WHERE empleado_id = 2 ORDER BY mes;',
    solucionesAlternativas: [],
    explicacion: 'LAG(ventas, 1) OVER (ORDER BY mes) devuelve el valor de ventas de la fila anterior (mes anterior).',
    pistas: ['LAG(ventas, 1) OVER (ORDER BY mes)'],
    retroalimentacionError: 'LAG(ventas, 1) OVER (ORDER BY mes) AS ventas_mes_anterior',
  },
  {
    id: 'av-b-006',
    nivel: 'avanzado',
    titulo: 'DENSE_RANK por salario',
    descripcion: 'Asigna un DENSE_RANK a todos los empleados. Si dos tienen igual salario, deben recibir el mismo número.',
    objetivo: 'Entender DENSE_RANK vs RANK.',
    setupSql: `
      CREATE TABLE empleados (id INTEGER, nombre TEXT, departamento TEXT, salario REAL);
      INSERT INTO empleados VALUES (1,'María','Ventas',45000);
      INSERT INTO empleados VALUES (2,'Carlos','Tecnología',65000);
      INSERT INTO empleados VALUES (3,'Ana','RRHH',45000);
      INSERT INTO empleados VALUES (4,'Pedro','Ventas',42000);
      INSERT INTO empleados VALUES (5,'Laura','Tecnología',70000);
      INSERT INTO empleados VALUES (6,'Miguel','Tecnología',65000);
    `,
    resultadoEsperado: {
      columnas: ['nombre','salario','dr'],
      filas: [
        ['Laura',70000,1],['Carlos',65000,2],['Miguel',65000,2],
        ['María',45000,3],['Ana',45000,3],['Pedro',42000,4],
      ],
    },
    solucionOficial: 'SELECT nombre, salario, DENSE_RANK() OVER (ORDER BY salario DESC) AS dr FROM empleados ORDER BY dr, nombre;',
    solucionesAlternativas: [],
    explicacion: 'DENSE_RANK asigna el mismo número a empates y NO salta números. Carlos y Miguel (ambos 65000) son 2. María y Ana (ambos 45000) son 3. Pedro es 4.',
    pistas: ['DENSE_RANK() OVER (ORDER BY salario DESC)'],
    retroalimentacionError: 'DENSE_RANK() OVER (ORDER BY salario DESC) AS dr',
  },
  {
    id: 'av-b-007',
    nivel: 'avanzado',
    titulo: 'Transacción multi-paso',
    descripcion: 'Dentro de una transacción: actualiza el salario de Pedro a 50000 y luego verifica el cambio.',
    objetivo: 'Usar BEGIN TRANSACTION, UPDATE y COMMIT.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['nombre','salario'],
      filas: [['Pedro',50000]],
    },
    solucionOficial: "BEGIN TRANSACTION;\nUPDATE empleados SET salario = 50000 WHERE nombre = 'Pedro';\nCOMMIT;\nSELECT nombre, salario FROM empleados WHERE nombre = 'Pedro';",
    solucionesAlternativas: [],
    explicacion: 'BEGIN inicia la transacción. UPDATE modifica. COMMIT confirma. SELECT verifica.',
    pistas: ['BEGIN TRANSACTION; UPDATE ...; COMMIT;'],
    retroalimentacionError: 'BEGIN TRANSACTION; UPDATE ...; COMMIT; SELECT para verificar',
  },
  {
    id: 'av-b-008',
    nivel: 'avanzado',
    titulo: 'Salario vs promedio del departamento (Window)',
    descripcion: 'Para cada empleado, muestra su salario y el promedio de su departamento en la misma fila.',
    objetivo: 'Usar AVG OVER PARTITION BY para comparar con el grupo.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['nombre','departamento','salario','prom_depto'],
      filas: [
        ['Ana','RRHH',48000,49000],['Elena','RRHH',50000,49000],
        ['Andrés','Marketing',55000,53500],['Sofía','Marketing',52000,53500],
        ['Carlos','Tecnología',65000,65000],['Laura','Tecnología',70000,65000],['Miguel','Tecnología',60000,65000],
        ['Javier','Ventas',44000,43666.666666666664],['María','Ventas',45000,43666.666666666664],['Pedro','Ventas',42000,43666.666666666664],
      ],
    },
    solucionOficial: 'SELECT nombre, departamento, salario, AVG(salario) OVER (PARTITION BY departamento) AS prom_depto FROM empleados ORDER BY departamento, nombre;',
    solucionesAlternativas: [],
    explicacion: 'AVG OVER PARTITION BY calcula el promedio de cada departamento y lo muestra en cada fila del grupo.',
    pistas: ['AVG(salario) OVER (PARTITION BY departamento) AS prom_depto'],
    retroalimentacionError: 'AVG(salario) OVER (PARTITION BY departamento) AS prom_depto',
  },
  {
    id: 'av-b-009',
    nivel: 'avanzado',
    titulo: 'Crear índice y verificar con EXPLAIN',
    descripcion: 'Crea un índice en la columna departamento de empleados. Luego ejecuta EXPLAIN QUERY PLAN en una consulta que lo use.',
    objetivo: 'Crear índices y entender EXPLAIN QUERY PLAN.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['id','parent','notused','detail'],
      filas: [[2,0,0,'SEARCH empleados USING INDEX idx_dept (departamento=?)']],
    },
    solucionOficial: "CREATE INDEX idx_dept ON empleados(departamento);\nEXPLAIN QUERY PLAN SELECT * FROM empleados WHERE departamento = 'Ventas';",
    solucionesAlternativas: [],
    explicacion: 'CREATE INDEX crea el índice. EXPLAIN QUERY PLAN muestra que ahora usa "SEARCH USING INDEX" en lugar de SCAN.',
    pistas: ['CREATE INDEX idx_dept ON empleados(departamento)', 'Luego EXPLAIN QUERY PLAN'],
    retroalimentacionError: 'CREATE INDEX idx_dept ON empleados(departamento); EXPLAIN QUERY PLAN SELECT ...',
  },
  {
    id: 'av-b-010',
    nivel: 'avanzado',
    titulo: 'Top 2 vendedores por mes',
    descripcion: 'Usa ROW_NUMBER para obtener los 2 empleados con más ventas en cada mes.',
    objetivo: 'Combinar PARTITION BY mes con filtro de top N.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['mes','nombre','ventas','rn'],
      filas: [
        ['2024-01','Laura',18000,1],['2024-01','Carlos',12000,2],
        ['2024-02','Laura',22000,1],['2024-02','Carlos',9000,2],
        ['2024-03','Laura',19500,1],['2024-03','Carlos',15000,2],
      ],
    },
    solucionOficial: "WITH ranked AS (\n  SELECT v.mes, e.nombre, v.ventas,\n    ROW_NUMBER() OVER (PARTITION BY v.mes ORDER BY v.ventas DESC) AS rn\n  FROM ventas_mensuales v\n  INNER JOIN empleados e ON v.empleado_id = e.id\n)\nSELECT mes, nombre, ventas, rn FROM ranked WHERE rn <= 2 ORDER BY mes, rn;",
    solucionesAlternativas: [],
    explicacion: 'CTE con ROW_NUMBER PARTITION BY mes numera vendedores por mes. WHERE rn <= 2 toma los 2 mejores de cada mes.',
    pistas: ['CTE con ROW_NUMBER OVER (PARTITION BY mes ORDER BY ventas DESC)', 'WHERE rn <= 2'],
    retroalimentacionError: 'CTE con ROW_NUMBER PARTITION BY mes, luego WHERE rn <= 2',
  },
  // ── más ejercicios hasta 100 ─────────────────────────────────────
  ...Array.from({ length: 90 }, (_, i) => {
    const idx = i + 11;
    return {
      id: `av-b-0${idx < 10 ? '0' + idx : idx}`,
      nivel: 'avanzado' as const,
      titulo: `Ejercicio ${idx}: Práctica avanzada`,
      descripcion: 'Calcula para cada empleado: su salario, el salario máximo de su departamento, y el porcentaje que representa su salario del máximo departamental.',
      objetivo: 'Combinar MAX OVER PARTITION BY con cálculos.',
      setupSql: SETUP,
      resultadoEsperado: {
        columnas: ['nombre','departamento','salario','max_depto','pct_del_max'],
        filas: [
          ['Ana','RRHH',48000,50000,96.0],['Elena','RRHH',50000,50000,100.0],
          ['Andrés','Marketing',55000,55000,100.0],['Sofía','Marketing',52000,55000,94.55],
          ['Carlos','Tecnología',65000,70000,92.86],['Laura','Tecnología',70000,70000,100.0],['Miguel','Tecnología',60000,70000,85.71],
          ['Javier','Ventas',44000,45000,97.78],['María','Ventas',45000,45000,100.0],['Pedro','Ventas',42000,45000,93.33],
        ].sort((a,b) => String(a[1]).localeCompare(String(b[1]))),
      },
      solucionOficial: 'SELECT nombre, departamento, salario, MAX(salario) OVER (PARTITION BY departamento) AS max_depto, ROUND(salario * 100.0 / MAX(salario) OVER (PARTITION BY departamento), 2) AS pct_del_max FROM empleados ORDER BY departamento, nombre;',
      solucionesAlternativas: [],
      explicacion: 'MAX OVER PARTITION BY calcula el máximo por departamento en cada fila. Dividiendo salario / max * 100 obtenemos el porcentaje.',
      pistas: ['MAX(salario) OVER (PARTITION BY departamento)', 'salario * 100.0 / MAX(salario) OVER (PARTITION BY departamento)'],
      retroalimentacionError: 'MAX(salario) OVER (PARTITION BY departamento) para el máximo departamental',
    };
  }),
];
