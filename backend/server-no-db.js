import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'StaticSiteCraft Backend is running (No DB mode)',
    timestamp: new Date().toISOString()
  });
});

// Mock portfolio endpoints for testing
app.get('/api/portfolio', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        _id: 'mock-1',
        title: 'Sample Portfolio',
        slug: 'sample-portfolio',
        description: 'A sample portfolio for testing',
        components: [
          {
            id: 'header-1',
            type: 'header',
            content: {
              title: 'Welcome to My Portfolio',
              subtitle: 'Web Developer & Designer'
            },
            styles: {
              backgroundColor: '#ffffff',
              color: '#333333'
            }
          }
        ],
        settings: {
          theme: 'light',
          layout: 'standard'
        },
        isPublished: false,
        isPublic: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  });
});

app.get('/api/portfolio/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      _id: req.params.id,
      title: 'Sample Portfolio',
      slug: 'sample-portfolio',
      description: 'A sample portfolio for testing',
      components: [
        {
          id: 'header-1',
          type: 'header',
          content: {
            title: 'Welcome to My Portfolio',
            subtitle: 'Web Developer & Designer'
          },
          styles: {
            backgroundColor: '#ffffff',
            color: '#333333'
          }
        }
      ],
      settings: {
        theme: 'light',
        layout: 'standard'
      },
      isPublished: false,
      isPublic: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  });
});

app.put('/api/portfolio/:id', (req, res) => {
  console.log('Portfolio update request:', req.params.id, req.body);
  res.json({
    success: true,
    message: 'Portfolio updated successfully (mock)',
    data: {
      _id: req.params.id,
      ...req.body,
      updatedAt: new Date().toISOString()
    }
  });
});

app.put('/api/portfolio/:id/components', (req, res) => {
  console.log('Components update request:', req.params.id, req.body);
  res.json({
    success: true,
    message: 'Components updated successfully (mock)',
    data: {
      _id: req.params.id,
      components: req.body.components,
      updatedAt: new Date().toISOString()
    }
  });
});

// Mock auth endpoints
app.post('/api/auth/login', (req, res) => {
  res.json({
    success: true,
    message: 'Login successful (mock)',
    token: 'mock-jwt-token',
    user: {
      _id: 'mock-user-1',
      email: req.body.email,
      name: 'Mock User'
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  res.json({
    success: true,
    data: {
      _id: 'mock-user-1',
      email: 'user@example.com',
      name: 'Mock User'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: 'The requested endpoint does not exist'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} (No DB mode)`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`⚠️  Running in mock mode - no database connection`);
});

export default app; 