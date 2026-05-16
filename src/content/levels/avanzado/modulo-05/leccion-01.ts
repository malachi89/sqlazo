import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'av-05-01',
  titulo: 'Modelado Entidad-Relación',
  descripcion: 'Aprende a diseñar bases de datos profesionales partiendo de diagramas ER y convirtiéndolos a SQL.',
  duracionMinutos: 35,
  conceptosClave: ['ER', 'Entidad', 'Relación', 'Diagrama', 'Modelado'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'El modelado Entidad-Relación (ER) es la metodología estándar para diseñar bases de datos. Antes de escribir una sola línea de SQL, defines las entidades, sus atributos y cómo se relacionan entre sí.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Componentes de un diagrama ER',
      texto: '• Entidades: "cosas" del mundo real que queremos modelar (Cliente, Producto, Pedido)\n• Atributos: características de las entidades (nombre, precio, fecha)\n• Relaciones: cómo se conectan las entidades (un Cliente HACE muchos Pedidos)\n• Cardinalidad: cuántos de cada lado (1:1, 1:N, N:M)',
    },
    {
      tipo: 'explicacion',
      titulo: 'De ER a SQL',
      texto: 'Cada entidad → una tabla\nCada atributo → una columna\nRelación 1:N → clave foránea en la tabla "muchos"\nRelación N:M → tabla intermedia (tabla de unión)\n\nEjemplo:\nClienteId —< Pedidos >— Productos\n↓ SQL:\nclientes (id, nombre, email)\npedidos (id, cliente_id FK, fecha, total)\nproductos (id, nombre, precio)\ndetalles_pedido (pedido_id FK, producto_id FK, cantidad)',
    },
    {
      tipo: 'resumen',
      puntos: [
        'Modela primero en papel/ER antes de crear tablas',
        'Cada entidad se convierte en una tabla',
        'Las relaciones 1:N se implementan con claves foráneas',
        'Las relaciones N:M necesitan una tabla intermedia',
        'Los atributos calculables (edad desde fecha_nacimiento) generalmente no se almacenan',
      ],
    },
  ],
  ejercicios: [],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cómo se implementa una relación N:M (muchos a muchos) en SQL?',
      opciones: [
        'Con una clave foránea en una de las tablas',
        'Con una tabla intermedia (tabla de unión) que contiene las claves foráneas de ambas tablas',
        'No es posible implementar N:M en SQL',
        'Con vistas',
      ],
      correcta: 1,
      explicacion: 'Las relaciones N:M se implementan con una tabla intermedia (también llamada tabla de unión o tabla pivote). Esta tabla contiene las claves foráneas de ambas entidades relacionadas.',
    },
  ],
};
