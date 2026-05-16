export type ColumnaSchema = {
  nombre: string
  tipo: string
  pk: boolean
  fk: boolean
  fkTabla?: string
  fkColumna?: string
  notNull: boolean
  unico: boolean
}

export type TablaSchema = {
  nombre: string
  columnas: ColumnaSchema[]
  filas: number
}

export type EsquemaBD = {
  tablas: TablaSchema[]
}

function normalizarTipo(t: string): string {
  const m = t.match(/^(\w+)/)
  return m ? m[1].toUpperCase() : t.toUpperCase()
}

export function extractSchema(setupSql: string): EsquemaBD {
  const tablas: TablaSchema[] = []
  const FK_REFS: { origen: string; col: string; ref: string }[] = []

  const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]*?)\)\s*;/gi
  let match: RegExpExecArray | null

  while ((match = tableRegex.exec(setupSql)) !== null) {
    const nombre = match[1]
    const bodyRaw = match[2]
    const lines = bodyRaw
      .replace(/\n/g, ' ')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
    const columnas: ColumnaSchema[] = []
    for (const line of lines) {
      const fkMatch = line.match(
        /^FOREIGN\s+KEY\s*\((\w+)\)\s*REFERENCES\s+(\w+)\s*\((\w+)\)/i
      )
      if (fkMatch) {
        FK_REFS.push({
          origen: nombre,
          col: fkMatch[1],
          ref: `${fkMatch[2]}.${fkMatch[3]}`,
        })
        continue
      }
      if (/^(PRIMARY\s+KEY|UNIQUE|CHECK|INDEX|CONSTRAINT)/i.test(line)) continue
      const colMatch = line.match(/^(\w+)\s+(.+)/)
      if (!colMatch) continue
      const colName = colMatch[1]
      const rest = colMatch[2].trim()
      const tipoRaw = rest.split(/\s+/)[0]
      const tipo = normalizarTipo(tipoRaw)
      const upper = rest.toUpperCase()
      const pk = /\bPRIMARY\s+KEY\b/i.test(rest) || /AUTOINCREMENT/i.test(rest)
      const notNull = /\bNOT\s+NULL\b/i.test(rest)
      const unico = /\bUNIQUE\b/i.test(rest)
      columnas.push({
        nombre: colName,
        tipo,
        pk,
        fk: false,
        notNull,
        unico,
      })
    }
    tablas.push({ nombre, columnas, filas: 0 })
  }

  const INSERT_RE = /INSERT\s+INTO\s+(\w+)/gi
  while ((match = INSERT_RE.exec(setupSql)) !== null) {
    const t = tablas.find(t => t.nombre === match[1])
    if (t) t.filas++
  }

  for (const fk of FK_REFS) {
    const t = tablas.find(t => t.nombre === fk.origen)
    if (t) {
      const c = t.columnas.find(col => col.nombre === fk.col)
      if (c) {
        c.fk = true
        const [tbl, col] = fk.ref.split('.')
        c.fkTabla = tbl
        c.fkColumna = col
      }
    }
  }

  return { tablas }
}
