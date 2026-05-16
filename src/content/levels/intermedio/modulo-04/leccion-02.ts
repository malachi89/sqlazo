import type { Leccion } from '../../../../types';
import { SETUP_EMPLEADOS_BASICO } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'in-04-02',
  titulo: 'UPDATE — Actualizar datos',
  descripcion: 'Aprende a modificar filas existentes con UPDATE y a evitar el error más peligroso de SQL.',
  duracionMinutos: 20,
  conceptosClave: ['UPDATE', 'SET', 'WHERE en UPDATE'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'UPDATE modifica datos existentes en una tabla. Es muy poderoso, pero también peligroso: olvidar el WHERE en un UPDATE modifica TODAS las filas de la tabla.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de UPDATE',
      texto: 'UPDATE tabla\nSET columna1 = nuevo_valor1, columna2 = nuevo_valor2\nWHERE condicion\n\nSin el WHERE, actualiza TODAS las filas.',
    },
    {
      tipo: 'advertencia',
      texto: '⚠️ SIEMPRE incluye WHERE en UPDATE. Si escribes UPDATE empleados SET salario = 0 sin WHERE, todos los empleados tendrán salario 0. Verifica dos veces el WHERE antes de ejecutar.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Actualizar el salario de un empleado',
      descripcion: 'Actualizamos solo el empleado con id=2.',
      sql: 'UPDATE empleados SET salario = 70000 WHERE id = 2;\nSELECT nombre, salario FROM empleados WHERE id = 2;',
  setupSql: SETUP_EMPLEADOS_BASICO,
      tablaResultado: {
        columnas: ['nombre', 'salario'],
        filas: [['Carlos', 70000]],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        'UPDATE tabla SET col=val WHERE condicion modifica filas',
        'SIN WHERE: actualiza TODAS las filas (muy peligroso)',
        'Puedes actualizar múltiples columnas en un UPDATE',
        'Puedes usar valores calculados: SET precio = precio * 1.1',
        'Siempre verifica el WHERE antes de ejecutar',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'in-04-02-e1',
      titulo: 'Aplicar aumento de sueldo',
      descripcion: 'Aumenta el salario un 10% a todos los empleados del departamento "Tecnología".',
      setupSql: `
        CREATE TABLE empleados (id INTEGER, nombre TEXT, departamento TEXT, salario REAL);
        INSERT INTO empleados VALUES (1,'María','Ventas',45000);
        INSERT INTO empleados VALUES (2,'Carlos','Tecnología',65000);
        INSERT INTO empleados VALUES (3,'Ana','RRHH',48000);
        INSERT INTO empleados VALUES (4,'Pedro','Ventas',42000);
        INSERT INTO empleados VALUES (5,'Laura','Tecnología',70000);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'departamento', 'salario'],
        filas: [
          ['María', 'Ventas', 45000],
          ['Carlos', 'Tecnología', 71500],
          ['Ana', 'RRHH', 48000],
          ['Pedro', 'Ventas', 42000],
          ['Laura', 'Tecnología', 77000],
        ],
      },
      solucionOficial: "UPDATE empleados SET salario = salario * 1.1 WHERE departamento = 'Tecnología';\nSELECT nombre, departamento, salario FROM empleados;",
      pistas: [
        "Usa SET salario = salario * 1.1 para aumentar 10%",
        "Filtra por departamento = 'Tecnología' con WHERE",
        "UPDATE empleados SET salario = salario * 1.1 WHERE departamento = 'Tecnología'",
      ],
      explicacion: "SET salario = salario * 1.1 multiplica el salario actual por 1.1 (aumento del 10%). WHERE departamento = 'Tecnología' restringe el cambio solo a esos empleados.",
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué pasa si ejecutas UPDATE productos SET precio = 0 sin WHERE?',
      opciones: [
        'Actualiza solo el primer producto',
        'Da error porque falta el WHERE',
        'Actualiza TODOS los productos, poniendo precio 0 a todos',
        'No hace nada',
      ],
      correcta: 2,
      explicacion: 'Sin WHERE, UPDATE afecta TODAS las filas de la tabla. Esto podría destruir todos tus datos. Siempre incluye WHERE para limitar qué filas se modifican.',
    },
  ],
};
