import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'mn-01-03',
  titulo: 'Tablas, filas y columnas',
  descripcion: 'Entiende la estructura fundamental de una base de datos relacional: tablas, filas y columnas.',
  duracionMinutos: 15,
  conceptosClave: ['Tabla', 'Fila', 'Columna', 'Campo', 'Registro'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Toda la información en una base de datos relacional se organiza en tablas. Una tabla se parece mucho a una hoja de Excel: tiene filas y columnas. Entender esta estructura es fundamental para todo lo que aprenderás después.',
    },
    {
      tipo: 'analogia',
      icono: '📊',
      texto: 'Imagina una tabla de base de datos como una hoja de registro de una empresa. Cada columna es un tipo de dato que se registra (nombre, apellido, salario). Cada fila es un empleado diferente. Cada celda es un dato específico de ese empleado.',
    },
    {
      tipo: 'explicacion',
      titulo: '¿Qué es una tabla?',
      texto: 'Una tabla es el contenedor principal de datos en una base de datos. Cada tabla guarda información sobre un tipo específico de cosa:\n\n• La tabla "empleados" guarda información de empleados\n• La tabla "productos" guarda información de productos\n• La tabla "pedidos" guarda información de pedidos\n\nUna base de datos puede tener muchas tablas, cada una con un propósito diferente.',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Ejemplo: tabla "empleados"',
      cabeceras: ['id', 'nombre', 'apellido', 'departamento', 'salario'],
      filas: [
        [1, 'María', 'González', 'Ventas', 45000],
        [2, 'Carlos', 'López', 'Tecnología', 65000],
        [3, 'Ana', 'Martínez', 'RRHH', 48000],
        [4, 'Pedro', 'Sánchez', 'Ventas', 42000],
        [5, 'Laura', 'Torres', 'Tecnología', 70000],
      ],
    },
    {
      tipo: 'explicacion',
      titulo: 'Columnas: el tipo de dato',
      texto: 'Cada columna define un tipo específico de información. En la tabla de empleados:\n\n• id: Un número único que identifica a cada empleado\n• nombre: El primer nombre del empleado\n• apellido: El apellido del empleado\n• departamento: En qué área trabaja\n• salario: Cuánto gana\n\nCada columna tiene un nombre y un tipo de dato. Los tipos de datos más comunes son:\n• Texto (VARCHAR, TEXT): Para palabras y frases\n• Número entero (INTEGER, INT): Para números sin decimales (1, 2, 100)\n• Número decimal (REAL, FLOAT): Para números con decimales (3.14, 45.50)\n• Fecha (DATE): Para fechas como 2024-01-15',
    },
    {
      tipo: 'explicacion',
      titulo: 'Filas: un registro completo',
      texto: 'Cada fila representa un elemento completo. En nuestra tabla de empleados, cada fila es un empleado diferente. Una fila contiene valores para cada columna.\n\nTerminología importante:\n• Fila = Registro = Tupla (son sinónimos, aunque "fila" es más común en SQL)\n• Columna = Campo = Atributo (son sinónimos, aunque "columna" es más común)\n• Celda = La intersección de una fila y una columna (un valor específico)',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Estructura: tabla "productos"',
      cabeceras: ['id', 'nombre', 'categoria', 'precio', 'stock'],
      filas: [
        [1, 'Laptop Pro 15"', 'Electrónica', 1299.99, 50],
        [2, 'Mouse Inalámbrico', 'Periféricos', 29.99, 200],
        [3, 'Teclado Mecánico', 'Periféricos', 89.99, 150],
        [4, 'Monitor 27" 4K', 'Electrónica', 499.99, 30],
        [5, 'Silla Ergonómica', 'Mobiliario', 349.99, 25],
      ],
    },
    {
      tipo: 'explicacion',
      titulo: 'La importancia del campo "id"',
      texto: 'Notarás que la primera columna siempre es "id". Este campo especial se llama clave primaria (Primary Key). Sirve para identificar de forma única cada fila de la tabla.\n\n¿Por qué es importante? Imagina que tienes dos empleados llamados "Juan García". ¿Cómo sabes a cuál te refieres? ¡Por el id! El id 1 es un Juan García diferente al id 2.\n\nLas claves primarias:\n• Son únicas: no puede haber dos filas con el mismo id\n• Son permanentes: nunca deben cambiar\n• Suelen ser números enteros que se incrementan automáticamente (1, 2, 3, 4...)',
    },
    {
      tipo: 'nota',
      texto: 'Una base de datos puede tener docenas o cientos de tablas. Todas están relacionadas entre sí. Por ejemplo, la tabla "pedidos" puede referenciar a la tabla "clientes" para saber quién hizo cada pedido. Esto es lo que hace que se llamen bases de datos "relacionales".',
    },
    {
      tipo: 'resumen',
      puntos: [
        'Una tabla es el contenedor principal de datos: filas y columnas',
        'Cada columna define un tipo de información (nombre, precio, fecha)',
        'Cada fila es un registro completo (un empleado, un producto)',
        'El campo "id" es la clave primaria: identifica únicamente cada fila',
        'Una base de datos tiene múltiples tablas que pueden estar relacionadas',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'mn-01-03-e1',
      titulo: 'Explora la tabla empleados',
      descripcion: 'La tabla "empleados" tiene 5 empleados precargados. Ejecuta la consulta para ver todos sus datos.',
      setupSql: `
        CREATE TABLE empleados (
          id INTEGER PRIMARY KEY,
          nombre TEXT,
          apellido TEXT,
          departamento TEXT,
          salario REAL
        );
        INSERT INTO empleados VALUES (1,'María','González','Ventas',45000);
        INSERT INTO empleados VALUES (2,'Carlos','López','Tecnología',65000);
        INSERT INTO empleados VALUES (3,'Ana','Martínez','RRHH',48000);
        INSERT INTO empleados VALUES (4,'Pedro','Sánchez','Ventas',42000);
        INSERT INTO empleados VALUES (5,'Laura','Torres','Tecnología',70000);
      `,
      resultadoEsperado: {
        columnas: ['id', 'nombre', 'apellido', 'departamento', 'salario'],
        filas: [
          [1, 'María', 'González', 'Ventas', 45000],
          [2, 'Carlos', 'López', 'Tecnología', 65000],
          [3, 'Ana', 'Martínez', 'RRHH', 48000],
          [4, 'Pedro', 'Sánchez', 'Ventas', 42000],
          [5, 'Laura', 'Torres', 'Tecnología', 70000],
        ],
      },
      solucionOficial: 'SELECT * FROM empleados;',
      pistas: [
        'Usa SELECT seguido de * para seleccionar todas las columnas',
        'Usa FROM seguido del nombre de la tabla',
        'La consulta completa es: SELECT * FROM empleados',
      ],
      explicacion: 'SELECT * FROM empleados selecciona TODAS las columnas (*) de la tabla empleados. El asterisco (*) es un atajo para decir "todas las columnas".',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: 'En una tabla de base de datos, ¿qué representa una fila?',
      opciones: [
        'Un tipo de dato (como nombre o precio)',
        'Un registro completo (como un empleado específico)',
        'El nombre de la tabla',
        'Una base de datos entera',
      ],
      correcta: 1,
      explicacion: 'Una fila representa un registro completo: todos los datos de un elemento específico. Por ejemplo, una fila en la tabla empleados tiene todos los datos de UN empleado específico.',
    },
    {
      id: 'q2',
      pregunta: '¿Para qué sirve el campo "id" en una tabla?',
      opciones: [
        'Para ordenar los datos alfabéticamente',
        'Para guardar el nombre del usuario',
        'Para identificar de forma única cada fila de la tabla (clave primaria)',
        'Para contar cuántas filas tiene la tabla',
      ],
      correcta: 2,
      explicacion: 'El campo "id" es la clave primaria (Primary Key). Identifica de forma única cada registro de la tabla. Esto es fundamental cuando hay registros con datos similares (por ejemplo, dos personas con el mismo nombre).',
    },
    {
      id: 'q3',
      pregunta: 'Si una tabla "productos" tiene 1000 filas y 6 columnas, ¿cuántos datos (celdas) tiene en total?',
      opciones: ['1000', '6', '6000', '1006'],
      correcta: 2,
      explicacion: 'El total de celdas es filas × columnas = 1000 × 6 = 6000. Cada celda contiene un dato específico (la intersección de una fila y una columna).',
    },
    {
      id: 'q4',
      pregunta: '¿Cuál de estas afirmaciones sobre las claves primarias es INCORRECTA?',
      opciones: [
        'Son únicas: no puede haber dos filas con el mismo valor',
        'Suelen ser números que se incrementan automáticamente',
        'Pueden cambiar libremente cuando se necesite',
        'Identifican de forma única cada fila de la tabla',
      ],
      correcta: 2,
      explicacion: 'Las claves primarias NO deben cambiar. Son permanentes e inmutables. Cambiarlas podría romper las relaciones entre tablas y causar problemas de integridad de datos.',
    },
  ],
};
