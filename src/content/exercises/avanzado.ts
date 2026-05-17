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
CREATE TABLE proyectos (id INTEGER PRIMARY KEY, nombre TEXT, presupuesto REAL, inicio TEXT, fin TEXT, estado TEXT);
INSERT INTO proyectos VALUES (1,'Sistema CRM',150000,'2024-01-01','2024-06-30','activo');
INSERT INTO proyectos VALUES (2,'App Móvil',80000,'2024-02-01','2024-05-31','activo');
INSERT INTO proyectos VALUES (3,'Portal Web',60000,'2024-03-01','2024-07-31','planificado');
INSERT INTO proyectos VALUES (4,'Data Warehouse',200000,'2023-07-01','2024-03-31','completado');
CREATE TABLE asignaciones (id INTEGER PRIMARY KEY, empleado_id INTEGER, proyecto_id INTEGER, rol TEXT, horas INTEGER);
INSERT INTO asignaciones VALUES (1,2,1,'Líder Técnico',120);
INSERT INTO asignaciones VALUES (2,5,1,'Desarrollador',80);
INSERT INTO asignaciones VALUES (3,6,1,'Desarrollador',80);
INSERT INTO asignaciones VALUES (4,2,2,'Arquitecto',60);
INSERT INTO asignaciones VALUES (5,6,2,'Desarrollador',100);
INSERT INTO asignaciones VALUES (6,7,3,'Analista',90);
INSERT INTO asignaciones VALUES (7,2,3,'Desarrollador',40);
INSERT INTO asignaciones VALUES (8,5,4,'Líder',150);
INSERT INTO asignaciones VALUES (9,2,4,'Arquitecto',100);
INSERT INTO asignaciones VALUES (10,6,4,'Desarrollador',120);
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
  // ── Ejercicios 11-040: Window Functions, subconsultas y análisis ─
  {
    id: 'av-b-011',
    nivel: 'avanzado',
    titulo: 'ROW_NUMBER global sin partición',
    descripcion: 'Numera todos los empleados del 1 al 10 por salario descendente, sin partición.',
    objetivo: 'Usar ROW_NUMBER sin PARTITION BY para una numeración global.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['rn','nombre','salario'],
      filas: [[1,'Laura',70000],[2,'Carlos',65000],[3,'Miguel',60000],[4,'Andrés',55000],[5,'Sofía',52000],[6,'Elena',50000],[7,'Ana',48000],[8,'María',45000],[9,'Javier',44000],[10,'Pedro',42000]],
    },
    solucionOficial: 'SELECT ROW_NUMBER() OVER (ORDER BY salario DESC) AS rn, nombre, salario FROM empleados ORDER BY rn;',
    solucionesAlternativas: [],
    explicacion: 'Sin PARTITION BY, ROW_NUMBER numera todas las filas como si fueran un único grupo. El resultado es un ranking global del 1 al 10.',
    pistas: ['ROW_NUMBER() OVER (ORDER BY salario DESC) AS rn', 'Sin PARTITION BY, la ventana es toda la tabla', 'ORDER BY rn al final para mostrar ordenado'],
    retroalimentacionError: 'ROW_NUMBER() OVER (ORDER BY salario DESC) — sin PARTITION BY para numeración global',
  },
  {
    id: 'av-b-012',
    nivel: 'avanzado',
    titulo: 'RANK vs DENSE_RANK en ventas mensuales',
    descripcion: 'Para el mes 2024-01, rankea los empleados por ventas usando RANK y DENSE_RANK. Muestra la diferencia cuando hay empates.',
    objetivo: 'Entender la diferencia práctica entre RANK (salta números) y DENSE_RANK (no salta).',
    setupSql: `
CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento TEXT, salario REAL);
INSERT INTO empleados VALUES (1,'María','Ventas',45000);
INSERT INTO empleados VALUES (2,'Carlos','Tecnología',65000);
INSERT INTO empleados VALUES (4,'Pedro','Ventas',42000);
INSERT INTO empleados VALUES (5,'Laura','Tecnología',70000);
CREATE TABLE ventas_mes (empleado_id INTEGER, mes TEXT, ventas REAL);
INSERT INTO ventas_mes VALUES (1,'2024-01',8000);
INSERT INTO ventas_mes VALUES (2,'2024-01',12000);
INSERT INTO ventas_mes VALUES (4,'2024-01',8000);
INSERT INTO ventas_mes VALUES (5,'2024-01',18000);
`,
    resultadoEsperado: {
      columnas: ['nombre','ventas','rank_r','dense_r'],
      filas: [['Laura',18000,1,1],['Carlos',12000,2,2],['María',8000,3,3],['Pedro',8000,3,3]],
    },
    solucionOficial: "SELECT e.nombre, v.ventas, RANK() OVER (ORDER BY v.ventas DESC) AS rank_r, DENSE_RANK() OVER (ORDER BY v.ventas DESC) AS dense_r FROM ventas_mes v INNER JOIN empleados e ON v.empleado_id = e.id WHERE v.mes = '2024-01' ORDER BY rank_r;",
    solucionesAlternativas: [],
    explicacion: 'María y Pedro tienen el mismo valor (8000), por lo que comparten la posición 3. En este caso RANK y DENSE_RANK coinciden porque no hay una posición 4 distinta — pero si hubiera un 5.º empleado, RANK daría 5 y DENSE_RANK daría 4.',
    pistas: ['RANK() OVER (ORDER BY v.ventas DESC) AS rank_r', 'DENSE_RANK() OVER (ORDER BY v.ventas DESC) AS dense_r', "WHERE v.mes = '2024-01' para filtrar el mes"],
    retroalimentacionError: 'RANK salta posiciones en empate; DENSE_RANK no — ambos con OVER (ORDER BY ventas DESC)',
  },
  {
    id: 'av-b-013',
    nivel: 'avanzado',
    titulo: 'LAG: crecimiento mes a mes',
    descripcion: 'Para Laura (empleado_id=5), muestra cada mes, sus ventas, las del mes anterior y el crecimiento porcentual respecto al mes anterior.',
    objetivo: 'Usar LAG para comparar con la fila anterior y calcular variación porcentual.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['mes','ventas','mes_anterior','crecimiento_pct'],
      filas: [['2024-01',18000,null,null],['2024-02',22000,18000,22.22],['2024-03',19500,22000,-11.36]],
    },
    solucionOficial: 'SELECT mes, ventas, LAG(ventas) OVER (ORDER BY mes) AS mes_anterior, ROUND((ventas - LAG(ventas) OVER (ORDER BY mes)) * 100.0 / LAG(ventas) OVER (ORDER BY mes), 2) AS crecimiento_pct FROM ventas_mensuales WHERE empleado_id = 5 ORDER BY mes;',
    solucionesAlternativas: [],
    explicacion: 'LAG(ventas) devuelve el valor del mes anterior. Feb: (22000-18000)/18000*100 = 22.22%. Mar: (19500-22000)/22000*100 = -11.36%. El primer mes tiene NULL porque no hay mes previo.',
    pistas: ['LAG(ventas) OVER (ORDER BY mes) AS mes_anterior', '(ventas - LAG(ventas)...) * 100.0 / LAG(ventas)... para el porcentaje', 'WHERE empleado_id = 5'],
    retroalimentacionError: 'ROUND((ventas - LAG(ventas) OVER (ORDER BY mes)) * 100.0 / LAG(ventas) OVER (ORDER BY mes), 2)',
  },
  {
    id: 'av-b-014',
    nivel: 'avanzado',
    titulo: 'LEAD: proyección del mes siguiente',
    descripcion: 'Para María (empleado_id=1), muestra cada mes, sus ventas y las del mes siguiente (si existe).',
    objetivo: 'Usar LEAD para acceder al valor de la siguiente fila.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['mes','ventas','ventas_siguiente_mes'],
      filas: [['2024-01',5000,7500],['2024-02',7500,6000],['2024-03',6000,null]],
    },
    solucionOficial: 'SELECT mes, ventas, LEAD(ventas, 1) OVER (ORDER BY mes) AS ventas_siguiente_mes FROM ventas_mensuales WHERE empleado_id = 1 ORDER BY mes;',
    solucionesAlternativas: [],
    explicacion: 'LEAD(ventas, 1) devuelve el valor de la fila SIGUIENTE en el orden definido. El último mes (2024-03) no tiene siguiente, por eso es NULL.',
    pistas: ['LEAD(ventas, 1) OVER (ORDER BY mes) AS ventas_siguiente_mes', 'WHERE empleado_id = 1', 'El último mes tendrá NULL en ventas_siguiente_mes'],
    retroalimentacionError: 'LEAD(ventas, 1) OVER (ORDER BY mes) — LEAD mira hacia adelante, LAG mira hacia atrás',
  },
  {
    id: 'av-b-015',
    nivel: 'avanzado',
    titulo: 'SUM OVER: total acumulado global',
    descripcion: 'Muestra todas las ventas mensuales de todos los empleados, con el total acumulado global hasta ese punto (ordenado por mes y empleado_id).',
    objetivo: 'Usar SUM OVER con ORDER BY para crear un acumulado progresivo.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['empleado_id','mes','ventas','acumulado'],
      filas: [[1,'2024-01',5000,5000],[2,'2024-01',12000,17000],[4,'2024-01',4000,21000],[5,'2024-01',18000,39000],[1,'2024-02',7500,46500],[2,'2024-02',9000,55500],[4,'2024-02',5500,61000],[5,'2024-02',22000,83000],[1,'2024-03',6000,89000],[2,'2024-03',15000,104000],[4,'2024-03',4800,108800],[5,'2024-03',19500,128300]],
    },
    solucionOficial: 'SELECT empleado_id, mes, ventas, SUM(ventas) OVER (ORDER BY mes, empleado_id) AS acumulado FROM ventas_mensuales ORDER BY mes, empleado_id;',
    solucionesAlternativas: [],
    explicacion: 'SUM OVER (ORDER BY ...) crea un acumulado: cada fila muestra la suma de su venta más todas las anteriores en el orden dado. Al final el acumulado llega a 128300 (suma total).',
    pistas: ['SUM(ventas) OVER (ORDER BY mes, empleado_id) AS acumulado', 'Sin PARTITION BY, el acumulado es global (no se reinicia)', 'ORDER BY mes, empleado_id en el OVER define el orden de acumulación'],
    retroalimentacionError: 'SUM(ventas) OVER (ORDER BY mes, empleado_id) — sin PARTITION BY para acumulado global',
  },
  {
    id: 'av-b-016',
    nivel: 'avanzado',
    titulo: 'AVG OVER: promedio acumulado',
    descripcion: 'Para cada empleado, muestra sus ventas mensuales y el promedio de ventas acumulado hasta ese mes (promedio móvil histórico).',
    objetivo: 'Usar AVG OVER PARTITION BY con ORDER BY para promedio progresivo.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['empleado_id','mes','ventas','prom_acumulado'],
      filas: [[1,'2024-01',5000,5000],[1,'2024-02',7500,6250],[1,'2024-03',6000,6166.67],[2,'2024-01',12000,12000],[2,'2024-02',9000,10500],[2,'2024-03',15000,12000],[4,'2024-01',4000,4000],[4,'2024-02',5500,4750],[4,'2024-03',4800,4766.67],[5,'2024-01',18000,18000],[5,'2024-02',22000,20000],[5,'2024-03',19500,19833.33]],
    },
    solucionOficial: 'SELECT empleado_id, mes, ventas, ROUND(AVG(ventas) OVER (PARTITION BY empleado_id ORDER BY mes), 2) AS prom_acumulado FROM ventas_mensuales ORDER BY empleado_id, mes;',
    solucionesAlternativas: [],
    explicacion: 'AVG OVER PARTITION BY empleado_id ORDER BY mes calcula el promedio de todos los meses hasta el actual, por empleado. Ene: solo 1 dato. Feb: promedio de 2. Mar: promedio de 3.',
    pistas: ['AVG(ventas) OVER (PARTITION BY empleado_id ORDER BY mes) — el PARTITION BY reinicia el promedio por empleado', 'ORDER BY mes dentro del OVER define que es acumulativo', 'ROUND(..., 2) para 2 decimales'],
    retroalimentacionError: 'AVG(ventas) OVER (PARTITION BY empleado_id ORDER BY mes) — PARTITION reinicia por empleado, ORDER BY hace el acumulado',
  },
  {
    id: 'av-b-017',
    nivel: 'avanzado',
    titulo: 'NTILE para cuartiles',
    descripcion: 'Divide los empleados en 4 cuartiles según su salario. Muestra nombre, salario y número de cuartil.',
    objetivo: 'Usar NTILE para dividir filas en grupos de igual tamaño.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['nombre','salario','cuartil'],
      filas: [[`Laura`,70000,1],[`Carlos`,65000,1],[`Miguel`,60000,2],[`Andrés`,55000,2],[`Sofía`,52000,3],[`Elena`,50000,3],[`Ana`,48000,4],[`María`,45000,4],[`Javier`,44000,4],[`Pedro`,42000,4]],
    },
    solucionOficial: 'SELECT nombre, salario, NTILE(4) OVER (ORDER BY salario DESC) AS cuartil FROM empleados ORDER BY salario DESC;',
    solucionesAlternativas: [],
    explicacion: 'NTILE(4) divide 10 empleados en 4 grupos: Q1 tiene 3 filas (ceil(10/4)=3), Q2 tiene 3, Q3 tiene 2, Q4 tiene 2. Los de mayor salario están en Q1.',
    pistas: ['NTILE(4) OVER (ORDER BY salario DESC) AS cuartil', 'NTILE divide las filas en N grupos de tamaño lo más igual posible', 'ORDER BY salario DESC para que Q1 sea el de mayor salario'],
    retroalimentacionError: 'NTILE(4) OVER (ORDER BY salario DESC) — el número en NTILE define cuántos grupos crear',
  },
  {
    id: 'av-b-018',
    nivel: 'avanzado',
    titulo: 'CTE + ROW_NUMBER: top N por grupo',
    descripcion: 'Obtén los 2 empleados con mayor salario de cada departamento.',
    objetivo: 'Combinar CTE con ROW_NUMBER PARTITION BY para filtrar top N por grupo.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['departamento','nombre','salario'],
      filas: [['Marketing','Andrés',55000],['Marketing','Sofía',52000],['RRHH','Elena',50000],['RRHH','Ana',48000],['Tecnología','Laura',70000],['Tecnología','Carlos',65000],['Ventas','María',45000],['Ventas','Javier',44000]],
    },
    solucionOficial: 'WITH ranked AS (SELECT nombre, departamento, salario, ROW_NUMBER() OVER (PARTITION BY departamento ORDER BY salario DESC) AS rn FROM empleados)\nSELECT departamento, nombre, salario FROM ranked WHERE rn <= 2 ORDER BY departamento, salario DESC;',
    solucionesAlternativas: [],
    explicacion: 'ROW_NUMBER PARTITION BY departamento numera los empleados dentro de cada departamento. WHERE rn <= 2 toma solo los 2 primeros de cada grupo.',
    pistas: ['CTE: ROW_NUMBER() OVER (PARTITION BY departamento ORDER BY salario DESC) AS rn', 'WHERE rn <= 2 en la consulta principal', 'ORDER BY departamento, salario DESC'],
    retroalimentacionError: 'CTE con ROW_NUMBER PARTITION BY departamento, luego WHERE rn <= 2',
  },
  {
    id: 'av-b-019',
    nivel: 'avanzado',
    titulo: 'CTE + RANK: el segundo puesto',
    descripcion: 'Encuentra el empleado con el segundo salario más alto de cada departamento.',
    objetivo: 'Usar CTE + RANK para extraer un puesto específico.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['departamento','nombre','salario'],
      filas: [['Marketing','Sofía',52000],['RRHH','Ana',48000],['Tecnología','Carlos',65000],['Ventas','Javier',44000]],
    },
    solucionOficial: 'WITH ranked AS (SELECT nombre, departamento, salario, RANK() OVER (PARTITION BY departamento ORDER BY salario DESC) AS rnk FROM empleados)\nSELECT departamento, nombre, salario FROM ranked WHERE rnk = 2 ORDER BY departamento;',
    solucionesAlternativas: [],
    explicacion: 'RANK PARTITION BY departamento asigna posición dentro de cada departamento. WHERE rnk = 2 filtra exactamente el segundo puesto. Si hubiera empate en el primero, no habría segundo.',
    pistas: ['CTE: RANK() OVER (PARTITION BY departamento ORDER BY salario DESC) AS rnk', 'WHERE rnk = 2', 'ORDER BY departamento'],
    retroalimentacionError: 'CTE con RANK PARTITION BY departamento, luego WHERE rnk = 2',
  },
  {
    id: 'av-b-020',
    nivel: 'avanzado',
    titulo: 'Varias window functions en un SELECT',
    descripcion: 'Para cada empleado muestra: salario, posición global (ROW_NUMBER), salario del empleado anterior (LAG) y promedio del departamento (AVG OVER PARTITION).',
    objetivo: 'Combinar múltiples window functions en una misma consulta.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['nombre','departamento','salario','pos_global','anterior','prom_depto'],
      filas: [['Laura',`Tecnología`,70000,1,null,65000],['Carlos',`Tecnología`,65000,2,70000,65000],['Miguel',`Tecnología`,60000,3,65000,65000],['Andrés',`Marketing`,55000,4,60000,53500],['Sofía',`Marketing`,52000,5,55000,53500],['Elena',`RRHH`,50000,6,52000,49000],['Ana',`RRHH`,48000,7,50000,49000],['María',`Ventas`,45000,8,48000,43666.666666666664],['Javier',`Ventas`,44000,9,45000,43666.666666666664],['Pedro',`Ventas`,42000,10,44000,43666.666666666664]],
    },
    solucionOficial: 'SELECT nombre, departamento, salario, ROW_NUMBER() OVER (ORDER BY salario DESC) AS pos_global, LAG(salario) OVER (ORDER BY salario DESC) AS anterior, AVG(salario) OVER (PARTITION BY departamento) AS prom_depto FROM empleados ORDER BY salario DESC;',
    solucionesAlternativas: [],
    explicacion: 'Cada window function tiene su propia cláusula OVER independiente. pos_global y anterior usan el mismo ORDER BY global; prom_depto usa PARTITION BY para calcular por departamento.',
    pistas: ['ROW_NUMBER() OVER (ORDER BY salario DESC) AS pos_global', 'LAG(salario) OVER (ORDER BY salario DESC) AS anterior', 'AVG(salario) OVER (PARTITION BY departamento) AS prom_depto'],
    retroalimentacionError: 'Cada window function tiene su propio OVER — pueden tener diferentes PARTITION BY y ORDER BY',
  },
  {
    id: 'av-b-021',
    nivel: 'avanzado',
    titulo: 'EXISTS para filtrar',
    descripcion: 'Muestra los empleados que tienen al menos un registro de venta mensual superior a 10000.',
    objetivo: 'Usar EXISTS con subconsulta correlacionada para comprobar existencia.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['nombre','departamento'],
      filas: [['Carlos','Tecnología'],['Laura','Tecnología']],
    },
    solucionOficial: 'SELECT e.nombre, e.departamento FROM empleados e WHERE EXISTS (SELECT 1 FROM ventas_mensuales v WHERE v.empleado_id = e.id AND v.ventas > 10000) ORDER BY e.nombre;',
    solucionesAlternativas: [],
    explicacion: 'EXISTS devuelve TRUE si la subconsulta produce al menos una fila. La subconsulta correlacionada usa e.id para filtrar registros del empleado actual. SELECT 1 es convencional — lo importante es que haya filas.',
    pistas: ['WHERE EXISTS (SELECT 1 FROM ventas_mensuales v WHERE v.empleado_id = e.id AND v.ventas > 10000)', 'EXISTS solo comprueba si hay resultados, no los devuelve', 'La subconsulta correlaciona con e.id'],
    retroalimentacionError: 'EXISTS (SELECT 1 FROM ventas_mensuales WHERE empleado_id = e.id AND ventas > 10000)',
  },
  {
    id: 'av-b-022',
    nivel: 'avanzado',
    titulo: 'NOT EXISTS: empleados sin ventas altas',
    descripcion: 'Muestra los empleados que NO tienen ninguna venta mensual superior a 8000.',
    objetivo: 'Usar NOT EXISTS para anti-join semántico.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['nombre','departamento'],
      filas: [['María','Ventas'],['Pedro','Ventas']],
    },
    solucionOficial: 'SELECT e.nombre, e.departamento FROM empleados e WHERE NOT EXISTS (SELECT 1 FROM ventas_mensuales v WHERE v.empleado_id = e.id AND v.ventas > 8000) ORDER BY e.nombre;',
    solucionesAlternativas: [],
    explicacion: 'NOT EXISTS filtra empleados cuya subconsulta no devuelve ninguna fila. María (max=7500) y Pedro (max=5500) no superan 8000 en ningún mes. Los empleados sin registros en ventas_mensuales también pasarían.',
    pistas: ['WHERE NOT EXISTS (SELECT 1 FROM ventas_mensuales v WHERE v.empleado_id = e.id AND v.ventas > 8000)', 'NOT EXISTS filtra los que NO tienen ningún mes > 8000', 'Es el complemento semántico de EXISTS'],
    retroalimentacionError: 'NOT EXISTS (...) — el NOT invierte el resultado: True si la subconsulta NO encuentra filas',
  },
  {
    id: 'av-b-023',
    nivel: 'avanzado',
    titulo: 'Subconsulta correlacionada: ventas sobre su promedio',
    descripcion: 'Muestra los registros de ventas mensuales donde el monto supera el promedio de ese mismo empleado.',
    objetivo: 'Usar subconsulta correlacionada con comparación contra el promedio del propio grupo.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['empleado_id','mes','ventas'],
      filas: [[1,'2024-02',7500],[2,'2024-01',12000],[2,'2024-03',15000],[4,'2024-02',5500],[5,'2024-02',22000]],
    },
    solucionOficial: 'SELECT v1.empleado_id, v1.mes, v1.ventas FROM ventas_mensuales v1 WHERE v1.ventas > (SELECT AVG(v2.ventas) FROM ventas_mensuales v2 WHERE v2.empleado_id = v1.empleado_id) ORDER BY v1.empleado_id, v1.mes;',
    solucionesAlternativas: [],
    explicacion: 'La subconsulta calcula el promedio de ventas del empleado de la fila actual (v1.empleado_id). Cada fila se compara con el promedio de su propio empleado, no un promedio global.',
    pistas: ['WHERE v1.ventas > (SELECT AVG(v2.ventas) FROM ventas_mensuales v2 WHERE v2.empleado_id = v1.empleado_id)', 'v2.empleado_id = v1.empleado_id correlaciona la subconsulta con la fila externa', 'Alias distintos: v1 externo, v2 interno'],
    retroalimentacionError: 'La subconsulta usa v2.empleado_id = v1.empleado_id para calcular el promedio del empleado actual',
  },
  {
    id: 'av-b-024',
    nivel: 'avanzado',
    titulo: 'CASE + window function',
    descripcion: 'Clasifica cada registro de venta mensual según si el empleado está en el top 50% (cuartil 1 o 2) o el 50% inferior (cuartil 3 o 4) de ventas de ese mes.',
    objetivo: 'Combinar NTILE con CASE para clasificar por percentil.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['mes','empleado_id','ventas','mitad'],
      filas: [['2024-01',5,18000,'Superior'],['2024-01',2,12000,'Superior'],['2024-01',1,5000,'Inferior'],['2024-01',4,4000,'Inferior'],['2024-02',5,22000,'Superior'],['2024-02',2,9000,'Superior'],['2024-02',4,5500,'Inferior'],['2024-02',1,7500,'Inferior'],['2024-03',2,15000,'Superior'],['2024-03',5,19500,'Superior'],['2024-03',1,6000,'Inferior'],['2024-03',4,4800,'Inferior']],
    },
    solucionOficial: "SELECT mes, empleado_id, ventas, CASE WHEN NTILE(2) OVER (PARTITION BY mes ORDER BY ventas DESC) = 1 THEN 'Superior' ELSE 'Inferior' END AS mitad FROM ventas_mensuales ORDER BY mes, ventas DESC;",
    solucionesAlternativas: [],
    explicacion: 'NTILE(2) PARTITION BY mes divide los 4 empleados de cada mes en 2 grupos: los 2 de mayor venta son "Superior" (cuartil 1) y los otros 2 "Inferior" (cuartil 2).',
    pistas: ['NTILE(2) OVER (PARTITION BY mes ORDER BY ventas DESC)', "CASE WHEN NTILE(...) = 1 THEN 'Superior' ELSE 'Inferior' END AS mitad", 'PARTITION BY mes para reiniciar la clasificación cada mes'],
    retroalimentacionError: "CASE WHEN NTILE(2) OVER (PARTITION BY mes ORDER BY ventas DESC) = 1 THEN 'Superior' ELSE 'Inferior' END",
  },
  {
    id: 'av-b-025',
    nivel: 'avanzado',
    titulo: 'CTE + window + JOIN completo',
    descripcion: 'Pipeline completo: usa una CTE con ROW_NUMBER para identificar el mes de mayor venta de cada empleado. Luego muestra el nombre del empleado y ese mes.',
    objetivo: 'Combinar CTE, window function y JOIN en un pipeline de análisis.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['nombre','mejor_mes','ventas'],
      filas: [['Carlos','2024-03',15000],['Laura','2024-02',22000],['María','2024-02',7500],['Pedro','2024-02',5500]],
    },
    solucionOficial: 'WITH ranked AS (SELECT empleado_id, mes, ventas, ROW_NUMBER() OVER (PARTITION BY empleado_id ORDER BY ventas DESC) AS rn FROM ventas_mensuales)\nSELECT e.nombre, r.mes AS mejor_mes, r.ventas FROM ranked r INNER JOIN empleados e ON r.empleado_id = e.id WHERE r.rn = 1 ORDER BY e.nombre;',
    solucionesAlternativas: [],
    explicacion: 'ROW_NUMBER PARTITION BY empleado_id ordena los meses de mayor a menor venta por empleado. rn=1 identifica el mejor mes de cada uno. El JOIN añade el nombre del empleado.',
    pistas: ['CTE: ROW_NUMBER() OVER (PARTITION BY empleado_id ORDER BY ventas DESC) AS rn', 'WHERE r.rn = 1 en la consulta principal', 'INNER JOIN empleados para el nombre'],
    retroalimentacionError: 'CTE con ROW_NUMBER PARTITION BY empleado_id, luego WHERE rn = 1 + JOIN para nombre',
  },
  {
    id: 'av-b-026',
    nivel: 'avanzado',
    titulo: 'MAX OVER: salario vs máximo del departamento',
    descripcion: 'Para cada empleado, muestra su salario, el salario máximo de su departamento y el porcentaje que representa.',
    objetivo: 'Usar MAX OVER PARTITION BY para comparar cada fila con el máximo de su grupo.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['nombre','departamento','salario','max_depto','pct_del_max'],
      filas: [['Ana','RRHH',48000,50000,96.0],['Elena','RRHH',50000,50000,100.0],['Andrés','Marketing',55000,55000,100.0],['Sofía','Marketing',52000,55000,94.55],['Carlos','Tecnología',65000,70000,92.86],['Laura','Tecnología',70000,70000,100.0],['Miguel','Tecnología',60000,70000,85.71],['Javier','Ventas',44000,45000,97.78],['María','Ventas',45000,45000,100.0],['Pedro','Ventas',42000,45000,93.33]],
    },
    solucionOficial: 'SELECT nombre, departamento, salario, MAX(salario) OVER (PARTITION BY departamento) AS max_depto, ROUND(salario * 100.0 / MAX(salario) OVER (PARTITION BY departamento), 2) AS pct_del_max FROM empleados ORDER BY departamento, nombre;',
    solucionesAlternativas: [],
    explicacion: 'MAX(salario) OVER (PARTITION BY departamento) repite el máximo del departamento en cada fila del grupo. Dividiendo salario / max * 100 obtenemos el porcentaje respecto al tope.',
    pistas: ['MAX(salario) OVER (PARTITION BY departamento) AS max_depto', 'ROUND(salario * 100.0 / MAX(salario) OVER (PARTITION BY departamento), 2) AS pct_del_max', 'Repites la función ventana dos veces (para max y para pct)'],
    retroalimentacionError: 'MAX(salario) OVER (PARTITION BY departamento) — sin ORDER BY en el OVER para el máximo global del grupo',
  },
  {
    id: 'av-b-027',
    nivel: 'avanzado',
    titulo: 'Análisis de cohorte simple',
    descripcion: 'Agrupa los empleados por año de contratación. Para cada cohorte muestra: año, cantidad de empleados y salario promedio. Ordena por año.',
    objetivo: 'Simular un análisis de cohortes agrupando por año de incorporación.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['cohorte','empleados','salario_promedio'],
      filas: [['2018',1,70000],['2019',2,60000],['2020',3,51666.67],['2021',2,50000],['2022',2,43000]],
    },
    solucionOficial: "SELECT STRFTIME('%Y', fecha_contrato) AS cohorte, COUNT(*) AS empleados, ROUND(AVG(salario), 2) AS salario_promedio FROM empleados GROUP BY cohorte ORDER BY cohorte;",
    solucionesAlternativas: [],
    explicacion: '2019: Carlos(65000) y Andrés(55000) → avg=60000. 2020: María(45000), Miguel(60000), Elena(50000) → avg=51666.67. 2022: Pedro(42000) y Javier(44000) → avg=43000.',
    pistas: ["STRFTIME('%Y', fecha_contrato) AS cohorte", 'GROUP BY cohorte', 'COUNT(*) y ROUND(AVG(salario), 2)'],
    retroalimentacionError: "STRFTIME('%Y', fecha_contrato) AS cohorte + GROUP BY cohorte",
  },
  {
    id: 'av-b-028',
    nivel: 'av-b-028' === 'av-b-028' ? 'avanzado' : 'avanzado',
    titulo: 'Data cleaning: COALESCE + NULLIF',
    descripcion: 'Muestra el nombre de cada empleado y su departamento. Si el departamento estuviera vacío, mostraría "Sin asignar". Usa COALESCE y NULLIF para demostrar el patrón.',
    objetivo: 'Entender COALESCE y NULLIF para manejo defensivo de datos.',
    setupSql: `
CREATE TABLE empleados_raw (id INTEGER, nombre TEXT, departamento TEXT);
INSERT INTO empleados_raw VALUES (1,'María','Ventas');
INSERT INTO empleados_raw VALUES (2,'Carlos','');
INSERT INTO empleados_raw VALUES (3,'Ana',NULL);
INSERT INTO empleados_raw VALUES (4,'Pedro','Ventas');
`,
    resultadoEsperado: {
      columnas: ['nombre','dept_limpio'],
      filas: [['María','Ventas'],['Carlos','Sin asignar'],['Ana','Sin asignar'],['Pedro','Ventas']],
    },
    solucionOficial: "SELECT nombre, COALESCE(NULLIF(departamento, ''), 'Sin asignar') AS dept_limpio FROM empleados_raw ORDER BY id;",
    solucionesAlternativas: [],
    explicacion: "NULLIF(departamento, '') convierte la cadena vacía ('') en NULL. COALESCE(NULL, 'Sin asignar') reemplaza NULL por el valor por defecto. Así se manejan tanto NULL como cadenas vacías.",
    pistas: ["NULLIF(departamento, '') convierte cadena vacía en NULL", "COALESCE(..., 'Sin asignar') reemplaza NULL por el texto", 'La combinación maneja ambos casos: NULL y vacío'],
    retroalimentacionError: "COALESCE(NULLIF(departamento, ''), 'Sin asignar') — NULLIF primero, luego COALESCE",
  },
  {
    id: 'av-b-029',
    nivel: 'avanzado',
    titulo: 'CTE recursivo: jerarquía de empleados',
    descripcion: 'Usando un CTE recursivo, muestra la cadena de mando: cada empleado con su nivel jerárquico y el nombre de su jefe directo.',
    objetivo: 'Usar WITH RECURSIVE para recorrer una jerarquía de datos.',
    setupSql: `
CREATE TABLE org (id INTEGER, nombre TEXT, jefe_id INTEGER);
INSERT INTO org VALUES (1,'Director',NULL);
INSERT INTO org VALUES (2,'Gerente A',1);
INSERT INTO org VALUES (3,'Gerente B',1);
INSERT INTO org VALUES (4,'Analista 1',2);
INSERT INTO org VALUES (5,'Analista 2',2);
INSERT INTO org VALUES (6,'Analista 3',3);
`,
    resultadoEsperado: {
      columnas: ['nivel','nombre','jefe'],
      filas: [[1,'Director',null],[2,'Gerente A','Director'],[2,'Gerente B','Director'],[3,'Analista 1','Gerente A'],[3,'Analista 2','Gerente A'],[3,'Analista 3','Gerente B']],
    },
    solucionOficial: 'WITH RECURSIVE jerarquia AS (SELECT id, nombre, jefe_id, 1 AS nivel FROM org WHERE jefe_id IS NULL UNION ALL SELECT o.id, o.nombre, o.jefe_id, j.nivel + 1 FROM org o INNER JOIN jerarquia j ON o.jefe_id = j.id)\nSELECT j.nivel, j.nombre, p.nombre AS jefe FROM jerarquia j LEFT JOIN org p ON j.jefe_id = p.id ORDER BY j.nivel, j.nombre;',
    solucionesAlternativas: [],
    explicacion: 'El CTE recursivo empieza con el Director (sin jefe). Cada iteración añade los subordinados directos del nivel anterior, incrementando el nivel en 1. Se detiene cuando no hay más hijos.',
    pistas: ['La parte base: WHERE jefe_id IS NULL (el Director)', 'La parte recursiva: INNER JOIN jerarquia j ON o.jefe_id = j.id', 'UNION ALL une base y recursión; el nivel sube en 1 en cada paso'],
    retroalimentacionError: 'WITH RECURSIVE jerarquia AS (base UNION ALL recursión) — la base son las raíces, la recursión va un nivel más abajo',
  },
  {
    id: 'av-b-030',
    nivel: 'avanzado',
    titulo: 'Integrador avanzado final',
    descripcion: 'Reporte completo: para cada empleado con ventas mensuales, muestra nombre, total de ventas, ranking global de ventas totales, y si está en el top 50% (cuartil 1-2) o no.',
    objetivo: 'Combinar CTE, JOIN, SUM, RANK y NTILE en un único análisis de business intelligence.',
    setupSql: SETUP,
    resultadoEsperado: {
      columnas: ['nombre','total_ventas','ranking','mitad'],
      filas: [['Laura',59500,1,'Top 50%'],['Carlos',36000,2,'Top 50%'],['María',18500,3,'Resto'],['Pedro',14300,4,'Resto']],
    },
    solucionOficial: "WITH totales AS (SELECT v.empleado_id, SUM(v.ventas) AS total_ventas FROM ventas_mensuales v GROUP BY v.empleado_id)\nSELECT e.nombre, t.total_ventas, RANK() OVER (ORDER BY t.total_ventas DESC) AS ranking, CASE WHEN NTILE(2) OVER (ORDER BY t.total_ventas DESC) = 1 THEN 'Top 50%' ELSE 'Resto' END AS mitad FROM totales t INNER JOIN empleados e ON t.empleado_id = e.id ORDER BY ranking;",
    solucionesAlternativas: [],
    explicacion: 'La CTE agrega el total anual de ventas. La consulta principal aplica RANK y NTILE sobre esos totales. Laura: 18000+22000+19500=59500. Carlos: 12000+9000+15000=36000.',
    pistas: ['CTE: SUM(ventas) GROUP BY empleado_id', 'RANK() OVER (ORDER BY total_ventas DESC) AS ranking', "CASE WHEN NTILE(2) OVER (ORDER BY total_ventas DESC) = 1 THEN 'Top 50%' ELSE 'Resto' END"],
    retroalimentacionError: 'CTE con totales anuales, luego RANK y NTILE sobre esos totales en la consulta principal',
  },
];
