'use client'

import { useUIStore } from '@/store/ui-store'
import { X, Coffee, LayoutDashboard, Settings, LogOut, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useUIStore()
  const pathname = usePathname()

  if (!isSidebarOpen) return null

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 text-zinc-400 border-r border-zinc-800/50 flex flex-col shadow-2xl">
      {/* Brand Header */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Coffee className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-black text-white text-xl tracking-tighter uppercase">CafeSaaS</span>
        </div>
        <button onClick={toggleSidebar} className="lg:hidden text-zinc-500 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.name}
              href={item.href} 
              className={`group flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-white text-zinc-950 shadow-lg' 
                  : 'hover:bg-zinc-900 hover:text-zinc-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'group-hover:text-zinc-100'}`} />
                {item.name}
              </div>
              {isActive && (
                <motion.div layoutId="sidebarActive">
                  <ChevronRight className="w-3 h-3 text-zinc-400" />
                </motion.div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer / Profile Area Preview */}
      <div className="p-4 border-t border-zinc-800/50">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100 transition-all">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
