import React, { useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { sql, SQLite } from '@codemirror/lang-sql';
import { oneDark } from '@codemirror/theme-one-dark';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { Play, RotateCcw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SqlEditorProps {
  valorInicial?: string;
  onEjecutar: (query: string) => void;
  soloLectura?: boolean;
  placeholder?: string;
  altura?: string;
}

export function SqlEditor({
  valorInicial = '',
  onEjecutar,
  soloLectura = false,
  placeholder = 'Escribe tu consulta SQL aquí...',
  altura = '160px',
}: SqlEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const { tema } = useTheme();

  const getQuery = useCallback(() => {
    return viewRef.current?.state.doc.toString() ?? '';
  }, []);

  const handleEjecutar = useCallback(() => {
    const q = getQuery().trim();
    if (q) onEjecutar(q);
  }, [getQuery, onEjecutar]);

  const handleEjecutarRef = useRef(handleEjecutar);
  useLayoutEffect(() => { handleEjecutarRef.current = handleEjecutar; });

  const handleLimpiar = useCallback(() => {
    if (viewRef.current && !soloLectura) {
      viewRef.current.dispatch({
        changes: { from: 0, to: viewRef.current.state.doc.length, insert: '' },
      });
    }
  }, [soloLectura]);

  useEffect(() => {
    if (!editorRef.current) return;

    const ejecutarKeymap = keymap.of([
      {
        key: 'Ctrl-Enter',
        run: () => { handleEjecutarRef.current(); return true; },
      },
      {
        key: 'Mod-Enter',
        run: () => { handleEjecutarRef.current(); return true; },
      },
    ]);

    const extensions = [
      lineNumbers(),
      highlightActiveLine(),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      ejecutarKeymap,
      sql({ dialect: SQLite }),
      EditorView.lineWrapping,
      EditorView.editable.of(!soloLectura),
      tema === 'oscuro' ? oneDark : [],
      EditorView.theme({
        '&': {
          fontSize: '13px',
          fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", "Consolas", monospace',
        },
        '.cm-content': { padding: '12px 0' },
        '.cm-line': { padding: '0 12px' },
        '&.cm-focused': { outline: 'none' },
      }),
    ];

    if (tema === 'claro') {
      extensions.push(EditorView.theme({
        '&': { background: '#f8fafc', color: '#1e293b' },
        '.cm-gutters': { background: '#f1f5f9', color: '#94a3b8', borderRight: '1px solid #e2e8f0' },
        '.cm-activeLine': { background: '#eff6ff' },
        '.cm-activeLineGutter': { background: '#dbeafe' },
        '.cm-cursor': { borderLeftColor: '#3b82f6' },
      }));
    }

    const state = EditorState.create({
      doc: valorInicial,
      extensions,
    });

    const view = new EditorView({ state, parent: editorRef.current });
    viewRef.current = view;

    return () => { view.destroy(); viewRef.current = null; };
  }, [tema, soloLectura]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== valorInicial) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: valorInicial },
      });
    }
  }, [valorInicial]);

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-900">
      <div
        ref={editorRef}
        style={{ minHeight: altura, maxHeight: '400px', overflowY: 'auto' }}
        className="flex-1"
      />
      {!soloLectura && (
        <div className="flex items-center justify-between px-3 py-2 bg-gray-800 dark:bg-gray-900 border-t border-gray-700">
          <span className="text-xs text-gray-500">Ctrl+Enter para ejecutar</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLimpiar}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-md transition-colors"
            >
              <RotateCcw size={12} /> Limpiar
            </button>
            <button
              onClick={handleEjecutar}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors"
            >
              <Play size={12} /> Ejecutar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
