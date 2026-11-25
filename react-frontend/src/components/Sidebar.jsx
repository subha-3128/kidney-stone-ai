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
      } bg-white dark:bg-surface-panelDark border-r border-slate-200/90 dark:border-white/[0.08] transition-all duration-300 ease-in-out flex flex-col justify-between select-none shadow-subtle`}
    >
      <div>
        {/* Brand Header */}
        <div className={`flex items-center ${isOpen ? 'justify-between px-5' : 'justify-center px-3'} py-4 border-b border-slate-200/90 dark:border-white/[0.08] min-h-[69px]`}>
          {isOpen ? (
            <Link to="/" className="flex items-center gap-3 overflow-hidden group">
              <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/25 text-white font-bold">
                <HeartPulse size={19} className="animate-pulse" />
              </div>
              <div className="whitespace-nowrap overflow-hidden">
                <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white leading-tight block">
                  KidneyAI Studio
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  Precision CAD Engine
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/" className="w-9 h-9 bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/25 text-white font-bold">
              <HeartPulse size={19} />
            </Link>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
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
                    ? 'bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25 font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/90 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon size={18} className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'}`} />
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
      <div className="p-3 border-t border-slate-200/90 dark:border-white/[0.08]">
        {isOpen ? (
          <div className="bg-slate-50 dark:bg-surface-elevatedDark rounded-xl p-3 border border-slate-200/80 dark:border-white/[0.08]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Inference Cluster
              </span>
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 animate-pulse"></span>
            </div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Dual Checkpoint Soft-Vote
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
              224×224 RGB &bull; Sigmoid Mean
            </p>
          </div>
        ) : (
          <div className="flex justify-center py-2" title="Dual Checkpoint Soft-Vote Online">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
