import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'av-03-02',
  titulo: 'SAVEPOINT y ROLLBACK parcial',
  descripcion: 'Aprende a crear puntos de guardado dentro de transacciones para deshacer solo parte de los cambios.',
  duracionMinutos: 20,
  conceptosClave: ['SAVEPOINT', 'ROLLBACK TO', 'Transacciones anidadas', 'Control granular'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'A veces dentro de una transacción larga quieres deshacer solo una parte sin perder todo el trabajo. SAVEPOINT te permite crear "puntos de guardado" a los que puedes volver con ROLLBACK TO, sin deshacer toda la transacción.',
    },
    {
      tipo: 'analogia',
      icono: '💾',
      texto: 'Imagina que estás escribiendo un documento largo. Guardas versiones intermedias (v1, v2, v3). Si algo sale mal después de v2, puedes volver a esa versión sin perder todo lo anterior. SAVEPOINT funciona igual en SQL.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de SAVEPOINT',
      texto: 'BEGIN;\n\nINSERT INTO ...  -- operación 1\nSAVEPOINT punto1;\n\nUPDATE ...        -- operación 2\nSAVEPOINT punto2;\n\nDELETE ...        -- operación 3 (sale mal)\n\nROLLBACK TO punto2;  -- deshace solo el DELETE\n\nCOMMIT;              -- confirma INSERT y UPDATE',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Transferencia con verificación',
      descripcion: 'Hacemos una transferencia bancaria con puntos de verificación. Si algo falla, volvemos al último punto seguro.',
      sql: `BEGIN;

-- Paso 1: Restar de la cuenta origen
UPDATE cuentas SET saldo = saldo - 1000 WHERE id = 1;
SAVEPOINT paso1;

-- Verificar que no quedó negativo
SELECT saldo FROM cuentas WHERE id = 1;
-- Si saldo < 0: ROLLBACK TO paso1

-- Paso 2: Sumar a la cuenta destino
UPDATE cuentas SET saldo = saldo + 1000 WHERE id = 2;

COMMIT;`,
      setupSql: `
        CREATE TABLE cuentas (id INTEGER PRIMARY KEY, titular TEXT, saldo REAL);
        INSERT INTO cuentas VALUES (1,'Ana',5000);
        INSERT INTO cuentas VALUES (2,'Carlos',3000);
      `,
      tablaResultado: {
        columnas: ['Resultado'],
        filas: [['Transacción completada. Ana: $4000, Carlos: $4000']],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'RELEASE SAVEPOINT',
      texto: 'Puedes eliminar un savepoint cuando ya no lo necesitas:\n\nRELEASE SAVEPOINT punto1;\n\nEsto no deshace nada, solo elimina el punto de guardado. Si luego haces ROLLBACK TO punto1, dará error porque ya no existe.\n\nNota: cuando haces COMMIT, todos los savepoints se eliminan automáticamente.',
    },
    {
      tipo: 'error-comun',
      titulo: 'ROLLBACK TO vs ROLLBACK',
      codigoMal: 'ROLLBACK punto1',
      problema: 'ROLLBACK sin TO deshace TODA la transacción. Para volver a un savepoint necesitas ROLLBACK TO.',
      codigoBien: 'ROLLBACK TO punto1',
      solucion: 'ROLLBACK TO savepoint_name vuelve a un punto específico. ROLLBACK solo deshace todo.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'SAVEPOINT crea un punto de retorno dentro de una transacción',
        'ROLLBACK TO savepoint vuelve a ese punto sin deshacer todo',
        'Puedes tener múltiples savepoints en una transacción',
        'RELEASE SAVEPOINT elimina un savepoint sin deshacer cambios',
        'COMMIT elimina automáticamente todos los savepoints',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'av-03-02-e1',
      titulo: 'Transferencia con SAVEPOINT',
      descripcion: 'Crea una transacción que transfiera $500 de Ana a Carlos. Usa un SAVEPOINT después de restar de Ana. Luego haz ROLLBACK TO ese savepoint y confirma. ¿Cuál es el saldo final de cada uno?',
      objetivo: 'Practicar SAVEPOINT y ROLLBACK TO.',
      setupSql: `
        CREATE TABLE cuentas (id INTEGER PRIMARY KEY, titular TEXT, saldo REAL);
        INSERT INTO cuentas VALUES (1,'Ana',5000);
        INSERT INTO cuentas VALUES (2,'Carlos',3000);
      `,
      resultadoEsperado: {
        columnas: ['titular','saldo'],
        filas: [
          ['Ana',5000],
          ['Carlos',3000],
        ],
      },
      solucionOficial: `BEGIN;
UPDATE cuentas SET saldo = saldo - 500 WHERE id = 1;
SAVEPOINT sp1;
UPDATE cuentas SET saldo = saldo + 500 WHERE id = 2;
ROLLBACK TO sp1;
COMMIT;`,
      pistas: [
        'BEGIN para iniciar la transacción',
        'UPDATE para restar de Ana',
        'SAVEPOINT sp1 después del primer UPDATE',
        'UPDATE para sumar a Carlos',
        'ROLLBACK TO sp1 para deshacer la suma',
        'COMMIT para confirmar (solo resta de Ana se deshace con el ROLLBACK TO)',
      ],
      explicacion: 'ROLLBACK TO sp1 deshace todo lo que pasó después del SAVEPOINT, incluyendo la resta de Ana. Al hacer COMMIT, no hay cambios pendientes.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué diferencia hay entre ROLLBACK y ROLLBACK TO savepoint?',
      opciones: [
        'No hay diferencia',
        'ROLLBACK deshace toda la transacción; ROLLBACK TO vuelve a un punto específico',
        'ROLLBACK TO es más rápido',
        'ROLLBACK solo funciona con INSERT',
      ],
      correcta: 1,
      explicacion: 'ROLLBACK deshace toda la transacción desde el BEGIN. ROLLBACK TO savepoint_name solo deshace las operaciones realizadas después de ese savepoint.',
    },
    {
      id: 'q2',
      pregunta: '¿Qué pasa con los savepoints cuando haces COMMIT?',
      opciones: [
        'Se mantienen para la próxima transacción',
        'Se eliminan automáticamente',
        'Solo se elimina el último',
        'Depende de la base de datos',
      ],
      correcta: 1,
      explicacion: 'Cuando haces COMMIT, la transacción termina y todos los savepoints se eliminan automáticamente. Cada nueva transacción empieza sin savepoints.',
    },
  ],
};
