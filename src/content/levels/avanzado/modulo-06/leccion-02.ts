import type { Leccion } from '../../../../types';

export const leccion: Leccion = {
  id: 'av-06-02',
  titulo: 'Buenas prácticas de seguridad en SQL',
  descripcion: 'Más allá de SQL Injection: permisos, backups, cifrado y auditoría de bases de datos.',
  duracionMinutos: 20,
  conceptosClave: ['Permisos', 'GRANT', 'REVOKE', 'Backup', 'Cifrado', 'Auditoría'],
  contenido: [
    {
      tipo: 'introduccion',
      texto: 'Proteger una base de datos va mucho más allá de prevenir SQL Injection. Necesitas controlar quién accede a qué datos, hacer copias de seguridad, y mantener un registro de quién hace qué.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Control de acceso con GRANT y REVOKE',
      texto: 'En sistemas de bases de datos como PostgreSQL o MySQL, puedes controlar permisos:\n\n-- Dar permiso de lectura\nGRANT SELECT ON empleados TO usuario_lectura;\n\n-- Dar permiso de escritura\nGRANT INSERT, UPDATE ON pedidos TO usuario_escritura;\n\n-- Revocar permisos\nREVOKE DELETE ON empleados FROM usuario_lectura;\n\n-- Ver permisos\nSELECT * FROM information_schema.table_privileges;\n\nPrincipio de mínimo privilegio: da solo los permisos estrictamente necesarios.',
    },
    {
      tipo: 'tabla-visual',
      titulo: 'Tipos de permisos SQL',
      cabeceras: ['Permiso', 'Qué permite', 'Riesgo'],
      filas: [
        ['SELECT', 'Leer datos', 'Bajo (solo lectura)'],
        ['INSERT', 'Agregar filas', 'Medio'],
        ['UPDATE', 'Modificar datos', 'Alto'],
        ['DELETE', 'Borrar datos', 'Muy alto'],
        ['DROP', 'Eliminar tablas', 'Crítico'],
        ['ALL', 'Todos los permisos', 'Crítico'],
      ],
    },
    {
      tipo: 'explicacion',
      titulo: 'Backups y recuperación',
      texto: 'Un backup es una copia de seguridad de tu base de datos. Sin backups, un fallo puede significar la pérdida total de datos.\n\nTipos de backup:\n1. Completo: copia toda la base de datos\n2. Incremental: copia solo los cambios desde el último backup\n3. Diferencial: copia cambios desde el último backup completo\n\nEn SQLite:\n-- Backup con la línea de comandos:\nsqlite3 mi_bd.db ".backup mi_bd_backup.db"\n\n-- O copiar el archivo directamente:\ncp mi_bd.db mi_bd_backup.db\n\nRegla 3-2-1: 3 copias, 2 medios diferentes, 1 fuera del sitio.',
    },
    {
      tipo: 'explicacion',
      titulo: 'Cifrado de datos sensibles',
      texto: 'Los datos sensibles (contraseñas, información personal, datos financieros) deben estar cifrados.\n\nNUNCA almacenes contraseñas en texto plano. Usa hashing:\n-- En tu aplicación, hashea antes de guardar:\npassword_hash = bcrypt(contraseña)\n\nPara datos en tránsito: usa siempre conexiones SSL/TLS.\nPara datos en reposo: cifra el archivo de base de datos o usa cifrado a nivel de columna.\n\nEn SQLite, puedes usar SQLCipher para cifrar toda la base de datos.',
    },
    {
      tipo: 'advertencia',
      texto: 'NUNCA uses MD5 o SHA1 para contraseñas. Usa bcrypt, scrypt o Argon2. Estos algoritmos están diseñados específicamente para ser lentos y resistentes a ataques de fuerza bruta.',
    },
    {
      tipo: 'resumen',
      puntos: [
        'Principio de mínimo privilegio: da solo los permisos necesarios',
        'GRANT para dar permisos, REVOKE para quitarlos',
        'Haz backups regulares con la regla 3-2-1',
        'NUNCA almacenes contraseñas en texto plano',
        'Usa cifrado para datos sensibles en tránsito y en reposo',
      ],
    },
  ],
  ejercicios: [],
  cuestionario: [
    {
      id: 'q1',
      pregunta: '¿Qué significa el principio de mínimo privilegio?',
      opciones: [
        'Dar todos los permisos para evitar problemas',
        'Dar solo los permisos estrictamente necesarios para cada usuario',
        'Usar contraseñas cortas para facilitar el acceso',
        'Permitir acceso solo desde una IP',
      ],
      correcta: 1,
      explicacion: 'El principio de mínimo privilegio establece que cada usuario debe tener solo los permisos mínimos necesarios para realizar su trabajo. Esto reduce el daño potencial de un compromiso de cuenta.',
    },
    {
      id: 'q2',
      pregunta: '¿Cuál es la regla 3-2-1 de backups?',
      opciones: [
        '3 backups al día, 2 por semana, 1 por mes',
        '3 copias de datos, en 2 medios diferentes, con 1 copia fuera del sitio',
        '3 servidores, 2 bases de datos, 1 backup',
        '3 contraseñas, 2 usuarios, 1 administrador',
      ],
      correcta: 1,
      explicacion: 'La regla 3-2-1: tener al menos 3 copias de tus datos, almacenadas en al menos 2 tipos diferentes de medios, con al menos 1 copia guardada fuera del sitio (offsite).',
    },
    {
      id: 'q3',
      pregunta: '¿Qué algoritmo deberías usar para almacenar contraseñas?',
      opciones: [
        'MD5 (rápido y simple)',
        'SHA1 (estándar de la industria)',
        'bcrypt, scrypt o Argon2 (diseñados para contraseñas)',
        'Texto plano con cifrado de la base de datos',
      ],
      correcta: 2,
      explicacion: 'bcrypt, scrypt y Argon2 están diseñados específicamente para hashing de contraseñas. Son intencionalmente lentos y resistentes a ataques de fuerza bruta, a diferencia de MD5 y SHA1.',
    },
  ],
};
