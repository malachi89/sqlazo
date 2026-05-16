import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'av-05-02',
  titulo: 'Normalización práctica — De 0 a 3FN',
  descripcion: 'Aprende a aplicar las formas normales paso a paso para diseñar bases de datos eficientes.',
  duracionMinutos: 30,
  conceptosClave: ['1FN', '2FN', '3FN', 'Normalización', 'Dependencia funcional'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'La normalización es el proceso de organizar los datos para reducir redundancia y anomalías. Vamos a ver un ejemplo práctico de cómo transformar una tabla mal diseñada paso a paso hasta llegar a 3FN.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Tabla sin normalizar (0FN)',
      texto: 'Imagina esta tabla de pedidos:\n\npedidos (id_pedido, fecha, cliente_nombre, cliente_email, cliente_ciudad, producto1, precio1, cant1, producto2, precio2, cant2, total)\n\nProblemas:\n• Datos del cliente repetidos en cada pedido\n• Columnas numeradas (producto1, producto2...) limitan la cantidad de productos\n• Total es calculable (no debe almacenarse)\n• Si el cliente cambia de ciudad, hay que actualizar todos sus pedidos',
    },
    {
      tipo: 'explicacion',
      titulo: 'Primera Forma Normal (1FN)',
      texto: 'Reglas de 1FN:\n1. Cada columna contiene un solo valor (atómico)\n2. No hay grupos repetitivos (producto1, producto2...)\n3. Cada fila es única (clave primaria)\n\nSolución: crear tabla de detalles\n\nclientes (id, nombre, email, ciudad)\npedidos (id_pedido, fecha, cliente_id)\ndetalles_pedido (pedido_id, producto_id, cantidad, precio_unitario)\nproductos (id, nombre, precio)',
    },
    {
      tipo: 'explicacion',
      titulo: 'Segunda Forma Normal (2FN)',
      texto: 'Reglas de 2FN:\n1. Ya está en 1FN\n2. Todas las columnas no-clave dependen de TODA la clave primaria (no de una parte)\n\nEn nuestra estructura actual, ya estamos en 2FN porque:\n• detalles_pedido tiene clave compuesta (pedido_id, producto_id) y cada columna depende de ambas\n• Las otras tablas tienen clave simple\n\nSi tuviéramos: detalles(pedido_id, producto_id, nombre_producto, cantidad)\n"name_producto" depende solo de producto_id, no de la clave completa → violaría 2FN.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Tercera Forma Normal (3FN)',
      texto: 'Reglas de 3FN:\n1. Ya está en 2FN\n2. Ninguna columna no-clave depende de otra columna no-clave (no hay dependencias transitivas)\n\nEjemplo de violación:\nempleados (id, nombre, departamento, dept_telefono, dept_ciudad)\n\n"dept_telefono" y "dept_ciudad" dependen de "departamento", no del id del empleado.\n\nSolución: separar departamentos\nempleados (id, nombre, departamento_id)\ndepartamentos (id, nombre, telefono, ciudad)',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Resumen de Formas Normales',
      cabeceras: ['Forma Normal', 'Regla clave', 'Elimina'],
      filas: [
        ['1FN', 'Valores atómicos, sin grupos repetitivos', 'Datos multivalor en una celda'],
        ['2FN', 'Todo depende de toda la clave', 'Dependencias parciales'],
        ['3FN', 'Todo depende solo de la clave', 'Dependencias transitivas'],
      ],
    },
    {
      tipo: 'nota',
      texto: 'No siempre es necesario llegar a 3FN. A veces, por rendimiento, se acepta cierta desnormalización controlada (como almacenar un total calculado). Pero siempre empieza normalizado y desnormaliza solo si es necesario.',
    },
    {
      tipo: 'resumen',
      puntos: [
        '1FN: cada celda contiene un solo valor, sin grupos repetitivos',
        '2FN: todas las columnas dependen de toda la clave primaria',
        '3FN: ninguna columna depende de otra columna no-clave',
        'Cada forma normal resuelve un tipo específico de redundancia',
        'La normalización reduce anomalías de inserción, actualización y borrado',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'av-05-02-e1',
      titulo: 'Normaliza esta tabla',
      descripcion: 'Dada esta tabla: ventas(id, fecha, vendedor_nombre, vendedor_email, producto, categoria, precio, cantidad). Identifica qué violaciones de 1FN, 2FN y 3FN existen y propón la estructura normalizada.',
      objetivo: 'Practicar identificación de violaciones de formas normales.',
      setupSql: `
        CREATE TABLE ventas_sin_normalizar (
          id INTEGER, fecha TEXT, vendedor_nombre TEXT, vendedor_email TEXT,
          producto TEXT, categoria TEXT, precio REAL, cantidad INTEGER
        );
        INSERT INTO ventas_sin_normalizar VALUES (1,'2024-01-15','Ana','ana@empresa.com','Laptop','Electrónica',1299.99,2);
        INSERT INTO ventas_sin_normalizar VALUES (2,'2024-01-15','Ana','ana@empresa.com','Mouse','Periféricos',29.99,5);
        INSERT INTO ventas_sin_normalizar VALUES (3,'2024-01-20','Carlos','carlos@empresa.com','Laptop','Electrónica',1299.99,1);
      `,
      resultadoEsperado: {
        columnas: ['tabla','columnas'],
        filas: [
          ['vendedores','id, nombre, email'],
          ['productos','id, nombre, categoria, precio'],
          ['ventas','id, fecha, vendedor_id, producto_id, cantidad'],
        ],
      },
      solucionOficial: `-- Vendedores: nombre y email dependen del vendedor, no de la venta
CREATE TABLE vendedores (id INTEGER PRIMARY KEY, nombre TEXT, email TEXT);

-- Productos: nombre, categoría y precio dependen del producto
CREATE TABLE productos (id INTEGER PRIMARY KEY, nombre TEXT, categoria TEXT, precio REAL);

-- Ventas: solo datos de la transacción
CREATE TABLE ventas (id INTEGER PRIMARY KEY, fecha TEXT, vendedor_id INTEGER, producto_id INTEGER, cantidad INTEGER,
  FOREIGN KEY (vendedor_id) REFERENCES vendedores(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id));`,
      pistas: [
        'vendedor_nombre y vendedor_email dependen del vendedor, no de la venta → tabla separada',
        'producto, categoria y precio dependen del producto → tabla separada',
        'ventas solo debe tener: fecha, referencia al vendedor, referencia al producto, cantidad',
      ],
      explicacion: 'La tabla original viola 3FN: vendedor_email depende de vendedor_nombre (transitiva), y categoria depende de producto (transitiva). Al separar en 3 tablas, cada columna depende directamente de su clave primaria.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué problema resuelve la 3FN?',
      opciones: [
        'Valores multivalor en una celda',
        'Dependencias parciales de la clave',
        'Dependencias transitivas (columnas que dependen de otras columnas no-clave)',
        'Falta de clave primaria',
      ],
      correcta: 2,
      explicacion: 'La 3FN elimina dependencias transitivas: cuando una columna no-clave depende de otra columna no-clave en lugar de depender directamente de la clave primaria.',
    },
    {
      id: 'q2',
      pregunta: '¿Es siempre necesario llegar a 3FN?',
      opciones: [
        'Sí, siempre es obligatorio',
        'No, a veces se desnormaliza controladamente por rendimiento',
        'Solo en bases de datos pequeñas',
        'Solo si usas SQLite',
      ],
      correcta: 1,
      explicacion: 'Aunque 3FN es el estándar, en la práctica a veces se acepta desnormalización controlada (como almacenar totales calculados) para mejorar el rendimiento de consultas frecuentes.',
    },
  ],
};
