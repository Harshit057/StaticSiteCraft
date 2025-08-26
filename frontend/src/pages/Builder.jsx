import React, { useState } from 'react'
import ComponentPalette from '../components/Builder/ComponentPalette'
import PortfolioCanvas from '../components/Builder/PortfolioCanvas'
import Toolbar from '../components/Builder/Toolbar'

const Builder = () => {
  const [components, setComponents] = useState([])
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [canvasSettings, setCanvasSettings] = useState({
    backgroundColor: '#ffffff',
    maxWidth: '1200px'
  })

  const addComponent = (componentType) => {
    const newComponent = {
      id: Date.now(),
      type: componentType,
      content: getDefaultContent(componentType),
      styles: getDefaultStyles(componentType),
      position: { x: 50, y: components.length * 200 + 50 }
    }
    setComponents([...components, newComponent])
  }

  const updateComponent = (id, updates) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ))
  }

  const deleteComponent = (id) => {
    setComponents(components.filter(comp => comp.id !== id))
    setSelectedComponent(null)
  }

  const getDefaultContent = (type) => {
    switch (type) {
      case 'header':
        return {
          title: 'Your Name',
          subtitle: 'Professional Title',
          description: 'A brief introduction about yourself and your expertise.'
        }
      case 'about':
        return {
          title: 'About Me',
          content: 'Write a compelling story about your background, skills, and what drives you in your field.'
        }
      case 'skills':
        return {
          title: 'Skills & Expertise',
          skills: [
            { name: 'Web Development', level: 90 },
            { name: 'UI/UX Design', level: 85 },
            { name: 'Project Management', level: 80 }
          ]
        }
      case 'projects':
        return {
          title: 'Featured Projects',
          projects: [
            {
              title: 'Project One',
              description: 'Description of your first project',
              technologies: ['React', 'Node.js', 'MongoDB'],
              image: null
            }
          ]
        }
      case 'contact':
        return {
          title: 'Get In Touch',
          email: 'your.email@example.com',
          phone: '+1 (555) 123-4567',
          location: 'Your City, Country'
        }
      default:
        return {}
    }
  }

  const getDefaultStyles = (type) => {
    switch (type) {
      case 'header':
        return {
          backgroundColor: '#667eea',
          textColor: '#ffffff',
          padding: '80px 20px'
        }
      case 'about':
        return {
          backgroundColor: '#ffffff',
          textColor: '#333333',
          padding: '60px 20px'
        }
      case 'skills':
        return {
          backgroundColor: '#f8fafc',
          textColor: '#333333',
          padding: '60px 20px'
        }
      case 'projects':
        return {
          backgroundColor: '#ffffff',
          textColor: '#333333',
          padding: '60px 20px'
        }
      case 'contact':
        return {
          backgroundColor: '#1e293b',
          textColor: '#ffffff',
          padding: '60px 20px'
        }
      default:
        return {}
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Component Palette */}
      <div className="w-80 bg-white shadow-lg overflow-y-auto">
        <ComponentPalette onAddComponent={addComponent} />
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-16 bg-white shadow-sm border-b border-gray-200">
          <Toolbar 
            selectedComponent={selectedComponent}
            onUpdateComponent={updateComponent}
            onDeleteComponent={deleteComponent}
            canvasSettings={canvasSettings}
            onUpdateCanvasSettings={setCanvasSettings}
            components={components}
          />
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto p-4">
          <PortfolioCanvas
            components={components}
            onSelectComponent={setSelectedComponent}
            selectedComponent={selectedComponent}
            onUpdateComponent={updateComponent}
            canvasSettings={canvasSettings}
          />
        </div>
      </div>
    </div>
  )
}

export default Builder 