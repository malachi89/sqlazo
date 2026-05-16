import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import fs from 'fs'
import path from 'path'

const VIRTUAL_ID = 'virtual:sql-wasm-base64'
const RESOLVED_ID = '\0virtual:sql-wasm-base64'

function inlineSqlWasm() {
  return {
    name: 'inline-sql-wasm',
    resolveId(id: string) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id: string) {
      if (id === RESOLVED_ID) {
        const wasmPath = path.resolve('node_modules/sql.js/dist/sql-wasm.wasm')
        const base64 = fs.readFileSync(wasmPath).toString('base64')
        return `export default "${base64}"`
      }
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [
    react(),
    inlineSqlWasm(),
    viteSingleFile(),
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  optimizeDeps: {
    exclude: ['sql.js'],
  },
})
