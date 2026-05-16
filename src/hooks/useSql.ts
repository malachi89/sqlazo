import { useState, useEffect, useCallback, useRef } from 'react';
import type { QueryResult } from '../types';

interface SqlEngine {
  ready: boolean;
  error: string | null;
  executeQuery: (sql: string, setupSql?: string) => QueryResult;
}

function loadWasmBinary(): Promise<ArrayBuffer> {
  const wasmPath = './sql-wasm.wasm';

  // fetch works on http/https; fails on file:// due to CORS
  // XHR works on both — status 0 means success on file://
  return fetch(wasmPath)
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.arrayBuffer();
    })
    .catch(() =>
      new Promise<ArrayBuffer>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', wasmPath, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 0) {
            resolve(xhr.response as ArrayBuffer);
          } else {
            reject(new Error(`XHR ${xhr.status}`));
          }
        };
        xhr.onerror = () => reject(new Error('XHR network error'));
        xhr.send();
      })
    );
}

export function useSql(): SqlEngine {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const SQLRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const initSqlJs = (await import('sql.js')).default;
        const wasmBinary = await loadWasmBinary();
        const SQL = await initSqlJs({ wasmBinary });
        if (!cancelled) {
          SQLRef.current = SQL;
          setReady(true);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Error cargando SQLite');
        }
      }
    }
    init();
    return () => { cancelled = true; };
  }, []);

  const executeQuery = useCallback((sql: string, setupSql?: string): QueryResult => {
    if (!SQLRef.current) {
      return { columnas: [], filas: [], error: 'Motor SQL no inicializado aún.' };
    }
    let db: any = null;
    try {
      db = new SQLRef.current.Database();
      if (setupSql) db.run(setupSql);

      const trimmed = sql.trim();
      if (!trimmed) {
        return { columnas: [], filas: [], error: 'Escribe una consulta SQL primero.' };
      }

      const upper = trimmed.toUpperCase();
      const isDML =
        upper.startsWith('INSERT') || upper.startsWith('UPDATE') ||
        upper.startsWith('DELETE') || upper.startsWith('CREATE') ||
        upper.startsWith('DROP')   || upper.startsWith('ALTER')  ||
        upper.startsWith('BEGIN')  || upper.startsWith('COMMIT') ||
        upper.startsWith('ROLLBACK');

      if (isDML) {
        db.run(trimmed);
        return { columnas: [], filas: [], filaAfectadas: db.getRowsModified() };
      }

      const stmt = db.prepare(trimmed);
      const columnas: string[] = stmt.getColumnNames();
      const filas: (string | number | null)[][] = [];
      while (stmt.step()) filas.push(stmt.get());
      stmt.free();
      return { columnas, filas };
    } catch (e) {
      return { columnas: [], filas: [], error: e instanceof Error ? e.message : 'Error desconocido' };
    } finally {
      db?.close();
    }
  }, []);

  return { ready, error, executeQuery };
}
