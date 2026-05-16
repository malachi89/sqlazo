import type { Leccion } from '../../../../types';
import { SETUP_CLIENTES } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'no-01-05',
  titulo: 'DISTINCT — Valores únicos',
  descripcion: 'Aprende a eliminar duplicados de tus resultados con DISTINCT.',
  duracionMinutos: 10,
  conceptosClave: ['DISTINCT', 'Duplicados', 'Valores únicos'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'A veces una columna tiene valores repetidos y quieres ver solo los valores únicos. Por ejemplo: ¿qué países están representados en tu tabla de clientes? DISTINCT elimina los duplicados del resultado.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Qué países hay en la tabla de clientes',
      descripcion: 'Sin DISTINCT, veríamos el país de cada cliente (con repeticiones). Con DISTINCT, solo vemos cada país una vez.',
      sql: 'SELECT DISTINCT pais FROM clientes ORDER BY pais;',
  setupSql: SETUP_CLIENTES,
      tablaResultado: {
        columnas: ['pais'],
        filas: [['Argentina'], ['España'], ['México'], ['USA']],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'DISTINCT con múltiples columnas',
      texto: 'Con múltiples columnas, DISTINCT elimina filas donde la COMBINACIÓN de valores es idéntica:\n\nSELECT DISTINCT departamento, ciudad FROM empleados\n\nEsto devuelve pares únicos de (departamento, ciudad). Si hay dos empleados en Ventas/Madrid, solo aparece una vez.',
    },
    {
      tipo: 'nota',
      texto: 'DISTINCT puede ser lento en tablas muy grandes. Para obtener valores únicos con conteos, es más eficiente usar GROUP BY.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'DISTINCT elimina filas duplicadas del resultado',
        'Se coloca inmediatamente después de SELECT',
        'Con múltiples columnas, elimina combinaciones duplicadas',
        'Es equivalente a GROUP BY sin funciones de agregación',
        'DISTINCT puede ser costoso computacionalmente en tablas grandes',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'no-01-05-e1',
      titulo: 'Categorías únicas',
      descripcion: 'Muestra todas las categorías de productos que existen, sin repeticiones.',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, categoria TEXT);
        INSERT INTO productos VALUES (1,'Laptop','Electrónica');
        INSERT INTO productos VALUES (2,'Mouse','Periféricos');
        INSERT INTO productos VALUES (3,'Teclado','Periféricos');
        INSERT INTO productos VALUES (4,'Monitor','Electrónica');
        INSERT INTO productos VALUES (5,'Silla','Mobiliario');
        INSERT INTO productos VALUES (6,'Webcam','Periféricos');
      `,
      resultadoEsperado: {
        columnas: ['categoria'],
        filas: [['Electrónica'], ['Mobiliario'], ['Periféricos']],
      },
      solucionOficial: 'SELECT DISTINCT categoria FROM productos ORDER BY categoria;',
      pistas: [
        'Usa DISTINCT después de SELECT',
        'Solo selecciona la columna categoria',
        'Ordena alfabéticamente con ORDER BY categoria',
      ],
      explicacion: 'DISTINCT elimina los duplicados. Aunque "Periféricos" y "Electrónica" aparecen múltiples veces en la tabla, DISTINCT devuelve cada valor solo una vez.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Dónde se coloca DISTINCT en una consulta SELECT?',
      opciones: [
        'Después de FROM',
        'Inmediatamente después de SELECT y antes de las columnas',
        'Después de WHERE',
        'Al final de la consulta',
      ],
      correcta: 1,
      explicacion: 'DISTINCT va inmediatamente después de SELECT: SELECT DISTINCT columna FROM tabla.',
    },
    {
      id: 'q2',
      pregunta: '¿Qué hace SELECT DISTINCT departamento, ciudad FROM empleados?',
      opciones: [
        'Elimina duplicados de departamento solamente',
        'Elimina duplicados de ciudad solamente',
        'Elimina filas donde la combinación de departamento Y ciudad es idéntica',
        'Devuelve todos los departamentos y todas las ciudades por separado',
      ],
      correcta: 2,
      explicacion: 'Con múltiples columnas, DISTINCT elimina filas donde la COMBINACIÓN completa de valores es idéntica. Dos empleados en Ventas/Madrid cuentan como duplicado; uno en Ventas/Madrid y otro en Ventas/Barcelona no.',
    },
    {
      id: 'q3',
      pregunta: '¿Cuál es la diferencia entre DISTINCT y GROUP BY sin agregaciones?',
      opciones: [
        'DISTINCT es más rápido siempre',
        'GROUP BY es más rápido siempre',
        'Son funcionalmente equivalentes, pero GROUP BY puede ser más lento en algunas BD',
        'No hay ninguna diferencia',
      ],
      correcta: 2,
      explicacion: 'DISTINCT y GROUP BY sin funciones de agregación producen el mismo resultado. Sin embargo, GROUP BY puede ser más lento porque internamente hace un paso de agrupación adicional que no es necesario.',
    },
  ],
};
