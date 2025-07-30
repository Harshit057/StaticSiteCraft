import React from 'react';
import { useEditor } from '../context/EditorContext';
import { getAllTemplates } from '../utils/templates';
import boxIcon from '../assets/icons/box.svg';
import rocketIcon from '../assets/icons/rocket.svg';
import portfolioIcon from '../assets/icons/portfolio.svg';
import businessIcon from '../assets/icons/business.svg';
import blogIcon from '../assets/icons/blog.svg';

const TemplateSelector = () => {
  const { state, setTemplate } = useEditor();
  const templates = getAllTemplates();

  const handleTemplateSelect = (template) => {
    setTemplate(template);
  };

  const getTemplateIcon = (templateId) => {
    const icons = {
      portfolio: portfolioIcon,
      landing: rocketIcon,
      business: businessIcon,
      blog: blogIcon
    };
    return icons[templateId] || boxIcon;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Template</h3>
        <p className="text-sm text-gray-600">
          Select a template to get started with your website
        </p>
      </div>

      <div className="space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              state.selectedTemplate?.id === template.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => handleTemplateSelect(template)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                  <img src={getTemplateIcon(template.id)} alt="" width="24" height="24" aria-hidden="true" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  {template.name}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {template.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {template.layout.slice(0, 3).map((section) => (
                    <span
                      key={section}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
                    </span>
                  ))}
                  {template.layout.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{template.layout.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              {state.selectedTemplate?.id === template.id && (
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
        ))}
      </div>

      {state.selectedTemplate && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-green-900">
                Template Selected
              </h4>
              <p className="text-xs text-green-700 mt-1">
                You can now customize the theme and content for your {state.selectedTemplate.name} website.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector; 