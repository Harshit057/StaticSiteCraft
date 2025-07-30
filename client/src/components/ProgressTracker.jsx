import React from 'react';
import { useEditor } from '../context/EditorContext';
import boxIcon from '../assets/icons/box.svg';
import paletteIcon from '../assets/icons/palette.svg';

const ProgressTracker = () => {
  const { state } = useEditor();

  const getProgressSteps = () => {
    const steps = [
      {
        id: 'template',
        label: 'Choose Template',
        completed: !!state.selectedTemplate,
        icon: boxIcon
      },
      {
        id: 'theme',
        label: 'Select Theme',
        completed: !!state.selectedTheme,
        icon: paletteIcon
      },
      {
        id: 'content',
        label: 'Add Content',
        completed: Object.keys(state.content).length > 0,
        icon: paletteIcon
      },
      {
        id: 'download',
        label: 'Download Website',
        completed: false, // Always false as it's the final step
        icon: boxIcon
      }
    ];

    return steps;
  };

  const steps = getProgressSteps();
  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / (steps.length - 1)) * 100; // -1 because download is always incomplete

  return (
    <div className="p-3 bg-white border border-gray-200 rounded-lg">
      <div className="mb-3">
        <h3 className="text-sm font-medium text-gray-900 mb-1">Progress</h3>
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-xs text-gray-600">
            {completedSteps}/{steps.length - 1} steps
          </span>
        </div>
      </div>

      <div className="space-y-1">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center space-x-2 text-xs ${
              step.completed ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
              step.completed
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}>
              {step.completed ? (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <img src={step.icon} alt="" width="12" height="12" aria-hidden="true" />
              )}
            </div>
            <span className={step.completed ? 'font-medium' : ''}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {completedSteps === steps.length - 1 && (
        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-medium text-green-800">
              Ready to download your website!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker; 