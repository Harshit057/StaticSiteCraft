const fs = require('fs');
const path = require('path');

console.log('🧪 Testing StaticSiteCraft Setup...\n');

// Check if all required files exist
const requiredFiles = [
  'package.json',
  'client/package.json',
  'server/package.json',
  'client/src/App.jsx',
  'client/src/main.jsx',
  'client/src/index.css',
  'client/src/context/EditorContext.jsx',
  'client/src/utils/htmlGenerator.js',
  'client/src/utils/zipExporter.js',
  'client/src/utils/templates.js',
  'client/src/components/TemplateSelector.jsx',
  'client/src/components/ThemePicker.jsx',
  'client/src/components/ContentEditor.jsx',
  'client/src/components/LivePreview.jsx',
  'client/src/components/DownloadButton.jsx',
  'client/src/pages/Home.jsx',
  'client/src/pages/Editor.jsx',
  'client/src/pages/Templates.jsx',
  'server/server.js',
  'server/models/Project.js',
  'server/controllers/projectController.js',
  'server/routes/projectRoutes.js',
  'server/utils/database.js',
  'README.md',
  '.gitignore'
];

let allFilesExist = true;

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check if node_modules exist
const clientNodeModules = fs.existsSync('client/node_modules');
const serverNodeModules = fs.existsSync('server/node_modules');
const rootNodeModules = fs.existsSync('node_modules');

console.log('\n📦 Checking dependencies...');
console.log(`✅ Root node_modules: ${rootNodeModules ? 'EXISTS' : 'MISSING'}`);
console.log(`✅ Client node_modules: ${clientNodeModules ? 'EXISTS' : 'MISSING'}`);
console.log(`✅ Server node_modules: ${serverNodeModules ? 'EXISTS' : 'MISSING'}`);

// Check package.json scripts
const rootPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const clientPackage = JSON.parse(fs.readFileSync('client/package.json', 'utf8'));
const serverPackage = JSON.parse(fs.readFileSync('server/package.json', 'utf8'));

console.log('\n📋 Checking package.json scripts...');
console.log(`✅ Root scripts: ${Object.keys(rootPackage.scripts).join(', ')}`);
console.log(`✅ Client scripts: ${Object.keys(clientPackage.scripts).join(', ')}`);
console.log(`✅ Server scripts: ${Object.keys(serverPackage.scripts).join(', ')}`);

// Summary
console.log('\n🎯 Setup Summary:');
console.log(`📁 Files: ${allFilesExist ? '✅ All files present' : '❌ Some files missing'}`);
console.log(`📦 Dependencies: ${rootNodeModules && clientNodeModules && serverNodeModules ? '✅ All installed' : '❌ Some missing'}`);

if (allFilesExist && rootNodeModules && clientNodeModules && serverNodeModules) {
  console.log('\n🎉 StaticSiteCraft setup is complete and ready to run!');
  console.log('\n🚀 To start the development servers:');
  console.log('   npm run dev');
  console.log('\n🌐 The application will be available at:');
  console.log('   Frontend: http://localhost:3000');
  console.log('   Backend: http://localhost:5000');
} else {
  console.log('\n⚠️  Some issues found. Please check the missing files/dependencies above.');
} 