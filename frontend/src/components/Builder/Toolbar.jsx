import React from 'react'

const Toolbar = ({ 
  selectedComponent, 
  onUpdateComponent, 
  onDeleteComponent, 
  canvasSettings, 
  onUpdateCanvasSettings 
}) => {
  const handleExport = () => {
    // This would generate and download the portfolio as HTML/CSS
    alert('Export functionality would generate your portfolio as a static website!')
  }

  const handlePreview = () => {
    // This would show a preview of the portfolio
    alert('Preview functionality would show how your portfolio looks!')
  }

  return (
    <div className="flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-gray-900">Portfolio Builder</h2>
        
        {selectedComponent && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Selected:</span>
            <span className="font-medium capitalize">{selectedComponent.type}</span>
            <button
              onClick={() => onDeleteComponent(selectedComponent.id)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* Canvas Settings */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Background:</label>
          <input
            type="color"
            value={canvasSettings.backgroundColor}
            onChange={(e) => onUpdateCanvasSettings({
              ...canvasSettings,
              backgroundColor: e.target.value
            })}
            className="w-8 h-8 rounded border border-gray-300"
          />
        </div>

        {/* Action Buttons */}
        <button
          onClick={handlePreview}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Preview
        </button>
        
        <button
          onClick={handleExport}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Export Portfolio
        </button>
      </div>
    </div>
  )
}

export default Toolbar 