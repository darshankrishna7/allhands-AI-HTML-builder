import React from 'react';
import { useAppStore } from '../../state/store';

export const Footer: React.FC = () => {
  const { document, selectedSectionId, editorSettings } = useAppStore();

  const selectedSection = selectedSectionId 
    ? document.sections.find(s => s.id === selectedSectionId)
    : null;

  const wordCount = document.sections.reduce((count, section) => {
    // Simple word count estimation
    const text = JSON.stringify(section.props);
    return count + text.split(/\s+/).length;
  }, 0);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-surface-100 border-t border-surface-200 h-8">
      <div className="flex items-center justify-between h-full px-4 text-xs text-surface-600">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <span>{document.sections.length} sections</span>
          <span>~{wordCount} words</span>
          {selectedSection && (
            <span>
              Selected: {selectedSection.type}
            </span>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <span>Zoom: {editorSettings.zoom}%</span>
          <span>Device: {editorSettings.devicePreview}</span>
        </div>
      </div>
    </footer>
  );
};