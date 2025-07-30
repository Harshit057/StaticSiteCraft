import React from 'react';
import boxIcon from '../assets/icons/box.svg';
import rocketIcon from '../assets/icons/rocket.svg';
import portfolioIcon from '../assets/icons/portfolio.svg';
import businessIcon from '../assets/icons/business.svg';
import blogIcon from '../assets/icons/blog.svg';

const TemplateCard = ({ template, isSelected, onSelect, showPreview = false }) => {
  const getTemplateIcon = (templateId) => {
    const icons = {
      portfolio: portfolioIcon,
      landing: rocketIcon,
      business: businessIcon,
      blog: blogIcon
    };
    return icons[templateId] || boxIcon;
  };

  const getTemplateColor = (templateId) => {
    const colors = {
      portfolio: 'from-blue-500 to-purple-600',
      landing: 'from-green-500 to-teal-600',
      business: 'from-orange-500 to-red-600',
      blog: 'from-purple-500 to-pink-600'
    };
    return colors[templateId] || 'from-gray-500 to-gray-600';
  };

  return (
    <div
      className={`card cursor-pointer transition-all ${
        isSelected
          ? 'border-primary-500 bg-primary-50 shadow-lg'
          : 'hover:shadow-lg hover:border-gray-300'
      }`}
      onClick={() => onSelect(template)}
    >
      <div className="relative">
        {/* Template Preview */}
        <div className={`bg-gradient-to-br ${getTemplateColor(template.id)} h-32 rounded-lg mb-4 flex items-center justify-center`}>
          <div className="text-center">
            <div className="text-4xl mb-2">
              <img src={getTemplateIcon(template.id)} alt="" width="40" height="40" className="mx-auto" aria-hidden="true" />
            </div>
            <span className="text-white text-xl font-bold">{template.name}</span>
          </div>
        </div>
        
        {/* Template Info */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
          <p className="text-gray-600 mb-4">{template.description}</p>
          
          {/* Template Features */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Includes:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {template.layout.slice(0, 3).map((section) => (
                <li key={section} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
                </li>
              ))}
              {template.layout.length > 3 && (
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  +{template.layout.length - 3} more sections
                </li>
              )}
            </ul>
          </div>
        </div>
        
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2">
            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateCard; 