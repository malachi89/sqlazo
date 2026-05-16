import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'av-04-02',
  titulo: 'Triggers avanzados — BEFORE y validaciones',
  descripcion: 'Aprende a usar triggers BEFORE para validar datos y modificar valores antes de guardarlos.',
  duracionMinutos: 25,
  conceptosClave: ['BEFORE INSERT', 'BEFORE UPDATE', 'Validación', 'RAISE', 'WHEN'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Los triggers AFTER se ejecutan después del cambio. Pero los triggers BEFORE se ejecutan ANTES, lo que te permite validar datos, rechazar operaciones o modificar valores antes de que se guarden.',
    },
    {
      tipo: 'analogia',
      icono: '🛡️',
      texto: 'Un trigger BEFORE es como un guardia de seguridad en la entrada de un edificio. Revisa tu identificación antes de dejarte pasar. Si algo no está bien, te rechaza. Un trigger AFTER es como una cámara de seguridad: registra lo que pasó pero no puede evitarlo.',
    },
    {
      tipo: 'explicacion',
      titulo: 'BEFORE INSERT y BEFORE UPDATE',
      texto: 'BEFORE triggers pueden:\n1. Modificar NEW.columna antes de que se guarde\n2. Rechazar la operación con RAISE(ABORT, \'mensaje\')\n3. Validar condiciones complejas\n\nEjemplo de validación:\nCREATE TRIGGER validar_edad\n  BEFORE INSERT ON personas\nBEGIN\n  SELECT RAISE(ABORT, \'Edad debe ser mayor a 0\')\n    WHERE NEW.edad <= 0;\nEND;',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Trigger que valida salario mínimo',
      descripcion: 'Rechaza cualquier intento de insertar o actualizar un empleado con salario menor a $10,000.',
      sql: `CREATE TRIGGER validar_salario_minimo
  BEFORE INSERT ON empleados
BEGIN
  SELECT RAISE(ABORT, 'El salario no puede ser menor a $10,000')
    WHERE NEW.salario < 10000;
END;`,
      setupSql: `
        CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento TEXT, salario REAL);
        INSERT INTO empleados VALUES (1,'María','Ventas',45000);
        INSERT INTO empleados VALUES (2,'Carlos','Tecnología',65000);
      `,
      tablaResultado: {
        columnas: ['Resultado'],
        filas: [['Trigger creado. Intentar INSERT con salario < 10000 causará error.']],
      },
    },
    {
      tipo: 'ejemplo',
      titulo: 'Trigger que auto-formatea datos',
      descripcion: 'Convierte automáticamente el nombre a mayúsculas antes de guardar.',
      sql: `CREATE TRIGGER nombre_mayusculas
  BEFORE INSERT ON empleados
BEGIN
  UPDATE empleados SET nombre = UPPER(NEW.nombre)
    WHERE id = NEW.id;
END;`,
      setupSql: `
        CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento TEXT);
      `,
      tablaResultado: {
        columnas: ['Resultado'],
        filas: [['Trigger creado. Los nombres se guardarán en MAYÚSCULAS automáticamente.']],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'Trigger con WHEN (condicional)',
      texto: 'Puedes agregar una cláusula WHEN para que el trigger solo se ejecute bajo ciertas condiciones:\n\nCREATE TRIGGER log_cambios_grandes\n  AFTER UPDATE ON productos\n  WHEN NEW.precio > OLD.precio * 1.5\nBEGIN\n  INSERT INTO alertas (producto_id, precio_anterior, precio_nuevo)\n  VALUES (OLD.id, OLD.precio, NEW.precio);\nEND;\n\nEste trigger solo se dispara si el precio aumentó más del 50%.',
    },
    {
      tipo: 'error-comun',
      titulo: 'Trigger recursivo infinito',
      codigoMal: 'CREATE TRIGGER t BEFORE UPDATE ON empleados BEGIN UPDATE empleados SET ... WHERE id = NEW.id; END;',
      problema: 'Un BEFORE UPDATE que hace UPDATE en la misma tabla puede causar recursión infinita. El UPDATE dentro del trigger dispara el trigger de nuevo.',
      codigoBien: 'Modificar NEW.columna directamente en BEFORE triggers: SET NEW.columna = UPPER(NEW.nombre)',
      solucion: 'En BEFORE triggers, modifica NEW.columna directamente en lugar de hacer un UPDATE en la misma tabla.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'BEFORE triggers se ejecutan antes de que el cambio se guarde',
        'Pueden validar datos y rechazar operaciones con RAISE(ABORT, ...)',
        'Pueden modificar NEW.columna para transformar datos',
        'WHEN permite ejecutar el trigger solo bajo ciertas condiciones',
        'Evita UPDATE en la misma tabla dentro de un trigger (recursión)',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'av-04-02-e1',
      titulo: 'Trigger que valida stock negativo',
      descripcion: 'Crea un trigger BEFORE UPDATE que impida que el stock de un producto sea negativo. Si alguien intenta poner stock < 0, debe rechazar la operación con el mensaje "El stock no puede ser negativo".',
      objetivo: 'BEFORE UPDATE con RAISE para validación.',
      setupSql: `
        CREATE TABLE productos (id INTEGER PRIMARY KEY, nombre TEXT, stock INTEGER);
        INSERT INTO productos VALUES (1,'Laptop',50);
        INSERT INTO productos VALUES (2,'Mouse',200);
      `,
      resultadoEsperado: {
        columnas: ['Resultado'],
        filas: [['Trigger creado. UPDATE con stock < 0 será rechazado.']],
      },
      solucionOficial: `CREATE TRIGGER validar_stock
  BEFORE UPDATE ON productos
BEGIN
  SELECT RAISE(ABORT, 'El stock no puede ser negativo')
    WHERE NEW.stock < 0;
END;`,
      pistas: [
        'Usa BEFORE UPDATE ON productos',
        'RAISE(ABORT, \'mensaje\') para rechazar',
        'WHERE NEW.stock < 0 como condición',
      ],
      explicacion: 'El trigger se ejecuta antes de cada UPDATE. Si el nuevo valor de stock es negativo, RAISE(ABORT, ...) rechaza la operación con un mensaje de error.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué puede hacer un trigger BEFORE que no puede hacer un trigger AFTER?',
      opciones: [
        'Ejecutarse más rápido',
        'Rechazar la operación o modificar los datos antes de guardarlos',
        'Acceder a OLD y NEW',
        'Ejecutarse en múltiples tablas',
      ],
      correcta: 1,
      explicacion: 'Los triggers BEFORE pueden modificar NEW.columna antes de que se guarde y rechazar operaciones con RAISE(ABORT, ...). Los AFTER solo pueden reaccionar después de que el cambio ya ocurrió.',
    },
    {
      id: 'q2',
      pregunta: '¿Qué hace RAISE(ABORT, \'mensaje\') en un trigger?',
      opciones: [
        'Registra el mensaje en un log',
        'Aborta la operación actual y muestra el mensaje como error',
        'Envía una notificación al administrador',
        'Continua la operación pero guarda el mensaje',
      ],
      correcta: 1,
      explicacion: 'RAISE(ABORT, \'mensaje\') detiene inmediatamente la operación que disparó el trigger y muestra el mensaje como un error de SQL. Es la forma de validar y rechazar datos en triggers.',
    },
  ],
};
