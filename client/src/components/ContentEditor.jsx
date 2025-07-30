import React, { useState } from 'react';
import { useEditor } from '../context/EditorContext';
import { validateField, getFieldValidation } from '../utils/validation';
import ImageUpload from './ImageUpload';

const ContentEditor = () => {
  const { state, updateContent } = useEditor();
  const [activeSection, setActiveSection] = useState('header');
  const [fieldErrors, setFieldErrors] = useState({});

  if (!state.selectedTemplate) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Template Selected</h3>
          <p className="text-sm text-gray-600">
            Please select a template first to start editing content.
          </p>
        </div>
      </div>
    );
  }

  const sections = state.selectedTemplate.layout;

  const handleFieldChange = (fieldName, value) => {
    // Clear error for this field
    setFieldErrors(prev => ({ ...prev, [fieldName]: '' }));
    
    // Validate field
    const validation = getFieldValidation(fieldName);
    const { isValid, message } = validateField(value, validation.type, validation.required);
    
    if (!isValid) {
      setFieldErrors(prev => ({ ...prev, [fieldName]: message }));
    }

    updateContent({
      [activeSection]: {
        ...state.content[activeSection],
        [fieldName]: value
      }
    });
  };

  const handleImageUpload = (fieldName, imageData, fileName) => {
    updateContent({
      [activeSection]: {
        ...state.content[activeSection],
        [fieldName]: imageData
      }
    });
  };

  const renderField = (fieldName, fieldValue, fieldType = 'text') => {
    const error = fieldErrors[fieldName];
    const validation = getFieldValidation(fieldName);

    // Handle image fields
    if (fieldName.includes('image') || fieldName.includes('avatar')) {
      return (
        <ImageUpload
          currentImage={fieldValue}
          onImageUpload={(imageData) => handleImageUpload(fieldName, imageData)}
          label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
        />
      );
    }

    switch (fieldType) {
      case 'textarea':
        return (
          <div>
            <textarea
              value={fieldValue || ''}
              onChange={(e) => handleFieldChange(fieldName, e.target.value)}
              className={`input-field ${error ? 'border-red-500' : ''}`}
              rows={4}
              placeholder={`Enter ${fieldName}...`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        );
      case 'array':
        return (
          <div className="space-y-2">
            {(fieldValue || []).map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  value={item}
                  onChange={(e) => {
                    const newArray = [...(fieldValue || [])];
                    newArray[index] = e.target.value;
                    handleFieldChange(fieldName, newArray);
                  }}
                  className="input-field flex-1"
                  placeholder={`Item ${index + 1}`}
                />
                <button
                  onClick={() => {
                    const newArray = (fieldValue || []).filter((_, i) => i !== index);
                    handleFieldChange(fieldName, newArray);
                  }}
                  className="px-3 py-2 text-red-600 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newArray = [...(fieldValue || []), ''];
                handleFieldChange(fieldName, newArray);
              }}
              className="btn-secondary text-sm w-full"
            >
              Add Item
            </button>
          </div>
        );
      default:
        return (
          <div>
            <input
              type="text"
              value={fieldValue || ''}
              onChange={(e) => handleFieldChange(fieldName, e.target.value)}
              className={`input-field ${error ? 'border-red-500' : ''}`}
              placeholder={`Enter ${fieldName}...`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        );
    }
  };

  const renderSectionFields = (sectionName) => {
    const sectionContent = state.content[sectionName] || {};
    const sectionFields = [];

    // Define fields based on section type
    switch (sectionName) {
      case 'header':
        sectionFields.push(
          { name: 'title', label: 'Site Title', type: 'text' },
          { name: 'subtitle', label: 'Subtitle', type: 'text' },
          { name: 'logo', label: 'Logo Text', type: 'text' },
          { name: 'navLinks', label: 'Navigation Links', type: 'array' }
        );
        break;
      case 'hero':
        sectionFields.push(
          { name: 'title', label: 'Hero Title', type: 'text' },
          { name: 'subtitle', label: 'Hero Subtitle', type: 'textarea' },
          { name: 'ctaText', label: 'Call to Action Text', type: 'text' },
          { name: 'ctaLink', label: 'Call to Action Link', type: 'text' },
          { name: 'secondaryCtaText', label: 'Secondary CTA Text', type: 'text' },
          { name: 'secondaryCtaLink', label: 'Secondary CTA Link', type: 'text' }
        );
        break;
      case 'about':
        sectionFields.push(
          { name: 'title', label: 'Section Title', type: 'text' },
          { name: 'content', label: 'About Content', type: 'textarea' },
          { name: 'skills', label: 'Skills', type: 'array' }
        );
        break;
      case 'contact':
        sectionFields.push(
          { name: 'title', label: 'Section Title', type: 'text' },
          { name: 'email', label: 'Email', type: 'text' },
          { name: 'phone', label: 'Phone', type: 'text' },
          { name: 'address', label: 'Address', type: 'textarea' },
          { name: 'hours', label: 'Business Hours', type: 'text' }
        );
        break;
      default:
        sectionFields.push(
          { name: 'title', label: 'Section Title', type: 'text' },
          { name: 'content', label: 'Content', type: 'textarea' }
        );
    }

    return (
      <div className="space-y-4">
        {sectionFields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            {renderField(field.name, sectionContent[field.name], field.type)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Edit Content</h3>
        <p className="text-sm text-gray-600">
          Customize the content for your {state.selectedTemplate.name} website
        </p>
      </div>

      {/* Section Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeSection === section
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="space-y-6">
        <div>
          <h4 className="text-md font-semibold text-gray-900 mb-4">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('-', ' ')} Section
          </h4>
          {renderSectionFields(activeSection)}
        </div>
      </div>

      {/* Save Status */}
      <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-green-700">Changes saved automatically</span>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor; 