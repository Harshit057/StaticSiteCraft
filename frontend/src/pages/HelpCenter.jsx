import React from 'react'
import { Link } from 'react-router-dom'

const HelpCenter = () => {
  const faqs = [
    {
      question: "How do I create my first portfolio?",
      answer: "Start by clicking 'Start Building Now' on the homepage, then add components from the sidebar to your canvas. You can customize each component's content and styling."
    },
    {
      question: "What components are available?",
      answer: "We offer 5 main components: Header (hero section), About (your story), Skills (expertise), Projects (your work), and Contact (contact information)."
    },
    {
      question: "Can I customize the colors and fonts?",
      answer: "Yes! Each component has customizable styles including background colors, text colors, and padding. Select any component to see the editing options."
    },
    {
      question: "How do I export my portfolio?",
      answer: "Once you're happy with your portfolio, click the 'Export Portfolio' button in the toolbar. This will generate a static website ready to deploy."
    },
    {
      question: "Is PortfolioCraft free to use?",
      answer: "Yes! PortfolioCraft is completely free to use. Create unlimited portfolios without any cost or hidden fees."
    },
    {
      question: "Can I edit my portfolio after creating it?",
      answer: "Currently, you can edit your portfolio in the builder. For future updates, we're working on a save/load feature to edit existing portfolios."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 transition-colors mb-4 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
              <h1 className="text-4xl font-bold text-gray-900">Help Center</h1>
              <p className="text-xl text-gray-600 mt-2">Find answers to common questions and get support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Start Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Guide</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Add Components</h3>
              <p className="text-gray-600 text-sm">Click on components in the sidebar to add them to your portfolio</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Customize Content</h3>
              <p className="text-gray-600 text-sm">Edit text, colors, and styling to match your brand</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Export & Deploy</h3>
              <p className="text-gray-600 text-sm">Export your portfolio as a static website ready to deploy</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-blue-50 rounded-lg p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-6">Can't find what you're looking for? Our support team is here to help.</p>
          <Link
            to="/contact"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HelpCenter 