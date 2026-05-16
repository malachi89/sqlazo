import type { Leccion } from '../../../../types';
import { SETUP_UNION } from '../../ejemploSetups';

export const leccion: Leccion = {
  id: 'in-01-03',
  titulo: 'UNION y UNION ALL',
  descripcion: 'Combina los resultados de múltiples consultas en un solo conjunto con UNION.',
  duracionMinutos: 20,
  conceptosClave: ['UNION', 'UNION ALL', 'Combinar resultados'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'UNION combina los resultados de dos o más consultas SELECT en un único conjunto de resultados. Es útil cuando necesitas datos de diferentes tablas o diferentes condiciones en el mismo resultado.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Reglas de UNION',
      texto: 'Para que UNION funcione:\n1. Ambas consultas deben tener el MISMO número de columnas\n2. Las columnas correspondientes deben ser de tipos compatibles\n3. Los nombres de columnas del resultado se toman de la primera consulta\n\nDiferencia entre UNION y UNION ALL:\n• UNION: elimina filas duplicadas (más lento)\n• UNION ALL: incluye duplicados (más rápido)',
    },
    {
      tipo: 'ejemplo',
      titulo: 'Combinar empleados de dos oficinas',
      descripcion: 'Tenemos empleados en dos tablas separadas (Madrid y Barcelona) y queremos verlos juntos.',
      sql: "SELECT nombre, 'Madrid' AS oficina FROM empleados_madrid\nUNION ALL\nSELECT nombre, 'Barcelona' AS oficina FROM empleados_barcelona\nORDER BY nombre;",
  setupSql: SETUP_UNION,
      tablaResultado: {
        columnas: ['nombre', 'oficina'],
        filas: [
          ['Ana', 'Barcelona'],
          ['Carlos', 'Madrid'],
          ['Laura', 'Madrid'],
          ['Miguel', 'Barcelona'],
          ['Pedro', 'Madrid'],
        ],
      },
    },
    {
      tipo: 'resumen',
      puntos: [
        'UNION combina resultados de múltiples SELECT',
        'UNION elimina duplicados; UNION ALL mantiene todos los registros',
        'Todas las consultas deben tener el mismo número de columnas',
        'Los tipos de datos de columnas correspondientes deben ser compatibles',
        'ORDER BY solo se puede poner al final del UNION completo',
      ],
    },
  ],
  ejercicios: [
    {
      id: 'in-01-03-e1',
      titulo: 'Unir dos listas de contactos',
      descripcion: 'Combina las tablas "clientes" y "proveedores" en un único listado de nombres con su tipo (Cliente/Proveedor).',
      setupSql: `
        CREATE TABLE clientes (id INTEGER, nombre TEXT, email TEXT);
        INSERT INTO clientes VALUES (1,'Ana García','ana@mail.com');
        INSERT INTO clientes VALUES (2,'Bob Smith','bob@mail.com');
        CREATE TABLE proveedores (id INTEGER, nombre TEXT, email TEXT);
        INSERT INTO proveedores VALUES (1,'TechSupply SA','tech@supply.com');
        INSERT INTO proveedores VALUES (2,'OfficeMax','office@max.com');
      `,
      resultadoEsperado: {
        columnas: ['nombre', 'tipo', 'email'],
        filas: [
          ['Ana García', 'Cliente', 'ana@mail.com'],
          ['Bob Smith', 'Cliente', 'bob@mail.com'],
          ['TechSupply SA', 'Proveedor', 'tech@supply.com'],
          ['OfficeMax', 'Proveedor', 'office@max.com'],
        ],
      },
      solucionOficial: "SELECT nombre, 'Cliente' AS tipo, email FROM clientes UNION ALL SELECT nombre, 'Proveedor' AS tipo, email FROM proveedores ORDER BY tipo, nombre;",
      pistas: [
        "Usa UNION ALL para combinar sin eliminar duplicados",
        "Agrega una columna literal: 'Cliente' AS tipo y 'Proveedor' AS tipo",
        "Ambas consultas deben tener las mismas 3 columnas: nombre, tipo, email",
      ],
      explicacion: 'UNION ALL combina los resultados de ambas SELECT sin eliminar duplicados. La columna "tipo" es un valor literal que distingue el origen de cada fila.',
    },
  ],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuándo deberías usar UNION ALL en lugar de UNION?',
      opciones: [
        'Cuando quieres eliminar duplicados',
        'Cuando las tablas tienen diferente número de columnas',
        'Cuando no importa si hay duplicados o cuando quieres mantenerlos para mejor rendimiento',
        'UNION ALL siempre es incorrecto',
      ],
      correcta: 2,
      explicacion: 'UNION ALL es más rápido que UNION porque no necesita eliminar duplicados. Úsalo cuando sabes que no habrá duplicados o cuando los duplicados son importantes para tu análisis.',
    },
  ],
};
