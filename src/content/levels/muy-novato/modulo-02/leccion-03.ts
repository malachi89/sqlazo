import type { Leccion } from '../../../../types';
import { SETUP_EMPLEADOS_BASICO, SETUP_PRODUCTOS } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'mn-02-03',
  titulo: 'WHERE — Filtrar datos',
  descripcion: 'Aprende a filtrar filas con la cláusula WHERE usando condiciones simples.',
  duracionMinutos: 20,
  conceptosClave: ['WHERE', 'Condición', 'Filtro', 'Operadores'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Hasta ahora hemos visto TODOS los datos de una tabla. Pero en la realidad, casi siempre quieres ver solo algunos registros específicos. Por ejemplo: "solo los empleados de Ventas" o "solo los productos con precio mayor a $100". Para esto existe WHERE.',
    },
    {
      tipo: 'analogia',
      icono: '🔽',
      texto: 'WHERE es como el filtro en una hoja de Excel, pero mucho más poderoso. Si tienes 10,000 empleados y quieres ver solo los de Madrid, usas WHERE para filtrar y ver únicamente esos.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de WHERE',
      texto: 'WHERE se agrega después de FROM:\n\nSELECT [columnas] FROM [tabla] WHERE [condición]\n\nLa condición compara una columna con un valor:\n• columna = valor (igual)\n• columna != valor o columna <> valor (diferente)\n• columna > valor (mayor que)\n• columna < valor (menor que)\n• columna >= valor (mayor o igual)\n• columna <= valor (menor o igual)',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Operadores de comparación en SQL',
      cabeceras: ['Operador', 'Significado', 'Ejemplo', 'Se lee como'],
      filas: [
        ['=', 'Igual', "departamento = 'Ventas'", 'departamento es igual a Ventas'],
        ['!=', 'Diferente', "pais != 'España'", 'país no es España'],
        ['<>', 'Diferente (alternativo)', "estado <> 'inactivo'", 'estado no es inactivo'],
        ['>', 'Mayor que', 'salario > 50000', 'salario es mayor a 50000'],
        ['<', 'Menor que', 'precio < 100', 'precio es menor a 100'],
        ['>=', 'Mayor o igual', 'edad >= 18', 'edad es 18 o más'],
        ['<=', 'Menor o igual', 'stock <= 10', 'stock es 10 o menos'],
      ],
    },
    {
      tipo: 'explicacion',
      titulo: 'Texto vs Números en WHERE',
      texto: 'Importante: cuando comparas texto, debes ponerlo entre comillas simples (\').\nCuando comparas números, NO uses comillas.\n\nTexto:\nWHERE departamento = \'Ventas\'\nWHERE ciudad = \'Madrid\'\n\nNúmeros:\nWHERE salario > 50000\nWHERE precio < 100\nWHERE edad = 30',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Empleados del departamento de Ventas',
      descripcion: 'Filtramos solo los empleados cuyo departamento sea igual a "Ventas".',
      sql: "SELECT * FROM empleados WHERE departamento = 'Ventas';",
  setupSql: SETUP_EMPLEADOS_BASICO,
      tablaResultado: {
        columnas: ['id', 'nombre', 'apellido', 'departamento', 'salario'],
        filas: [
          [1, 'María', 'González', 'Ventas', 45000],
          [4, 'Pedro', 'Sánchez', 'Ventas', 42000],
        ],
      },
    },
    {
      tipo: 'ejemplo',
      titulo: 'Productos con precio mayor a $100',
      descripcion: 'Filtramos los productos cuyo precio sea mayor a 100.',
      sql: 'SELECT nombre, precio FROM productos WHERE precio > 100;',
  setupSql: SETUP_PRODUCTOS,
      tablaResultado: {
        columnas: ['nombre', 'precio'],
        filas: [
          ['Laptop Pro 15"', 1299.99],
          ['Monitor 27" 4K', 499.99],
        ],
      },
    },
    {
      tipo: 'advertencia',
      texto: 'En SQL, las comparaciones de texto son sensibles a mayúsculas/minúsculas en muchos sistemas. "Ventas" y "ventas" NO son lo mismo. Asegúrate de escribir el valor exactamente igual a como está en la base de datos.',
    },
    {
      tipo: 'error-comun',
      titulo: 'Olvidar las comillas en texto',
      codigoMal: "SELECT * FROM empleados WHERE departamento = Ventas",
      problema: 'Olvidar las comillas simples alrededor del texto hace que SQL intente interpretar "Ventas" como una columna o variable, causando error.',
      codigoBien: "SELECT * FROM empleados WHERE departamento = 'Ventas'",
      solucion: "Siempre usa comillas simples (') para valores de texto en WHERE. Los números no necesitan comillas.",
    },
    {
      tipo: 'resumen',
      puntos: [
        'WHERE filtra las filas según una condición',
        'Se coloca después de FROM: SELECT ... FROM tabla WHERE condición',
        'Para texto usa comillas simples: WHERE ciudad = \'Madrid\'',
        'Para números NO uses comillas: WHERE salario > 50000',
        'Los operadores son: = != <> > < >= <=',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'mn-02-03-e1',
      titulo: 'Empleados de Tecnología',
      descripcion: 'Muestra todos los datos de los empleados que trabajan en el departamento "Tecnología".',
      setupSql: `
        CREATE TABLE empleados (id INTEGER, nombre TEXT, apellido TEXT, departamento TEXT, salario REAL);
        INSERT INTO empleados VALUES (1,'María','González','Ventas',45000);
        INSERT INTO empleados VALUES (2,'Carlos','López','Tecnología',65000);
        INSERT INTO empleados VALUES (3,'Ana','Martínez','RRHH',48000);
        INSERT INTO empleados VALUES (4,'Pedro','Sánchez','Ventas',42000);
        INSERT INTO empleados VALUES (5,'Laura','Torres','Tecnología',70000);
        INSERT INTO empleados VALUES (6,'Miguel','Ramos','Tecnología',60000);
      `,
      resultadoEsperado: {
        columnas: ['id', 'nombre', 'apellido', 'departamento', 'salario'],
        filas: [
          [2, 'Carlos', 'López', 'Tecnología', 65000],
          [5, 'Laura', 'Torres', 'Tecnología', 70000],
          [6, 'Miguel', 'Ramos', 'Tecnología', 60000],
        ],
      },
      solucionOficial: "SELECT * FROM empleados WHERE departamento = 'Tecnología';",
      pistas: [
        "Usa WHERE para filtrar por departamento",
        "El valor de texto va entre comillas simples: 'Tecnología'",
        "SELECT * FROM empleados WHERE departamento = 'Tecnología'",
      ],
      explicacion: "WHERE departamento = 'Tecnología' filtra y devuelve solo las filas donde la columna departamento tiene exactamente el valor 'Tecnología'.",
    },
    {
      id: 'mn-02-03-e2',
      titulo: 'Productos baratos',
      descripcion: 'Muestra el nombre y precio de los productos cuyo precio sea menor a 100.',
      setupSql: `
        CREATE TABLE productos (id INTEGER, nombre TEXT, categoria TEXT, precio REAL, stock INTEGER);
        INSERT INTO productos VALUES (1,'Laptop Pro','Electrónica',1299.99,50);
        INSERT INTO productos VALUES (2,'Mouse Inalámbrico','Periféricos',29.99,200);
        INSERT INTO productos VALUES (3,'Teclado Mecánico','Periféricos',89.99,150);
        INSERT INTO productos VALUES (4,'Monitor 4K','Electrónica',499.99,30);
        INSERT INTO productos VALUES (5,'Alfombrilla Gaming','Periféricos',19.99,300);
        INSERT INTO productos VALUES (6,'Hub USB','Periféricos',39.99,100);
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'precio'],
        filas: [
          ['Mouse Inalámbrico', 29.99],
          ['Teclado Mecánico', 89.99],
          ['Alfombrilla Gaming', 19.99],
          ['Hub USB', 39.99],
        ],
      },
      solucionOficial: 'SELECT nombre, precio FROM productos WHERE precio < 100;',
      pistas: [
        'Selecciona solo las columnas nombre y precio',
        'Usa WHERE precio < 100 (sin comillas, es un número)',
        'SELECT nombre, precio FROM productos WHERE precio < 100',
      ],
      explicacion: 'WHERE precio < 100 filtra solo los productos cuyo precio es estrictamente menor a 100. Los números no llevan comillas en SQL.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿En qué posición de la consulta se escribe WHERE?',
      opciones: [
        'Antes de SELECT',
        'Entre SELECT y FROM',
        'Después de FROM y el nombre de la tabla',
        'Al final, después de todas las demás cláusulas',
      ],
      correcta: 2,
      explicacion: 'WHERE se escribe después de FROM y el nombre de la tabla: SELECT ... FROM tabla WHERE condición.',
    },
    {
      id: 'q2',
      pregunta: "¿Cuál es la forma correcta de filtrar empleados del país 'México'?",
      opciones: [
        'SELECT * FROM empleados WHERE pais == México',
        "SELECT * FROM empleados WHERE pais = 'México'",
        "SELECT * FROM empleados WHERE pais = Mexico",
        "SELECT * FROM empleados WHERE pais == 'México'",
      ],
      correcta: 1,
      explicacion: "En SQL se usa = (un solo igual) para comparar, y los textos van entre comillas simples. La consulta correcta es: WHERE pais = 'México'.",
    },
    {
      id: 'q3',
      pregunta: '¿Qué consulta muestra los productos con precio MAYOR O IGUAL a 500?',
      opciones: [
        'SELECT * FROM productos WHERE precio > 500',
        'SELECT * FROM productos WHERE precio >= 500',
        'SELECT * FROM productos WHERE precio =< 500',
        'SELECT * FROM productos WHERE precio => 500',
      ],
      correcta: 1,
      explicacion: '>= significa "mayor o igual". > 500 excluiría los productos con precio exactamente 500. >= 500 incluye los que tienen exactamente 500 también.',
    },
  ],
};
