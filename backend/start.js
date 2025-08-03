// Startup script for StaticSiteCraft Backend
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set default environment variables if not already set
process.env.PORT = process.env.PORT || '5000';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/static-site-craft';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'static-site-craft-super-secret-jwt-key-2025';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
process.env.MAX_FILE_SIZE = process.env.MAX_FILE_SIZE || '5242880';
process.env.UPLOAD_PATH = process.env.UPLOAD_PATH || './uploads';
process.env.PUBLIC_PATH = process.env.PUBLIC_PATH || './public';
process.env.RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS || '900000';
process.env.RATE_LIMIT_MAX_REQUESTS = process.env.RATE_LIMIT_MAX_REQUESTS || '100';
process.env.CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

console.log('🚀 Starting StaticSiteCraft Backend...');
console.log('📊 Environment:', process.env.NODE_ENV);
console.log('🔗 Port:', process.env.PORT);
console.log('📦 Database:', process.env.MONGODB_URI);

// Import and start the server
import('./server.js').then(() => {
  console.log('✅ Backend started successfully!');
}).catch(error => {
  console.error('❌ Failed to start backend:', error);
  process.exit(1);
}); 