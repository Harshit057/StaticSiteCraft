import React, { useState } from 'react';
import { useEditor } from '../context/EditorContext';
import { generateHTML } from '../utils/htmlGenerator';
import LoadingSpinner from './LoadingSpinner';

const MobilePreview = () => {
  const { state } = useEditor();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Pinch to zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      setDragStart({ distance, scale });
    } else if (e.touches.length === 1) {
      // Single touch for panning
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    
    if (e.touches.length === 2) {
      // Handle pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      const scaleChange = distance / dragStart.distance;
      const newScale = Math.max(0.5, Math.min(2, dragStart.scale * scaleChange));
      setScale(newScale);
    } else if (e.touches.length === 1 && isDragging) {
      // Handle panning
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStart.x;
      const deltaY = touch.clientY - dragStart.y;
      // Implement panning logic here if needed
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setScale(1);
  };

  if (!state.selectedTemplate) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Mobile Preview</h3>
          <p className="text-sm text-gray-600">
            Select a template to see the mobile preview
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <LoadingSpinner size="lg" text="Loading mobile preview..." />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Preview Error</h3>
          <p className="text-sm text-gray-600">
            There was an error generating the mobile preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Mobile Preview</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={resetZoom}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            aria-label="Reset zoom"
          >
            Reset
          </button>
          <span className="text-sm text-gray-500">
            {Math.round(scale * 100)}%
          </span>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div 
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          style={{
            width: '375px',
            height: '667px',
            transform: `scale(${scale})`,
            transformOrigin: 'top center'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <iframe
            srcDoc={generateHTML(state.selectedTemplate, state.content, state.selectedTheme)}
            className="w-full h-full border-0"
            title="Mobile preview"
            sandbox="allow-scripts"
          />
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Pinch to zoom • Drag to pan • Double tap to reset</p>
      </div>
    </div>
  );
};

export default MobilePreview; 