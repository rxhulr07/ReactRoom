import { useState, useEffect } from 'react';

export default function ComponentPreview({ code, onCodeChange }) {
  const [activeTab, setActiveTab] = useState('preview');
  const [selectedElement, setSelectedElement] = useState(null);
  const [showPropertyPanel, setShowPropertyPanel] = useState(false);

  // Create a safe component from the generated code
  const createComponent = (jsxCode, cssCode) => {
    try {
      // Create a unique class name for this component
      const className = `component-${Date.now()}`;
      
      // Inject CSS into the document
      const styleId = `style-${className}`;
      let styleElement = document.getElementById(styleId);
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }
      styleElement.textContent = cssCode;

      // Create a wrapper div with the component
      return (
        <div 
          className={className}
          dangerouslySetInnerHTML={{ __html: jsxCode }}
          onClick={(e) => handleElementClick(e)}
        />
      );
    } catch (error) {
      console.error('Error creating component:', error);
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">Error rendering component: {error.message}</p>
        </div>
      );
    }
  };

  const handleElementClick = (e) => {
    e.stopPropagation();
    const element = e.target;
    setSelectedElement(element);
    setShowPropertyPanel(true);
  };

  const handleCopyCode = async () => {
    try {
      const fullCode = `// JSX/TSX\n${code.jsx}\n\n// CSS\n${code.css}`;
      await navigator.clipboard.writeText(fullCode);
      // You could add a toast notification here
    } catch (error) {
      console.error('Error copying code:', error);
    }
  };

  const handleDownloadCode = () => {
    const fullCode = `// JSX/TSX\n${code.jsx}\n\n// CSS\n${code.css}`;
    const blob = new Blob([fullCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'component.jsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    // This would require a server endpoint to create a zip file
    // For now, we'll just download the individual files
    handleDownloadCode();
  };

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${
            activeTab === 'preview'
              ? 'border-b-2 border-blue-500 text-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>Preview</span>
        </button>
        <button
          onClick={() => setActiveTab('jsx')}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${
            activeTab === 'jsx'
              ? 'border-b-2 border-blue-500 text-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span>JSX/TSX</span>
        </button>
        <button
          onClick={() => setActiveTab('css')}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${
            activeTab === 'css'
              ? 'border-b-2 border-blue-500 text-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span>CSS</span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-2 p-2 border-b border-gray-700">
        <button
          onClick={handleCopyCode}
          className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded"
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy</span>
        </button>
        <button
          onClick={handleDownloadCode}
          className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-900 hover:bg-blue-800 text-blue-300 rounded"
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'preview' && (
          <div className="p-4 h-full">
            {code ? (
              <div className="border border-gray-700 rounded-lg p-4 min-h-[400px] bg-gray-900">
                {createComponent(code.jsx, code.css)}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>No component generated yet. Start chatting with AI to create one!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'jsx' && (
          <div className="p-4">
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-white border border-gray-700">
              <code>{code?.jsx || '// No JSX code generated yet'}</code>
            </pre>
          </div>
        )}

        {activeTab === 'css' && (
          <div className="p-4">
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-white border border-gray-700">
              <code>{code?.css || '// No CSS code generated yet'}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Property Panel (Bonus Feature) */}
      {showPropertyPanel && selectedElement && (
        <div className="absolute right-4 top-20 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 w-64">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-white">Element Properties</h4>
            <button
              onClick={() => setShowPropertyPanel(false)}
              className="text-gray-400 hover:text-gray-300"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Padding
              </label>
              <input
                type="range"
                min="0"
                max="50"
                defaultValue="0"
                className="w-full"
                onChange={(e) => {
                  selectedElement.style.padding = `${e.target.value}px`;
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Background Color
              </label>
              <input
                type="color"
                className="w-full h-8 border border-gray-600 rounded bg-gray-800"
                onChange={(e) => {
                  selectedElement.style.backgroundColor = e.target.value;
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Text Content
              </label>
              <input
                type="text"
                className="w-full px-2 py-1 border border-gray-600 rounded text-sm bg-gray-800 text-white"
                defaultValue={selectedElement.textContent}
                onChange={(e) => {
                  selectedElement.textContent = e.target.value;
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 