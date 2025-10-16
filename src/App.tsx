import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">HTML Slides</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Export HTML
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-3">Block Library</h2>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100">
                <div className="font-medium text-sm text-gray-900">Hero</div>
                <div className="text-xs text-gray-500">Title, subtitle, and CTA</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100">
                <div className="font-medium text-sm text-gray-900">Two Column</div>
                <div className="text-xs text-gray-500">Side-by-side content</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100">
                <div className="font-medium text-sm text-gray-900">Feature Grid</div>
                <div className="text-xs text-gray-500">Grid of features</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-3">Table of Contents</h2>
            <div className="space-y-1">
              <div className="text-sm text-blue-600 cursor-pointer hover:text-blue-800">
                Welcome Section
              </div>
              <div className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                Features Overview
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Canvas */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Sample Hero Section */}
              <section className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to HTML Slides
                  </h1>
                  <p className="text-xl text-gray-600 mb-6">
                    Create beautiful slide-like web pages with drag-and-drop blocks
                  </p>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Get Started
                  </button>
                </div>
              </section>

              {/* Sample Feature Section */}
              <section className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-600 rounded"></div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Drag & Drop</h3>
                    <p className="text-gray-600 text-sm">Easily reorder and organize your content</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="w-6 h-6 bg-green-600 rounded"></div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Live Preview</h3>
                    <p className="text-gray-600 text-sm">See changes instantly as you edit</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="w-6 h-6 bg-purple-600 rounded"></div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Export HTML</h3>
                    <p className="text-gray-600 text-sm">Generate clean, standalone HTML files</p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>2 sections • 45 words</div>
              <div className="flex items-center space-x-4">
                <span>100%</span>
                <div className="flex space-x-1">
                  <button className="px-2 py-1 bg-gray-100 rounded text-xs">Desktop</button>
                  <button className="px-2 py-1 text-xs">Tablet</button>
                  <button className="px-2 py-1 text-xs">Mobile</button>
                </div>
              </div>
            </div>
          </footer>
        </main>

        {/* Properties Panel */}
        <aside className="w-80 bg-white border-l border-gray-200 p-4">
          <h2 className="font-semibold text-gray-900 mb-4">Properties</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>White</option>
                <option>Light Gray</option>
                <option>Blue</option>
              </select>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
