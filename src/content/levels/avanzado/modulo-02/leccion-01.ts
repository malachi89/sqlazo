import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'av-02-01',
  titulo: 'Índices — Aceleración de consultas',
  descripcion: 'Aprende qué son los índices, cómo funcionan internamente y cuándo crearlos.',
  duracionMinutos: 30,
  conceptosClave: ['INDEX', 'Índice', 'Rendimiento', 'B-Tree'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Un índice es una estructura de datos que acelera las búsquedas en una tabla. Sin índices, SQLite revisa cada fila (full scan). Con índices, salta directamente a los registros relevantes.',
    },
    {
      tipo: 'analogia',
      icono: '📚',
      texto: 'Un índice de base de datos es exactamente como el índice de un libro. Sin índice, para encontrar "normalización" en un libro de 500 páginas, tienes que leer todas las páginas. Con el índice, saltas directamente a la página correcta.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Cómo crear índices',
      texto: '-- Índice simple:\nCREATE INDEX idx_nombre ON empleados(nombre);\n\n-- Índice único (como clave primaria pero en otra columna):\nCREATE UNIQUE INDEX idx_email ON usuarios(email);\n\n-- Índice compuesto (múltiples columnas):\nCREATE INDEX idx_dept_sal ON empleados(departamento, salario);\n\n-- Eliminar índice:\nDROP INDEX idx_nombre;',
    },
    {
      tipo: 'tabla-visual',
      titulo: '¿Cuándo usar índices?',
      cabeceras: ['Caso', 'Recomendación', 'Razón'],
      filas: [
        ['WHERE columna = valor', 'Crear índice', 'Búsqueda frecuente'],
        ['ORDER BY columna', 'Crear índice', 'Evita ordenamiento costoso'],
        ['JOIN ON col1 = col2', 'Índice en ambas columnas', 'JOINs son costosos sin índice'],
        ['Columnas con muchos duplicados (ej: sexo)', 'No crear índice', 'Poca selectividad, poco beneficio'],
        ['Tablas muy pequeñas', 'No necesario', 'Full scan puede ser más rápido'],
        ['Columnas actualizadas frecuentemente', 'Con precaución', 'Los índices tienen costo en escritura'],
      ],
    },
    {
      tipo: 'advertencia',
      texto: 'Los índices aceleran las lecturas (SELECT) pero ralentizan las escrituras (INSERT, UPDATE, DELETE) porque hay que actualizar el índice. No crees índices en todas las columnas — solo en las que realmente necesites.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'Los índices aceleran las búsquedas evitando full table scans',
        'CREATE INDEX nombre ON tabla(columna) crea un índice',
        'Los índices mejoran SELECT pero tienen costo en INSERT/UPDATE/DELETE',
        'Índices únicos garantizan que no haya valores duplicados',
        'Los índices compuestos son útiles para consultas con múltiples condiciones',
      ],
    },
  ],
  ejercicios: [],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuál es el principal inconveniente de los índices?',
      opciones: [
        'Ocupan algo de espacio en disco y ralentizan las operaciones de escritura',
        'Solo funcionan con claves primarias',
        'Hacen las consultas SELECT más lentas',
        'No funcionan con texto',
      ],
      correcta: 0,
      explicacion: 'Los índices ocupan espacio extra y tienen costo en INSERT, UPDATE y DELETE porque hay que mantenerlos actualizados. Es un trade-off: más rápido para leer, más lento para escribir.',
    },
  ],
};
