import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'mn-02-04',
  titulo: 'AND, OR y NOT — Condiciones múltiples',
  descripcion: 'Combina múltiples condiciones en WHERE usando AND, OR y NOT.',
  duracionMinutos: 20,
  conceptosClave: ['AND', 'OR', 'NOT', 'Lógica booleana'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'A veces necesitas filtrar con más de una condición. Por ejemplo: "empleados de Ventas con salario mayor a $50,000". Para esto, SQL tiene los operadores AND, OR y NOT que te permiten combinar condiciones.',
    },
    {
      tipo: 'explicacion',
      titulo: 'AND: ambas condiciones deben ser verdaderas',
      texto: 'AND combina dos condiciones. La fila solo aparece si AMBAS condiciones son verdaderas.\n\nEjemplo:\nSELECT * FROM empleados WHERE departamento = \'Ventas\' AND salario > 40000\n\nEsto devuelve empleados que:\n✓ Son de Ventas → Y\n✓ Ganan más de 40000\n\nSi un empleado es de Ventas pero gana 38000, NO aparece.\nSi un empleado gana 60000 pero es de Tecnología, tampoco aparece.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'AND: Empleados de Ventas con salario alto',
      descripcion: 'Empleados del departamento de Ventas que ganen más de $43,000.',
      sql: "SELECT nombre, departamento, salario FROM empleados WHERE departamento = 'Ventas' AND salario > 43000;",
      tablaResultado: {
        columnas: ['nombre', 'departamento', 'salario'],
        filas: [['María', 'Ventas', 45000]],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'OR: al menos una condición debe ser verdadera',
      texto: 'OR devuelve filas donde AL MENOS UNA de las condiciones es verdadera.\n\nEjemplo:\nSELECT * FROM empleados WHERE departamento = \'Ventas\' OR departamento = \'RRHH\'\n\nEsto devuelve empleados que:\n✓ Son de Ventas → O bien\n✓ Son de RRHH\n\nSi cumplen alguna de las dos, aparecen en el resultado.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'OR: Empleados de Ventas o RRHH',
      descripcion: 'Empleados que pertenezcan al departamento de Ventas o al de RRHH.',
      sql: "SELECT nombre, departamento FROM empleados WHERE departamento = 'Ventas' OR departamento = 'RRHH';",
      tablaResultado: {
        columnas: ['nombre', 'departamento'],
        filas: [
          ['María', 'Ventas'],
          ['Ana', 'RRHH'],
          ['Pedro', 'Ventas'],
        ],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'NOT: niega una condición',
      texto: 'NOT invierte el resultado de una condición. Si la condición era verdadera, NOT la hace falsa, y viceversa.\n\nEjemplo:\nSELECT * FROM empleados WHERE NOT departamento = \'Ventas\'\n\nEquivalente a:\nSELECT * FROM empleados WHERE departamento != \'Ventas\'\n\nAmbas devuelven empleados que NO son de Ventas.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Combinando AND y OR — Paréntesis',
      texto: 'Cuando combinas AND y OR, usa paréntesis para controlar el orden de evaluación.\n\nSin paréntesis:\nWHERE departamento = \'Ventas\' OR departamento = \'RRHH\' AND salario > 45000\nSQL evalúa AND primero: esto sería "Ventas" O "(RRHH con salario > 45000)"\n\nCon paréntesis:\nWHERE (departamento = \'Ventas\' OR departamento = \'RRHH\') AND salario > 45000\nEsto sería "(Ventas o RRHH) con salario > 45000"\n\nSiempre usa paréntesis cuando combines AND y OR para evitar confusiones.',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Tabla de verdad de AND y OR',
      cabeceras: ['Condición A', 'Condición B', 'A AND B', 'A OR B'],
      filas: [
        ['Verdadero', 'Verdadero', '✓ Verdadero', '✓ Verdadero'],
        ['Verdadero', 'Falso', '✗ Falso', '✓ Verdadero'],
        ['Falso', 'Verdadero', '✗ Falso', '✓ Verdadero'],
        ['Falso', 'Falso', '✗ Falso', '✗ Falso'],
      ],
    },
    {
      tipo: 'resumen',
      puntos: [
        'AND: ambas condiciones deben ser verdaderas',
        'OR: al menos una condición debe ser verdadera',
        'NOT: invierte el resultado de una condición',
        'Usa paréntesis para controlar el orden cuando combinas AND y OR',
        'AND tiene mayor prioridad que OR (se evalúa primero)',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'mn-02-04-e1',
      titulo: 'Productos caros con poco stock',
      descripcion: 'Muestra nombre y precio de productos con precio mayor a 200 Y stock menor a 50.',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, categoria TEXT, precio REAL, stock INTEGER);
        INSERT INTO productos VALUES (1,'Laptop Pro','Electrónica',1299.99,20);
        INSERT INTO productos VALUES (2,'Mouse Inalámbrico','Periféricos',29.99,200);
        INSERT INTO productos VALUES (3,'Teclado Mecánico','Periféricos',89.99,150);
        INSERT INTO productos VALUES (4,'Monitor 4K','Electrónica',499.99,15);
        INSERT INTO productos VALUES (5,'Webcam HD','Periféricos',129.99,80);
        INSERT INTO productos VALUES (6,'Tablet Pro','Electrónica',399.99,25);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'precio'],
        filas: [
          ['Laptop Pro', 1299.99],
          ['Monitor 4K', 499.99],
          ['Tablet Pro', 399.99],
        ],
      },
      solucionOficial: 'SELECT nombre, precio FROM productos WHERE precio > 200 AND stock < 50;',
      pistas: [
        'Necesitas dos condiciones: precio > 200 Y stock < 50',
        'Usa AND para que ambas condiciones se cumplan',
        'SELECT nombre, precio FROM productos WHERE precio > 200 AND stock < 50',
      ],
      explicacion: 'AND requiere que AMBAS condiciones sean verdaderas. Solo aparecen productos con precio > 200 Y stock < 50 al mismo tiempo.',
    },
    {
      id: 'mn-02-04-e2',
      titulo: 'Empleados de Ventas o Tecnología',
      descripcion: 'Muestra nombre y departamento de empleados que sean de Ventas o de Tecnología.',
      setupSql: `
        CREATE TABLE empleados (id INTEGER, nombre TEXT, departamento TEXT, salario REAL);
        INSERT INTO empleados VALUES (1,'María','Ventas',45000);
        INSERT INTO empleados VALUES (2,'Carlos','Tecnología',65000);
        INSERT INTO empleados VALUES (3,'Ana','RRHH',48000);
        INSERT INTO empleados VALUES (4,'Pedro','Ventas',42000);
        INSERT INTO empleados VALUES (5,'Laura','Tecnología',70000);
        INSERT INTO empleados VALUES (6,'Rosa','Contabilidad',50000);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'departamento'],
        filas: [
          ['María', 'Ventas'],
          ['Carlos', 'Tecnología'],
          ['Pedro', 'Ventas'],
          ['Laura', 'Tecnología'],
        ],
      },
      solucionOficial: "SELECT nombre, departamento FROM empleados WHERE departamento = 'Ventas' OR departamento = 'Tecnología';",
      pistas: [
        "Usa OR para que se cumpla una condición u otra",
        "Condición 1: departamento = 'Ventas'",
        "Condición 2: departamento = 'Tecnología'",
        "Únelas con OR",
      ],
      explicacion: 'OR devuelve filas donde al menos UNA condición es verdadera. Los empleados de Ventas Y los de Tecnología aparecen porque cada uno cumple al menos una condición.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: "¿Cuál es la diferencia entre AND y OR?",
      opciones: [
        'No hay diferencia, funcionan igual',
        'AND requiere que AMBAS condiciones sean verdaderas, OR requiere que AL MENOS UNA sea verdadera',
        'AND requiere una condición, OR requiere dos',
        'AND es para números y OR es para texto',
      ],
      correcta: 1,
      explicacion: 'AND es más restrictivo: ambas condiciones deben cumplirse. OR es más permisivo: basta con que una sola condición se cumpla.',
    },
    {
      id: 'q2',
      pregunta: "¿Qué devuelve: WHERE pais = 'España' AND edad > 25?",
      opciones: [
        'Personas de España o personas mayores de 25',
        'Personas de España que además tienen más de 25 años',
        'Personas que no son de España y tienen más de 25 años',
        'Personas de España y todas las personas mayores de 25',
      ],
      correcta: 1,
      explicacion: 'AND requiere que AMBAS condiciones sean verdaderas. Solo aparecen filas donde el país ES España Y ADEMÁS la edad es mayor de 25.',
    },
  ],
};
