import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'mn-04-01',
  titulo: 'NULL — El valor vacío',
  descripcion: 'Entiende qué es NULL en SQL, cómo se comporta y por qué es diferente de cero o espacio vacío.',
  duracionMinutos: 15,
  conceptosClave: ['NULL', 'Valor vacío', 'Ausencia de dato'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'NULL es uno de los conceptos más importantes y a veces confusos en SQL. NULL no es cero, no es una cadena vacía, no es "nada" — es la AUSENCIA de un valor. Representa que un dato simplemente no existe o no se conoce.',
    },
    {
      tipo: 'analogia',
      icono: '❓',
      texto: 'Piensa en NULL como una pregunta sin respuesta. Si un formulario tiene un campo "Segundo nombre" y alguien no tiene segundo nombre, ¿qué pones? No es un espacio en blanco (eso sería un nombre vacío), ni cero (eso no tiene sentido para un nombre). La respuesta correcta es NULL: el dato simplemente no existe.',
    },
    {
      tipo: 'explicacion',
      titulo: '¿Por qué existe NULL?',
      texto: 'NULL existe porque en el mundo real, los datos a veces son desconocidos o no aplican:\n\n• Un empleado puede no tener teléfono de empresa → NULL\n• Un producto puede estar sin categoría asignada aún → NULL\n• Una persona puede no haber proporcionado su fecha de nacimiento → NULL\n• Un pedido puede no tener fecha de entrega si aún no fue procesado → NULL\n\nNULL es fundamentalmente diferente de:\n• 0 (que es un número con valor cero)\n• \'\' (cadena vacía, que es texto que existe pero está vacío)\n• \'NULL\' (la cadena de texto "NULL")',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'NULL vs otros valores "vacíos"',
      cabeceras: ['Valor', 'Tipo', 'Significado', 'Ejemplo'],
      filas: [
        ['NULL', 'Ausencia de dato', 'El dato no existe o es desconocido', 'Teléfono no registrado'],
        ['0', 'Número', 'El número cero', 'Salario de voluntario'],
        ["''", 'Texto vacío', 'Texto que existe pero está vacío', 'Nombre de empresa sin nombre'],
        ["'NULL'", 'Texto', 'La palabra "NULL" como texto', 'Un campo que literalmente dice NULL'],
      ],
    },
    {
      tipo: 'explicacion',
      titulo: 'NULL es contagioso en operaciones',
      texto: 'Una característica especial de NULL: cualquier operación matemática o de comparación con NULL devuelve NULL (o resultado desconocido).\n\n5 + NULL = NULL (no 5)\nNULL = NULL = NULL (¡no TRUE!)\nNULL > 100 = NULL (no FALSE)\n\nEsto es importante porque significa que NULL NO PUEDE compararse con = o !=. Esto sorprende a muchos programadores.',
    },
    {
      tipo: 'advertencia',
      texto: 'El error más común con NULL es compararlo con = o !=. WHERE email = NULL NUNCA devuelve resultados, aunque haya filas con NULL. Para buscar NULLs debes usar IS NULL (lo veremos en la próxima lección).',
    },
    {
      tipo: 'resumen',
      puntos: [
        'NULL significa ausencia de valor, no cero ni texto vacío',
        'NULL es diferente de 0, de \'\' (vacío) y de la cadena \'NULL\'',
        'Cualquier operación con NULL devuelve NULL',
        'NULL = NULL no es verdadero en SQL',
        'Para filtrar NULLs usa IS NULL / IS NOT NULL (siguiente lección)',
      ],
    },
  ],
  ejercicios: [],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué representa NULL en SQL?',
      opciones: [
        'El número cero',
        'Una cadena de texto vacía',
        'La ausencia de un valor o dato desconocido',
        'El valor "false" en una comparación',
      ],
      correcta: 2,
      explicacion: 'NULL representa la ausencia de un valor o que el dato es desconocido. No es lo mismo que cero, cadena vacía, o cualquier otro valor.',
    },
    {
      id: 'q2',
      pregunta: '¿Qué resultado devuelve la operación: 100 + NULL?',
      opciones: ['100', '0', 'NULL', 'Error'],
      correcta: 2,
      explicacion: 'Cualquier operación aritmética que involucra NULL devuelve NULL. Es porque si un valor es desconocido, el resultado de operarlo también es desconocido.',
    },
    {
      id: 'q3',
      pregunta: '¿Cuál de estas es la diferencia entre NULL y 0?',
      opciones: [
        'No hay diferencia, ambos representan "vacío"',
        'NULL es un número muy pequeño, cercano a cero',
        'NULL significa que el dato no existe o es desconocido; 0 es el número cero con valor definido',
        'NULL solo se usa para texto, 0 para números',
      ],
      correcta: 2,
      explicacion: '0 es un número con valor definido (cero). NULL significa que el dato no existe o no se conoce. Un empleado con salario 0 tiene salario definido (trabaja gratis). Un empleado con salario NULL tiene un salario desconocido.',
    },
  ],
};
