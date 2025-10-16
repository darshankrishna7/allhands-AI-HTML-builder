import React, { useState } from 'react';
import { useAppStore } from '../../state/store';
import { blockDefinitions, getBlocksByCategory, blockCategories } from '../../state/blockDefinitions';
import { BlockTypeValue } from '../../types';
import {
  RectangleStackIcon,
  SwatchIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

type SidebarTab = 'blocks' | 'theme' | 'pages';

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('blocks');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['content', 'layout'])
  );
  const { addSection } = useAppStore();

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleAddBlock = (blockType: BlockTypeValue) => {
    addSection(blockType);
  };

  const blocksByCategory = getBlocksByCategory();

  const tabs = [
    { id: 'blocks' as const, name: 'Blocks', icon: RectangleStackIcon },
    { id: 'theme' as const, name: 'Theme', icon: SwatchIcon },
    { id: 'pages' as const, name: 'Pages', icon: DocumentTextIcon },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-surface-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'flex-1 flex items-center justify-center px-3 py-3 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'text-primary-600 border-b-2 border-primary-600 bg-surface-50'
                : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
            )}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'blocks' && (
          <div className="p-4">
            <h3 className="text-sm font-semibold text-surface-900 mb-4">
              Block Library
            </h3>
            <div className="space-y-4">
              {Object.entries(blocksByCategory).map(([categoryKey, blocks]) => (
                <div key={categoryKey}>
                  <button
                    onClick={() => toggleCategory(categoryKey)}
                    className="flex items-center justify-between w-full text-left text-sm font-medium text-surface-700 hover:text-surface-900 mb-2"
                  >
                    <span>{blockCategories[categoryKey as keyof typeof blockCategories]}</span>
                    {expandedCategories.has(categoryKey) ? (
                      <ChevronDownIcon className="w-4 h-4" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4" />
                    )}
                  </button>
                  
                  {expandedCategories.has(categoryKey) && (
                    <div className="space-y-2 ml-2">
                      {blocks.map((block) => (
                        <button
                          key={block.type}
                          onClick={() => handleAddBlock(block.type)}
                          className="flex items-start p-3 w-full text-left bg-surface-50 hover:bg-surface-100 rounded-lg border border-surface-200 hover:border-surface-300 transition-colors group"
                        >
                          <span className="text-lg mr-3 group-hover:scale-110 transition-transform">
                            {block.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-surface-900">
                              {block.name}
                            </div>
                            <div className="text-xs text-surface-600 mt-1">
                              {block.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="p-4">
            <h3 className="text-sm font-semibold text-surface-900 mb-4">
              Theme Settings
            </h3>
            <div className="text-sm text-surface-600">
              Theme customization panel will be implemented here.
            </div>
          </div>
        )}

        {activeTab === 'pages' && (
          <div className="p-4">
            <h3 className="text-sm font-semibold text-surface-900 mb-4">
              Page Manager
            </h3>
            <div className="text-sm text-surface-600">
              Multi-page support will be implemented here (future feature).
            </div>
          </div>
        )}
      </div>
    </div>
  );
};