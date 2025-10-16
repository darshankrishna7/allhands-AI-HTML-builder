import { BlockDefinition, BlockTypeValue } from '../types';

export const blockDefinitions: Record<BlockTypeValue, BlockDefinition> = {
  hero: {
    type: 'hero',
    name: 'Hero',
    description: 'Large header section with title, subtitle, and optional media',
    icon: '🎯',
    category: 'content',
    defaultProps: {
      title: 'Hero Title',
      subtitle: 'Hero subtitle goes here',
      media: { type: 'none' },
    },
  },
  twoColumn: {
    type: 'twoColumn',
    name: 'Two Column',
    description: 'Side-by-side content layout',
    icon: '📰',
    category: 'layout',
    defaultProps: {
      left: '<p>Left column content</p>',
      right: '<p>Right column content</p>',
    },
  },
  featureGrid: {
    type: 'featureGrid',
    name: 'Feature Grid',
    description: 'Grid of features with icons, titles, and descriptions',
    icon: '⚡',
    category: 'content',
    defaultProps: {
      cols: '3',
      items: [
        { title: 'Feature 1', body: 'Feature description' },
        { title: 'Feature 2', body: 'Feature description' },
        { title: 'Feature 3', body: 'Feature description' },
      ],
    },
  },
  gallery: {
    type: 'gallery',
    name: 'Gallery',
    description: 'Image gallery with customizable columns',
    icon: '🖼️',
    category: 'media',
    defaultProps: {
      cols: '3',
      images: [],
    },
  },
  quote: {
    type: 'quote',
    name: 'Quote',
    description: 'Blockquote with author attribution',
    icon: '💬',
    category: 'content',
    defaultProps: {
      quote: 'This is a quote',
      author: 'Author Name',
    },
  },
  timeline: {
    type: 'timeline',
    name: 'Timeline',
    description: 'Chronological list of events or steps',
    icon: '📅',
    category: 'content',
    defaultProps: {
      items: [
        { label: 'Step 1', description: 'First step' },
        { label: 'Step 2', description: 'Second step' },
      ],
      orientation: 'vertical',
    },
  },
  code: {
    type: 'code',
    name: 'Code',
    description: 'Syntax-highlighted code block',
    icon: '💻',
    category: 'content',
    defaultProps: {
      language: 'javascript',
      code: 'console.log("Hello, world!");',
    },
  },
  callout: {
    type: 'callout',
    name: 'Callout',
    description: 'Highlighted call-to-action section',
    icon: '📢',
    category: 'content',
    defaultProps: {
      title: 'Callout Title',
      body: 'Callout content goes here',
    },
  },
  table: {
    type: 'table',
    name: 'Table',
    description: 'Data table with headers and rows',
    icon: '📊',
    category: 'content',
    defaultProps: {
      headers: ['Column 1', 'Column 2'],
      rows: [['Row 1 Col 1', 'Row 1 Col 2']],
    },
  },
  footer: {
    type: 'footer',
    name: 'Footer',
    description: 'Site footer with links and copyright',
    icon: '🦶',
    category: 'navigation',
    defaultProps: {
      cols: '3',
      groups: [
        {
          heading: 'Company',
          links: [
            { label: 'About', href: '#' },
            { label: 'Contact', href: '#' },
          ],
        },
      ],
    },
  },
};

export const blockCategories = {
  content: 'Content',
  layout: 'Layout',
  media: 'Media',
  navigation: 'Navigation',
};

export const getBlocksByCategory = () => {
  const categories: Record<string, BlockDefinition[]> = {};
  
  Object.values(blockDefinitions).forEach((block) => {
    if (!categories[block.category]) {
      categories[block.category] = [];
    }
    categories[block.category].push(block);
  });
  
  return categories;
};