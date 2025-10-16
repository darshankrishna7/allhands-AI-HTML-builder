import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';
import {
  AppState,
  Document,
  Section,
  Theme,
  Layout,
  TOCSettings,
  EditorSettings,
  BlockTypeValue,
  BlockProps,
} from '../types';

interface AppStore extends AppState {
  // Document actions
  createNewDocument: () => void;
  updateDocument: (updates: Partial<Document>) => void;
  importDocument: (document: Document) => void;
  
  // Section actions
  addSection: (blockType: BlockTypeValue, afterId?: string) => void;
  updateSection: (id: string, updates: Partial<Section>) => void;
  deleteSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  selectSection: (id: string | null) => void;
  
  // Theme actions
  updateTheme: (theme: Partial<Theme>) => void;
  applyPresetTheme: (preset: Theme['palette']) => void;
  
  // Layout actions
  updateLayout: (layout: Partial<Layout>) => void;
  
  // TOC actions
  updateTOCSettings: (settings: Partial<TOCSettings>) => void;
  
  // Editor actions
  updateEditorSettings: (settings: Partial<EditorSettings>) => void;
  toggleSidebar: () => void;
  togglePropertiesPanel: () => void;
  
  // Undo/Redo actions
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // Persistence actions
  save: () => void;
  markDirty: () => void;
  markClean: () => void;
}

// Default theme presets
const themePresets: Record<Theme['palette'], Theme> = {
  blue: {
    name: 'Blue',
    palette: 'blue',
    fontFamily: 'sans',
    fontScale: 'normal',
    spacingScale: 'normal',
    radius: 'medium',
  },
  emerald: {
    name: 'Emerald',
    palette: 'emerald',
    fontFamily: 'sans',
    fontScale: 'normal',
    spacingScale: 'normal',
    radius: 'medium',
  },
  purple: {
    name: 'Purple',
    palette: 'purple',
    fontFamily: 'sans',
    fontScale: 'normal',
    spacingScale: 'normal',
    radius: 'medium',
  },
  orange: {
    name: 'Orange',
    palette: 'orange',
    fontFamily: 'sans',
    fontScale: 'normal',
    spacingScale: 'normal',
    radius: 'medium',
  },
  rose: {
    name: 'Rose',
    palette: 'rose',
    fontFamily: 'sans',
    fontScale: 'normal',
    spacingScale: 'normal',
    radius: 'medium',
  },
  teal: {
    name: 'Teal',
    palette: 'teal',
    fontFamily: 'sans',
    fontScale: 'normal',
    spacingScale: 'normal',
    radius: 'medium',
  },
  indigo: {
    name: 'Indigo',
    palette: 'indigo',
    fontFamily: 'sans',
    fontScale: 'normal',
    spacingScale: 'normal',
    radius: 'medium',
  },
};

// Default block props
const getDefaultBlockProps = (blockType: BlockTypeValue): BlockProps => {
  switch (blockType) {
    case 'hero':
      return {
        title: 'Hero Title',
        subtitle: 'Hero subtitle goes here',
        media: { type: 'none' },
      };
    case 'twoColumn':
      return {
        left: '<p>Left column content</p>',
        right: '<p>Right column content</p>',
      };
    case 'featureGrid':
      return {
        cols: '3',
        items: [
          { title: 'Feature 1', body: 'Feature description' },
          { title: 'Feature 2', body: 'Feature description' },
          { title: 'Feature 3', body: 'Feature description' },
        ],
      };
    case 'gallery':
      return {
        cols: '3',
        images: [],
      };
    case 'quote':
      return {
        quote: 'This is a quote',
        author: 'Author Name',
      };
    case 'timeline':
      return {
        items: [
          { label: 'Step 1', description: 'First step' },
          { label: 'Step 2', description: 'Second step' },
        ],
        orientation: 'vertical',
      };
    case 'code':
      return {
        language: 'javascript',
        code: 'console.log("Hello, world!");',
      };
    case 'callout':
      return {
        title: 'Callout Title',
        body: 'Callout content goes here',
      };
    case 'table':
      return {
        headers: ['Column 1', 'Column 2'],
        rows: [['Row 1 Col 1', 'Row 1 Col 2']],
      };
    case 'footer':
      return {
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
      };
    default:
      throw new Error(`Unknown block type: ${blockType}`);
  }
};

// Generate unique anchor ID
const generateAnchorId = (title: string, existingIds: string[]): string => {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  
  let anchorId = base;
  let counter = 1;
  
  while (existingIds.includes(anchorId)) {
    anchorId = `${base}-${counter}`;
    counter++;
  }
  
  return anchorId;
};

