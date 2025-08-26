import React from 'react'
import { FaUser, FaRegFileAlt, FaBolt, FaBriefcase, FaGraduationCap, FaBuilding, FaGlobe, FaEnvelope } from 'react-icons/fa';

const ComponentPalette = ({ onAddComponent }) => {
  const components = [
    {
      type: 'header',
      name: 'Header Section',
      description: 'Hero section with name, title, and introduction',
      icon: <FaUser size={22} />, // User icon
      color: 'bg-blue-500'
    },
    {
      type: 'about',
      name: 'About Section',
      description: 'Tell your story and background',
      icon: <FaRegFileAlt size={22} />, // File icon
      color: 'bg-green-500'
    },
    {
      type: 'skills',
      name: 'Skills Section',
      description: 'Showcase your technical skills and expertise',
      icon: <FaBolt size={22} />, // Bolt icon
      color: 'bg-yellow-500'
    },
    {
      type: 'projects',
      name: 'Projects Section',
      description: 'Display your best work and projects',
      icon: <FaBriefcase size={22} />, // Briefcase icon
      color: 'bg-purple-500'
    },
    {
      type: 'education',
      name: 'Education Section',
      description: 'Show your academic background',
      icon: <FaGraduationCap size={22} />, // Graduation cap icon
      color: 'bg-indigo-500'
    },
    {
      type: 'experience',
      name: 'Experience Section',
      description: 'Highlight your work experience',
      icon: <FaBuilding size={22} />, // Building icon
      color: 'bg-orange-500'
    },
    {
      type: 'social',
      name: 'Social Links',
      description: 'Add your social media links',
      icon: <FaGlobe size={22} />, // Globe icon
      color: 'bg-cyan-500'
    },
    {
      type: 'contact',
      name: 'Contact Section',
      description: 'Let people get in touch with you',
      icon: <FaEnvelope size={22} />, // Envelope icon
      color: 'bg-red-500'
    }
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Components</h2>
        <p className="text-sm text-gray-600">Drag components to your portfolio</p>
      </div>

      <div className="space-y-4">
        {components.map((component) => (
          <div
            key={component.type}
            className="component-preview cursor-pointer"
            onClick={() => onAddComponent(component.type)}
          >
            <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${component.color} rounded-lg flex items-center justify-center text-white text-lg transition-all duration-200 group-hover:rotate-6`}> 
                {component.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{component.name}</h3>
                <p className="text-sm text-gray-600">{component.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">💡 Tip</h3>
        <p className="text-sm text-blue-800">
          Start with a Header section, then add About, Skills, Projects, and Contact sections to create a complete portfolio.
        </p>
      </div>
    </div>
  )
}

export default ComponentPalette 