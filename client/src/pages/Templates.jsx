import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllTemplates } from '../utils/templates';
import { useEditor } from '../context/EditorContext';
import TemplateCard from '../components/TemplateCard';

const Templates = () => {
  const { setTemplate } = useEditor();
  const navigate = useNavigate();
  const templates = getAllTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setTemplate(template);
    setShowSuccess(true);
    
    // Auto-hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      navigate('/editor');
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Template
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with a professionally designed template and customize it to match your brand. 
            All templates are fully responsive and ready to use.
          </p>
        </div>
      </section>

      {/* Success Message */}
      {showSuccess && selectedTemplate && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-900">
                    Template Selected!
                  </h4>
                  <p className="text-xs text-green-700">
                    {selectedTemplate.name} template is ready to use
                  </p>
                </div>
              </div>
              <button
                onClick={handleUseTemplate}
                className="btn-primary text-sm"
              >
                Go to Editor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Templates Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate?.id === template.id}
                onSelect={handleTemplateSelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose a template and start customizing your website today.
          </p>
          <Link
            to="/editor"
            className="btn-primary text-lg px-8 py-4"
          >
            Go to Editor
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Templates; 