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
  // Default collapsed on narrow mobile viewports so content is never crushed
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  )

  useEffect(() => {
    localStorage.setItem('kidneyai_theme', darkMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-200 bg-theme-bg text-theme-text">
        <div className="flex min-h-screen">
          {/* Mobile backdrop when sidebar drawer is expanded */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/40 md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          
          <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-20 md:ml-64' : 'ml-20'} min-h-screen flex flex-col min-w-0`}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            
            <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
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
