import JSZip from 'jszip';
import { generateHTML } from './htmlGenerator.js';

export const exportWebsite = async (template, content, theme, siteName = 'my-website') => {
  try {
    // Generate the HTML content
    const htmlContent = generateHTML(template, content, theme);
    
    // Create a new ZIP file
    const zip = new JSZip();
    
    // Add the main HTML file
    zip.file('index.html', htmlContent);
    
    // Add a README file
    const readmeContent = `# ${siteName}

This website was created with StaticSiteCraft.

## Files included:
- index.html - The main website file
- README.md - This file

## How to use:
1. Extract all files to a folder
2. Open index.html in your web browser
3. Upload the files to any web hosting service

## Features:
- Responsive design
- Modern styling
- Cross-browser compatible
- SEO optimized

Created with ❤️ by StaticSiteCraft
`;
    
    zip.file('README.md', readmeContent);
    
    // Generate the ZIP file
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    
    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(zipBlob);
    downloadLink.download = `${siteName}.zip`;
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Clean up the object URL
    URL.revokeObjectURL(downloadLink.href);
    
    return { success: true, message: 'Website exported successfully!' };
  } catch (error) {
    console.error('Error exporting website:', error);
    return { success: false, message: 'Failed to export website. Please try again.' };
  }
};

export const exportWebsiteWithAssets = async (template, content, theme, assets = [], siteName = 'my-website') => {
  try {
    // Generate the HTML content
    const htmlContent = generateHTML(template, content, theme);
    
    // Create a new ZIP file
    const zip = new JSZip();
    
    // Add the main HTML file
    zip.file('index.html', htmlContent);
    
    // Add assets if provided
    if (assets.length > 0) {
      const imagesFolder = zip.folder('images');
      const scriptsFolder = zip.folder('scripts');
      const stylesFolder = zip.folder('styles');
      
      for (const asset of assets) {
        try {
          if (asset.type === 'image') {
            // For images, we'll add placeholder files or try to fetch them
            const imageContent = await fetchImageAsBlob(asset.url);
            if (imageContent) {
              imagesFolder.file(asset.filename || `image-${Date.now()}.jpg`, imageContent);
            }
          } else if (asset.type === 'script') {
            scriptsFolder.file(asset.filename || 'script.js', asset.content || '// Custom JavaScript');
          } else if (asset.type === 'style') {
            stylesFolder.file(asset.filename || 'custom.css', asset.content || '/* Custom CSS */');
          }
        } catch (error) {
          console.warn(`Failed to add asset ${asset.filename}:`, error);
        }
      }
    }
    
    // Add a README file
    const readmeContent = `# ${siteName}

This website was created with StaticSiteCraft.

## Files included:
- index.html - The main website file
- images/ - Folder containing website images
- scripts/ - Folder containing JavaScript files
- styles/ - Folder containing CSS files
- README.md - This file

## How to use:
1. Extract all files to a folder
2. Open index.html in your web browser
3. Upload the files to any web hosting service

## Features:
- Responsive design
- Modern styling
- Cross-browser compatible
- SEO optimized
- Custom assets included

Created with ❤️ by StaticSiteCraft
`;
    
    zip.file('README.md', readmeContent);
    
    // Generate the ZIP file
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    
    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(zipBlob);
    downloadLink.download = `${siteName}.zip`;
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Clean up the object URL
    URL.revokeObjectURL(downloadLink.href);
    
    return { success: true, message: 'Website exported successfully!' };
  } catch (error) {
    console.error('Error exporting website:', error);
    return { success: false, message: 'Failed to export website. Please try again.' };
  }
};

const fetchImageAsBlob = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.blob();
    }
  } catch (error) {
    console.warn('Failed to fetch image:', error);
  }
  return null;
};

export const generateSiteName = (template, content) => {
  const baseName = content.header?.title || content.header?.logo || template.name || 'my-website';
  return baseName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}; 