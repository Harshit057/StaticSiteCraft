import React, { useState } from 'react'

const PortfolioComponent = ({ component, isSelected, onSelect, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})

  const startEditing = () => {
    setEditData({
      content: { ...component.content },
      styles: { ...component.styles }
    })
    setIsEditing(true)
  }

  const saveChanges = () => {
    onUpdate(editData)
    setIsEditing(false)
  }

  const cancelEditing = () => {
    setIsEditing(false)
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

  const handleStyleChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      styles: {
        ...prev.styles,
        [field]: value
      }
    }))
  }

  const renderComponent = () => {
    const { type, content, styles } = component

    switch (type) {
      case 'header':
        return (
          <div 
            className="text-center py-20 px-8"
            style={{ 
              backgroundColor: styles.backgroundColor,
              color: styles.textColor,
              padding: styles.padding
            }}
          >
            {isEditing ? (
              <div className="space-y-4">
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
              <>
                <h1 className="text-5xl font-bold mb-4">{content.title}</h1>
                <h2 className="text-2xl mb-6 opacity-90">{content.subtitle}</h2>
                <p className="text-xl max-w-2xl mx-auto opacity-80">{content.description}</p>
              </>
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

      case 'contact':
        return (
          <div 
            className="py-16 px-8"
            style={{ 
              backgroundColor: styles.backgroundColor,
              color: styles.textColor,
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
                      <div className="text-2xl mb-2">📧</div>
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
                      <div className="text-2xl mb-2">📧</div>
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
        {isSelected && !isEditing && (
          <div className="absolute -top-2 -right-2 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation()
                startEditing()
              }}
              className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
        )}
        
        {renderComponent()}
      </div>

    </>
  )
}

export default PortfolioComponent 