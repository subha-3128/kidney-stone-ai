import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Upload from './pages/Upload'
import History from './pages/History'
import About from './pages/About'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('kidneyai_theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    localStorage.setItem('kidneyai_theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-200" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-main)' }}>
        <div className="flex min-h-screen">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          
          <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'} min-h-screen flex flex-col`}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} sidebarOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            
            <main className="p-6 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
              <Routes>
                <Route path="/" element={<Upload />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/history" element={<History />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
