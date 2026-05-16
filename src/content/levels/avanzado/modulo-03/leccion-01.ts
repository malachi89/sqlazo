import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'av-03-01',
  titulo: 'Transacciones — BEGIN y COMMIT',
  descripcion: 'Aprende a agrupar múltiples operaciones SQL en una transacción atómica.',
  duracionMinutos: 25,
  conceptosClave: ['Transacción', 'BEGIN', 'COMMIT', 'ROLLBACK', 'Atomicidad'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Una transacción es un grupo de operaciones SQL que se ejecutan como una unidad. O todas se completan exitosamente (COMMIT), o ninguna se aplica (ROLLBACK).',
    },
    {
      tipo: 'analogia',
      icono: '🏧',
      texto: 'Imagina una transferencia bancaria: debes restar $100 de la cuenta A y sumar $100 a la cuenta B. Si el sistema falla entre las dos operaciones, acabarías con $100 menos en A pero sin que aparezcan en B. Una transacción garantiza que ambas operaciones ocurran juntas o ninguna.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de transacciones',
      texto: 'BEGIN TRANSACTION;  -- Inicia la transacción\n\nINSERT INTO ...\nUPDATE ...\nDELETE ...\n\nCOMMIT;  -- Confirma todos los cambios\n-- o bien:\nROLLBACK;  -- Deshace todos los cambios',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Propiedades ACID',
      cabeceras: ['Propiedad', 'Descripción', 'Garantía'],
      filas: [
        ['Atomicidad', 'Todo o nada', 'Si algo falla, se deshace todo'],
        ['Consistencia', 'De un estado válido a otro válido', 'Las reglas de la BD se respetan'],
        ['Isolación', 'Las transacciones no se interfieren', 'Concurrencia controlada'],
        ['Durabilidad', 'Los cambios confirmados persisten', 'Sobreviven a fallos del sistema'],
      ],
    },
    {
      tipo: 'resumen',
      puntos: [
        'BEGIN inicia una transacción',
        'COMMIT confirma todos los cambios de la transacción',
        'ROLLBACK deshace todos los cambios de la transacción',
        'ACID: Atomicidad, Consistencia, Isolación, Durabilidad',
        'Usa transacciones para operaciones críticas multi-paso',
      ],
    },
  ],
  ejercicios: [],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué pasa si ocurre un error durante una transacción y ejecutas ROLLBACK?',
      opciones: [
        'Solo se deshacen las operaciones anteriores al error',
        'Se deshacen TODAS las operaciones de la transacción desde el BEGIN',
        'Los cambios confirmados permanecen, solo los nuevos se deshacen',
        'La base de datos se corrompe',
      ],
      correcta: 1,
      explicacion: 'ROLLBACK deshace TODAS las operaciones realizadas desde el BEGIN TRANSACTION. Es la propiedad de Atomicidad: todo o nada.',
    },
  ],
};
