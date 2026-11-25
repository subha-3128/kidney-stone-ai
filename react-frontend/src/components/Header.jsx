import React from 'react'
import { Moon, Sun, Activity, ShieldCheck, Github, Radio } from 'lucide-react'

const Header = ({ darkMode, setDarkMode, sidebarOpen, setIsOpen }) => {
  return (
    <header className="sticky top-0 z-30 bg-theme-card/90 backdrop-blur-md border-b border-theme-border px-6 py-3.5 transition-colors duration-200">
      <div className="flex items-center justify-between">
        {/* Left: Console branding & Status */}
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-theme-text">
                KidneyAI Pro
              </h1>
              <span className="badge-primary text-[10px] py-0.5">
                v1.2 Studio
              </span>
            </div>
            <p className="text-xs text-theme-muted hidden sm:block">
              Precision Nephrolithiasis Computer-Aided Diagnostic Workstation
            </p>
          </div>
        </div>

        {/* Right: Telemetry & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Serverless Backend Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-elevated border border-theme-border text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-400 dark:bg-darkEmerald-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-forest dark:bg-darkEmerald-primary"></span>
            </span>
            <span className="font-medium text-theme-muted text-[11px] tracking-wide">
              ZeroGPU Endpoint Online
            </span>
          </div>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/subha-3128/kidney-stone-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-theme-muted hover:text-theme-text hover:bg-theme-elevated transition-colors border border-transparent hover:border-theme-border"
            title="View Source on GitHub"
            aria-label="GitHub Repository"
          >
            <Github size={18} />
          </a>

          {/* Theme Switcher Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-theme-text hover:bg-theme-elevated transition-all cursor-pointer border border-theme-border"
            aria-label={darkMode ? "Switch to Sage Clinical theme" : "Switch to Dark Emerald theme"}
            title={darkMode ? "Switch to Sage Clinical theme" : "Switch to Dark Emerald theme"}
          >
            {darkMode ? (
              <Sun size={18} className="text-terracotta-400 hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon size={18} className="text-forest hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
