import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useEditor } from '../context/EditorContext';
import { generateHTML } from '../utils/htmlGenerator';
import { safeAsyncOperation } from '../utils/errorHandler';
import LoadingSpinner from './LoadingSpinner';

const LivePreview = ({ previewMode = 'desktop' }) => {
  const { state } = useEditor();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (!state.selectedTemplate) {
      setIsLoading(false);
      setHtmlContent('');
      return;
    }

    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');

    const updatePreview = async () => {
      try {
        console.log('Generating preview for template:', state.selectedTemplate.name);
        
        // Generate HTML content with error handling
        const generatedHtml = await safeAsyncOperation(
          () => generateHTML(state.selectedTemplate, state.content, state.selectedTheme),
          'HTML generation'
        );

        console.log('HTML generated successfully, length:', generatedHtml.length);
        setHtmlContent(generatedHtml);
        setIsLoading(false);
      } catch (error) {
        console.error('Error generating preview:', error);
        setHasError(true);
        setErrorMessage(error.message || 'Failed to generate preview');
        setIsLoading(false);
      }
    };

    updatePreview();
  }, [state.selectedTemplate, state.content, state.selectedTheme]);

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile':
        return 'w-80';
      case 'tablet':
        return 'w-96';
      default:
        return 'w-full';
    }
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Preview Available</h3>
          <p className="text-sm text-gray-600">
            Select a template to see a live preview of your website
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <LoadingSpinner size="lg" text="Generating preview..." />
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
          <p className="text-sm text-gray-600 mb-4">
            {errorMessage || 'There was an error generating the preview. Please try again.'}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Preview Header */}
      <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm font-medium ml-2">
            {state.selectedTemplate.name} - {state.selectedTheme} theme
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Live Preview</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="h-full relative flex justify-center bg-gray-100">
        <div className={`${getPreviewWidth()} h-full transition-all duration-300`}>
          {/* Direct HTML rendering */}
          {htmlContent && (
            <div 
              className="w-full h-full border-0 bg-white overflow-auto"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          )}
          
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Generating preview...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LivePreview; 