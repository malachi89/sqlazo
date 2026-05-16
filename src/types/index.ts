export type Nivel = 'muy-novato' | 'novato' | 'intermedio' | 'avanzado';

export type SeccionContenido =
  | { tipo: 'introduccion'; texto: string }
  | { tipo: 'explicacion'; titulo: string; texto: string }
  | { tipo: 'analogia'; icono: string; texto: string }
  | { tipo: 'ejemplo'; titulo: string; descripcion: string; sql: string; setupSql?: string; tablaResultado: { columnas: string[]; filas: (string | number | null)[][] } }
  | { tipo: 'tabla-visual'; titulo: string; cabeceras: string[]; filas: (string | number | null)[][] }
  | { tipo: 'error-comun'; titulo: string; codigoMal: string; problema: string; codigoBien: string; solucion: string }
  | { tipo: 'resumen'; puntos: string[] }
  | { tipo: 'nota'; texto: string }
  | { tipo: 'advertencia'; texto: string }
  | { tipo: 'codigo'; lenguaje: string; codigo: string }
  | { tipo: 'separador' };

export interface PreguntaQuiz {
  id: string;
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

export interface EjercicioLeccion {
  id: string;
  titulo: string;
  descripcion: string;
  setupSql: string;
  resultadoEsperado: { columnas: string[]; filas: (string | number | null)[][] };
  solucionOficial: string;
  pistas: string[];
  explicacion: string;
}

export interface Leccion {
  id: string;
  titulo: string;
  descripcion: string;
  duracionMinutos: number;
  conceptosClave: string[];
  contenido: SeccionContenido[];
  ejercicios: EjercicioLeccion[];
  cuestionario: PreguntaQuiz[];
}

export interface Modulo {
  id: string;
  titulo: string;
  descripcion: string;
  lecciones: Leccion[];
}

export interface NivelCurso {
  id: Nivel;
  titulo: string;
  descripcion: string;
  colorClase: string;
  bgClase: string;
  borderClase: string;
  emoji: string;
  modulos: Modulo[];
}

export interface EjercicioBanco {
  id: string;
  nivel: Nivel;
  titulo: string;
  descripcion: string;
  objetivo: string;
  setupSql: string;
  resultadoEsperado: { columnas: string[]; filas: (string | number | null)[][] };
  solucionOficial: string;
  solucionesAlternativas: string[];
  explicacion: string;
  pistas: string[];
  retroalimentacionError: string;
}

export interface QueryResult {
  columnas: string[];
  filas: (string | number | null)[][];
  error?: string;
  filaAfectadas?: number;
}

export interface EvaluationResult {
  correcto: boolean;
  mensaje: string;
  xpGanado?: number;
  esPrimerIntento?: boolean;
}

export interface ProgresoLeccion {
  completada: boolean;
  ejerciciosCompletados: string[];
  quizCompletado: boolean;
  quizPuntuacion: number;
  ultimaVez: string;
}

export interface Insignia {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  condicion: string;
}

export interface ProgresoUsuario {
  lecciones: Record<string, ProgresoLeccion>;
  ejerciciosBanco: Record<string, boolean>;
  tema: 'oscuro' | 'claro';
  xpTotal: number;
  insignias: string[];
  racha: number;
  ultimaActividad: string;
  estadisticas: {
    leccionesCompletadas: number;
    ejerciciosResueltos: number;
    ejerciciosPrimerIntento: number;
    ejerciciosSinPistas: number;
  };
}

export type TituloEstudiante =
  | 'Explorador'
  | 'Aprendiz'
  | 'Consultor Junior'
  | 'Desarrollador SQL'
  | 'Analista de Datos'
  | 'Arquitecto de BD'
  | 'Maestro SQL';

export interface NivelEstudiante {
  titulo: TituloEstudiante;
  xpMin: number;
  xpMax: number;
  xpSiguiente: number;
  progreso: number;
}
