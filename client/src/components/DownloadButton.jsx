import React, { useState } from 'react';
import { useEditor } from '../context/EditorContext';
import { exportWebsite, generateSiteName } from '../utils/zipExporter';
import { validateContent } from '../utils/validation';

const DownloadButton = () => {
  const { state } = useEditor();
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleDownload = async () => {
    if (!state.selectedTemplate) {
      setExportStatus('Please select a template first');
      return;
    }

    // Validate content before export
    const { isValid, errors } = validateContent(state.content, state.selectedTemplate);
    if (!isValid) {
      const errorMessages = Object.values(errors).join(', ');
      setExportStatus(`Please fix the following issues: ${errorMessages}`);
      return;
    }

    setIsExporting(true);
    setExportStatus('Preparing your website...');

    try {
      const siteName = generateSiteName(state.selectedTemplate, state.content);
      const result = await exportWebsite(
        state.selectedTemplate,
        state.content,
        state.selectedTheme,
        siteName
      );

      if (result.success) {
        setExportStatus('Website downloaded successfully!');
        setTimeout(() => setExportStatus(''), 3000);
      } else {
        setExportStatus('Failed to download website. Please try again.');
      }
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus('An error occurred while exporting your website.');
    } finally {
      setIsExporting(false);
    }
  };

  const isReady = state.selectedTemplate && Object.keys(state.content).length > 0;
  const { isValid: isContentValid } = validateContent(state.content, state.selectedTemplate);

  return (
    <div className="space-y-4">
      <button
        onClick={handleDownload}
        disabled={!isReady || isExporting || !isContentValid}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          isReady && !isExporting && isContentValid
            ? 'bg-primary-600 hover:bg-primary-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isExporting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Exporting...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Download Website</span>
          </div>
        )}
      </button>

      {exportStatus && (
        <div className={`p-3 rounded-lg text-sm ${
          exportStatus.includes('successfully') || exportStatus.includes('Preparing')
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {exportStatus}
        </div>
      )}

      {!isReady && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <svg className="w-4 h-4 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-xs font-medium text-yellow-800">
                {!state.selectedTemplate ? 'Select a template' : 'Add some content'}
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                {!state.selectedTemplate 
                  ? 'Choose a template to get started'
                  : 'Customize your content before downloading'
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {isReady && !isContentValid && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <svg className="w-4 h-4 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-xs font-medium text-red-800">Content Issues Found</p>
              <p className="text-xs text-red-700 mt-1">
                Please fix the validation errors before downloading
              </p>
            </div>
          </div>
        </div>
      )}

      {isReady && isContentValid && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <svg className="w-4 h-4 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-xs font-medium text-blue-800">Ready to Download</p>
              <p className="text-xs text-blue-700 mt-1">
                Your website will be downloaded as a ZIP file containing all necessary files.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadButton; 