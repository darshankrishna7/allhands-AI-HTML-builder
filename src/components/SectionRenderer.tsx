import React from 'react';
import { Section } from '../types';

interface SectionRendererProps {
  section: Section;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  // For now, render a simple placeholder for each section type
  // The actual block components will be implemented later
  
  const renderPlaceholder = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {(section.props as any).title || 'Hero Title'}
            </h1>
            {(section.props as any).subtitle && (
              <p className="text-xl opacity-90">
                {(section.props as any).subtitle}
              </p>
            )}
          </div>
        );
      
      case 'twoColumn':
        return (
          <div className="py-16 px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="prose">
                <div dangerouslySetInnerHTML={{ __html: (section.props as any).left || '<p>Left column</p>' }} />
              </div>
              <div className="prose">
                <div dangerouslySetInnerHTML={{ __html: (section.props as any).right || '<p>Right column</p>' }} />
              </div>
            </div>
          </div>
        );
      
      case 'featureGrid':
        const items = (section.props as any).items || [];
        const cols = (section.props as any).cols || '3';
        return (
          <div className="py-16 px-8">
            <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-${cols} gap-8`}>
              {items.map((item: any, index: number) => (
                <div key={index} className="text-center">
                  {item.icon && <div className="text-2xl mb-4">{item.icon}</div>}
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  {item.body && <p className="text-surface-600">{item.body}</p>}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'quote':
        return (
          <div className="py-16 px-8 bg-surface-50">
            <div className="max-w-4xl mx-auto text-center">
              <blockquote className="text-2xl font-medium text-surface-900 mb-4">
                "{(section.props as any).quote || 'Quote text'}"
              </blockquote>
              {(section.props as any).author && (
                <cite className="text-surface-600">
                  — {(section.props as any).author}
                  {(section.props as any).role && `, ${(section.props as any).role}`}
                </cite>
              )}
            </div>
          </div>
        );
      
      case 'code':
        return (
          <div className="py-16 px-8">
            <div className="max-w-4xl mx-auto">
              <pre className="bg-surface-900 text-surface-100 p-6 rounded-lg overflow-x-auto">
                <code>{(section.props as any).code || 'console.log("Hello, world!");'}</code>
              </pre>
            </div>
          </div>
        );
      
      case 'callout':
        return (
          <div className="py-16 px-8 bg-primary-50">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-surface-900 mb-4">
                {(section.props as any).title || 'Callout Title'}
              </h2>
              {(section.props as any).body && (
                <p className="text-lg text-surface-700 mb-6">
                  {(section.props as any).body}
                </p>
              )}
              {(section.props as any).cta && (
                <a
                  href={(section.props as any).cta.href}
                  className="btn-primary px-8 py-3 text-lg"
                >
                  {(section.props as any).cta.label}
                </a>
              )}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="py-16 px-8 bg-surface-100">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-surface-900 mb-4">
                {section.type} Block
              </h2>
              <p className="text-surface-600">
                This block type will be implemented soon.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <section id={section.anchorId} className="relative">
      {renderPlaceholder()}
    </section>
  );
};