# StaticSiteCraft

**Build and Download Static Websites Without Writing a Single Line of Code**

StaticSiteCraft is a full-stack web application that enables users to create customizable, responsive static websites through an intuitive UI. Users can choose templates, customize content, select themes, and instantly download their website as a ZIP file.

## 🚀 Features

### Core Features
- **Template Selection**: Choose from professional templates (Portfolio, Landing Page, Business, Blog)
- **Theme Customization**: Multiple color themes (Light, Dark, Corporate, Funky, Minimal)
- **Content Editor**: Dynamic forms for editing website content
- **Live Preview**: Real-time preview of changes
- **One-Click Export**: Download website as ZIP file ready to deploy
- **Responsive Design**: All websites work on desktop, tablet, and mobile

### Advanced Features
- **Auto-save**: Changes are automatically saved to localStorage
- **Project Management**: Save and load projects (optional MongoDB integration)
- **Cross-browser Compatible**: Works on all modern browsers
- **SEO Optimized**: Generated websites include proper meta tags
- **Modern Styling**: Built with Tailwind CSS for beautiful designs

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React (Vite), Tailwind CSS |
| **Backend** | Express.js (Node.js) |
| **Database** | MongoDB (optional) |
| **File Export** | JSZip |
| **Authentication** | JWT-based (optional) |
| **Hosting** | Vercel (client), Render/Railway (server) |

## 📁 Project Structure

```
/StaticSiteCraft
│
├── client/                         # Frontend - React + Vite + Tailwind
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── TemplateSelector.jsx
│       │   ├── ThemePicker.jsx
│       │   ├── ContentEditor.jsx
│       │   ├── LivePreview.jsx
│       │   └── DownloadButton.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Editor.jsx
│       │   └── Templates.jsx
│       ├── context/
│       │   └── EditorContext.jsx
│       ├── utils/
│       │   ├── htmlGenerator.js
│       │   ├── zipExporter.js
│       │   └── templates.js
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/                         # Backend - Express + MongoDB
│   ├── controllers/
│   │   └── projectController.js
│   ├── models/
│   │   └── Project.js
│   ├── routes/
│   │   └── projectRoutes.js
│   ├── utils/
│   │   └── database.js
│   └── server.js
│
└── package.json (root)
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (optional, for project saving)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/staticsitecraft.git
   cd staticsitecraft
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in server directory
   cd server
   cp .env.example .env
   ```

   Add your MongoDB URI (optional):
   ```
   MONGODB_URI=mongodb://localhost:27017/staticsitecraft
   NODE_ENV=development
   ```

4. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

### Production Build

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd server
   npm start
   ```

## 🎨 Available Templates

### Portfolio Template
- Professional portfolio layout
- Sections: Header, Hero, About, Projects, Contact
- Perfect for developers, designers, and creatives

### Landing Page Template
- High-converting landing page
- Sections: Header, Hero, Features, Testimonials, CTA, Footer
- Ideal for product launches and marketing campaigns

### Business Website Template
- Complete business website
- Sections: Header, Hero, About, Services, Team, Contact
- Professional corporate presence

### Blog Template
- Content-focused blog layout
- Sections: Header, Hero, Featured Posts, Recent Posts, Sidebar, Footer
- Perfect for content creators and writers

## 🎨 Available Themes

- **Light**: Clean and modern light theme
- **Dark**: Elegant dark theme
- **Corporate**: Professional business theme
- **Funky**: Bold and vibrant theme
- **Minimal**: Simple and clean theme

## 📦 Generated Website Structure

When you download a website, you'll get a ZIP file containing:

```
/my-website/
├── index.html          # Main website file
├── README.md          # Instructions and information
└── (optional assets)  # Images, scripts, styles
```

## 🔧 API Endpoints

### Projects
- `GET /api/projects/user/:userId` - Get user projects
- `GET /api/projects/public` - Get public projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/duplicate` - Duplicate project

### Health Check
- `GET /api/health` - API health status

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `cd client && npm run build`
3. Set output directory: `client/dist`
4. Deploy!

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set build command: `npm install && cd server && npm install`
3. Set start command: `cd server && npm start`
4. Add environment variables (MONGODB_URI, etc.)
5. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact us at support@staticsitecraft.com.

---

**Made with ❤️ by the StaticSiteCraft Team** 