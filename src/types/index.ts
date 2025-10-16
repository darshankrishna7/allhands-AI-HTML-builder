import { z } from 'zod';

// Media Schema
export const MediaSchema = z.object({
  type: z.enum(['image', 'none']),
  src: z.string().optional(),
  alt: z.string().optional(),
});

export type Media = z.infer<typeof MediaSchema>;

// CTA Schema
export const CTASchema = z.object({
  label: z.string(),
  href: z.string().url(),
});

export type CTA = z.infer<typeof CTASchema>;

// RichText Schema (for contenteditable content)
export const RichTextSchema = z.string();
export type RichText = z.infer<typeof RichTextSchema>;

// Block Props Schemas
export const HeroPropsSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  media: MediaSchema.optional(),
  cta: CTASchema.optional(),
});

export const TwoColumnPropsSchema = z.object({
  left: RichTextSchema,
  right: RichTextSchema,
  reverseOnDesktop: z.boolean().optional(),
});

export const FeatureItemSchema = z.object({
  icon: z.string().optional(),
  title: z.string(),
  body: z.string().optional(),
});

export const FeatureGridPropsSchema = z.object({
  cols: z.enum(['2', '3', '4']),
  items: z.array(FeatureItemSchema),
});

export const GalleryImageSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
  caption: z.string().optional(),
});

export const GalleryPropsSchema = z.object({
  cols: z.enum(['3', '4']),
  images: z.array(GalleryImageSchema),
});

export const QuotePropsSchema = z.object({
  quote: z.string(),
  author: z.string().optional(),
  role: z.string().optional(),
  avatar: z.string().optional(),
});

export const TimelineItemSchema = z.object({
  label: z.string(),
  description: z.string().optional(),
});

export const TimelinePropsSchema = z.object({
  items: z.array(TimelineItemSchema),
  orientation: z.enum(['vertical', 'horizontal']),
});

export const CodePropsSchema = z.object({
  language: z.string(),
  code: z.string(),
  showLineNumbers: z.boolean().optional(),
});

export const CalloutPropsSchema = z.object({
  title: z.string(),
  body: z.string().optional(),
  cta: CTASchema.optional(),
});

export const TablePropsSchema = z.object({
  headers: z.array(z.string()),
  rows: z.array(z.array(z.string())),
  caption: z.string().optional(),
});

export const FooterLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const FooterGroupSchema = z.object({
  heading: z.string(),
  links: z.array(FooterLinkSchema),
});

export const FooterPropsSchema = z.object({
  cols: z.enum(['2', '3', '4']),
  groups: z.array(FooterGroupSchema),
  copyright: z.string().optional(),
});

// Block Type Enum
export const BlockType = z.enum([
  'hero',
  'twoColumn',
  'featureGrid',
  'gallery',
  'quote',
  'timeline',
  'code',
  'callout',
  'table',
  'footer',
]);

export type BlockTypeValue = z.infer<typeof BlockType>;

// Section Schema
export const SectionSchema = z.object({
  id: z.string(),
  type: BlockType,
  props: z.union([
    HeroPropsSchema,
    TwoColumnPropsSchema,
    FeatureGridPropsSchema,
    GalleryPropsSchema,
    QuotePropsSchema,
    TimelinePropsSchema,
    CodePropsSchema,
    CalloutPropsSchema,
    TablePropsSchema,
    FooterPropsSchema,
  ]),
  anchorId: z.string(),
  visible: z.boolean().default(true),
  locked: z.boolean().default(false),
  includeInTOC: z.boolean().default(true),
});

export type Section = z.infer<typeof SectionSchema>;

// Theme Schema
export const ThemeSchema = z.object({
  name: z.string(),
  palette: z.enum(['blue', 'emerald', 'purple', 'orange', 'rose', 'teal', 'indigo']),
  fontFamily: z.enum(['sans', 'serif', 'mono']),
  fontScale: z.enum(['small', 'normal', 'large']),
  spacingScale: z.enum(['compact', 'normal', 'comfortable']),
  radius: z.enum(['none', 'small', 'medium', 'large']),
});

export type Theme = z.infer<typeof ThemeSchema>;

// Layout Schema
export const LayoutSchema = z.object({
  containerWidth: z.enum(['narrow', 'normal', 'wide', 'full']),
  gutter: z.number().min(0).max(4),
  maxWidth: z.number().min(600).max(2000),
});

export type Layout = z.infer<typeof LayoutSchema>;

// Document Schema
export const DocumentSchema = z.object({
  id: z.string(),
  title: z.string(),
  theme: ThemeSchema,
  layout: LayoutSchema,
  sections: z.array(SectionSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Document = z.infer<typeof DocumentSchema>;

// TOC Settings
export const TOCSettingsSchema = z.object({
  position: z.enum(['top', 'left', 'right']),
  pinned: z.boolean().default(false),
  autoHide: z.boolean().default(false),
  width: z.number().min(200).max(400).default(280),
});

export type TOCSettings = z.infer<typeof TOCSettingsSchema>;

// Editor Settings
export const EditorSettingsSchema = z.object({
  devicePreview: z.enum(['desktop', 'tablet', 'mobile']),
  zoom: z.enum(['75', '100', '125']),
  showGrid: z.boolean().default(false),
  snapToGrid: z.boolean().default(false),
});

export type EditorSettings = z.infer<typeof EditorSettingsSchema>;

// App State Schema
export const AppStateSchema = z.object({
  document: DocumentSchema,
  selectedSectionId: z.string().nullable(),
  tocSettings: TOCSettingsSchema,
  editorSettings: EditorSettingsSchema,
  sidebarOpen: z.boolean().default(true),
  propertiesPanelOpen: z.boolean().default(true),
  isDirty: z.boolean().default(false),
  lastSaved: z.date().nullable(),
});

export type AppState = z.infer<typeof AppStateSchema>;

// Block Props Type Union
export type BlockProps =
  | z.infer<typeof HeroPropsSchema>
  | z.infer<typeof TwoColumnPropsSchema>
  | z.infer<typeof FeatureGridPropsSchema>
  | z.infer<typeof GalleryPropsSchema>
  | z.infer<typeof QuotePropsSchema>
  | z.infer<typeof TimelinePropsSchema>
  | z.infer<typeof CodePropsSchema>
  | z.infer<typeof CalloutPropsSchema>
  | z.infer<typeof TablePropsSchema>
  | z.infer<typeof FooterPropsSchema>;

// Utility types
export interface BlockDefinition {
  type: BlockTypeValue;
  name: string;
  description: string;
  icon: string;
  defaultProps: BlockProps;
  category: 'content' | 'layout' | 'media' | 'navigation';
}

export interface UndoRedoState {
  past: AppState[];
  present: AppState;
  future: AppState[];
}

export interface DragItem {
  type: 'section' | 'block';
  id: string;
  blockType?: BlockTypeValue;
}

// Export validation functions
export const validateSection = (section: unknown): Section => {
  return SectionSchema.parse(section);
};

export const validateDocument = (document: unknown): Document => {
  return DocumentSchema.parse(document);
};

export const validateAppState = (state: unknown): AppState => {
  return AppStateSchema.parse(state);
};