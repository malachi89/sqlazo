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

export const ESQUEMA_GLOBAL_SQL = `
CREATE TABLE departamentos (id INTEGER PRIMARY KEY, nombre TEXT, presupuesto REAL, ciudad TEXT);
CREATE TABLE empleados (id INTEGER PRIMARY KEY, nombre TEXT, departamento_id INTEGER, salario REAL, fecha_contrato TEXT, activo INTEGER);
CREATE TABLE productos (id INTEGER PRIMARY KEY, nombre TEXT, categoria_id INTEGER, precio REAL, stock INTEGER, proveedor_id INTEGER);
CREATE TABLE categorias (id INTEGER PRIMARY KEY, nombre TEXT);
CREATE TABLE clientes (id INTEGER PRIMARY KEY, nombre TEXT, pais TEXT, email TEXT);
CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, empleado_id INTEGER, total REAL, fecha TEXT, estado TEXT);
CREATE TABLE proveedores (id INTEGER PRIMARY KEY, nombre TEXT, pais TEXT, contacto TEXT);
CREATE TABLE inventario_ajustes (id INTEGER PRIMARY KEY, producto_id INTEGER, cantidad_ajuste INTEGER, motivo TEXT, fecha TEXT);
CREATE TABLE ventas (id INTEGER PRIMARY KEY, empleado_id INTEGER, producto_id INTEGER, cantidad INTEGER, fecha TEXT, monto REAL);
CREATE TABLE ventas_mensuales (id INTEGER PRIMARY KEY, empleado_id INTEGER, mes TEXT, ventas REAL);
CREATE TABLE proyectos (id INTEGER PRIMARY KEY, nombre TEXT, presupuesto REAL, inicio TEXT, fin TEXT, estado TEXT);
CREATE TABLE asignaciones (id INTEGER PRIMARY KEY, empleado_id INTEGER, proyecto_id INTEGER, rol TEXT, horas INTEGER);
`;

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
    const t = tablas.find(t => t.nombre === match![1])
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
