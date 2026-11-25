import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Activity, Calendar, Layers, ShieldCheck, HeartPulse } from 'lucide-react'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation()
  
  const menuItems = [
    { path: '/upload', icon: Activity, label: 'Diagnostic Studio' },
    { path: '/history', icon: Calendar, label: 'Scan Registry' },
    { path: '/about', icon: Layers, label: 'Model Architecture' },
  ]

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 ${
        isOpen ? 'w-64' : 'w-20'
      } bg-surface dark:bg-surface-dark border-r border-border-color dark:border-border-color-dark shadow-sm transition-all duration-300 ease-in-out flex flex-col justify-between select-none`}
    >
      <div>
        {/* Brand Header */}
        <div className={`flex items-center ${isOpen ? 'justify-between px-5' : 'justify-center px-3'} py-4 border-b border-border-color dark:border-border-color-dark min-h-[69px]`}>
          {isOpen ? (
            <Link to="/" className="flex items-center gap-3 overflow-hidden group">
              <div className="w-9 h-9 bg-gradient-to-tr from-primary to-sky-400 rounded-xl flex items-center justify-center shrink-0 shadow-sm shadow-primary/30 text-white font-bold">
                <HeartPulse size={20} className="animate-pulse" />
              </div>
              <div className="whitespace-nowrap overflow-hidden">
                <span className="font-bold text-sm tracking-tight text-text-primary dark:text-text-primary-dark leading-tight block">
                  KidneyAI Studio
                </span>
                <span className="text-[11px] text-text-secondary dark:text-text-secondary-dark block">
                  Clinical CAD Engine
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/" className="w-9 h-9 bg-gradient-to-tr from-primary to-sky-400 rounded-xl flex items-center justify-center shrink-0 shadow-sm shadow-primary/30 text-white font-bold">
              <HeartPulse size={20} />
            </Link>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={isOpen ? "Collapse navigation" : "Expand navigation"}
            title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <div className="w-4 h-3.5 flex flex-col justify-between items-center relative">
              <span 
                className={`h-0.5 w-4 bg-current rounded-full transform transition-all duration-300 ease-in-out ${
                  isOpen ? 'translate-y-[5px] rotate-45' : ''
                }`} 
              />
              <span 
                className={`h-0.5 w-4 bg-current rounded-full transition-all duration-200 ease-in-out ${
                  isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`} 
              />
              <span 
                className={`h-0.5 w-4 bg-current rounded-full transform transition-all duration-300 ease-in-out ${
                  isOpen ? '-translate-y-[5px] -rotate-45' : ''
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="p-3 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path || (item.path === '/upload' && location.pathname === '/')
            
            return (
              <Link
                key={item.path}
                to={item.path}
                title={!isOpen ? item.label : undefined}
                aria-label={item.label}
                className={`group relative flex items-center ${
                  isOpen 
                    ? 'gap-3 px-3.5 py-2.5 rounded-xl w-full' 
                    : 'justify-center w-11 h-11 p-0 rounded-xl mx-auto'
                } transition-all duration-150 font-medium text-sm ${
                  isActive 
                    ? 'bg-primary text-white shadow-sm shadow-primary/25 font-semibold' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon size={19} className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-primary dark:text-slate-400 transition-colors'}`} />
                {isOpen && (
                  <span className="whitespace-nowrap overflow-hidden">
                    {item.label}
                  </span>
                )}

                {/* Floating tooltip when folded */}
                {!isOpen && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-slate-700/50">
                    {item.label}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer System Status Card */}
      <div className="p-3 border-t border-border-color dark:border-border-color-dark">
        {isOpen ? (
          <div className="bg-slate-50 dark:bg-slate-850 rounded-xl p-3 border border-border-color dark:border-border-color-dark">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider">
                Inference System
              </span>
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-xs font-medium text-text-primary dark:text-text-primary-dark">
              Dual Checkpoint Soft-Vote
            </p>
            <p className="text-[10px] text-text-secondary dark:text-text-secondary-dark mt-0.5">
              Input: 224×224 RGB Tensor
            </p>
          </div>
        ) : (
          <div className="flex justify-center py-2" title="Dual Checkpoint Soft-Vote Online">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
