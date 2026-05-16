import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ToastContainer } from '../ui/Toast';
import { curriculum } from '../../content/curriculum';

interface LayoutProps {
  children: React.ReactNode;
  mostrarSidebar?: boolean;
}

export function Layout({ children, mostrarSidebar = true }: LayoutProps) {
  const [sidebarAbierto, setSidebarAbierto] = useState(mostrarSidebar);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Header
        sidebarAbierto={sidebarAbierto}
        onToggleSidebar={() => setSidebarAbierto(p => !p)}
      />
      <div className="flex flex-1 overflow-hidden">
        {mostrarSidebar && (
          <Sidebar curriculum={curriculum} abierto={sidebarAbierto} />
        )}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
