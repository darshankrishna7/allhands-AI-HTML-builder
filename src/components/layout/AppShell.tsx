import React from 'react';
import { useAppStore } from '../../state/store';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { Footer } from './Footer';
import { clsx } from 'clsx';

export const AppShell: React.FC = () => {
  const { sidebarOpen, propertiesPanelOpen, tocSettings } = useAppStore();

  return (
    <div className="flex h-screen bg-surface-50 overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div
          className={clsx(
            'transition-all duration-300 ease-in-out bg-surface-100 border-r border-surface-200',
            sidebarOpen ? 'w-80' : 'w-0',
            'overflow-hidden'
          )}
        >
          <Sidebar />
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* TOC Top Position */}
          {tocSettings.position === 'top' && (
            <div className="bg-surface-50 border-b border-surface-200 px-4 py-2">
              {/* TOC will be rendered here */}
              <div className="text-sm text-surface-600">Table of Contents (Top)</div>
            </div>
          )}

          {/* Main Canvas with optional side TOC */}
          <div className="flex flex-1 min-h-0">
            {/* TOC Left Position */}
            {tocSettings.position === 'left' && (
              <div
                className="bg-surface-50 border-r border-surface-200 overflow-y-auto"
                style={{ width: `${tocSettings.width}px` }}
              >
                {/* TOC will be rendered here */}
                <div className="p-4 text-sm text-surface-600">
                  Table of Contents (Left)
                </div>
              </div>
            )}

            {/* Canvas */}
            <div className="flex-1 overflow-y-auto">
              <Canvas />
            </div>

            {/* TOC Right Position */}
            {tocSettings.position === 'right' && (
              <div
                className="bg-surface-50 border-l border-surface-200 overflow-y-auto"
                style={{ width: `${tocSettings.width}px` }}
              >
                {/* TOC will be rendered here */}
                <div className="p-4 text-sm text-surface-600">
                  Table of Contents (Right)
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Properties Panel */}
        <div
          className={clsx(
            'transition-all duration-300 ease-in-out bg-surface-100 border-l border-surface-200',
            propertiesPanelOpen ? 'w-80' : 'w-0',
            'overflow-hidden'
          )}
        >
          <PropertiesPanel />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};