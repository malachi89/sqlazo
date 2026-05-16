import { useState, useEffect, useCallback } from 'react'
import wasmBase64 from 'virtual:sql-wasm-base64'
import type { QueryResult } from '../types'

function base64ToBuffer(b64: string): ArrayBuffer {
  const bin = atob(b64)
  const buf = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i)
  return buf.buffer
}

interface SqlEngine {
  ready: boolean
  error: string | null
  executeQuery: (sql: string, setupSql?: string) => QueryResult
}

let singletonReady = false
let singletonError: string | null = null
let singletonSQL: any = null
let initPromise: Promise<void> | null = null

async function ensureInit(): Promise<void> {
  if (initPromise) return initPromise
  initPromise = (async () => {
    try {
      const initSqlJs = (await import('sql.js')).default
      const wasmBinary = base64ToBuffer(wasmBase64)
      singletonSQL = await initSqlJs({ wasmBinary })
      singletonReady = true
    } catch (e) {
      singletonError = e instanceof Error
        ? e.message
        : 'Error desconocido cargando SQLite'
    }
  })()
  return initPromise
}

export function useSql(): SqlEngine {
  const [ready, setReady] = useState(singletonReady)
  const [error, setError] = useState<string | null>(singletonError)

  useEffect(() => {
    if (singletonReady || singletonError) {
      setReady(singletonReady)
      setError(singletonError)
      return
    }
    ensureInit().then(() => {
      setReady(singletonReady)
      setError(singletonError)
    })
  }, [])

  const executeQuery = useCallback((sql: string, setupSql?: string): QueryResult => {
    if (!singletonSQL) {
      return { columnas: [], filas: [], error: 'Motor SQL no inicializado aún.' }
    }
    let db: any = null
    try {
      db = new singletonSQL.Database()
      if (setupSql) db.run(setupSql)

      const trimmed = sql.trim()
      if (!trimmed) {
        return { columnas: [], filas: [], error: 'Escribe una consulta SQL primero.' }
      }

      const upper = trimmed.toUpperCase()
      const isDML =
        upper.startsWith('INSERT') || upper.startsWith('UPDATE') ||
        upper.startsWith('DELETE') || upper.startsWith('CREATE') ||
        upper.startsWith('DROP')   || upper.startsWith('ALTER')  ||
        upper.startsWith('BEGIN')  || upper.startsWith('COMMIT') ||
        upper.startsWith('ROLLBACK')

      if (isDML) {
        db.run(trimmed)
        return { columnas: [], filas: [], filaAfectadas: db.getRowsModified() }
      }

      const stmt = db.prepare(trimmed)
      const columnas: string[] = stmt.getColumnNames()
      const filas: (string | number | null)[][] = []
      while (stmt.step()) filas.push(stmt.get())
      stmt.free()
      return { columnas, filas }
    } catch (e) {
      return { columnas: [], filas: [], error: e instanceof Error ? e.message : 'Error desconocido' }
    } finally {
      db?.close()
    }
  }, [])

  return { ready, error, executeQuery }
}
