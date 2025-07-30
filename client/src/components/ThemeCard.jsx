import React from 'react';

const ThemeCard = ({ theme, isSelected, onSelect }) => {
  const getThemePreview = (themeId) => {
    const previews = {
      light: {
        primary: '#3b82f6',
        background: '#ffffff',
        text: '#1f2937',
        accent: '#f3f4f6'
      },
      dark: {
        primary: '#60a5fa',
        background: '#111827',
        text: '#f9fafb',
        accent: '#1f2937'
      },
      corporate: {
        primary: '#1e40af',
        background: '#ffffff',
        text: '#1f2937',
        accent: '#f8fafc'
      },
      funky: {
        primary: '#ec4899',
        background: '#ffffff',
        text: '#1f2937',
        accent: '#fdf2f8'
      },
      minimal: {
        primary: '#000000',
        background: '#ffffff',
        text: '#000000',
        accent: '#ffffff'
      }
    };
    return previews[themeId] || previews.light;
  };

  const preview = getThemePreview(theme.id);

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected
          ? 'border-primary-500 bg-primary-50'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
      onClick={() => onSelect(theme.id)}
    >
      <div className="flex items-center space-x-3">
        {/* Theme Preview */}
        <div className="flex-shrink-0">
          <div className="w-16 h-12 rounded-lg border-2 border-gray-200 overflow-hidden shadow-sm">
            <div 
              className="w-full h-1/2"
              style={{ backgroundColor: preview.background }}
            />
            <div 
              className="w-full h-1/2 flex items-center justify-center"
              style={{ backgroundColor: preview.primary }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: preview.text }}
              />
            </div>
          </div>
        </div>
        
        {/* Theme Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 mb-1">
            {theme.name}
          </h4>
          <p className="text-xs text-gray-600">
            {theme.description}
          </p>
        </div>
        
        {/* Selection Indicator */}
        {isSelected && (
          <div className="flex-shrink-0">
            <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeCard; 