// Create default document
const createDefaultDocument = (): Document => ({
  id: nanoid(),
  title: 'Untitled Document',
  theme: themePresets.blue,
  layout: {
    containerWidth: 'normal',
    gutter: 1,
    maxWidth: 1200,
  },
  sections: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Initial state
const initialState: AppState = {
  document: createDefaultDocument(),
  selectedSectionId: null,
  tocSettings: {
    position: 'left',
    pinned: false,
    autoHide: false,
    width: 280,
  },
  editorSettings: {
    devicePreview: 'desktop',
    zoom: '100',
    showGrid: false,
    snapToGrid: false,
  },
  sidebarOpen: true,
  propertiesPanelOpen: true,
  isDirty: false,
  lastSaved: null,
};

// Undo/Redo history
interface HistoryState {
  past: AppState[];
  future: AppState[];
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,
        
        // Document actions
        createNewDocument: () => {
          set((state) => {
            state.document = createDefaultDocument();
            state.selectedSectionId = null;
            state.isDirty = false;
            state.lastSaved = null;
          });
        },
        
        updateDocument: (updates) => {
          set((state) => {
            Object.assign(state.document, updates);
            state.document.updatedAt = new Date();
            state.isDirty = true;
          });
        },
        
        importDocument: (document) => {
          set((state) => {
            state.document = { ...document };
            state.selectedSectionId = null;
            state.isDirty = false;
            state.lastSaved = new Date();
          });
        },
        
        // Section actions
        addSection: (blockType, afterId) => {
          set((state) => {
            const existingAnchorIds = state.document.sections.map(s => s.anchorId);
            const defaultProps = getDefaultBlockProps(blockType);
            const title = typeof defaultProps === 'object' && 'title' in defaultProps 
              ? defaultProps.title as string 
              : blockType;
            
            const newSection: Section = {
              id: nanoid(),
              type: blockType,
              props: defaultProps,
              anchorId: generateAnchorId(title, existingAnchorIds),
              visible: true,
              locked: false,
              includeInTOC: true,
            };
            
            if (afterId) {
              const index = state.document.sections.findIndex(s => s.id === afterId);
              state.document.sections.splice(index + 1, 0, newSection);
            } else {
              state.document.sections.push(newSection);
            }
            
            state.selectedSectionId = newSection.id;
            state.document.updatedAt = new Date();
            state.isDirty = true;
          });
        },
        
        updateSection: (id, updates) => {
          set((state) => {
            const section = state.document.sections.find(s => s.id === id);
            if (section) {
              Object.assign(section, updates);
              state.document.updatedAt = new Date();
              state.isDirty = true;
            }
          });
        },
        
        deleteSection: (id) => {
          set((state) => {
            state.document.sections = state.document.sections.filter(s => s.id !== id);
            if (state.selectedSectionId === id) {
              state.selectedSectionId = null;
            }
            state.document.updatedAt = new Date();
            state.isDirty = true;
          });
        },
        
        duplicateSection: (id) => {
          set((state) => {
            const section = state.document.sections.find(s => s.id === id);
            if (section) {
              const existingAnchorIds = state.document.sections.map(s => s.anchorId);
              const duplicatedSection: Section = {
                ...section,
                id: nanoid(),
                anchorId: generateAnchorId(section.anchorId, existingAnchorIds),
              };
              
              const index = state.document.sections.findIndex(s => s.id === id);
              state.document.sections.splice(index + 1, 0, duplicatedSection);
              state.selectedSectionId = duplicatedSection.id;
              state.document.updatedAt = new Date();
              state.isDirty = true;
            }
          });
        },
        
        reorderSections: (fromIndex, toIndex) => {
          set((state) => {
            const [movedSection] = state.document.sections.splice(fromIndex, 1);
            state.document.sections.splice(toIndex, 0, movedSection);
            state.document.updatedAt = new Date();
            state.isDirty = true;
          });
        },
        
        selectSection: (id) => {
          set((state) => {
            state.selectedSectionId = id;
          });
        },
        
        // Theme actions
        updateTheme: (theme) => {
          set((state) => {
            Object.assign(state.document.theme, theme);
            state.document.updatedAt = new Date();
            state.isDirty = true;
          });
        },
        
        applyPresetTheme: (preset) => {
          set((state) => {
            state.document.theme = { ...themePresets[preset] };
            state.document.updatedAt = new Date();
            state.isDirty = true;
          });
        },
        
        // Layout actions
        updateLayout: (layout) => {
          set((state) => {
            Object.assign(state.document.layout, layout);
            state.document.updatedAt = new Date();
            state.isDirty = true;
          });
        },
        
        // TOC actions
        updateTOCSettings: (settings) => {
          set((state) => {
            Object.assign(state.tocSettings, settings);
          });
        },
        
        // Editor actions
        updateEditorSettings: (settings) => {
          set((state) => {
            Object.assign(state.editorSettings, settings);
          });
        },
        
        toggleSidebar: () => {
          set((state) => {
            state.sidebarOpen = !state.sidebarOpen;
          });
        },
        
        togglePropertiesPanel: () => {
          set((state) => {
            state.propertiesPanelOpen = !state.propertiesPanelOpen;
          });
        },
        
        // Undo/Redo actions (simplified implementation)
        undo: () => {
          // TODO: Implement proper undo/redo with history
          console.log('Undo not implemented yet');
        },
        
        redo: () => {
          // TODO: Implement proper undo/redo with history
          console.log('Redo not implemented yet');
        },
        
        canUndo: () => false, // TODO: Implement
        canRedo: () => false, // TODO: Implement
        
        // Persistence actions
        save: () => {
          set((state) => {
            state.isDirty = false;
            state.lastSaved = new Date();
          });
        },
        
        markDirty: () => {
          set((state) => {
            state.isDirty = true;
          });
        },
        
        markClean: () => {
          set((state) => {
            state.isDirty = false;
          });
        },
      })),
      {
        name: 'html-slides-store',
        partialize: (state) => ({
          document: state.document,
          tocSettings: state.tocSettings,
          editorSettings: state.editorSettings,
          sidebarOpen: state.sidebarOpen,
          propertiesPanelOpen: state.propertiesPanelOpen,
        }),
      }
    ),
    { name: 'html-slides' }
  )
);

// Utility function to add nanoid if not available
if (typeof window !== 'undefined' && !window.nanoid) {
  // Simple nanoid implementation for browser
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  window.nanoid = (size = 21) => {
    let id = '';
    for (let i = 0; i < size; i++) {
      id += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return id;
  };
}

declare global {
  interface Window {
    nanoid: (size?: number) => string;
  }
}