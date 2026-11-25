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
      } bg-theme-card border-r border-theme-border transition-all duration-300 ease-in-out flex flex-col justify-between select-none shadow-subtle`}
    >
      <div>
        {/* Brand Header */}
        <div className={`flex items-center ${isOpen ? 'justify-between px-5' : 'justify-center px-3'} py-4 border-b border-theme-border min-h-[69px]`}>
          {isOpen ? (
            <Link to="/" className="flex items-center gap-3 overflow-hidden group">
              <div className="w-9 h-9 bg-forest dark:bg-darkEmerald-elevated text-white dark:text-darkEmerald-primary border border-forest-700 dark:border-darkEmerald-border rounded-xl flex items-center justify-center shrink-0 shadow-sm font-bold">
                <HeartPulse size={19} className="animate-pulse" />
              </div>
              <div className="whitespace-nowrap overflow-hidden">
                <span className="font-bold text-sm tracking-tight text-theme-text leading-tight block">
                  KidneyAI Studio
                </span>
                <span className="text-[11px] text-theme-muted block font-medium">
                  Precision CAD Engine
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/" className="w-9 h-9 bg-forest dark:bg-darkEmerald-elevated text-white dark:text-darkEmerald-primary border border-forest-700 dark:border-darkEmerald-border rounded-xl flex items-center justify-center shrink-0 shadow-sm font-bold">
              <HeartPulse size={19} />
            </Link>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg text-theme-muted hover:text-theme-text hover:bg-theme-elevated transition-colors cursor-pointer"
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
                    ? 'bg-forest text-white dark:bg-darkEmerald-primary dark:text-charcoal-900 shadow-sm font-semibold' 
                    : 'text-theme-muted hover:bg-theme-elevated hover:text-theme-text'
                }`}
              >
                <Icon size={18} className={`shrink-0 ${isActive ? 'text-white dark:text-charcoal-900' : 'text-theme-muted group-hover:text-forest dark:group-hover:text-darkEmerald-primary transition-colors'}`} />
                {isOpen && (
                  <span className="whitespace-nowrap overflow-hidden">
                    {item.label}
                  </span>
                )}

                {/* Floating tooltip when folded */}
                {!isOpen && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-charcoal text-white dark:bg-darkEmerald-elevated dark:text-darkEmerald-text text-xs font-semibold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-theme-border">
                    {item.label}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer System Status Card */}
      <div className="p-3 border-t border-theme-border">
        {isOpen ? (
          <div className="bg-theme-elevated rounded-xl p-3 border border-theme-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-theme-muted uppercase tracking-wider">
                Inference Cluster
              </span>
              <span className="inline-flex h-2 w-2 rounded-full bg-forest dark:bg-darkEmerald-primary shadow-sm animate-pulse"></span>
            </div>
            <p className="text-xs font-semibold text-theme-text">
              Dual Checkpoint Soft-Vote
            </p>
            <p className="text-[10px] text-theme-muted mt-0.5 font-mono">
              224×224 RGB &bull; Sigmoid Mean
            </p>
          </div>
        ) : (
          <div className="flex justify-center py-2" title="Dual Checkpoint Soft-Vote Online">
            <div className="w-8 h-8 rounded-lg bg-theme-elevated border border-theme-border flex items-center justify-center">
              <div className="w-2 h-2 bg-forest dark:bg-darkEmerald-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
