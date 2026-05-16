import React from 'react';

type Variante = 'primario' | 'secundario' | 'fantasma' | 'peligro' | 'exito';
type Tamano = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  tamano?: Tamano;
  cargando?: boolean;
  icono?: React.ReactNode;
}

const estilosBase = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const estilosVariante: Record<Variante, string> = {
  primario: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600',
  secundario: 'bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100',
  fantasma: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-400 dark:hover:bg-gray-800 dark:text-gray-300',
  peligro: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  exito: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
};

const estilosTamano: Record<Tamano, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  variante = 'primario',
  tamano = 'md',
  cargando = false,
  icono,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${estilosBase} ${estilosVariante[variante]} ${estilosTamano[tamano]} ${className}`}
      disabled={disabled || cargando}
      {...props}
    >
      {cargando ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icono}
      {children}
    </button>
  );
}
