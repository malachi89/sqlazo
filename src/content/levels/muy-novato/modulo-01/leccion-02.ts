import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'mn-01-02',
  titulo: '¿Qué es SQL?',
  descripcion: 'Descubre qué es SQL, cómo funciona y por qué es el lenguaje más importante para trabajar con datos.',
  duracionMinutos: 12,
  conceptosClave: ['SQL', 'Consulta', 'Lenguaje de base de datos'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'SQL (Structured Query Language — Lenguaje de Consulta Estructurado) es el idioma que se usa para hablarle a una base de datos. Con SQL le dices a la base de datos qué información quieres, cómo quieres que la organice y qué hacer con ella.',
    },
    {
      tipo: 'analogia',
      icono: '🗣️',
      texto: 'SQL es como hacer un pedido en un restaurante. Tú (el programador) eres el cliente. La base de datos es la cocina. SQL es el idioma con el que haces el pedido al mesero. No necesitas saber cómo cocinar (cómo funciona la base de datos por dentro), solo necesitas saber cómo pedir lo que quieres.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Historia de SQL',
      texto: 'SQL nació en los años 70 en los laboratorios de IBM. Desde entonces se convirtió en el estándar mundial para manejar bases de datos relacionales.\n\nHoy en día, SQL es uno de los lenguajes más demandados en el mercado laboral. Prácticamente cualquier empresa que maneje datos usa SQL:\n• Analistas de datos\n• Desarrolladores de software\n• Científicos de datos\n• Administradores de bases de datos\n• Ingenieros de datos\n\nAprender SQL te abre puertas en prácticamente cualquier área tecnológica.',
    },
    {
      tipo: 'explicacion',
      titulo: '¿Qué puedes hacer con SQL?',
      texto: 'Con SQL puedes hacer 4 cosas fundamentales (conocidas como operaciones CRUD):\n\n1. CONSULTAR datos (SELECT): Preguntar "¿qué información hay en la base de datos?"\n2. INSERTAR datos (INSERT): Agregar nueva información\n3. ACTUALIZAR datos (UPDATE): Modificar información existente\n4. ELIMINAR datos (DELETE): Borrar información\n\nEn este curso aprenderás todas estas operaciones, empezando por la más usada: SELECT.',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Las 4 operaciones fundamentales de SQL',
      cabeceras: ['Operación', 'Comando SQL', 'Analogía', 'Ejemplo'],
      filas: [
        ['Consultar', 'SELECT', 'Buscar en el archivero', 'Ver todos los empleados'],
        ['Insertar', 'INSERT', 'Agregar un documento nuevo', 'Registrar un nuevo empleado'],
        ['Actualizar', 'UPDATE', 'Editar un documento', 'Cambiar el salario de alguien'],
        ['Eliminar', 'DELETE', 'Sacar un documento', 'Dar de baja a un empleado'],
      ],
    },
    {
      tipo: 'explicacion',
      titulo: 'Tu primera vista de SQL',
      texto: 'Una consulta SQL se escribe en inglés y es bastante legible. Por ejemplo, si quieres ver todos los productos de una tienda, escribirías:\n\nSELECT * FROM productos\n\nEn español eso significa: "SELECCIONA todo DE la tabla productos". ¿Ves qué natural se lee?\n\nEn este curso aprenderás exactamente cómo escribir estas consultas, paso a paso, desde las más simples hasta las más complejas.',
    },
    {
      tipo: 'nota',
      texto: 'SQL no distingue entre mayúsculas y minúsculas para las palabras reservadas. "SELECT" y "select" y "Select" funcionan igual. Sin embargo, por convención, los programadores escriben las palabras clave en MAYÚSCULAS para que el código sea más fácil de leer.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'SQL significa "Structured Query Language" — el lenguaje estándar para bases de datos',
        'Con SQL puedes consultar, insertar, actualizar y eliminar datos (CRUD)',
        'SQL es legible y natural: "SELECT * FROM productos" significa seleccionar todo de productos',
        'SQL lleva más de 50 años siendo el estándar mundial para bases de datos',
        'Es uno de los lenguajes más demandados en el mercado laboral',
      ],
    },
  ],
  ejercicios: [],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué significa el acrónimo SQL?',
      opciones: [
        'Software Query Language',
        'Structured Query Language',
        'Simple Question Language',
        'System Query Logic',
      ],
      correcta: 1,
      explicacion: 'SQL significa "Structured Query Language" (Lenguaje de Consulta Estructurado). Es el lenguaje estándar para interactuar con bases de datos relacionales.',
    },
    {
      id: 'q2',
      pregunta: '¿Cuál es el comando SQL para consultar (leer) información de una tabla?',
      opciones: ['GET', 'FETCH', 'SELECT', 'READ'],
      correcta: 2,
      explicacion: 'SELECT es el comando fundamental para leer datos en SQL. Es la operación más utilizada y la primera que aprenderemos.',
    },
    {
      id: 'q3',
      pregunta: 'Si escribes "select * from clientes", ¿funcionará igual que "SELECT * FROM clientes"?',
      opciones: [
        'No, SQL distingue mayúsculas y minúsculas',
        'Sí, SQL no distingue mayúsculas y minúsculas para palabras clave',
        'Solo funciona en mayúsculas',
        'Solo funciona en minúsculas',
      ],
      correcta: 1,
      explicacion: 'SQL no distingue entre mayúsculas y minúsculas para las palabras clave (SELECT, FROM, WHERE, etc.). Por convención se escriben en mayúsculas, pero ambas formas son válidas.',
    },
    {
      id: 'q4',
      pregunta: '¿Cuáles son las 4 operaciones fundamentales de SQL (CRUD)?',
      opciones: [
        'Save, Load, Delete, Create',
        'Find, Add, Edit, Remove',
        'SELECT, INSERT, UPDATE, DELETE',
        'GET, POST, PUT, PATCH',
      ],
      correcta: 2,
      explicacion: 'Las 4 operaciones CRUD en SQL son SELECT (leer), INSERT (crear), UPDATE (actualizar) y DELETE (eliminar). Forman la base de cualquier operación con datos.',
    },
  ],
};
