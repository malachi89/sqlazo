import type { Leccion } from '../../../../types';
import { SETUP_PRODUCTOS } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'in-02-02',
  titulo: 'Funciones numéricas',
  descripcion: 'Aprende las funciones de SQLite para operaciones matemáticas: ROUND, ABS, CEIL, FLOOR, MOD.',
  duracionMinutos: 18,
  conceptosClave: ['ROUND', 'ABS', 'CEIL', 'FLOOR', 'MOD'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'SQL incluye funciones para realizar operaciones matemáticas sobre valores numéricos. Son esenciales para calcular descuentos, redondear precios, trabajar con porcentajes y más.',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Funciones numéricas en SQLite',
      cabeceras: ['Función', 'Descripción', 'Ejemplo', 'Resultado'],
      filas: [
        ['ROUND(n, d)', 'Redondea a d decimales', 'ROUND(3.14159, 2)', '3.14'],
        ['ABS(n)', 'Valor absoluto', 'ABS(-42)', '42'],
        ['CEIL(n)', 'Redondea hacia arriba', 'CEIL(3.2)', '4'],
        ['FLOOR(n)', 'Redondea hacia abajo', 'FLOOR(3.9)', '3'],
        ['n % m', 'Módulo (resto de división)', '10 % 3', '1'],
        ['MIN(n, m)', 'Mínimo de dos valores', 'MIN(5, 3)', '3'],
        ['MAX(n, m)', 'Máximo de dos valores', 'MAX(5, 3)', '5'],
        ['POWER(b, e)', 'Potencia', 'POWER(2, 10)', '1024'],
        ['SQRT(n)', 'Raíz cuadrada', 'SQRT(16)', '4'],
      ],
    },
    {
      tipo: 'ejemplo',
      titulo: 'Calcular precios con descuento',
      descripcion: 'Calculamos el precio con un 15% de descuento, redondeado a 2 decimales.',
      sql: 'SELECT nombre, precio, ROUND(precio * 0.85, 2) AS precio_con_descuento FROM productos;',
  setupSql: SETUP_PRODUCTOS,
      tablaResultado: {
        columnas: ['nombre', 'precio', 'precio_con_descuento'],
        filas: [
          ['Laptop Pro', 1299.99, 1104.99],
          ['Mouse', 29.99, 25.49],
          ['Monitor', 499.99, 424.99],
        ],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        'ROUND(n, d) redondea n a d decimales',
        'ABS() devuelve el valor absoluto (sin signo negativo)',
        'CEIL() redondea siempre hacia arriba',
        'FLOOR() redondea siempre hacia abajo',
        'Las operaciones aritméticas normales (+, -, *, /) también están disponibles',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'in-02-02-e1',
      titulo: 'Precio con IVA',
      descripcion: 'Calcula el precio de cada producto con el 21% de IVA incluido, redondeado a 2 decimales.',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, precio REAL);
        INSERT INTO productos VALUES (1,'Laptop',1299.99);
        INSERT INTO productos VALUES (2,'Mouse',29.99);
        INSERT INTO productos VALUES (3,'Monitor',499.99);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'precio_sin_iva', 'precio_con_iva'],
        filas: [
          ['Laptop', 1299.99, 1572.99],
          ['Mouse', 29.99, 36.29],
          ['Monitor', 499.99, 604.99],
        ],
      },
      solucionOficial: 'SELECT nombre, precio AS precio_sin_iva, ROUND(precio * 1.21, 2) AS precio_con_iva FROM productos;',
      pistas: [
        'Multiplica el precio por 1.21 para agregar el 21%',
        'Usa ROUND(..., 2) para redondear a 2 decimales',
        'SELECT nombre, precio AS precio_sin_iva, ROUND(precio * 1.21, 2) AS precio_con_iva FROM productos',
      ],
      explicacion: 'precio * 1.21 calcula el precio original más el 21% de IVA. ROUND(..., 2) redondea el resultado a 2 decimales para mostrar un precio en formato monetario correcto.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué diferencia hay entre ROUND(3.5, 0), CEIL(3.2) y FLOOR(3.9)?',
      opciones: [
        'ROUND(3.5, 0)=4, CEIL(3.2)=4, FLOOR(3.9)=3',
        'ROUND(3.5, 0)=3, CEIL(3.2)=3, FLOOR(3.9)=4',
        'Todas dan el mismo resultado',
        'ROUND y CEIL son iguales',
      ],
      correcta: 0,
      explicacion: 'ROUND(3.5, 0)=4 (redondeo estándar), CEIL(3.2)=4 (siempre sube aunque solo sea 3.2), FLOOR(3.9)=3 (siempre baja aunque sea 3.9).',
    },
  ],
};
