import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'mn-01-01',
  titulo: '¿Qué es una base de datos?',
  descripcion: 'Aprende qué es una base de datos, para qué sirve y cómo se diferencia de una hoja de cálculo.',
  duracionMinutos: 10,
  conceptosClave: ['Base de datos', 'Datos', 'Información'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Imagina que tienes miles de contactos en tu teléfono. Buscar uno específico es fácil porque el teléfono los organiza automáticamente. Eso, en esencia, es lo que hace una base de datos: organizar información para encontrarla y usarla fácilmente.',
    },
    {
      tipo: 'analogia',
      icono: '🗂️',
      texto: 'Piensa en una base de datos como un archivero gigante muy bien organizado. Cada cajón tiene carpetas, y cada carpeta tiene documentos. Pero a diferencia de un archivero físico, puedes buscar cualquier documento en milésimas de segundo.',
    },
    {
      tipo: 'explicacion',
      titulo: '¿Qué es exactamente una base de datos?',
      texto: 'Una base de datos es un sistema organizado para almacenar, gestionar y recuperar información. Las empresas las usan para guardar datos de clientes, productos, ventas, empleados y cualquier otra información importante.\n\nPor ejemplo:\n• Un hospital guarda el historial médico de sus pacientes\n• Una tienda online guarda todos sus productos y pedidos\n• Una red social guarda perfiles, publicaciones y conexiones\n• Un banco guarda las cuentas y movimientos de sus clientes',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Base de datos vs Hoja de cálculo (Excel)',
      cabeceras: ['Característica', 'Hoja de cálculo', 'Base de datos'],
      filas: [
        ['Cantidad de datos', 'Miles de filas', 'Millones o billones de filas'],
        ['Múltiples usuarios', 'Difícil', 'Diseñado para ello'],
        ['Velocidad de búsqueda', 'Lenta en datos grandes', 'Muy rápida siempre'],
        ['Relaciones entre datos', 'Manual y complicado', 'Nativa y eficiente'],
        ['Seguridad', 'Básica', 'Avanzada y controlada'],
        ['Consistencia de datos', 'Propensa a errores', 'Controlada automáticamente'],
      ],
    },
    {
      tipo: 'explicacion',
      titulo: 'Tipos de bases de datos',
      texto: 'Existen varios tipos de bases de datos, pero las más populares son las bases de datos relacionales. En ellas, la información se organiza en tablas (como hojas de cálculo), y esas tablas pueden estar conectadas entre sí.\n\nEjemplos de bases de datos relacionales populares:\n• MySQL — usada por Facebook, Twitter, YouTube\n• PostgreSQL — muy poderosa y open source\n• SQLite — pequeña y perfecta para aprender (¡la que usamos en este curso!)\n• Microsoft SQL Server — muy usada en empresas grandes\n• Oracle — muy usada en aplicaciones empresariales críticas',
    },
    {
      tipo: 'nota',
      texto: 'En este curso trabajamos con SQLite, que es una base de datos que funciona completamente en tu navegador. No necesitas instalar nada. SQLite es la base de datos más utilizada en el mundo: está en tu teléfono, en tu computadora y en millones de aplicaciones.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'Una base de datos es un sistema organizado para guardar y recuperar información',
        'Son mucho más poderosas que las hojas de cálculo para manejar grandes cantidades de datos',
        'Las bases de datos relacionales organizan la información en tablas',
        'SQL es el lenguaje que usamos para hablarle a una base de datos',
        'SQLite es la base de datos que usaremos en este curso: funciona directo en el navegador',
      ],
    },
  ],
  ejercicios: [],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuál es la principal ventaja de una base de datos sobre una hoja de cálculo?',
      opciones: [
        'Tiene colores más bonitos',
        'Puede manejar millones de registros con rapidez y permite acceso simultáneo de muchos usuarios',
        'Es más fácil de aprender',
        'Solo funciona en internet',
      ],
      correcta: 1,
      explicacion: 'Las bases de datos están diseñadas para manejar grandes volúmenes de datos con eficiencia y permiten que muchos usuarios accedan simultáneamente, algo que las hojas de cálculo no pueden hacer bien.',
    },
    {
      id: 'q2',
      pregunta: '¿Qué tipo de base de datos usaremos en este curso?',
      opciones: ['MySQL', 'Oracle', 'SQLite', 'MongoDB'],
      correcta: 2,
      explicacion: 'Usamos SQLite, que es la base de datos más utilizada en el mundo y tiene la ventaja de funcionar completamente en el navegador sin necesidad de instalación.',
    },
    {
      id: 'q3',
      pregunta: '¿Cuál de estos es un ejemplo real del uso de bases de datos?',
      opciones: [
        'Guardar una foto en tu teléfono',
        'Escribir un documento de texto',
        'El historial médico de un hospital con millones de pacientes',
        'Escuchar música con auriculares',
      ],
      correcta: 2,
      explicacion: 'Los hospitales usan bases de datos para guardar el historial médico de sus pacientes. Es un ejemplo perfecto de datos estructurados que necesitan organización eficiente y acceso rápido.',
    },
  ],
};
