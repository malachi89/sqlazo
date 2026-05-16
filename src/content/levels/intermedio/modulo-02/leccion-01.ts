import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'in-02-01',
  titulo: 'Funciones de texto',
  descripcion: 'Aprende las funciones de SQLite para manipular texto: UPPER, LOWER, LENGTH, SUBSTR, REPLACE, TRIM.',
  duracionMinutos: 25,
  conceptosClave: ['UPPER', 'LOWER', 'LENGTH', 'SUBSTR', 'REPLACE', 'TRIM'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'SQL incluye funciones para manipular y transformar texto. Son muy útiles para limpiar datos, normalizar formatos, o crear nuevas columnas derivadas del texto existente.',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Funciones de texto en SQLite',
      cabeceras: ['Función', 'Descripción', 'Ejemplo', 'Resultado'],
      filas: [
        ["UPPER(texto)", "Convierte a mayúsculas", "UPPER('hola')", "'HOLA'"],
        ["LOWER(texto)", "Convierte a minúsculas", "LOWER('MUNDO')", "'mundo'"],
        ["LENGTH(texto)", "Longitud del texto", "LENGTH('SQL')", "3"],
        ["SUBSTR(texto, inicio, largo)", "Extrae parte del texto", "SUBSTR('Hola Mundo', 1, 4)", "'Hola'"],
        ["REPLACE(texto, busca, reemplaza)", "Reemplaza texto", "REPLACE('Hola SQL', 'SQL', 'Mundo')", "'Hola Mundo'"],
        ["TRIM(texto)", "Elimina espacios al inicio y final", "TRIM('  hola  ')", "'hola'"],
        ["LTRIM(texto)", "Elimina espacios al inicio", "LTRIM('  hola')", "'hola'"],
        ["RTRIM(texto)", "Elimina espacios al final", "RTRIM('hola  ')", "'hola'"],
        ["|| (concatenar)", "Une dos textos", "'Hola' || ' ' || 'Mundo'", "'Hola Mundo'"],
      ],
    },
    {
      tipo: 'ejemplo',
      titulo: 'Normalizar datos de clientes',
      descripcion: 'Convertimos nombres a formato capitalizado y emails a minúsculas.',
      sql: "SELECT UPPER(nombre) AS nombre_mayus, LOWER(email) AS email_norm, LENGTH(nombre) AS largo_nombre FROM clientes;",
      tablaResultado: {
        columnas: ['nombre_mayus', 'email_norm', 'largo_nombre'],
        filas: [
          ['ANA GARCÍA', 'ana@email.com', 10],
          ['BOB SMITH', 'bob@email.com', 9],
        ],
      },
    },
    {
      tipo: 'ejemplo',
      titulo: 'Extraer y combinar texto',
      descripcion: 'Usamos SUBSTR para extraer el primer nombre y || para concatenar.',
      sql: "SELECT nombre || ' ' || apellido AS nombre_completo, SUBSTR(email, 1, INSTR(email, '@') - 1) AS usuario FROM empleados;",
      tablaResultado: {
        columnas: ['nombre_completo', 'usuario'],
        filas: [
          ['María González', 'maria'],
          ['Carlos López', 'carlos'],
        ],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        'UPPER/LOWER convierte mayúsculas/minúsculas',
        'LENGTH devuelve la cantidad de caracteres',
        'SUBSTR extrae una parte del texto (empieza en posición 1, no 0)',
        'REPLACE sustituye texto dentro de otro texto',
        'TRIM/LTRIM/RTRIM elimina espacios',
        '|| concatena dos o más textos',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'in-02-01-e1',
      titulo: 'Normalizar emails',
      descripcion: 'Muestra el nombre de cada empleado y su email en minúsculas. Llama a la columna email "email_normalizado".',
      setupSql: `
        CREATE TABLE empleados (id INTEGER, nombre TEXT, email TEXT);
        INSERT INTO empleados VALUES (1,'María González','MARIA@EMPRESA.COM');
        INSERT INTO empleados VALUES (2,'Carlos López','Carlos@Empresa.COM');
        INSERT INTO empleados VALUES (3,'Ana Martínez','ana@empresa.com');
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'email_normalizado'],
        filas: [
          ['María González', 'maria@empresa.com'],
          ['Carlos López', 'carlos@empresa.com'],
          ['Ana Martínez', 'ana@empresa.com'],
        ],
      },
      solucionOficial: 'SELECT nombre, LOWER(email) AS email_normalizado FROM empleados;',
      pistas: [
        'Usa LOWER() para convertir a minúsculas',
        'LOWER(email) AS email_normalizado',
        'SELECT nombre, LOWER(email) AS email_normalizado FROM empleados',
      ],
      explicacion: 'LOWER(email) convierte todo el texto de la columna email a minúsculas. Esto normaliza los emails independientemente de cómo fueron ingresados.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué devuelve SUBSTR("SQLazo", 4, 3)?',
      opciones: ["'SQL'", "'azo'", "'lazo'", "'Saz'"],
      correcta: 1,
      explicacion: "SUBSTR(texto, inicio, largo): empieza en la posición 4 (la 'a') y toma 3 caracteres: 'a', 'z', 'o' → 'azo'.",
    },
  ],
};
