import React from 'react';
import TemplateSelector from './TemplateSelector';
import ThemePicker from './ThemePicker';
import ContentEditor from './ContentEditor';
import DownloadButton from './DownloadButton';
import ProgressTracker from './ProgressTracker';
import boxIcon from '../assets/icons/box.svg';
import paletteIcon from '../assets/icons/palette.svg';

const EditorSidebar = ({ activeTab, setActiveTab, onReset }) => {
  const tabs = [
    { id: 'template', label: 'Template', icon: boxIcon },
    { id: 'theme', label: 'Theme', icon: paletteIcon },
    { id: 'content', label: 'Content', icon: paletteIcon }
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Progress Tracker - Fixed height */}
      <div className="border-b border-gray-200 p-4 flex-shrink-0">
        <ProgressTracker />
      </div>

      {/* Tab Navigation - Fixed height */}
      <div className="border-b border-gray-200 flex-shrink-0">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <img src={tab.icon} alt="" width="16" height="16" className="mr-2 inline" aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content - Scrollable area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-4">
          {activeTab === 'template' && <TemplateSelector />}
          {activeTab === 'theme' && <ThemePicker />}
          {activeTab === 'content' && <ContentEditor />}
        </div>
      </div>

      {/* Download Section - Fixed height */}
      <div className="border-t border-gray-200 p-4 flex-shrink-0">
        <DownloadButton />
      </div>

      {/* Reset Button - Fixed height */}
      <div className="border-t border-gray-200 p-4 flex-shrink-0">
        <button
          onClick={onReset}
          className="w-full py-2 px-4 text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
        >
          Reset All Changes
        </button>
      </div>
    </div>
  );
};

export default EditorSidebar; 