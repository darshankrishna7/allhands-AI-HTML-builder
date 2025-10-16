import React from 'react';
import { useAppStore } from '../../state/store';
import { blockDefinitions } from '../../state/blockDefinitions';
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  LockOpenIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

export const PropertiesPanel: React.FC = () => {
  const { 
    document, 
    selectedSectionId, 
    updateSection, 
    duplicateSection, 
    deleteSection 
  } = useAppStore();

  const selectedSection = selectedSectionId 
    ? document.sections.find(s => s.id === selectedSectionId)
    : null;

  if (!selectedSection) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-surface-200">
          <h3 className="text-sm font-semibold text-surface-900">Properties</h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="text-surface-500">
            <div className="w-12 h-12 bg-surface-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <LinkIcon className="w-6 h-6" />
            </div>
            <p className="text-sm">
              Select a section to edit its properties
            </p>
          </div>
        </div>
      </div>
    );
  }

  const blockDef = blockDefinitions[selectedSection.type];

  const handleToggleVisibility = () => {
    updateSection(selectedSection.id, { visible: !selectedSection.visible });
  };

  const handleToggleLock = () => {
    updateSection(selectedSection.id, { locked: !selectedSection.locked });
  };

  const handleToggleTOC = () => {
    updateSection(selectedSection.id, { includeInTOC: !selectedSection.includeInTOC });
  };

  const handleUpdateAnchor = (anchorId: string) => {
    // Validate anchor ID is unique
    const existingIds = document.sections
      .filter(s => s.id !== selectedSection.id)
      .map(s => s.anchorId);
    
    if (!existingIds.includes(anchorId)) {
      updateSection(selectedSection.id, { anchorId });
    }
  };

  const handleDuplicate = () => {
    duplicateSection(selectedSection.id);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this section?')) {
      deleteSection(selectedSection.id);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-surface-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{blockDef.icon}</span>
            <div>
              <h3 className="text-sm font-semibold text-surface-900">
                {blockDef.name}
              </h3>
              <p className="text-xs text-surface-600">
                {blockDef.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Section Controls */}
          <div>
            <h4 className="text-sm font-medium text-surface-900 mb-3">Section</h4>
            <div className="space-y-3">
              {/* Anchor ID */}
              <div>
                <label className="block text-xs font-medium text-surface-700 mb-1">
                  Anchor ID
                </label>
                <input
                  type="text"
                  value={selectedSection.anchorId}
                  onChange={(e) => handleUpdateAnchor(e.target.value)}
                  className="input text-xs"
                  placeholder="section-anchor"
                />
                <p className="text-xs text-surface-500 mt-1">
                  Used for table of contents links
                </p>
              </div>

              {/* Toggle Controls */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-surface-700">Visible</span>
                <button
                  onClick={handleToggleVisibility}
                  className={clsx(
                    'p-1 rounded',
                    selectedSection.visible 
                      ? 'text-primary-600 hover:bg-primary-50' 
                      : 'text-surface-400 hover:bg-surface-100'
                  )}
                >
                  {selectedSection.visible ? (
                    <EyeIcon className="w-4 h-4" />
                  ) : (
                    <EyeSlashIcon className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-surface-700">Locked</span>
                <button
                  onClick={handleToggleLock}
                  className={clsx(
                    'p-1 rounded',
                    selectedSection.locked 
                      ? 'text-accent-600 hover:bg-accent-50' 
                      : 'text-surface-400 hover:bg-surface-100'
                  )}
                >
                  {selectedSection.locked ? (
                    <LockClosedIcon className="w-4 h-4" />
                  ) : (
                    <LockOpenIcon className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-surface-700">Include in TOC</span>
                <input
                  type="checkbox"
                  checked={selectedSection.includeInTOC}
                  onChange={handleToggleTOC}
                  className="rounded border-surface-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Block-specific Properties */}
          <div>
            <h4 className="text-sm font-medium text-surface-900 mb-3">Properties</h4>
            <div className="text-xs text-surface-600">
              Block-specific property editors will be implemented here based on the section type.
            </div>
          </div>

          {/* Actions */}
          <div>
            <h4 className="text-sm font-medium text-surface-900 mb-3">Actions</h4>
            <div className="space-y-2">
              <button
                onClick={handleDuplicate}
                className="btn-secondary w-full text-xs py-2"
              >
                <DocumentDuplicateIcon className="w-4 h-4 mr-2" />
                Duplicate Section
              </button>
              <button
                onClick={handleDelete}
                className="btn-ghost w-full text-xs py-2 text-accent-600 hover:bg-accent-50"
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete Section
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};