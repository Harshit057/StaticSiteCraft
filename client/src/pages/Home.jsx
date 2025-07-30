import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Static Websites
            <span className="block text-primary-600">Without Writing Code</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create beautiful, responsive websites in minutes. Choose from professional templates, 
            customize your content, and download your website ready to deploy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/editor"
              className="btn-primary text-lg px-8 py-4"
            >
              Start Building Now
            </Link>
            <Link
              to="/templates"
              className="btn-secondary text-lg px-8 py-4"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build Amazing Websites
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features that make website creation simple and enjoyable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4"><img src="/src/assets/icons/palette.svg" alt="" width="40" height="40" aria-hidden="true" /></div>
              <h3 className="text-xl font-semibold mb-2">Beautiful Templates</h3>
              <p className="text-gray-600">
                Choose from professionally designed templates for portfolios, businesses, 
                landing pages, and blogs.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4"><img src="/src/assets/icons/lightning.svg" alt="" width="40" height="40" aria-hidden="true" /></div>
              <h3 className="text-xl font-semibold mb-2">Instant Preview</h3>
              <p className="text-gray-600">
                See your changes in real-time as you customize your content, colors, and layout.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4"><img src="/src/assets/icons/phone.svg" alt="" width="40" height="40" aria-hidden="true" /></div>
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-600">
                All websites are mobile-friendly and look great on any device or screen size.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4"><img src="/src/assets/icons/target.svg" alt="" width="40" height="40" aria-hidden="true" /></div>
              <h3 className="text-xl font-semibold mb-2">Easy Customization</h3>
              <p className="text-gray-600">
                Simple forms and controls let you personalize every aspect of your website.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4"><img src="/src/assets/icons/box.svg" alt="" width="40" height="40" aria-hidden="true" /></div>
              <h3 className="text-xl font-semibold mb-2">One-Click Export</h3>
              <p className="text-gray-600">
                Download your website as a ZIP file ready to upload to any hosting service.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4"><img src="/src/assets/icons/rocket.svg" alt="" width="40" height="40" aria-hidden="true" /></div>
              <h3 className="text-xl font-semibold mb-2">No Code Required</h3>
              <p className="text-gray-600">
                Build professional websites without writing a single line of code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Templates
            </h2>
            <p className="text-xl text-gray-600">
              Start with a beautiful template and make it your own
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-32 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Portfolio</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Portfolio</h3>
              <p className="text-gray-600 text-sm mb-4">
                Showcase your work and skills professionally
              </p>
              <Link to="/editor" className="btn-primary text-sm">
                Use Template
              </Link>
            </div>
            
            <div className="card text-center">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 h-32 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Landing</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Landing Page</h3>
              <p className="text-gray-600 text-sm mb-4">
                Convert visitors into customers effectively
              </p>
              <Link to="/editor" className="btn-primary text-sm">
                Use Template
              </Link>
            </div>
            
            <div className="card text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 h-32 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Business</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Business</h3>
              <p className="text-gray-600 text-sm mb-4">
                Professional business website with services
              </p>
              <Link to="/editor" className="btn-primary text-sm">
                Use Template
              </Link>
            </div>
            
            <div className="card text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 h-32 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Blog</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Blog</h3>
              <p className="text-gray-600 text-sm mb-4">
                Share your thoughts and ideas beautifully
              </p>
              <Link to="/editor" className="btn-primary text-sm">
                Use Template
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/templates" className="btn-secondary text-lg px-8 py-4">
              View All Templates
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build Your Website?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have created beautiful websites with StaticSiteCraft. 
            Start building your website today!
          </p>
          <Link
            to="/editor"
            className="bg-white text-primary-600 font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors"
          >
            Start Building Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 