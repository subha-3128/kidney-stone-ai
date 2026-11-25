import React from 'react'
import { Moon, Sun, Activity, ShieldCheck, Github, Radio } from 'lucide-react'

const Header = ({ darkMode, setDarkMode, sidebarOpen, setIsOpen }) => {
  return (
    <header className="sticky top-0 z-30 bg-surface/85 dark:bg-surface-panelDark/85 backdrop-blur-xl border-b border-slate-200/90 dark:border-white/[0.08] px-6 py-3.5 transition-colors duration-200">
      <div className="flex items-center justify-between">
        {/* Left: Console branding & Status */}
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                KidneyAI Pro
              </h1>
              <span className="badge-primary text-[10px] py-0.5">
                v1.2 Studio
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Precision Nephrolithiasis Computer-Aided Diagnostic Workstation
            </p>
          </div>
        </div>

        {/* Right: Telemetry & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Serverless Backend Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-slate-700 dark:text-slate-300 text-[11px] tracking-wide">
              ZeroGPU Endpoint Online
            </span>
          </div>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/subha-3128/kidney-stone-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/[0.08]"
            title="View Source on GitHub"
            aria-label="GitHub Repository"
          >
            <Github size={18} />
          </a>

          {/* Theme Switcher Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all cursor-pointer border border-slate-200 dark:border-white/[0.08]"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun size={18} className="text-amber-400 hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon size={18} className="text-slate-600 hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
