import React from 'react'

const Toolbar = ({ 
  selectedComponent, 
  onUpdateComponent, 
  onDeleteComponent, 
  canvasSettings, 
  onUpdateCanvasSettings,
  components 
}) => {
  const generateHTML = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .skill-bar {
            transition: width 0.3s ease;
        }
        .project-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .project-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body style="background-color: ${canvasSettings.backgroundColor}">
    <div class="max-w-6xl mx-auto">
        ${components.map(component => {
          const { type, content, styles } = component
          
          switch (type) {
            case 'header':
              return `
                <div class="text-center py-20 px-8" style="background-color: ${styles.backgroundColor}; color: ${styles.textColor}; padding: ${styles.padding}">
                    <h1 class="text-5xl font-bold mb-4">${content.title}</h1>
                    <h2 class="text-2xl mb-6 opacity-90">${content.subtitle}</h2>
                    <p class="text-xl max-w-2xl mx-auto opacity-80">${content.description}</p>
                </div>
              `
            
            case 'about':
              return `
                <div class="py-16 px-8" style="background-color: ${styles.backgroundColor}; color: ${styles.textColor}; padding: ${styles.padding}">
                    <div class="max-w-4xl mx-auto">
                        <h2 class="text-3xl font-bold mb-8 text-center">${content.title}</h2>
                        <div class="prose prose-lg mx-auto">
                            <p class="text-lg leading-relaxed">${content.content}</p>
                        </div>
                    </div>
                </div>
              `
            
            case 'skills':
              return `
                <div class="py-16 px-8" style="background-color: ${styles.backgroundColor}; color: ${styles.textColor}; padding: ${styles.padding}">
                    <div class="max-w-4xl mx-auto">
                        <h2 class="text-3xl font-bold mb-12 text-center">${content.title}</h2>
                        <div class="grid md:grid-cols-2 gap-8">
                            ${content.skills.map(skill => `
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span class="font-medium">${skill.name}</span>
                                        <span class="text-sm opacity-70">${skill.level}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-600 h-2 rounded-full skill-bar" style="width: ${skill.level}%"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
              `
            
            case 'projects':
              return `
                <div class="py-16 px-8" style="background-color: ${styles.backgroundColor}; color: ${styles.textColor}; padding: ${styles.padding}">
                    <div class="max-w-6xl mx-auto">
                        <h2 class="text-3xl font-bold mb-12 text-center">${content.title}</h2>
                        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            ${content.projects.map(project => `
                                <div class="bg-white rounded-lg shadow-lg overflow-hidden project-card">
                                    <div class="h-48 bg-gray-200 flex items-center justify-center">
                                        <span class="text-gray-500">Project Image</span>
                                    </div>
                                    <div class="p-6">
                                        <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
                                        <p class="text-gray-600 mb-4">${project.description}</p>
                                        <div class="flex flex-wrap gap-2">
                                            ${project.technologies.map(tech => `
                                                <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">${tech}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
              `
            
            case 'contact':
              return `
                <div class="py-16 px-8" style="background-color: ${styles.backgroundColor}; color: ${styles.textColor}; padding: ${styles.padding}">
                    <div class="max-w-4xl mx-auto text-center">
                        <h2 class="text-3xl font-bold mb-12">${content.title}</h2>
                        <div class="grid md:grid-cols-3 gap-8">
                            <div class="space-y-2">
                                <div class="text-2xl mb-2">📧</div>
                                <h3 class="font-semibold">Email</h3>
                                <p class="opacity-80">${content.email}</p>
                            </div>
                            <div class="space-y-2">
                                <div class="text-2xl mb-2">📞</div>
                                <h3 class="font-semibold">Phone</h3>
                                <p class="opacity-80">${content.phone}</p>
                            </div>
                            <div class="space-y-2">
                                <div class="text-2xl mb-2">📍</div>
                                <h3 class="font-semibold">Location</h3>
                                <p class="opacity-80">${content.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
              `
            
            default:
              return ''
          }
        }).join('')}
    </div>
</body>
</html>
    `
    
    return htmlContent
  }

  const handleExport = () => {
    const htmlContent = generateHTML()
    
    // Create a blob with the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' })
    
    // Create a download link
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio.html'
    
    // Trigger the download
    document.body.appendChild(a)
    a.click()
    
    // Clean up
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    // Show success message
    alert('Portfolio exported successfully! Check your downloads folder for portfolio.html')
  }

  const handlePreview = () => {
    const htmlContent = generateHTML()
    
    // Open in new window for preview
    const newWindow = window.open('', '_blank')
    newWindow.document.write(htmlContent)
    newWindow.document.close()
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