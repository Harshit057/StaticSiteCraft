# StaticSiteCraft Frontend

A revolutionary portfolio generator with a 3D editor interface, built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **3D Portfolio Editor**: Edit components in 3D space like Figma
- **Real-time Preview**: See changes instantly as you design
- **Visual Color Editor**: Intuitive color picker and gradient tools
- **Typography Control**: Customize fonts, sizes, and spacing
- **Image Management**: Upload and position images with drag-and-drop
- **Code-Free Design**: Create professional portfolios without coding
- **Responsive Design**: Works perfectly on all devices

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing

## 📦 Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🎨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx     # Navigation component
│   │   └── Footer.jsx     # Footer component
│   ├── pages/             # Page components
│   │   └── Home.jsx       # Home page
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── postcss.config.js      # PostCSS configuration
```

## 🎯 Key Components

### Navbar
- Responsive navigation with mobile menu
- Smooth animations and transitions
- Call-to-action buttons

### Home Page
- Hero section with animated content
- Features showcase with icons
- Statistics section
- Call-to-action sections

### Footer
- Comprehensive link organization
- Social media links
- Company information

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3b82f6 to #8b5cf6)
- **Secondary**: Gray scale for text and backgrounds
- **Accent**: Purple and blue combinations

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono for code elements

### Animations
- Framer Motion for smooth transitions
- Custom CSS animations for hover effects
- Staggered animations for lists

## 🔧 Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Import and add to routing in `App.jsx`
3. Update navigation links in `Navbar.jsx`

### Styling
- Use Tailwind CSS classes for styling
- Custom CSS in `src/index.css` for complex styles
- Component-specific styles in individual files

### Icons
- Use Lucide React icons: `import { IconName } from 'lucide-react'`
- Available icons: https://lucide.dev/icons/

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify
3. Configure build settings if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email hello@staticsitecraft.com or create an issue on GitHub.

---

**Built with ❤️ for creators worldwide** 