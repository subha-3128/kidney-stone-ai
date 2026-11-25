import React from 'react'
import { Moon, Sun, Github } from 'lucide-react'

const Header = ({ darkMode, setDarkMode, sidebarOpen, setIsOpen }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#17231C]/95 backdrop-blur-md border-b border-[#E4E7E0] dark:border-[#34443A] px-6 py-3.5 transition-colors duration-200">
      <div className="flex items-center justify-between">
        {/* Left: Console branding & Status */}
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-[#202923] dark:text-[#E7EEE8]">
                KidneyAI Pro
              </h1>
              <span className="badge-primary text-[10px] py-0.5">
                v1.2 Studio
              </span>
            </div>
            <p className="text-xs text-[#5F6C62] dark:text-[#A6B5A9] hidden sm:block">
              Precision Nephrolithiasis Computer-Aided Diagnostic Workstation
            </p>
          </div>
        </div>

        {/* Right: Telemetry & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Serverless Backend Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDECE6] dark:bg-[#24352A] border border-[#E4E7E0] dark:border-[#34443A] text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest dark:bg-[#8BB49A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-forest dark:bg-[#8BB49A]"></span>
            </span>
            <span className="font-medium text-[#202923] dark:text-[#E7EEE8] text-[11px] tracking-wide">
              ZeroGPU Endpoint Online
            </span>
          </div>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/subha-3128/kidney-stone-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-[#5F6C62] dark:text-[#A6B5A9] hover:text-[#202923] dark:hover:text-[#E7EEE8] hover:bg-[#EDECE6] dark:hover:bg-[#24352A] transition-colors border border-transparent hover:border-[#E4E7E0] dark:hover:border-[#34443A]"
            title="View Source on GitHub"
            aria-label="GitHub Repository"
          >
            <Github size={18} />
          </a>

          {/* Theme Switcher Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-[#202923] dark:text-[#E7EEE8] hover:bg-[#EDECE6] dark:hover:bg-[#24352A] transition-all cursor-pointer border border-[#E4E7E0] dark:border-[#34443A]"
            aria-label={darkMode ? "Switch to Sage Clinical theme" : "Switch to Dark Emerald theme"}
            title={darkMode ? "Switch to Sage Clinical theme" : "Switch to Dark Emerald theme"}
          >
            {darkMode ? (
              <Sun size={18} className="text-[#E08B6D] hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon size={18} className="text-[#244A3C] hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
