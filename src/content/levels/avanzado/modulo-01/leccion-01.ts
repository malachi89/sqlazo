import type { Leccion } from '../../../../types';
import { SETUP_EMPLEADOS_BASICO } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'av-01-01',
  titulo: 'Window Functions — Introducción',
  descripcion: 'Aprende las funciones de ventana, una de las características más poderosas de SQL moderno.',
  duracionMinutos: 35,
  conceptosClave: ['Window Function', 'OVER', 'PARTITION BY', 'Función de ventana'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Las funciones de ventana (window functions) son funciones de agregación que calculan valores en relación con las filas cercanas, sin colapsar el resultado en una sola fila como hace GROUP BY.',
    },
    {
      tipo: 'analogia',
      icono: '🪟',
      texto: 'Imagina una ventana deslizante sobre tus datos. Para cada fila, la función "mira" un conjunto de filas relacionadas (la ventana) y calcula un valor. La fila original permanece en el resultado — no se colapsa como en GROUP BY.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis básica',
      texto: 'funcion() OVER (\n  [PARTITION BY columna]\n  [ORDER BY columna]\n  [ROWS/RANGE BETWEEN ...]\n)\n\n• OVER(): define la ventana\n• PARTITION BY: divide los datos en grupos (como GROUP BY, pero sin colapsar)\n• ORDER BY: define el orden dentro de la ventana',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'GROUP BY vs Window Functions',
      cabeceras: ['Característica', 'GROUP BY', 'Window Function'],
      filas: [
        ['Resultado', 'Una fila por grupo', 'Todas las filas originales'],
        ['Datos disponibles', 'Solo columnas agrupadas', 'Todas las columnas + valor calculado'],
        ['Uso', 'Resúmenes totales', 'Comparaciones, rankings, totales acumulados'],
      ],
    },
    {
      tipo: 'ejemplo',
      titulo: 'Salario vs promedio del departamento',
      descripcion: 'Para cada empleado, mostramos su salario Y el promedio de su departamento en la misma fila.',
      sql: 'SELECT nombre, departamento, salario, AVG(salario) OVER (PARTITION BY departamento) AS promedio_depto FROM empleados ORDER BY departamento, salario DESC;',
  setupSql: SETUP_EMPLEADOS_BASICO,
      tablaResultado: {
        columnas: ['nombre', 'departamento', 'salario', 'promedio_depto'],
        filas: [
          ['Laura', 'Tecnología', 70000, 65000],
          ['Carlos', 'Tecnología', 65000, 65000],
          ['Miguel', 'Tecnología', 60000, 65000],
          ['Ana', 'RRHH', 48000, 48000],
          ['María', 'Ventas', 45000, 43500],
          ['Pedro', 'Ventas', 42000, 43500],
        ],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        'Window functions calculan sobre un conjunto de filas relacionadas',
        'OVER() define la ventana de cálculo',
        'PARTITION BY divide los datos en grupos sin colapsar las filas',
        'ORDER BY dentro de OVER define el orden para cálculos secuenciales',
        'Devuelven todas las filas originales más el valor calculado',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'av-01-01-e1',
      titulo: 'Total acumulado de ventas',
      descripcion: 'Muestra cada venta con su monto Y el total acumulado hasta esa venta (ordenando por fecha).',
      setupSql: `
        CREATE TABLE ventas (id INTEGER, fecha TEXT, empleado TEXT, monto REAL);
        INSERT INTO ventas VALUES (1,'2024-01-05','María',1500);
        INSERT INTO ventas VALUES (2,'2024-01-10','Carlos',2300);
        INSERT INTO ventas VALUES (3,'2024-01-15','Ana',800);
        INSERT INTO ventas VALUES (4,'2024-01-20','María',3200);
        INSERT INTO ventas VALUES (5,'2024-01-25','Carlos',1700);
      `,
      resultadoEsperado: {
        columnas: ['fecha', 'empleado', 'monto', 'total_acumulado'],
        filas: [
          ['2024-01-05', 'María', 1500, 1500],
          ['2024-01-10', 'Carlos', 2300, 3800],
          ['2024-01-15', 'Ana', 800, 4600],
          ['2024-01-20', 'María', 3200, 7800],
          ['2024-01-25', 'Carlos', 1700, 9500],
        ],
      },
      solucionOficial: 'SELECT fecha, empleado, monto, SUM(monto) OVER (ORDER BY fecha) AS total_acumulado FROM ventas ORDER BY fecha;',
      pistas: [
        'Usa SUM(monto) OVER (ORDER BY fecha) para el total acumulado',
        'ORDER BY dentro de OVER hace que la suma sea acumulativa',
        'SELECT fecha, empleado, monto, SUM(monto) OVER (ORDER BY fecha) AS total_acumulado FROM ventas',
      ],
      explicacion: 'SUM(monto) OVER (ORDER BY fecha) suma todos los montos desde el inicio hasta la fila actual, creando un total acumulado. Cada fila muestra la suma de todas las ventas anteriores más la propia.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuál es la diferencia principal entre AVG(salario) GROUP BY dept y AVG(salario) OVER (PARTITION BY dept)?',
      opciones: [
        'Son exactamente iguales',
        'GROUP BY devuelve una fila por departamento; OVER mantiene todas las filas originales añadiendo el promedio como columna extra',
        'OVER es más lento siempre',
        'GROUP BY no puede calcular promedios',
      ],
      correcta: 1,
      explicacion: 'GROUP BY colapsa los datos en una fila por grupo. OVER mantiene todas las filas originales y agrega el valor calculado como una columna adicional. Esto permite hacer comparaciones fila por fila.',
    },
  ],
};
