import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'av-02-03',
  titulo: 'Optimización de consultas',
  descripcion: 'Aprende técnicas prácticas para escribir consultas SQL más eficientes.',
  duracionMinutos: 30,
  conceptosClave: ['Optimización', 'Performance', 'Query tuning', 'Sargable'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Una consulta que tarda 10 segundos puede reescribirse para tardar 0.01 segundos. La optimización de consultas es una habilidad fundamental para cualquier persona que trabaje con bases de datos a escala.',
    },
    {
      tipo: 'explicacion',
      titulo: '10 reglas de oro para optimizar',
      texto: '1. Especifica columnas en SELECT (evita SELECT *)\n2. Usa WHERE para filtrar temprano\n3. Crea índices en columnas de WHERE, JOIN y ORDER BY\n4. Evita funciones en columnas dentro de WHERE (rompen índices)\n5. Usa EXISTS en lugar de IN con subconsultas grandes\n6. Limita resultados con LIMIT cuando no necesitas todos\n7. Evita % al inicio de LIKE (LIKE \'%palabra\' no usa índice)\n8. Usa CTEs para mejor legibilidad y a veces mejor rendimiento\n9. Desnormaliza con cuidado cuando la performance lo requiere\n10. Analiza con EXPLAIN QUERY PLAN antes de optimizar',
    },
    {
      tipo: 'error-comun',
      titulo: 'Función en WHERE rompe el índice',
      codigoMal: "SELECT * FROM empleados WHERE UPPER(nombre) = 'MARÍA'",
      problema: "Aplicar UPPER() en la columna WHERE hace que SQLite no pueda usar el índice en 'nombre'. Revisa todas las filas.",
      codigoBien: "SELECT * FROM empleados WHERE nombre = 'María'",
      solucion: 'Normaliza los datos al insertar para evitar necesitar funciones en WHERE. O crea un índice funcional si tu base de datos lo soporta.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'SELECT columnas específicas en lugar de SELECT *',
        'Las funciones en WHERE rompen la capacidad de usar índices',
        'LIKE "%texto%" no usa índice (% al inicio)',
        'EXISTS suele ser más eficiente que IN con subconsultas',
        'Siempre mide con EXPLAIN antes y después de optimizar',
      ],
    },
  ],
  ejercicios: [],
  cuestionario: [
    {
      id: 'q1',
      pregunta: "¿Por qué WHERE YEAR(fecha) = 2024 es menos eficiente que WHERE fecha BETWEEN '2024-01-01' AND '2024-12-31'?",
      opciones: [
        'Son equivalentes en rendimiento',
        'YEAR() no existe en SQL',
        "YEAR(fecha) aplica una función a la columna, impidiendo el uso de índices. BETWEEN permite usar el índice directamente.",
        'BETWEEN es más moderno',
      ],
      correcta: 2,
      explicacion: 'Cuando aplicas una función a una columna en WHERE (como YEAR(fecha)), SQLite no puede usar el índice de esa columna. Debe calcular YEAR para cada fila. BETWEEN trabaja directamente con los valores de la columna, permitiendo usar el índice.',
    },
  ],
};
