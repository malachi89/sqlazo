import React, { createContext, useContext, useState, useCallback } from 'react'
import type { EsquemaBD } from '../utils/schemaParser'

interface SchemaContextType {
  esquema: EsquemaBD | null
  setEsquema: (e: EsquemaBD | null) => void
}

const SchemaContext = createContext<SchemaContextType>({
  esquema: null,
  setEsquema: () => {},
})

export function SchemaProvider({ children }: { children: React.ReactNode }) {
  const [esquema, setEsquema] = useState<EsquemaBD | null>(null)
  return (
    <SchemaContext.Provider value={{ esquema, setEsquema }}>
      {children}
    </SchemaContext.Provider>
  )
}

export function useSchema() {
  return useContext(SchemaContext)
}
