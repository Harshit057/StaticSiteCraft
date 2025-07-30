import React from 'react';
import { useEditor } from '../context/EditorContext';
import ThemeCard from './ThemeCard';

const ThemePicker = () => {
  const { state, setTheme } = useEditor();

  const themes = [
    {
      id: 'light',
      name: 'Light',
      description: 'Clean and modern light theme'
    },
    {
      id: 'dark',
      name: 'Dark',
      description: 'Elegant dark theme'
    },
    {
      id: 'corporate',
      name: 'Corporate',
      description: 'Professional business theme'
    },
    {
      id: 'funky',
      name: 'Funky',
      description: 'Bold and vibrant theme'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and clean theme'
    }
  ];

  const handleThemeSelect = (themeId) => {
    setTheme(themeId);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Theme</h3>
        <p className="text-sm text-gray-600">
          Select a color theme for your website
        </p>
      </div>

      <div className="space-y-4">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isSelected={state.selectedTheme === theme.id}
            onSelect={handleThemeSelect}
          />
        ))}
      </div>

      {state.selectedTheme && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900">
                Theme Applied
              </h4>
              <p className="text-xs text-blue-700 mt-1">
                The {themes.find(t => t.id === state.selectedTheme)?.name} theme has been applied to your website.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemePicker; 