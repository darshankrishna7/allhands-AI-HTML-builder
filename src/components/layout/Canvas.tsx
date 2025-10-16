import React from 'react';
import { useAppStore } from '../../state/store';
import { SectionRenderer } from '../SectionRenderer';
import { PlusIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

export const Canvas: React.FC = () => {
  const { 
    document, 
    selectedSectionId, 
    selectSection, 
    addSection,
    editorSettings 
  } = useAppStore();

  const handleAddSection = () => {
    // For now, add a hero section by default
    addSection('hero');
  };

  const getCanvasClasses = () => {
    const baseClasses = 'transition-all duration-300 ease-in-out mx-auto';
    
    switch (editorSettings.devicePreview) {
      case 'mobile':
        return clsx(baseClasses, 'max-w-sm');
      case 'tablet':
        return clsx(baseClasses, 'max-w-2xl');
      case 'desktop':
      default:
        return clsx(baseClasses, 'max-w-container');
    }
  };

  const getZoomClasses = () => {
    switch (editorSettings.zoom) {
      case '75':
        return 'scale-75 origin-top';
      case '125':
        return 'scale-125 origin-top';
      case '100':
      default:
        return 'scale-100';
    }
  };

  return (
    <div className="min-h-full bg-surface-50 p-8">
      <div 
        className={clsx(getCanvasClasses(), getZoomClasses())}
        style={{
          transformOrigin: 'top center',
        }}
      >
        {/* Document Container */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden min-h-screen">
          {document.sections.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
              <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mb-4">
                <PlusIcon className="w-8 h-8 text-surface-400" />
              </div>
              <h3 className="text-lg font-semibold text-surface-900 mb-2">
                Start building your slides
              </h3>
              <p className="text-surface-600 mb-6 max-w-md">
                Add your first section by selecting a block from the sidebar or clicking the button below.
              </p>
              <button
                onClick={handleAddSection}
                className="btn-primary px-6 py-3"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add First Section
              </button>
            </div>
          ) : (
            /* Sections */
            <div className="relative">
              {document.sections.map((section, index) => (
                <div key={section.id} className="relative group">
                  {/* Section */}
                  <div
                    className={clsx(
                      'relative',
                      selectedSectionId === section.id && 'ring-2 ring-primary-500 ring-offset-2',
                      !section.visible && 'opacity-50'
                    )}
                    onClick={() => selectSection(section.id)}
                  >
                    <SectionRenderer section={section} />
                  </div>

                  {/* Add Section Button (appears between sections on hover) */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => addSection('hero', section.id)}
                      className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-2 shadow-lg"
                      title="Add section below"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Final Add Section Button */}
              <div className="flex justify-center py-8">
                <button
                  onClick={handleAddSection}
                  className="btn-secondary px-6 py-3"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add Section
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};