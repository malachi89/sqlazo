import type { Leccion } from '../../../../types';
import { SETUP_EMPLEADOS_BASICO } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'in-04-01',
  titulo: 'INSERT — Insertar datos',
  descripcion: 'Aprende a agregar nuevas filas a una tabla con INSERT INTO.',
  duracionMinutos: 20,
  conceptosClave: ['INSERT', 'INSERT INTO', 'VALUES', 'INSERT SELECT'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Hasta ahora solo hemos leído datos. Ahora aprenderás a modificarlos. INSERT te permite agregar nuevas filas a una tabla.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Sintaxis de INSERT',
      texto: 'Forma básica:\nINSERT INTO tabla (col1, col2, col3)\nVALUES (val1, val2, val3)\n\nSin especificar columnas (todas las columnas en orden):\nINSERT INTO tabla VALUES (val1, val2, val3)\n\nRecomendación: siempre especifica las columnas para mayor claridad y robustez.',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Insertar un empleado',
      descripcion: 'Insertamos un nuevo empleado y luego verificamos que se agregó correctamente.',
      sql: "INSERT INTO empleados (nombre, departamento, salario) VALUES ('Sofía Ramos', 'Marketing', 52000);\nSELECT * FROM empleados WHERE nombre = 'Sofía Ramos';",
  setupSql: SETUP_EMPLEADOS_BASICO,
      tablaResultado: {
        columnas: ['id', 'nombre', 'departamento', 'salario'],
        filas: [[6, 'Sofía Ramos', 'Marketing', 52000]],
      },
    },
    {
      tipo: 'explicacion',
      titulo: 'INSERT múltiple',
      texto: 'Puedes insertar múltiples filas en un solo INSERT:\n\nINSERT INTO productos (nombre, precio) VALUES\n  (\'Producto A\', 10.99),\n  (\'Producto B\', 24.50),\n  (\'Producto C\', 99.99)\n\nEsto es más eficiente que múltiples INSERT individuales.',
    },
    {
      tipo: 'advertencia',
      texto: 'Siempre usa transacciones cuando insertas múltiples filas importantes. Si algo falla a mitad del proceso, las transacciones te permiten deshacer todos los cambios (lo veremos en el nivel Avanzado).',
    },
    {
      tipo: 'resumen',
      puntos: [
        'INSERT INTO tabla (cols) VALUES (vals) agrega una nueva fila',
        'Especificar las columnas es una buena práctica',
        'Puedes insertar múltiples filas con una sola sentencia',
        'Los valores deben corresponder en tipo y orden a las columnas',
        'INSERT INTO ... SELECT ... inserta datos desde otra tabla',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'in-04-01-e1',
      titulo: 'Inserta un producto nuevo',
      descripcion: 'Inserta un producto llamado "Impresora Laser" en la categoría "Periféricos" con precio 299.99 y stock 15. Luego selecciona todos los productos.',
      setupSql: `
        CREATE TABLE productos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, categoria TEXT, precio REAL, stock INTEGER);
        INSERT INTO productos VALUES (1,'Laptop','Electrónica',1299.99,20);
        INSERT INTO productos VALUES (2,'Mouse','Periféricos',29.99,150);
      `,
      resultadoEsperado: {
        columnas: ['id', 'nombre', 'categoria', 'precio', 'stock'],
        filas: [
          [1, 'Laptop', 'Electrónica', 1299.99, 20],
          [2, 'Mouse', 'Periféricos', 29.99, 150],
          [3, 'Impresora Laser', 'Periféricos', 299.99, 15],
        ],
      },
      solucionOficial: "INSERT INTO productos (nombre, categoria, precio, stock) VALUES ('Impresora Laser', 'Periféricos', 299.99, 15);\nSELECT * FROM productos;",
      pistas: [
        "Usa INSERT INTO productos (columnas) VALUES (valores)",
        "No necesitas especificar el id porque es AUTOINCREMENT",
        "Después del INSERT, usa SELECT * FROM productos para verificar",
      ],
      explicacion: 'INSERT INTO con las columnas especificadas (sin id) deja que AUTOINCREMENT asigne automáticamente el id 3. SELECT * confirma que el producto fue insertado.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuál es la ventaja de especificar los nombres de columnas en INSERT?',
      opciones: [
        'Es obligatorio hacerlo siempre',
        'Es más rápido',
        'Hace el código más robusto: si se agrega una columna con valor por defecto, el INSERT sigue funcionando',
        'Permite insertar más de 10 filas',
      ],
      correcta: 2,
      explicacion: 'Especificar columnas hace el INSERT más robusto: si alguien agrega una nueva columna con valor por defecto a la tabla, tu INSERT sigue funcionando porque no depende del orden exacto de todas las columnas.',
    },
  ],
};
