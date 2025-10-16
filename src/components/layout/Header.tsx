import React from 'react';
import { useAppStore } from '../../state/store';
import {
  Bars3Icon,
  DocumentArrowDownIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

export const Header: React.FC = () => {
  const {
    document,
    isDirty,
    lastSaved,
    toggleSidebar,
    togglePropertiesPanel,
    sidebarOpen,
    propertiesPanelOpen,
    canUndo,
    canRedo,
    undo,
    redo,
    save,
  } = useAppStore();

  const handleExport = () => {
    // TODO: Implement HTML export
    console.log('Export HTML');
  };

  const handleSave = () => {
    save();
  };

  const formatLastSaved = (date: Date | null) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-50 border-b border-surface-200 h-16">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className={clsx(
              'btn-ghost p-2',
              sidebarOpen && 'bg-surface-200'
            )}
            title="Toggle Sidebar"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>

          {/* App Title */}
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-surface-900">HTML Slides</h1>
            <div className="text-surface-400">|</div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={document.title}
                onChange={(e) => {
                  useAppStore.getState().updateDocument({ title: e.target.value });
                }}
                className="bg-transparent text-surface-700 font-medium focus:outline-none focus:bg-surface-100 px-2 py-1 rounded"
                placeholder="Document title"
              />
              {isDirty && (
                <div className="w-2 h-2 bg-accent-500 rounded-full" title="Unsaved changes" />
              )}
            </div>
          </div>
        </div>

        {/* Center Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Undo/Redo */}
          <button
            onClick={undo}
            disabled={!canUndo()}
            className="btn-ghost p-2 disabled:opacity-50"
            title="Undo (Ctrl+Z)"
          >
            <ArrowUturnLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo()}
            className="btn-ghost p-2 disabled:opacity-50"
            title="Redo (Ctrl+Shift+Z)"
          >
            <ArrowUturnRightIcon className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-surface-300" />

          {/* Save */}
          <button
            onClick={handleSave}
            className={clsx(
              'btn-ghost px-3 py-2 text-sm',
              isDirty && 'text-accent-600 font-medium'
            )}
            title="Save (Ctrl+S)"
          >
            {isDirty ? 'Save' : 'Saved'}
          </button>

          {/* Export */}
          <button
            onClick={handleExport}
            className="btn-primary px-4 py-2 text-sm"
            title="Export HTML"
          >
            <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Status */}
          <div className="text-xs text-surface-500">
            Last saved: {formatLastSaved(lastSaved)}
          </div>

          <div className="w-px h-6 bg-surface-300" />

          {/* Theme Switcher */}
          <button
            className="btn-ghost p-2"
            title="Theme Settings"
          >
            <Cog6ToothIcon className="w-5 h-5" />
          </button>

          {/* Help */}
          <button
            className="btn-ghost p-2"
            title="Help"
          >
            <QuestionMarkCircleIcon className="w-5 h-5" />
          </button>

          {/* Properties Panel Toggle */}
          <button
            onClick={togglePropertiesPanel}
            className={clsx(
              'btn-ghost p-2',
              propertiesPanelOpen && 'bg-surface-200'
            )}
            title="Toggle Properties Panel"
          >
            <Squares2X2Icon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};