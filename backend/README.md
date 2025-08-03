# StaticSiteCraft Backend

A powerful Node.js/Express backend for the StaticSiteCraft portfolio builder application. This backend provides authentication, portfolio management, file uploads, and static site generation capabilities.

## Features

- 🔐 **User Authentication** - JWT-based authentication with bcrypt password hashing
- 📁 **Portfolio Management** - CRUD operations for portfolios with component-based architecture
- 🖼️ **File Upload** - Image upload with processing and optimization using Sharp
- 🌐 **Static Site Generation** - Generate beautiful static HTML sites from portfolios
- 🛡️ **Security** - Rate limiting, CORS, helmet, and input validation
- 📊 **Database** - MongoDB with Mongoose ODM
- 🔄 **Real-time Updates** - Component-based portfolio building system

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt
- **File Processing**: Sharp for image optimization
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StaticSiteCraft/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/static-site-craft
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   PUBLIC_PATH=./public
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |
| PUT | `/api/auth/password` | Change password | Private |

### Portfolio Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/portfolio` | Get user's portfolios | Private |
| GET | `/api/portfolio/:id` | Get single portfolio | Private |
| POST | `/api/portfolio` | Create new portfolio | Private |
| PUT | `/api/portfolio/:id` | Update portfolio | Private |
| DELETE | `/api/portfolio/:id` | Delete portfolio | Private |
| PUT | `/api/portfolio/:id/components` | Update components | Private |
| PUT | `/api/portfolio/:id/settings` | Update settings | Private |
| PUT | `/api/portfolio/:id/publish` | Publish/unpublish | Private |
| GET | `/api/portfolio/public/:slug` | Get public portfolio | Public |

### File Upload

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/upload/image` | Upload single image | Private |
| POST | `/api/upload/images` | Upload multiple images | Private |
| DELETE | `/api/upload/:filename` | Delete uploaded file | Private |
| GET | `/api/upload/files` | Get user's files | Private |

### Site Generation

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/site/generate/:portfolioId` | Generate static site | Private |
| GET | `/api/site/:portfolioId` | Get site URL | Private |
| DELETE | `/api/site/:portfolioId` | Delete generated site | Private |

## Database Models

### User
- Email, password, name
- Avatar, verification status
- Subscription level, settings
- Timestamps

### Portfolio
- User reference, title, slug
- Components array (header, about, skills, projects, contact)
- Settings (theme, layout, SEO)
- Publication status, views
- Version control

## File Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── errorHandler.js      # Error handling
├── models/
│   ├── User.js              # User model
│   └── Portfolio.js         # Portfolio model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── portfolio.js         # Portfolio routes
│   ├── upload.js            # File upload routes
│   └── site.js              # Site generation routes
├── uploads/                 # User uploaded files
├── sites/                   # Generated static sites
├── public/                  # Public assets
├── server.js                # Main server file
├── package.json
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/static-site-craft |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `MAX_FILE_SIZE` | Max file upload size | 5242880 (5MB) |
| `UPLOAD_PATH` | Upload directory | ./uploads |
| `PUBLIC_PATH` | Public assets directory | ./public |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 (15min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |
| `CORS_ORIGIN` | CORS allowed origin | http://localhost:3000 |

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **Rate Limiting** - Prevent abuse with request limits
- **Input Validation** - Express-validator for all inputs
- **CORS Protection** - Configured for frontend access
- **Helmet** - Security headers
- **File Type Validation** - Only allow safe file types
- **File Size Limits** - Prevent large file uploads

## Development

### Running in Development
```bash
npm run dev
```

### Running Tests
```bash
npm test
```

### API Testing
Use tools like Postman or curl to test endpoints:

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

## Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set a strong `JWT_SECRET`
4. Configure proper CORS origins
5. Set up proper file storage (consider cloud storage)

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

---

Built with ❤️ for creators who want to showcase their work without the hassle of coding. 