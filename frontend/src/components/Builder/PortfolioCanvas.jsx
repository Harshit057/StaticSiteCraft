import React from 'react'
import PortfolioComponent from './PortfolioComponent'

const PortfolioCanvas = ({ 
  components, 
  onSelectComponent, 
  selectedComponent, 
  onUpdateComponent,
  canvasSettings 
}) => {

  return (
    <div className="flex flex-col items-center">
      <div 
        className="portfolio-canvas w-full max-w-4xl"
        style={{ 
          backgroundColor: canvasSettings.backgroundColor,
          maxWidth: canvasSettings.maxWidth
        }}
      >
        {components.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Your Portfolio Canvas
              </h3>
              <p className="text-gray-500 mb-6">
                Start building your portfolio by adding components from the sidebar
              </p>
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            {components.map((component) => (
              <PortfolioComponent
                key={component.id}
                component={component}
                isSelected={selectedComponent?.id === component.id}
                onSelect={() => onSelectComponent(component)}
                onUpdate={(updates) => onUpdateComponent(component.id, updates)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PortfolioCanvas 