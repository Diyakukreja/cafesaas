'use client'

import { useUIStore } from '@/store/ui-store'
import { Sidebar } from './sidebar'
import { Header } from './header'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useUIStore()

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
