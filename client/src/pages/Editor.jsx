import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEditor } from '../context/EditorContext';
import TemplateSelector from '../components/TemplateSelector';
import ThemePicker from '../components/ThemePicker';
import ContentEditor from '../components/ContentEditor';
import LivePreview from '../components/LivePreview';
import DownloadButton from '../components/DownloadButton';
import AutoSaveIndicator from '../components/AutoSaveIndicator';

const Editor = () => {
  const { state, resetEditor } = useEditor();
  const [activeTab, setActiveTab] = useState('template');

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      resetEditor();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold text-primary-600">
                StaticSiteCraft
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-700 font-medium">Website Editor</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleReset}
                className="text-gray-600 hover:text-red-600 font-medium"
              >
                Reset
              </button>
              <Link
                to="/"
                className="text-gray-600 hover:text-primary-600 font-medium"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('template')}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === 'template'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Template
              </button>
              <button
                onClick={() => setActiveTab('theme')}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === 'theme'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Theme
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === 'content'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Content
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'template' && <TemplateSelector />}
            {activeTab === 'theme' && <ThemePicker />}
            {activeTab === 'content' && <ContentEditor />}
          </div>

          {/* Download Section */}
          <div className="border-t border-gray-200 p-4">
            <DownloadButton />
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 flex flex-col">
          {/* Preview Controls */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">View:</span>
                  <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded">
                    Desktop
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                    Tablet
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                    Mobile
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Status:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Live
                </span>
              </div>
            </div>
          </div>

          {/* Preview Frame */}
          <div className="flex-1 bg-gray-100 p-6">
            <LivePreview />
          </div>
        </div>
      </div>

      {/* Auto-save Indicator */}
      <AutoSaveIndicator />

      {/* Help Modal */}
      {!state.selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-4">Welcome to StaticSiteCraft!</h3>
            <p className="text-gray-600 mb-6">
              To get started, choose a template from the sidebar. You can then customize the theme, 
              content, and download your website when you're ready.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setActiveTab('template')}
                className="btn-primary flex-1"
              >
                Choose Template
              </button>
              <button
                onClick={() => document.querySelector('.fixed').remove()}
                className="btn-secondary flex-1"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor; 