'use client'

import { useUIStore } from '@/store/ui-store'
import { X, Coffee, LayoutDashboard, Settings } from 'lucide-react'
import Link from 'next/link'

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useUIStore()

  if (!isSidebarOpen) return null

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col transition-transform duration-300">
      <div className="flex items-center justify-between h-16 px-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Coffee className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>CafeSaaS</span>
        </div>
        <button onClick={toggleSidebar} className="lg:hidden text-zinc-500 hover:text-zinc-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </nav>
    </aside>
  )
}
