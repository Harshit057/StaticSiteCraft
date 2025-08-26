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
            { title: 'Project One', description: 'Description of your first project', technologies: ['React', 'Node.js', 'MongoDB'], image: null }
          ]
        }
      case 'education':
        return {
          title: 'Education',
          schools: [
            { school: 'University Name', degree: 'B.Sc. in Computer Science', year: '2020' }
          ]
        }
      case 'experience':
        return {
          title: 'Experience',
          jobs: [
            { company: 'Company Name', role: 'Job Title', period: '2021-2023', description: 'Describe your role and achievements.' }
          ]
        }
      case 'social':
        return {
          title: 'Connect with Me',
          links: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile' },
            { platform: 'GitHub', url: 'https://github.com/yourusername' }
          ]
        }
      case 'contact':
        return {
          title: 'Contact Me',
          email: 'your@email.com',
          phone: '',
          message: 'Feel free to reach out!'
        }
      default:
        return {}
    }
  }

  const getDefaultStyles = (type) => {
    switch (type) {
      case 'header':
        return { backgroundColor: '#f3f4f6', textColor: '#1e293b', padding: '3rem 1rem' }
      case 'about':
        return { backgroundColor: '#fff', textColor: '#222', padding: '2rem 1rem' }
      case 'skills':
        return { backgroundColor: '#fef9c3', textColor: '#92400e', padding: '2rem 1rem' }
      case 'projects':
        return { backgroundColor: '#ede9fe', textColor: '#4c1d95', padding: '2rem 1rem' }
      case 'education':
        return { backgroundColor: '#e0e7ff', textColor: '#3730a3', padding: '2rem 1rem' }
      case 'experience':
        return { backgroundColor: '#ffedd5', textColor: '#7c2d12', padding: '2rem 1rem' }
      case 'social':
        return { backgroundColor: '#cffafe', textColor: '#155e75', padding: '2rem 1rem' }
      case 'contact':
        return { backgroundColor: '#fee2e2', textColor: '#991b1b', padding: '2rem 1rem' }
      default:
        return { backgroundColor: '#fff', textColor: '#222', padding: '2rem' }
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