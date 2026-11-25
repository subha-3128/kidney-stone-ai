import React from 'react'
import { Moon, Sun, Activity, ShieldCheck, Github } from 'lucide-react'

const Header = ({ darkMode, setDarkMode, sidebarOpen, setIsOpen }) => {
  return (
    <header className="sticky top-0 z-30 bg-surface/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-border-color dark:border-border-color-dark px-6 py-3.5 transition-colors duration-200">
      <div className="flex items-center justify-between">
        {/* Left: Console branding & Status */}
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-text-primary dark:text-text-primary-dark">
                KidneyAI Pro
              </h1>
              <span className="badge-primary text-[10px] py-0.5">
                v1.2 Studio
              </span>
            </div>
            <p className="text-xs text-text-secondary dark:text-text-secondary-dark hidden sm:block">
              Nephrolithiasis Computer-Aided Diagnostic Workstation
            </p>
          </div>
        </div>

        {/* Right: Telemetry & Actions */}
        <div className="flex items-center gap-3">
          {/* Serverless Backend Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              ZeroGPU Endpoint Online
            </span>
          </div>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/subha-3128/kidney-stone-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="View Source on GitHub"
            aria-label="GitHub Repository"
          >
            <Github size={19} />
          </a>

          {/* Theme Switcher Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer border border-border-color dark:border-border-color-dark"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun size={19} className="text-amber-400 hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon size={19} className="text-slate-600 hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
