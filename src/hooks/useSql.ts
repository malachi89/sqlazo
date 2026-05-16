import { useState, useEffect, useCallback, useRef } from 'react';
import type { QueryResult } from '../types';

interface SqlEngine {
  ready: boolean;
  error: string | null;
  executeQuery: (sql: string, setupSql?: string) => QueryResult;
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
        const SQL = await initSqlJs({ locateFile: () => '/sql-wasm.wasm' });
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
      if (setupSql) {
        db.run(setupSql);
      }
      const trimmed = sql.trim();
      if (!trimmed) {
        return { columnas: [], filas: [], error: 'Escribe una consulta SQL primero.' };
      }

      const upperSql = trimmed.toUpperCase();
      const isDML = upperSql.startsWith('INSERT') || upperSql.startsWith('UPDATE') || upperSql.startsWith('DELETE') || upperSql.startsWith('CREATE') || upperSql.startsWith('DROP') || upperSql.startsWith('ALTER');

      if (isDML) {
        db.run(trimmed);
        return { columnas: [], filas: [], filaAfectadas: db.getRowsModified() };
      }

      const stmt = db.prepare(trimmed);
      const columnas: string[] = stmt.getColumnNames();
      const filas: (string | number | null)[][] = [];
      while (stmt.step()) {
        filas.push(stmt.get());
      }
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
