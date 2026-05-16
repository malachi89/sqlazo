import type { Leccion } from '../../../../types';
import { SETUP_EMPLEADOS_BASICO } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'in-04-03',
  titulo: 'DELETE — Eliminar datos',
  descripcion: 'Aprende a eliminar filas con DELETE y por qué es la operación más irreversible de SQL.',
  duracionMinutos: 15,
  conceptosClave: ['DELETE', 'DELETE con WHERE', 'Truncate'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'DELETE elimina filas de una tabla. Como UPDATE, si olvidas el WHERE eliminas TODAS las filas. A diferencia de UPDATE, los datos eliminados son difíciles o imposibles de recuperar.',
    },
    {
      tipo: 'advertencia',
      texto: '⚠️ DELETE sin WHERE elimina TODOS los registros de la tabla. Esta operación es irreversible sin una copia de seguridad. Siempre verifica el WHERE y considera usar transacciones.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de DELETE',
      texto: 'DELETE FROM tabla WHERE condicion\n\nSin WHERE:\nDELETE FROM tabla  ← ¡Elimina todas las filas!\n\nBuena práctica: antes de ejecutar un DELETE, ejecuta el SELECT equivalente para ver exactamente qué vas a eliminar:\n\nSELECT * FROM empleados WHERE activo = 0  ← Ver primero\nDELETE FROM empleados WHERE activo = 0    ← Luego eliminar',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Eliminar empleados inactivos',
      descripcion: 'Eliminamos empleados con estado inactivo (activo = 0).',
      sql: 'DELETE FROM empleados WHERE activo = 0;\nSELECT COUNT(*) AS empleados_activos FROM empleados;',
  setupSql: SETUP_EMPLEADOS_BASICO,
      tablaResultado: {
        columnas: ['empleados_activos'],
        filas: [[4]],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        'DELETE FROM tabla WHERE condicion elimina filas que cumplen la condición',
        'Sin WHERE elimina TODOS los registros',
        'Siempre ejecuta el SELECT equivalente antes de DELETE',
        'DELETE es difícilmente reversible sin backup',
        'Considera "soft delete" (marcar como inactivo) en lugar de eliminar',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'in-04-03-e1',
      titulo: 'Eliminar productos sin stock',
      descripcion: 'Elimina los productos cuyo stock sea 0, luego selecciona todos los productos restantes.',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, precio REAL, stock INTEGER);
        INSERT INTO productos VALUES (1,'Laptop',1299.99,10);
        INSERT INTO productos VALUES (2,'Mouse Viejo',15.00,0);
        INSERT INTO productos VALUES (3,'Teclado',89.99,50);
        INSERT INTO productos VALUES (4,'Funda Laptop',25.00,0);
        INSERT INTO productos VALUES (5,'Monitor',499.99,5);
      `,
      resultadoEsperado: {
        columnas: ['id', 'nombre', 'precio', 'stock'],
        filas: [
          [1, 'Laptop', 1299.99, 10],
          [3, 'Teclado', 89.99, 50],
          [5, 'Monitor', 499.99, 5],
        ],
      },
      solucionOficial: 'DELETE FROM productos WHERE stock = 0;\nSELECT * FROM productos;',
      pistas: [
        'Usa DELETE FROM productos WHERE stock = 0',
        'Luego usa SELECT * FROM productos para ver el resultado',
      ],
      explicacion: 'DELETE FROM productos WHERE stock = 0 elimina solo los productos con stock igual a cero. Los demás permanecen intactos.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuál es la mejor práctica antes de ejecutar un DELETE importante?',
      opciones: [
        'Ejecutar directamente sin precauciones',
        'Hacer una copia de seguridad y ejecutar primero el SELECT equivalente para ver qué se va a eliminar',
        'Agregar muchos WHERE para estar seguro',
        'Usar DROP TABLE en su lugar',
      ],
      correcta: 1,
      explicacion: 'Antes de un DELETE importante: 1) Haz backup de los datos. 2) Ejecuta el SELECT equivalente (misma condición WHERE) para ver exactamente qué filas se van a eliminar. 3) Solo entonces ejecuta el DELETE.',
    },
  ],
};
