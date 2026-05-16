import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'mn-03-03',
  titulo: 'LIKE — Buscar por patrones',
  descripcion: 'Aprende a buscar registros que coincidan con un patrón de texto usando LIKE, % y _.',
  duracionMinutos: 18,
  conceptosClave: ['LIKE', 'Patrón', 'Comodín', '%', '_'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'A veces no conoces el valor exacto que buscas, solo sabes que empieza o termina con algo, o que contiene cierta palabra. Por ejemplo: "todos los clientes cuyo nombre empiece con A", o "todos los emails de Gmail". Para esto existe LIKE.',
    },
    {
      tipo: 'explicacion',
      titulo: '¿Cómo funciona LIKE?',
      texto: 'LIKE se usa en WHERE para buscar patrones en texto. Usa dos comodines especiales:\n\n• % (porcentaje): representa CUALQUIER secuencia de caracteres (incluida ninguna)\n• _ (guion bajo): representa EXACTAMENTE UN carácter cualquiera',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Ejemplos de patrones con LIKE',
      cabeceras: ['Patrón', 'Significado', 'Coincide con', 'No coincide con'],
      filas: [
        ["'A%'", 'Empieza con A', 'Ana, Alberto, Alejandro', 'Beatriz, Carlos'],
        ["'%García'", 'Termina con García', 'Ana García, Luis García', 'García Pérez'],
        ["'%SQL%'", 'Contiene SQL en cualquier parte', 'Aprende SQL, MySQL básico', 'Base de datos'],
        ["'M_r_a'", 'M, cualquier char, r, cualquier char, a', 'María, Marta', 'Marco, Marina'],
        ["'___'", 'Exactamente 3 caracteres', 'Ana, Bob, SQL', 'María, Pedro'],
      ],
    },
    {
      tipo: 'ejemplo',
      titulo: 'Clientes cuyo nombre empieza con "A"',
      descripcion: 'El patrón "A%" significa: empieza con "A" y luego puede haber cualquier cosa.',
      sql: "SELECT nombre, email FROM clientes WHERE nombre LIKE 'A%';",
      tablaResultado: {
        columnas: ['nombre', 'email'],
        filas: [
          ['Ana García', 'ana@gmail.com'],
          ['Alberto Ruiz', 'alberto@hotmail.com'],
        ],
      },
    },
    {
      tipo: 'ejemplo',
      titulo: 'Emails de Gmail',
      descripcion: 'El patrón "%@gmail.com" encuentra todos los emails que terminan en @gmail.com.',
      sql: "SELECT nombre, email FROM clientes WHERE email LIKE '%@gmail.com';",
      tablaResultado: {
        columnas: ['nombre', 'email'],
        filas: [
          ['Ana García', 'ana@gmail.com'],
          ['Carlos Ruiz', 'carlos@gmail.com'],
          ['Diana Lee', 'diana@gmail.com'],
        ],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'NOT LIKE',
      texto: 'Puedes usar NOT LIKE para excluir los que coinciden con el patrón:\n\nWHERE email NOT LIKE \'%@gmail.com\'\n\nEsto devuelve todos los emails que NO son de Gmail.',
    },
    {
      tipo: 'advertencia',
      texto: 'LIKE puede ser lento en tablas grandes porque debe revisar cada fila una por una. Para búsquedas de alto rendimiento en producción, considera usar índices de texto completo. En este curso y para aprender, LIKE funciona perfectamente.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'LIKE busca patrones en texto dentro de WHERE',
        '% representa cualquier secuencia de caracteres (0 o más)',
        '_ representa exactamente UN carácter cualquiera',
        'NOT LIKE excluye los que coinciden con el patrón',
        'Para buscar exactamente, usa = en lugar de LIKE',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'mn-03-03-e1',
      titulo: 'Productos que contienen "Pro"',
      descripcion: 'Muestra nombre y precio de todos los productos cuyo nombre contenga la palabra "Pro".',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, precio REAL);
        INSERT INTO productos VALUES (1,'Laptop Pro 15','1299.99');
        INSERT INTO productos VALUES (2,'Mouse Inalámbrico','29.99');
        INSERT INTO productos VALUES (3,'Teclado Mecánico','89.99');
        INSERT INTO productos VALUES (4,'Monitor Pro 27','599.99');
        INSERT INTO productos VALUES (5,'Webcam Pro HD','149.99');
        INSERT INTO productos VALUES (6,'Auriculares Básicos','49.99');
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'precio'],
        filas: [
          ['Laptop Pro 15', 1299.99],
          ['Monitor Pro 27', 599.99],
          ['Webcam Pro HD', 149.99],
        ],
      },
      solucionOficial: "SELECT nombre, precio FROM productos WHERE nombre LIKE '%Pro%';",
      pistas: [
        "Usa LIKE con % antes y después para buscar en cualquier parte del texto",
        "El patrón '%Pro%' significa 'contiene Pro en cualquier parte'",
        "SELECT nombre, precio FROM productos WHERE nombre LIKE '%Pro%'",
      ],
      explicacion: "El patrón '%Pro%' significa: puede haber cualquier cosa antes de 'Pro', y puede haber cualquier cosa después. Esto encuentra 'Pro' en cualquier posición del nombre.",
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: "¿Qué patrón LIKE encontraría nombres que empiecen con 'M' y terminen con 'a'?",
      opciones: [
        "'M%a'",
        "'%Ma%'",
        "'M_a'",
        "'Ma%'",
      ],
      correcta: 0,
      explicacion: "'M%a' significa: empieza con M, luego cualquier número de caracteres (%), y termina con a. Coincidiría con María, Marta, Marina, etc.",
    },
    {
      id: 'q2',
      pregunta: '¿Cuántos caracteres representa el comodín _ (guion bajo)?',
      opciones: [
        'Cualquier número de caracteres (0 o más)',
        'Exactamente 0 caracteres',
        'Exactamente 1 carácter',
        '2 caracteres exactamente',
      ],
      correcta: 2,
      explicacion: 'El guion bajo (_) representa exactamente 1 carácter cualquiera. Si usas ___ (tres guiones bajos), coincide con palabras de exactamente 3 caracteres.',
    },
  ],
};
