import type { Leccion } from '../../../../types';
import { SETUP_EMPLEADOS_BASICO } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'av-04-01',
  titulo: 'Triggers — Automatización en la base de datos',
  descripcion: 'Aprende a crear triggers que se ejecutan automáticamente cuando se modifican datos.',
  duracionMinutos: 30,
  conceptosClave: ['Trigger', 'AFTER INSERT', 'BEFORE UPDATE', 'OLD', 'NEW'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Un trigger es código SQL que se ejecuta automáticamente cuando ocurre un evento (INSERT, UPDATE, DELETE) en una tabla. Son perfectos para auditoría, validaciones y automatizaciones.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de triggers en SQLite',
      texto: 'CREATE TRIGGER nombre_trigger\n  AFTER INSERT ON tabla\nBEGIN\n  -- código SQL que se ejecuta\nEND;\n\nEventos disponibles: BEFORE/AFTER INSERT, UPDATE, DELETE\n\nVariables especiales:\n• NEW.columna = nuevo valor (en INSERT y UPDATE)\n• OLD.columna = valor anterior (en UPDATE y DELETE)',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Trigger de auditoría',
      descripcion: 'Registramos automáticamente cada cambio de salario en una tabla de auditoría.',
      sql: "CREATE TRIGGER audit_salario\n  AFTER UPDATE OF salario ON empleados\nBEGIN\n  INSERT INTO auditoria (tabla, empleado_id, campo, valor_anterior, valor_nuevo, fecha)\n  VALUES ('empleados', OLD.id, 'salario', OLD.salario, NEW.salario, datetime('now'));\nEND;",
      setupSql: SETUP_EMPLEADOS_BASICO,
      tablaResultado: {
        columnas: ['Resultado'],
        filas: [['Trigger creado. Cada cambio de salario se registra automáticamente.']],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        'Un trigger se ejecuta automáticamente ante INSERT, UPDATE o DELETE',
        'BEFORE o AFTER define cuándo se ejecuta (antes o después del evento)',
        'NEW.col accede al nuevo valor; OLD.col al valor anterior',
        'Útiles para auditoría, validaciones y sincronizaciones',
        'DROP TRIGGER nombre elimina el trigger',
      ],
    },
  ],
  ejercicios: [],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuándo se ejecuta un AFTER UPDATE trigger?',
      opciones: [
        'Antes de que el UPDATE se aplique',
        'Después de que el UPDATE se aplique exitosamente',
        'Solo si el UPDATE falla',
        'Antes y después del UPDATE',
      ],
      correcta: 1,
      explicacion: 'Un AFTER UPDATE trigger se ejecuta DESPUÉS de que el UPDATE se ha aplicado exitosamente. BEFORE ejecutaría antes, permitiendo validar o modificar los datos antes de guardarlos.',
    },
    {
      id: 'q2',
      pregunta: '¿Qué representa NEW.columna en un trigger?',
      opciones: [
        'El valor anterior de la columna',
        'El nuevo valor que se está insertando o actualizando',
        'El nombre de la columna',
        'El tipo de dato de la columna',
      ],
      correcta: 1,
      explicacion: 'NEW.columna accede al nuevo valor que se está insertando (INSERT) o al valor actualizado (UPDATE). OLD.columna accede al valor anterior en UPDATE y DELETE.',
    },
    {
      id: 'q3',
      pregunta: '¿Cómo eliminas un trigger existente?',
      opciones: [
        'DELETE TRIGGER nombre',
        'DROP TRIGGER nombre',
        'REMOVE TRIGGER nombre',
        'ALTER TRIGGER nombre DISABLE',
      ],
      correcta: 1,
      explicacion: 'Se usa DROP TRIGGER nombre_trigger para eliminar un trigger. Es similar a DROP TABLE o DROP VIEW.',
    },
  ],
};
