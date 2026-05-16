# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Desarrollo (abre el browser automáticamente en localhost:5173)
npm run dev
# o doble clic en abrir-sqlazo.bat / iniciar.bat

# Type-check sin compilar
npx tsc --noEmit

# Build de distribución (genera dist/index.html auto-contenido, un solo archivo)
npm run build
```

No hay tests automatizados ni linter configurado.

## Arquitectura general

Aplicación educativa de SQL offline. Todo corre en el browser: SQLite via WASM, sin backend.

### Motor SQL

`src/hooks/useSql.ts` carga `sql.js` con el binario WASM embebido como base64. El plugin `inlineSqlWasm` en `vite.config.ts` resuelve el módulo virtual `virtual:sql-wasm-base64` leyendo el `.wasm` en tiempo de build/dev. En `npm run build`, `viteSingleFile` además incrusta todo (JS, CSS, WASM base64) en un único `dist/index.html`.

Cada ejecución SQL crea y destruye una `Database` efímera — no hay estado persistente entre consultas. El estado de la app (progreso, XP, racha) vive en `localStorage` via `src/utils/progressStorage.ts`.

### Contenido del curso

El contenido está completamente hardcodeado en TypeScript:

- **Lecciones**: `src/content/levels/{nivel}/modulo-{nn}/leccion-{nn}.ts` — cada archivo exporta `leccion: Leccion`
- **Registro**: `src/content/curriculum.ts` importa todas las lecciones y construye el array `curriculum: NivelCurso[]`
- **Banco de ejercicios**: `src/content/exercises/{nivel}.ts`

Para agregar una lección: crear el archivo en la carpeta correspondiente siguiendo la estructura `Leccion`, luego importarla y agregarla al módulo en `curriculum.ts`.

### Tipos de secciones de lección (`SeccionContenido`)

Cada lección tiene un array `contenido: SeccionContenido[]` que se renderiza slide a slide en `LessonContent`. Los tipos disponibles: `introduccion`, `explicacion`, `analogia`, `ejemplo` (con editor SQL interactivo), `nota`, `advertencia`, `resumen`, `error-comun`, `tabla-visual`, `codigo`, `separador`.

`LessonContent` tiene altura fija de 460px con scroll interno — los botones Anterior/Siguiente siempre están al fondo.

### Evaluación de ejercicios

`src/utils/sqlEvaluator.ts` compara el resultado de la query del usuario con `resultadoEsperado`. La comparación es case-insensitive y, por defecto, sin importar el orden de filas. Las columnas deben coincidir exactamente en nombre y cantidad.

### Progreso y gamificación

- `AppContext` (`src/context/AppContext.tsx`) es el estado central: expone funciones para completar lecciones/ejercicios y consultar progreso.
- `useProgress()` es el hook de acceso — solo funciona dentro de `AppProvider`.
- Los niveles del curso se desbloquean por XP o cantidad de lecciones completadas (lógica en `estaDesbloqueado` dentro de `AppContext`).
- Las insignias se evalúan en `src/utils/gamification.ts` después de cada acción de completado.

### Rutas

```
/                          → Home (selector de niveles)
/dashboard                 → Estadísticas y progreso
/curso/:nivel              → CoursePage (módulos y lecciones del nivel)
/leccion/:nivel/:mod/:lec  → LessonPage (slide + ejercicios + quiz)
/ejercicios                → ExerciseBankPage (banco libre de ejercicios)
```

Los IDs de lección siguen el patrón `mn-01-01` (nivel-modulo-leccion). Los IDs deben ser únicos globalmente ya que el progreso se indexa por ellos en localStorage.
