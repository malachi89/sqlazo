import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'in-05-02',
  titulo: 'Normalización — 1FN, 2FN y 3FN',
  descripcion: 'Aprende a diseñar bases de datos bien estructuradas con las tres primeras formas normales.',
  duracionMinutos: 35,
  conceptosClave: ['Normalización', '1FN', '2FN', '3FN', 'Dependencia funcional'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'La normalización es el proceso de organizar las tablas de una base de datos para minimizar la redundancia y prevenir anomalías de actualización. Las formas normales son estándares que guían este proceso.',
    },
    {
      tipo: 'explicacion',
      titulo: '¿Por qué normalizar?',
      texto: 'Sin normalización, los datos se repiten innecesariamente:\n\n| id | cliente | direccion | producto | precio |\n|----|---------|-----------|---------|-------|\n| 1  | Ana     | Madrid    | Laptop  | 1300  |\n| 2  | Ana     | Madrid    | Mouse   | 30    |\n| 3  | Bob     | NYC       | Laptop  | 1300  |\n\nProblemas:\n• Si Ana cambia de dirección, hay que actualizar múltiples filas\n• Si eliminas el pedido de Bob, pierdes que el precio del Laptop es 1300\n• Difícil agregar datos sin información completa',
    },
    {
      tipo: 'explicacion',
      titulo: 'Primera Forma Normal (1FN)',
      texto: 'Una tabla está en 1FN si:\n1. Cada columna tiene valores atómicos (indivisibles)\n2. No hay grupos repetitivos\n3. Cada fila es única (tiene clave primaria)\n\nViolación de 1FN:\n| id | nombre | telefonos          |\n|----|--------|-------------------|\n| 1  | Ana    | 555-1234, 555-5678 |\n\nSolución: separar en dos tablas o en múltiples filas.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Segunda Forma Normal (2FN)',
      texto: 'Una tabla está en 2FN si está en 1FN Y todas las columnas no-clave dependen de la clave primaria COMPLETA.\n\nSolo aplica cuando la clave primaria es compuesta (varios campos).\n\nViolación de 2FN (clave: pedido_id + producto_id):\n| pedido_id | producto_id | cantidad | precio_producto |\n\nprecio_producto depende solo de producto_id (no del pedido). Debe moverse a la tabla productos.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Tercera Forma Normal (3FN)',
      texto: 'Una tabla está en 3FN si está en 2FN Y no hay dependencias transitivas (una columna depende de otra columna no-clave).\n\nViolación de 3FN:\n| empleado_id | nombre | departamento_id | nombre_depto | presupuesto_depto |\n\nnombre_depto y presupuesto_depto dependen de departamento_id, no directamente del empleado_id.\n\nSolución: mover nombre_depto y presupuesto_depto a una tabla departamentos separada.',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Las 3 formas normales resumidas',
      cabeceras: ['Forma Normal', 'Requisito', 'Problema que resuelve'],
      filas: [
        ['1FN', 'Valores atómicos, sin grupos repetidos, clave primaria', 'Datos en múltiples valores por celda'],
        ['2FN', '1FN + todo depende de la clave completa', 'Datos duplicados en claves compuestas'],
        ['3FN', '2FN + sin dependencias transitivas', 'Datos que dependen de campos no-clave'],
      ],
    },
    {
      tipo: 'resumen',
      puntos: [
        '1FN: valores atómicos, sin grupos repetidos, clave primaria',
        '2FN: no hay dependencias parciales de la clave primaria',
        '3FN: no hay dependencias transitivas entre columnas',
        'La normalización reduce redundancia y mejora integridad',
        'La desnormalización controlada puede mejorar rendimiento en casos específicos',
      ],
    },
  ],
  ejercicios: [],
  cuestionario: [
    {
      id: 'q1',
      pregunta: 'Una tabla tiene la columna "telefonos" con valores como "555-1234, 555-5678". ¿Qué forma normal viola?',
      opciones: [
        'Segunda Forma Normal (2FN)',
        'Tercera Forma Normal (3FN)',
        'Primera Forma Normal (1FN) — valores no atómicos',
        'No viola ninguna forma normal',
      ],
      correcta: 2,
      explicacion: 'Tener múltiples teléfonos en una sola celda viola la 1FN porque los valores no son atómicos (indivisibles). La solución es crear una tabla separada de teléfonos.',
    },
    {
      id: 'q2',
      pregunta: '¿Cuál es el principal objetivo de la normalización?',
      opciones: [
        'Hacer las consultas más rápidas',
        'Reducir la redundancia de datos y prevenir anomalías de actualización',
        'Limitar el número de tablas en la base de datos',
        'Simplificar las consultas SQL',
      ],
      correcta: 1,
      explicacion: 'La normalización busca eliminar datos redundantes y prevenir anomalías. Una base de datos bien normalizada garantiza que cada dato se almacena una sola vez y los cambios se propagan correctamente.',
    },
  ],
};
