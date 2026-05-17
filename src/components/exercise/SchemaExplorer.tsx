import React, { useState } from 'react'
import type { EsquemaBD, TablaSchema, ColumnaSchema } from '../../utils/schemaParser'
import { Database, Table2, Key, ArrowRightFromLine, ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react'

interface SchemaExplorerProps {
  esquema: EsquemaBD
  embedded?: boolean
}

const COLOR_TIPO: Record<string, string> = {
  INTEGER: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  REAL: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  TEXT: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
}

function TipoBadge({ tipo }: { tipo: string }) {
  return (
    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${COLOR_TIPO[tipo] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
      {tipo}
    </span>
  )
}

function FilaColumna({ col }: { col: ColumnaSchema }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 text-sm border-b border-gray-100 dark:border-gray-700/50 last:border-0">
      <div className="flex items-center gap-1 w-7 flex-shrink-0">
        {col.pk && <Key size={13} className="text-amber-500" title="Primary Key" />}
        {col.fk && <ArrowRightFromLine size={13} className="text-indigo-400" title="Foreign Key" />}
      </div>
      <span className="font-mono text-gray-800 dark:text-gray-200 flex-1 truncate">{col.nombre}</span>
      <TipoBadge tipo={col.tipo} />
      <div className="flex gap-1.5 text-[10px] text-gray-600 dark:text-gray-400 font-mono">
        {col.pk && <span className="text-amber-500 font-semibold">PK</span>}
        {col.fk && (
          <span className="text-indigo-400 font-semibold" title={`${col.fkTabla}.${col.fkColumna}`}>
            FK→{col.fkTabla}
          </span>
        )}
        {col.notNull && <span>NN</span>}
        {col.unico && <span>UQ</span>}
      </div>
    </div>
  )
}

function TablaCard({ tabla }: { tabla: TablaSchema }) {
  const [abierta, setAbierta] = useState(true)
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800/60">
      <button
        onClick={() => setAbierta(!abierta)}
        className="w-full flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-colors text-left"
      >
        {abierta ? <ChevronDown size={16} className="text-gray-500" /> : <ChevronRight size={16} className="text-gray-500" />}
        <Table2 size={16} className="text-gray-500 dark:text-gray-400" />
        <span className="font-mono font-semibold text-sm text-gray-800 dark:text-gray-200">{tabla.nombre}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">{tabla.columnas.length} col·{tabla.filas} filas</span>
      </button>
      {abierta && (
        <div>
          {tabla.columnas.map(col => (
            <FilaColumna key={col.nombre} col={col} />
          ))}
        </div>
      )}
    </div>
  )
}

export function SchemaExplorer({ esquema, embedded }: SchemaExplorerProps) {
  const [visible, setVisible] = useState(embedded)
  if (esquema.tablas.length === 0) return null

  if (embedded) {
    return (
      <div className="space-y-3">
        {esquema.tablas.map(t => (
          <TablaCard key={t.nombre} tabla={t} />
        ))}
      </div>
    )
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setVisible(!visible)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-colors text-left group"
      >
        <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
          <Database size={16} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {visible ? 'Ocultar esquema' : 'Ver esquema de la BD'}
          </span>
          {!visible && (
            <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
              {esquema.tablas.map(t => t.nombre).join(', ')}
            </span>
          )}
        </div>
        {visible ? <EyeOff size={16} className="text-gray-500" /> : <Eye size={16} className="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />}
      </button>
      {visible && (
        <div className="p-3 space-y-3 border-t border-gray-200 dark:border-gray-700">
          {esquema.tablas.map(t => (
            <TablaCard key={t.nombre} tabla={t} />
          ))}
        </div>
      )}
    </div>
  )
}
