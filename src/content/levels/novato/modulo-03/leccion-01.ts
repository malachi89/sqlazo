import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'no-03-01',
  titulo: 'Claves primarias y foráneas',
  descripcion: 'Entiende las relaciones entre tablas con PRIMARY KEY y FOREIGN KEY.',
  duracionMinutos: 20,
  conceptosClave: ['PRIMARY KEY', 'FOREIGN KEY', 'Relaciones', 'Integridad referencial'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Las bases de datos relacionales deben su nombre a las relaciones entre tablas. Las claves primarias y foráneas son los mecanismos que hacen posibles estas relaciones.',
    },
    {
      tipo: 'explicacion',
      titulo: 'PRIMARY KEY (Clave Primaria)',
      texto: 'Ya hemos visto la clave primaria. Recapitulando:\n• Identifica de forma única cada fila de una tabla\n• No puede ser NULL\n• No puede haber dos filas con el mismo valor\n• Cada tabla debe tener exactamente una clave primaria\n\nEjemplo:\nCREATE TABLE clientes (\n  id INTEGER PRIMARY KEY,\n  nombre TEXT\n)',
    },
    {
      tipo: 'explicacion',
      titulo: 'FOREIGN KEY (Clave Foránea)',
      texto: 'Una clave foránea es una columna en una tabla que referencia la clave primaria de otra tabla.\n\nEjemplo:\nCREATE TABLE pedidos (\n  id INTEGER PRIMARY KEY,\n  cliente_id INTEGER,\n  total REAL,\n  FOREIGN KEY (cliente_id) REFERENCES clientes(id)\n)\n\nLa columna cliente_id en pedidos "apunta" a la columna id en clientes. Esto establece la relación.',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Tipos de relaciones',
      cabeceras: ['Tipo', 'Descripción', 'Ejemplo'],
      filas: [
        ['Uno a uno (1:1)', 'Un registro de A se relaciona con exactamente uno de B', 'Una persona tiene un pasaporte'],
        ['Uno a muchos (1:N)', 'Un registro de A se relaciona con muchos de B', 'Un cliente tiene muchos pedidos'],
        ['Muchos a muchos (N:M)', 'Muchos de A con muchos de B', 'Productos y pedidos (un pedido tiene muchos productos, un producto está en muchos pedidos)'],
      ],
    },
    {
      tipo: 'resumen',
      puntos: [
        'PRIMARY KEY identifica de forma única cada fila de una tabla',
        'FOREIGN KEY es una referencia a la PRIMARY KEY de otra tabla',
        'Las claves foráneas establecen las relaciones entre tablas',
        'Tipos de relaciones: 1:1, 1:N, N:M',
        'La integridad referencial garantiza que las claves foráneas apunten a registros existentes',
      ],
    },
  ],
  ejercicios: [],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuál es el propósito de una FOREIGN KEY?',
      opciones: [
        'Identificar de forma única cada fila de una tabla',
        'Referenciar la clave primaria de otra tabla para establecer una relación',
        'Ordenar los datos de forma eficiente',
        'Evitar que se ingresen valores duplicados',
      ],
      correcta: 1,
      explicacion: 'Una FOREIGN KEY (clave foránea) referencia la clave primaria de otra tabla. Es el mecanismo que establece las relaciones entre tablas en una base de datos relacional.',
    },
  ],
};
