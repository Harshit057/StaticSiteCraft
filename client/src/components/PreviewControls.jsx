import React from 'react';
import laptopIcon from '../assets/icons/laptop.svg';
import phoneIcon from '../assets/icons/phone.svg';

const PreviewControls = ({ previewMode, onPreviewModeChange, isPreviewVisible, onTogglePreview }) => {
  const modes = [
    { id: 'desktop', label: 'Desktop', icon: laptopIcon },
    { id: 'tablet', label: 'Tablet', icon: phoneIcon },
    { id: 'mobile', label: 'Mobile', icon: phoneIcon }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">View:</span>
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => onPreviewModeChange(mode.id)}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  previewMode === mode.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-1"><img src={mode.icon} alt="" width={20} height={20} aria-hidden="true" /></span>
                {mode.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Status:</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Live
          </span>
          <button
            onClick={onTogglePreview}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              isPreviewVisible
                ? 'bg-gray-100 text-gray-700'
                : 'bg-primary-100 text-primary-700'
            }`}
          >
            {isPreviewVisible ? 'Hide' : 'Show'} Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewControls; 