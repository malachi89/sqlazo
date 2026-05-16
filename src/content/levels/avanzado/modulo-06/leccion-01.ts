import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'av-06-01',
  titulo: 'SQL Injection — Seguridad esencial',
  descripcion: 'Aprende qué es SQL Injection, cómo funciona y cómo prevenirlo en tus aplicaciones.',
  duracionMinutos: 25,
  conceptosClave: ['SQL Injection', 'Seguridad', 'Prepared Statements', 'Parámetros'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'SQL Injection es uno de los ataques más comunes y peligrosos contra aplicaciones web. Ocurre cuando datos del usuario se incluyen directamente en consultas SQL sin validación.',
    },
    {
      tipo: 'explicacion',
      titulo: '¿Cómo funciona SQL Injection?',
      texto: 'Imagina este código en tu aplicación:\n\n// Código VULNERABLE\nquery = "SELECT * FROM usuarios WHERE email = \'" + email_usuario + "\'";\n\nSi el usuario ingresa: \' OR \'1\'=\'1\nLa consulta se convierte en:\nSELECT * FROM usuarios WHERE email = \'\' OR \'1\'=\'1\'\n\nEsto devuelve TODOS los usuarios porque \'1\'=\'1\' siempre es verdadero.',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Código vulnerable vs código seguro',
      cabeceras: ['❌ Vulnerable', '✅ Seguro'],
      filas: [
        ["query = \"SELECT * FROM users WHERE id = \" + id", "query = \"SELECT * FROM users WHERE id = ?\""],
        ['db.execute(query)', "db.execute(query, [id])"],
        ['Concatena directamente strings del usuario', 'Usa parámetros separados'],
      ],
    },
    {
      tipo: 'explicacion',
      titulo: 'Cómo prevenir SQL Injection',
      texto: '1. SIEMPRE usa Prepared Statements o parámetros vinculados\n2. Valida y sanitiza la entrada del usuario\n3. Usa el principio de mínimo privilegio (usuarios con solo los permisos necesarios)\n4. Nunca construyas SQL concatenando strings del usuario\n5. Usa un ORM o framework que maneje esto automáticamente',
    },
    {
      tipo: 'resumen',
      puntos: [
        'SQL Injection ocurre cuando se inyecta SQL malicioso a través de inputs',
        'Puede dar acceso a todos los datos, modificarlos o borrarlos',
        'La prevención principal: SIEMPRE usa prepared statements',
        'Nunca construyas SQL concatenando strings del usuario directamente',
        'Es el ataque más común según OWASP Top 10',
      ],
    },
  ],
  ejercicios: [],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Cuál es la forma más efectiva de prevenir SQL Injection?',
      opciones: [
        'Validar que el input no contenga comillas',
        'Usar Prepared Statements (sentencias preparadas) con parámetros vinculados',
        'Limitar el tamaño del input a 50 caracteres',
        'Usar solo letras en los inputs',
      ],
      correcta: 1,
      explicacion: 'Los Prepared Statements (sentencias preparadas) separan completamente el código SQL de los datos del usuario. Los parámetros nunca se interpretan como código SQL, eliminando la vulnerabilidad.',
    },
  ],
};
