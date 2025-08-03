import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Builder from './pages/Builder'
import HelpCenter from './pages/HelpCenter'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import TermsOfService from './pages/TermsOfService'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />
      case 'builder':
        return <Builder />
      case 'help':
        return <HelpCenter setCurrentPage={setCurrentPage} />
      case 'contact':
        return <Contact setCurrentPage={setCurrentPage} />
      case 'privacy':
        return <Privacy setCurrentPage={setCurrentPage} />
      case 'terms':
        return <TermsOfService setCurrentPage={setCurrentPage} />
      default:
        return <Home setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <main className="relative z-10">
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default App 