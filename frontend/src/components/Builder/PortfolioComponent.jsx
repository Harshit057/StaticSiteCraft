import React, { useState } from 'react'

// Custom Dropdown Component to fix overflow issues
const CustomDropdown = ({ value, onChange, options, placeholder, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = options.find(option => option.value === value)

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left flex justify-between items-center"
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                option.value === value ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      
      {/* Backdrop to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

const PortfolioComponent = ({ component, isSelected, onSelect, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isStyleEditing, setIsStyleEditing] = useState(false)
  const [editData, setEditData] = useState({})
  const [styleData, setStyleData] = useState({})

  const startEditing = () => {
    setEditData({
      content: { ...component.content },
      styles: { ...component.styles }
    })
    setIsEditing(true)
  }

  const startStyleEditing = () => {
    setStyleData({
      backgroundColor: component.styles?.backgroundColor || '#ffffff',
      textColor: component.styles?.textColor || '#000000',
      fontFamily: component.styles?.fontFamily || 'Inter',
      fontSize: component.styles?.fontSize || '16px',
      fontWeight: component.styles?.fontWeight || 'normal',
      padding: component.styles?.padding || '4rem 2rem'
    })
    setIsStyleEditing(true)
  }

  const saveChanges = () => {
    onUpdate(editData)
    setIsEditing(false)
  }

  const saveStyleChanges = () => {
    onUpdate({
      content: component.content,
      styles: styleData
    })
    setIsStyleEditing(false)
  }

  const cancelEditing = () => {
    setIsEditing(false)
  }

  const cancelStyleEditing = () => {
    setIsStyleEditing(false)
  }

  const handleContentChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      }
    }))
  }

  const isValidHex = (hex) => {
    // Accepts #RGB, #RRGGBB, #RGBA, #RRGGBBAA (case-insensitive)
    return /^#([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(hex);
  };

  const formatHex = (value) => {
    if (!value) return '';
    if (value[0] !== '#') return '#' + value;
    return value;
  };

  const handleStyleChange = (field, value) => {
    if (field === 'backgroundColor' || field === 'textColor') {
      const formatted = formatHex(value);
      if (isValidHex(formatted)) {
        setStyleData(prev => ({
          ...prev,
          [field]: formatted
        }));
      } else {
        // Allow updating the input even if invalid, but don't update the color
        setStyleData(prev => ({
          ...prev,
          [field]: value
        }));
      }
    } else {
      setStyleData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Source Sans Pro', label: 'Source Sans Pro' },
    { value: 'Raleway', label: 'Raleway' },
    { value: 'Ubuntu', label: 'Ubuntu' },
    { value: 'Nunito', label: 'Nunito' }
  ]

  const fontWeightOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'bold', label: 'Bold' },
    { value: '100', label: 'Thin' },
    { value: '200', label: 'Extra Light' },
    { value: '300', label: 'Light' },
    { value: '400', label: 'Regular' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semi Bold' },
    { value: '700', label: 'Bold' },
    { value: '800', label: 'Extra Bold' },
    { value: '900', label: 'Black' }
  ]

  const fontSizeOptions = [
    { value: '12px', label: '12px' },
    { value: '14px', label: '14px' },
    { value: '16px', label: '16px' },
    { value: '18px', label: '18px' },
    { value: '20px', label: '20px' },
    { value: '24px', label: '24px' },
    { value: '28px', label: '28px' },
    { value: '32px', label: '32px' },
    { value: '36px', label: '36px' },
    { value: '48px', label: '48px' }
  ]

  const renderStyleEditor = () => {
    if (!isStyleEditing) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[85vh] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">Edit Section Styles</h3>
          
          <div className="space-y-4">
            {/* Background Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={styleData.backgroundColor}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <div className="flex flex-col flex-1">
                  <label className="text-xs text-gray-500 mb-1 ml-1" htmlFor="bg-hex-input">Hex Code</label>
                  <input
                    id="bg-hex-input"
                    type="text"
                    value={styleData.backgroundColor}
                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                    className={`px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 bg-white ${isValidHex(formatHex(styleData.backgroundColor)) ? 'border-gray-300' : 'border-red-500'}`}
                    placeholder="#ffffff"
                  />
                </div>
              </div>
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={styleData.textColor}
                  onChange={(e) => handleStyleChange('textColor', e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <div className="flex flex-col flex-1">
                  <label className="text-xs text-gray-500 mb-1 ml-1" htmlFor="text-hex-input">Hex Code</label>
                  <input
                    id="text-hex-input"
                    type="text"
                    value={styleData.textColor}
                    onChange={(e) => handleStyleChange('textColor', e.target.value)}
                    className={`px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 bg-white ${isValidHex(formatHex(styleData.textColor)) ? 'border-gray-300' : 'border-red-500'}`}
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Family
              </label>
              <CustomDropdown
                value={styleData.fontFamily}
                onChange={(value) => handleStyleChange('fontFamily', value)}
                options={fontOptions}
                placeholder="Select Font"
                className="w-full"
              />
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size
              </label>
              <CustomDropdown
                value={styleData.fontSize}
                onChange={(value) => handleStyleChange('fontSize', value)}
                options={fontSizeOptions}
                placeholder="Select Font Size"
                className="w-full"
              />
            </div>

            {/* Font Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Weight
              </label>
              <CustomDropdown
                value={styleData.fontWeight}
                onChange={(value) => handleStyleChange('fontWeight', value)}
                options={fontWeightOptions}
                placeholder="Select Font Weight"
                className="w-full"
              />
            </div>

            {/* Padding */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Padding
              </label>
              <CustomDropdown
                value={styleData.padding}
                onChange={(value) => handleStyleChange('padding', value)}
                options={[
                  { value: '2rem 1rem', label: 'Small (2rem 1rem)' },
                  { value: '4rem 2rem', label: 'Medium (4rem 2rem)' },
                  { value: '6rem 2rem', label: 'Large (6rem 2rem)' },
                  { value: '8rem 2rem', label: 'Extra Large (8rem 2rem)' },
                ]}
                placeholder="Select Padding"
                className="w-full"
              />
            </div>

            {/* Preview */}
            <div className="mt-6 p-4 border border-gray-200 rounded-md">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
              <div
                className="p-4 rounded"
                style={{
                  backgroundColor: styleData.backgroundColor,
                  color: styleData.textColor,
                  fontFamily: styleData.fontFamily,
                  fontSize: styleData.fontSize,
                  fontWeight: styleData.fontWeight,
                  padding: styleData.padding
                }}
              >
                <p>This is how your section will look with the selected styles.</p>
              </div>
            </div>
          </div>

          {/* Profile Image Style Controls (Header Only) */}
          {component.type === 'header' && (
            <div className="space-y-2 mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image Width (px)</label>
              <input
                type="number"
                min="40"
                max="512"
                value={styleData.profileImageWidth ? parseInt(styleData.profileImageWidth) : 112}
                onChange={e => handleStyleChange('profileImageWidth', e.target.value + 'px')}
                className="w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 bg-white"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image Height (px)</label>
              <input
                type="number"
                min="40"
                max="512"
                value={styleData.profileImageHeight ? parseInt(styleData.profileImageHeight) : 112}
                onChange={e => handleStyleChange('profileImageHeight', e.target.value + 'px')}
                className="w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 bg-white"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image Edges</label>
              <select
                value={styleData.profileImageBorderRadius || '50%'}
                onChange={e => handleStyleChange('profileImageBorderRadius', e.target.value)}
                className="w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 bg-white"
              >
                <option value="50%">Circle</option>
                <option value="1rem">Rounded</option>
                <option value="0.25rem">Slightly Rounded</option>
                <option value="0">Square</option>
              </select>
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={cancelStyleEditing}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveStyleChanges}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Styles
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderComponent = () => {
    const { type, content, styles } = component

    switch (type) {
      case 'header':
        return (
          <div 
            className="text-center py-20 px-8 flex flex-col items-center justify-center"
            style={{ 
              backgroundColor: styles.backgroundColor,
              color: styles.textColor,
              fontFamily: styles.fontFamily,
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              padding: styles.padding
            }}
          >
            {isEditing ? (
              <div className="space-y-4 w-full flex flex-col items-center">
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center">
                  {editData.content?.profileImage && (
                    <img
                      src={editData.content.profileImage}
                      alt="Profile"
                      style={{
                        width: editData.styles?.profileImageWidth || '112px',
                        height: editData.styles?.profileImageHeight || '112px',
                        borderRadius: editData.styles?.profileImageBorderRadius || '50%',
                        objectFit: 'cover',
                        marginBottom: '0.5rem',
                        border: '4px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleContentChange('profileImage', reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="mb-2"
                  />
                </div>
                <input
                  type="text"
                  value={editData.content?.title || ''}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  className="text-5xl font-bold mb-4 bg-transparent border-b-2 border-white border-opacity-50 focus:border-white focus:outline-none text-center w-full"
                  placeholder="Your Name"
                />
                <input
                  type="text"
                  value={editData.content?.subtitle || ''}
                  onChange={(e) => handleContentChange('subtitle', e.target.value)}
                  className="text-2xl mb-6 opacity-90 bg-transparent border-b-2 border-white border-opacity-50 focus:border-white focus:outline-none text-center w-full"
                  placeholder="Professional Title"
                />
                <textarea
                  value={editData.content?.description || ''}
                  onChange={(e) => handleContentChange('description', e.target.value)}
                  className="text-xl max-w-2xl mx-auto opacity-80 bg-transparent border-b-2 border-white border-opacity-50 focus:border-white focus:outline-none text-center w-full resize-none"
                  rows={3}
                  placeholder="A brief introduction about yourself and your expertise."
                />
                <div className="flex justify-center space-x-4 mt-6">
                  <button
                    onClick={saveChanges}
                    className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center w-full">
                {content.profileImage && (
                  <img
                    src={content.profileImage}
                    alt="Profile"
                    style={{
                      width: styles.profileImageWidth || '128px',
                      height: styles.profileImageHeight || '128px',
                      borderRadius: styles.profileImageBorderRadius || '50%',
                      objectFit: 'cover',
                      marginBottom: '1rem',
                      marginRight: '2rem',
                      border: '4px solid white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                )}
                <div className="flex flex-col items-center sm:items-start">
                  <h1 className="text-5xl font-bold mb-4">{content.title}</h1>
                  <h2 className="text-2xl mb-6 opacity-90">{content.subtitle}</h2>
                  <p className="text-xl max-w-2xl mx-auto opacity-80 text-center sm:text-left">{content.description}</p>
                </div>
              </div>
            )}
          </div>
        )

      case 'about':
        return (
          <div 
            className="py-16 px-8"
            style={{ 
              backgroundColor: styles.backgroundColor,
              color: styles.textColor,
              fontFamily: styles.fontFamily,
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              padding: styles.padding
            }}
          >
            <div className="max-w-4xl mx-auto">
              {isEditing ? (
                <div className="space-y-6">
                  <input
                    type="text"
                    value={editData.content?.title || ''}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    className="text-3xl font-bold mb-8 text-center bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                    placeholder="About Me"
                  />
                  <textarea
                    value={editData.content?.content || ''}
                    onChange={(e) => handleContentChange('content', e.target.value)}
                    className="text-lg leading-relaxed bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full resize-none"
                    rows={8}
                    placeholder="Write a compelling story about your background, skills, and what drives you in your field."
                  />
                  <div className="flex justify-center space-x-4 mt-6">
                    <button
                      onClick={saveChanges}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-8 text-center">{content.title}</h2>
                  <div className="prose prose-lg mx-auto">
                    <p className="text-lg leading-relaxed">{content.content}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )

      case 'skills':
        return (
          <div 
            className="py-16 px-8"
            style={{ 
              backgroundColor: styles.backgroundColor,
              color: styles.textColor,
              fontFamily: styles.fontFamily,
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              padding: styles.padding
            }}
          >
            <div className="max-w-4xl mx-auto">
              {isEditing ? (
                <div className="space-y-6">
                  <input
                    type="text"
                    value={editData.content?.title || ''}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    className="text-3xl font-bold mb-12 text-center bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                    placeholder="Skills & Expertise"
                  />
                  <div className="space-y-4">
                    {editData.content?.skills?.map((skill, index) => (
                      <div key={index} className="flex space-x-4 items-center">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const newSkills = [...editData.content.skills]
                            newSkills[index] = { ...skill, name: e.target.value }
                            handleContentChange('skills', newSkills)
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Skill name"
                        />
                        <input
                          type="number"
                          value={skill.level}
                          onChange={(e) => {
                            const newSkills = [...editData.content.skills]
                            newSkills[index] = { ...skill, level: parseInt(e.target.value) }
                            handleContentChange('skills', newSkills)
                          }}
                          min="0"
                          max="100"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => {
                            const newSkills = editData.content.skills.filter((_, i) => i !== index)
                            handleContentChange('skills', newSkills)
                          }}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newSkills = [...(editData.content.skills || []), { name: '', level: 50 }]
                        handleContentChange('skills', newSkills)
                      }}
                      className="w-full px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
                    >
                      Add Skill
                    </button>
                  </div>
                  <div className="flex justify-center space-x-4 mt-6">
                    <button
                      onClick={saveChanges}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-12 text-center">{content.title}</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {content.skills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm opacity-70">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )

      case 'projects':
        return (
          <div 
            className="py-16 px-8"
            style={{ 
              backgroundColor: styles.backgroundColor,
              color: styles.textColor,
              fontFamily: styles.fontFamily,
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              padding: styles.padding
            }}
          >
            <div className="max-w-6xl mx-auto">
              {isEditing ? (
                <div className="space-y-6">
                  <input
                    type="text"
                    value={editData.content?.title || ''}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    className="text-3xl font-bold mb-12 text-center bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                    placeholder="Featured Projects"
                  />
                  <div className="space-y-4">
                    {editData.content?.projects?.map((project, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4">
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => {
                              const newProjects = [...editData.content.projects]
                              newProjects[index] = { ...project, title: e.target.value }
                              handleContentChange('projects', newProjects)
                            }}
                            placeholder="Project title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <textarea
                            value={project.description}
                            onChange={(e) => {
                              const newProjects = [...editData.content.projects]
                              newProjects[index] = { ...project, description: e.target.value }
                              handleContentChange('projects', newProjects)
                            }}
                            placeholder="Project description"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={project.technologies.join(', ')}
                              onChange={(e) => {
                                const newProjects = [...editData.content.projects]
                                newProjects[index] = { 
                                  ...project, 
                                  technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                                }
                                handleContentChange('projects', newProjects)
                              }}
                              placeholder="Technologies (comma separated)"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => {
                                const newProjects = editData.content.projects.filter((_, i) => i !== index)
                                handleContentChange('projects', newProjects)
                              }}
                              className="px-3 py-2 text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newProjects = [...(editData.content.projects || []), {
                          title: '',
                          description: '',
                          technologies: [],
                          image: null
                        }]
                        handleContentChange('projects', newProjects)
                      }}
                      className="w-full px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
                    >
                      Add Project
                    </button>
                  </div>
                  <div className="flex justify-center space-x-4 mt-6">
                    <button
                      onClick={saveChanges}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-12 text-center">{content.title}</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {content.projects.map((project, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Project Image</span>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                          <p className="text-gray-600 mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )


      case 'education':
        return (
          <div className="py-16 px-8" style={{ backgroundColor: styles.backgroundColor, color: styles.textColor, fontFamily: styles.fontFamily, fontSize: styles.fontSize, fontWeight: styles.fontWeight, padding: styles.padding }}>
            <div className="max-w-4xl mx-auto">
              {isEditing ? (
                <div className="space-y-6">
                  <input type="text" value={editData.content?.title || ''} onChange={e => handleContentChange('title', e.target.value)} className="text-3xl font-bold mb-8 text-center bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full" placeholder="Education" />
                  <div className="space-y-4">
                    {editData.content?.schools?.map((school, index) => (
                      <div key={index} className="flex flex-col md:flex-row md:space-x-4 items-center">
                        <input type="text" value={school.school} onChange={e => { const newSchools = [...editData.content.schools]; newSchools[index] = { ...school, school: e.target.value }; handleContentChange('schools', newSchools); }} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0" placeholder="School Name" />
                        <input type="text" value={school.degree} onChange={e => { const newSchools = [...editData.content.schools]; newSchools[index] = { ...school, degree: e.target.value }; handleContentChange('schools', newSchools); }} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0" placeholder="Degree" />
                        <input type="text" value={school.year} onChange={e => { const newSchools = [...editData.content.schools]; newSchools[index] = { ...school, year: e.target.value }; handleContentChange('schools', newSchools); }} className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Year" />
                        <button onClick={() => { const newSchools = editData.content.schools.filter((_, i) => i !== index); handleContentChange('schools', newSchools); }} className="px-3 py-2 text-red-600 hover:text-red-800">×</button>
                      </div>
                    ))}
                    <button onClick={() => { const newSchools = [...(editData.content.schools || []), { school: '', degree: '', year: '' }]; handleContentChange('schools', newSchools); }} className="w-full px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50">Add School</button>
                  </div>
                  <div className="flex justify-center space-x-4 mt-6">
                    <button onClick={saveChanges} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Save</button>
                    <button onClick={cancelEditing} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-8 text-center">{content.title}</h2>
                  <div className="space-y-6">
                    {content.schools?.map((school, index) => (
                      <div key={index} className="flex flex-col md:flex-row md:space-x-4 items-center justify-between bg-white bg-opacity-70 rounded-lg p-4 shadow">
                        <div className="font-semibold text-lg">{school.school}</div>
                        <div className="text-gray-700">{school.degree}</div>
                        <div className="text-gray-500">{school.year}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )

      case 'experience':
        return (
          <div className="py-16 px-8" style={{ backgroundColor: styles.backgroundColor, color: styles.textColor, fontFamily: styles.fontFamily, fontSize: styles.fontSize, fontWeight: styles.fontWeight, padding: styles.padding }}>
            <div className="max-w-4xl mx-auto">
              {isEditing ? (
                <div className="space-y-6">
                  <input type="text" value={editData.content?.title || ''} onChange={e => handleContentChange('title', e.target.value)} className="text-3xl font-bold mb-8 text-center bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full" placeholder="Experience" />
                  <div className="space-y-4">
                    {editData.content?.jobs?.map((job, index) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col md:flex-row md:space-x-4 items-center">
                          <input type="text" value={job.company} onChange={e => { const newJobs = [...editData.content.jobs]; newJobs[index] = { ...job, company: e.target.value }; handleContentChange('jobs', newJobs); }} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0" placeholder="Company Name" />
                          <input type="text" value={job.role} onChange={e => { const newJobs = [...editData.content.jobs]; newJobs[index] = { ...job, role: e.target.value }; handleContentChange('jobs', newJobs); }} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0" placeholder="Role" />
                          <input type="text" value={job.period} onChange={e => { const newJobs = [...editData.content.jobs]; newJobs[index] = { ...job, period: e.target.value }; handleContentChange('jobs', newJobs); }} className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Period" />
                          <button onClick={() => { const newJobs = editData.content.jobs.filter((_, i) => i !== index); handleContentChange('jobs', newJobs); }} className="px-3 py-2 text-red-600 hover:text-red-800">×</button>
                        </div>
                        <textarea value={job.description} onChange={e => { const newJobs = [...editData.content.jobs]; newJobs[index] = { ...job, description: e.target.value }; handleContentChange('jobs', newJobs); }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2" rows={2} placeholder="Describe your role and achievements." />
                      </React.Fragment>
                    ))}
                    <button onClick={() => { const newJobs = [...(editData.content.jobs || []), { company: '', role: '', period: '', description: '' }]; handleContentChange('jobs', newJobs); }} className="w-full px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50">Add Job</button>
                  </div>
                  <div className="flex justify-center space-x-4 mt-6">
                    <button onClick={saveChanges} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Save</button>
                    <button onClick={cancelEditing} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-8 text-center">{content.title}</h2>
                  <div className="space-y-6">
                    {content.jobs?.map((job, index) => (
                      <div key={index} className="flex flex-col md:flex-row md:space-x-4 items-center justify-between bg-white bg-opacity-70 rounded-lg p-4 shadow">
                        <div className="font-semibold text-lg">{job.company}</div>
                        <div className="text-gray-700">{job.role}</div>
                        <div className="text-gray-500">{job.period}</div>
                        <div className="text-gray-600 w-full md:w-1/2 mt-2 md:mt-0">{job.description}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )

      case 'social':
        return (
          <div className="py-16 px-8" style={{ backgroundColor: styles.backgroundColor, color: styles.textColor, fontFamily: styles.fontFamily, fontSize: styles.fontSize, fontWeight: styles.fontWeight, padding: styles.padding }}>
            <div className="max-w-4xl mx-auto text-center">
              {isEditing ? (
                <div className="space-y-6">
                  <input type="text" value={editData.content?.title || ''} onChange={e => handleContentChange('title', e.target.value)} className="text-3xl font-bold mb-8 text-center bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full" placeholder="Connect with Me" />
                  <div className="space-y-4">
                    {editData.content?.links?.map((link, index) => (
                      <div key={index} className="flex flex-col md:flex-row md:space-x-4 items-center">
                        <input type="text" value={link.platform} onChange={e => { const newLinks = [...editData.content.links]; newLinks[index] = { ...link, platform: e.target.value }; handleContentChange('links', newLinks); }} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0" placeholder="Platform (e.g. LinkedIn)" />
                        <input type="text" value={link.url} onChange={e => { const newLinks = [...editData.content.links]; newLinks[index] = { ...link, url: e.target.value }; handleContentChange('links', newLinks); }} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="URL" />
                        <button onClick={() => { const newLinks = editData.content.links.filter((_, i) => i !== index); handleContentChange('links', newLinks); }} className="px-3 py-2 text-red-600 hover:text-red-800">×</button>
                      </div>
                    ))}
                    <button onClick={() => { const newLinks = [...(editData.content.links || []), { platform: '', url: '' }]; handleContentChange('links', newLinks); }} className="w-full px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50">Add Link</button>
                  </div>
                  <div className="flex justify-center space-x-4 mt-6">
                    <button onClick={saveChanges} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Save</button>
                    <button onClick={cancelEditing} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-8">{content.title}</h2>
                  <div className="flex flex-wrap justify-center gap-6">
                    {content.links?.map((link, index) => (
                      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 text-blue-800 rounded-full font-semibold hover:bg-blue-200 transition-colors">
                        <span>{link.platform}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )

      case 'contact':
        return (
          <div 
            className="py-16 px-8"
            style={{ 
              backgroundColor: styles.backgroundColor,
              color: styles.textColor,
              fontFamily: styles.fontFamily,
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              padding: styles.padding
            }}
          >
            <div className="max-w-4xl mx-auto text-center">
              {isEditing ? (
                <div className="space-y-6">
                  <input
                    type="text"
                    value={editData.content?.title || ''}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    className="text-3xl font-bold mb-12 bg-transparent border-b-2 border-white border-opacity-50 focus:border-white focus:outline-none text-center w-full"
                    placeholder="Get In Touch"
                  />
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <div className="text-2xl mb-2 transition-transform duration-300 hover:scale-125 hover:text-blue-500 animate-fadeIn"><span style={{display:'inline-block',verticalAlign:'middle'}}><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm8 5.5l8-5.5H4l8 5.5zm0 2.5l-8-5.5V18h16V8.5l-8 5.5z" fill="currentColor"/></svg></span></div>
                      <h3 className="font-semibold">Email</h3>
                      <input
                        type="email"
                        value={editData.content?.email || ''}
                        onChange={(e) => handleContentChange('email', e.target.value)}
                        className="opacity-80 bg-transparent border-b-2 border-white border-opacity-50 focus:border-white focus:outline-none text-center w-full"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl mb-2">📞</div>
                      <h3 className="font-semibold">Phone</h3>
                      <input
                        type="text"
                        value={editData.content?.phone || ''}
                        onChange={(e) => handleContentChange('phone', e.target.value)}
                        className="opacity-80 bg-transparent border-b-2 border-white border-opacity-50 focus:border-white focus:outline-none text-center w-full"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl mb-2">📍</div>
                      <h3 className="font-semibold">Location</h3>
                      <input
                        type="text"
                        value={editData.content?.location || ''}
                        onChange={(e) => handleContentChange('location', e.target.value)}
                        className="opacity-80 bg-transparent border-b-2 border-white border-opacity-50 focus:border-white focus:outline-none text-center w-full"
                        placeholder="Your City, Country"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4 mt-6">
                    <button
                      onClick={saveChanges}
                      className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-12">{content.title}</h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <div className="text-2xl mb-2"><span style={{display:'inline-block',verticalAlign:'middle'}}><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm8 5.5l8-5.5H4l8 5.5zm0 2.5l-8-5.5V18h16V8.5l-8 5.5z" fill="currentColor"/></svg></span></div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="opacity-80">{content.email}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl mb-2">📞</div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="opacity-80">{content.phone}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl mb-2">📍</div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="opacity-80">{content.location}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )

      default:
        return <div>Unknown component type</div>
    }
  }

  return (
    <>
      <div 
        className={`relative ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
        onClick={onSelect}
      >
        {isSelected && !isEditing && !isStyleEditing && (
          <div className="absolute -top-2 -right-2 z-10 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                startEditing()
              }}
              className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
              title="Edit Content"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                startStyleEditing()
              }}
              className="bg-purple-500 text-white p-2 rounded-full shadow-lg hover:bg-purple-600 transition-colors"
              title="Edit Styles"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </button>
          </div>
        )}
        
        {renderComponent()}
      </div>

      {renderStyleEditor()}
    </>
  )
}

export default PortfolioComponent 