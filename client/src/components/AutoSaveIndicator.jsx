import React from 'react';
import { useEditor } from '../context/EditorContext';

const AutoSaveIndicator = () => {
  const { state } = useEditor();

  if (!state.selectedTemplate) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <div className="flex items-center space-x-2">
          {state.isDirty ? (
            <>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Saving...</span>
            </>
          ) : state.lastSaved ? (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Saved {new Date(state.lastSaved).toLocaleTimeString()}
              </span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Not saved</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoSaveIndicator; 