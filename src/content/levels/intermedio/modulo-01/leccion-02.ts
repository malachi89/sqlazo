import type { Leccion } from '../../../../types';
import { SETUP_EMPLEADOS_BASICO } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'in-01-02',
  titulo: 'CASE WHEN — Lógica condicional',
  descripcion: 'Aprende a agregar lógica if/else dentro de tus consultas SQL con CASE WHEN.',
  duracionMinutos: 25,
  conceptosClave: ['CASE', 'WHEN', 'THEN', 'ELSE', 'Condicional'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'CASE WHEN es el equivalente de if/else en SQL. Te permite crear columnas calculadas con valores distintos según las condiciones que definas.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de CASE WHEN',
      texto: 'Hay dos formas:\n\nForma buscada (más flexible):\nCASE\n  WHEN condicion1 THEN resultado1\n  WHEN condicion2 THEN resultado2\n  ELSE resultado_default\nEND\n\nForma simple (compara con un valor):\nCASE columna\n  WHEN valor1 THEN resultado1\n  WHEN valor2 THEN resultado2\n  ELSE resultado_default\nEND',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Categorizar salarios',
      descripcion: 'Clasificamos cada empleado en "Junior", "Senior" o "Director" según su salario.',
      sql: "SELECT nombre, salario,\n  CASE\n    WHEN salario < 45000 THEN 'Junior'\n    WHEN salario < 65000 THEN 'Senior'\n    ELSE 'Director'\n  END AS nivel\nFROM empleados ORDER BY salario;",
      tablaResultado: {
        columnas: ['nombre', 'salario', 'nivel'],
        filas: [
          ['Pedro', 42000, 'Junior'],
          ['María', 45000, 'Senior'],
          ['Ana', 48000, 'Senior'],
          ['Miguel', 60000, 'Senior'],
          ['Carlos', 65000, 'Director'],
          ['Laura', 70000, 'Director'],
        ],
      },
    },
    {
      tipo: 'nota',
      texto: 'CASE WHEN evalúa las condiciones de arriba hacia abajo y devuelve el resultado de la PRIMERA condición verdadera. Si ninguna condición se cumple, devuelve el valor del ELSE (o NULL si no hay ELSE).',
    },
    {
      tipo: 'resumen',
      puntos: [
        'CASE WHEN es el if/else de SQL',
        'Evalúa condiciones de arriba hacia abajo',
        'Devuelve el valor de la primera condición verdadera',
        'ELSE es el valor por defecto si ninguna condición se cumple',
        'Puedes usar CASE en SELECT, WHERE, ORDER BY y GROUP BY',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'in-01-02-e1',
      titulo: 'Clasificar productos por precio',
      descripcion: 'Agrega una columna "rango" que clasifique productos como: "Barato" (<50), "Medio" (<200), o "Caro" (>=200).',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, precio REAL);
        INSERT INTO productos VALUES (1,'Mouse',29.99);
        INSERT INTO productos VALUES (2,'Teclado',89.99);
        INSERT INTO productos VALUES (3,'Monitor',499.99);
        INSERT INTO productos VALUES (4,'Webcam',79.99);
        INSERT INTO productos VALUES (5,'Laptop',1299.99);
        INSERT INTO productos VALUES (6,'Auriculares',149.99);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'precio', 'rango'],
        filas: [
          ['Mouse', 29.99, 'Barato'],
          ['Teclado', 89.99, 'Medio'],
          ['Monitor', 499.99, 'Caro'],
          ['Webcam', 79.99, 'Medio'],
          ['Laptop', 1299.99, 'Caro'],
          ['Auriculares', 149.99, 'Medio'],
        ],
      },
      solucionOficial: "SELECT nombre, precio, CASE WHEN precio < 50 THEN 'Barato' WHEN precio < 200 THEN 'Medio' ELSE 'Caro' END AS rango FROM productos;",
      pistas: [
        "Usa CASE WHEN ... THEN ... WHEN ... THEN ... ELSE ... END",
        "Primera condición: WHEN precio < 50 THEN 'Barato'",
        "Segunda: WHEN precio < 200 THEN 'Medio'",
        "Última: ELSE 'Caro'",
      ],
      explicacion: "CASE evalúa de arriba hacia abajo. Un precio de 89.99 no cumple < 50, pero sí cumple < 200, entonces es 'Medio'. Un precio de 499.99 no cumple ninguna de las dos, entonces llega a ELSE 'Caro'.",
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: 'En CASE WHEN, si un valor cumple múltiples condiciones, ¿qué devuelve?',
      opciones: [
        'El resultado de la última condición verdadera',
        'El resultado de la primera condición verdadera',
        'Todos los resultados de todas las condiciones verdaderas',
        'NULL porque hay ambigüedad',
      ],
      correcta: 1,
      explicacion: 'CASE WHEN evalúa las condiciones de arriba hacia abajo y devuelve el resultado de la PRIMERA condición que sea verdadera. Las condiciones posteriores no se evalúan.',
    },
  ],
};
